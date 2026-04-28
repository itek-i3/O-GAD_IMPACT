'use client';

import { useState } from 'react';
import Link from 'next/link';

const services = [
    {
      id: 1,
      title: 'Business & Strategy Consultancy',
      shortDesc: 'Strategic clarity and execution plans for sustainable growth.',
      href: '/services/business-strategy',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
        </svg>
      ),
      features: ['Strategic planning & roadmapping', 'Business model innovation', 'Organizational restructuring', 'Performance optimization'],
    },
    {
      id: 2,
      title: 'Technology & Digital Transformation',
      shortDesc: 'Leverage technology as a growth and efficiency driver.',
      href: '/services/technology',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
        </svg>
      ),
      features: ['Digital transformation strategy', 'Technology stack evaluation', 'Software development oversight', 'Digital innovation programs'],
    },
    {
      id: 3,
      title: 'Legal & Business Structuring',
      shortDesc: 'Bridging legal compliance and business growth.',
      href: '/services/legal',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
        </svg>
      ),
      features: ['Business entity setup', 'Corporate governance', 'Contract review & drafting', 'Regulatory compliance'],
    },
    {
      id: 4,
      title: 'Marketing, Sales & Growth Advisory',
      shortDesc: 'Find, convert, and retain customers at scale.',
      href: '/services/marketing',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38a.75.75 0 0 1-1.021-.27 18.632 18.632 0 0 1-2.414-6.404m5.57 0c-.823-.07-1.639-.178-2.439-.321m2.44.321c.68-.06 1.353-.09 2.033-.09h.376c.508 0 .97-.318 1.079-.814a4.49 4.49 0 0 0-.218-2.577 4.501 4.501 0 0 0-2.658-2.658 4.49 4.49 0 0 0-2.577-.218c-.496.11-.814.571-.814 1.079v.376c0 .68-.03 1.353-.09 2.033m0 2.44-.008.119c-.003.07-.009.14-.017.21a18.649 18.649 0 0 1-2.414 6.404.75.75 0 0 1-1.021.27l-.657-.38c-.524-.301-.71-.96-.463-1.511.382-.891.713-1.821.985-2.783" />
        </svg>
      ),
      features: ['Go-to-market strategy', 'Brand positioning', 'Sales process optimization', 'Growth marketing programs'],
    },
    {
      id: 5,
      title: 'Scaling & Expansion Support',
      shortDesc: 'Prepare your business for regional and market expansion.',
      href: '/services/scaling',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
        </svg>
      ),
      features: ['Expansion strategy', 'Market entry planning', 'Operational scaling', 'Team & leadership scaling'],
    },
  ];

];

const stats = [
  { value: '150+', label: 'Projects Delivered' },
  { value: '80+', label: 'Clients Served' },
  { value: '12+', label: 'Industries Covered' },
  { value: '98%', label: 'Client Satisfaction' },
];

const process = [
  { step: '01', title: 'Discovery', desc: 'We dive deep into your business, industry, and goals to understand the full picture.' },
  { step: '02', title: 'Strategy', desc: 'We craft a tailored roadmap aligned with your vision and market dynamics.' },
  { step: '03', title: 'Execution', desc: 'We work alongside your team to implement solutions with precision and agility.' },
  { step: '04', title: 'Growth', desc: 'We measure results, iterate, and scale what works for sustained impact.' },
];

export default function ServicesPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <main className='min-h-screen bg-white'>

      {/* Hero Section */}
      <section className='relative overflow-hidden min-h-[85vh] flex items-center' style={{ backgroundImage: 'url(/images/DSC_2608.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className='absolute inset-0' style={{ background: 'linear-gradient(160deg, rgba(0,0,0,0.75) 0%, rgba(5,12,30,0.55) 35%, rgba(10,22,50,0.35) 65%, rgba(48,108,236,0.18) 100%)' }} />
        <div className='absolute inset-0'>
          <div className='absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full opacity-15' style={{ background: 'radial-gradient(circle, #306CEC 0%, transparent 65%)' }} />
          <div className='absolute -bottom-20 right-0 w-[600px] h-[600px] rounded-full opacity-10' style={{ background: 'radial-gradient(circle, #306CEC 0%, transparent 60%)' }} />
        </div>

        <div className='max-w-7xl mx-auto px-6 md:px-12 pt-20 md:pt-24 pb-28 md:pb-36 relative z-10 w-full'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
            {/* Left – Copy */}
            <div className='space-y-7'>
              <span className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-blue-200 border border-blue-400/20' style={{ backgroundColor: 'rgba(48,108,236,0.15)', backdropFilter: 'blur(8px)' }}>
                <span className='w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse' />
                What We Do
              </span>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight' style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Consulting Services That <br className='hidden md:block' /><span className='bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent'>Drive Results</span>
              </h1>
              <p className='text-lg md:text-xl leading-relaxed max-w-xl' style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'DM Sans, sans-serif' }}>
                Comprehensive consulting across strategy, technology, law, and growth — built to transform ambition into measurable impact.
              </p>
              <div className='flex flex-wrap gap-4 pt-4'>
                <Link href='#services' className='inline-flex items-center gap-2 px-8 py-4 rounded-lg text-white font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02]' style={{ backgroundColor: '#306CEC', fontFamily: 'DM Sans, sans-serif' }}>
                  Explore Services
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                </Link>
                <Link href='/#get-in-touch' className='inline-flex items-center gap-2 px-8 py-4 rounded-lg text-white font-semibold border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all' style={{ backdropFilter: 'blur(8px)', fontFamily: 'DM Sans, sans-serif' }}>
                  Book a Consultation
                </Link>
              </div>
            </div>

            {/* Right – Icon Grid */}
            <div className='hidden lg:grid grid-cols-3 gap-4'>
              {services.map((s, i) => (
                <div key={s.id} className='group rounded-xl p-4 border border-white/10 hover:border-blue-400/30 hover:scale-[1.03] transition-all duration-300 cursor-default' style={{ backgroundColor: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(8px)' }}>
                  <div className='w-9 h-9 rounded-lg flex items-center justify-center mb-3' style={{ backgroundColor: 'rgba(48,108,236,0.15)' }}>
                    <div className='text-blue-400 group-hover:text-blue-300 transition-colors [&>svg]:w-5 [&>svg]:h-5'>{s.icon}</div>
                  </div>
                  <p className='text-sm text-white font-semibold leading-snug' style={{ fontFamily: 'DM Sans, sans-serif' }}>{s.title.split('&')[0].trim()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave divider */}
        <div className='absolute bottom-0 left-0 w-full overflow-hidden leading-none'>
          <svg viewBox='0 0 1440 60' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-full h-auto'>
            <path d='M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z' fill='white' />
          </svg>
        </div>
      </section>

      {/* Stats Bar */}
      <section className='py-16 md:py-20 bg-white'>
        <div className='max-w-6xl mx-auto px-6 md:px-12'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12'>
            {stats.map((stat, i) => (
              <div key={i} className='text-center'>
                <p className='text-4xl md:text-5xl font-bold' style={{ color: '#306CEC', fontFamily: 'League Spartan, sans-serif' }}>{stat.value}</p>
                <p className='mt-2 text-sm md:text-base text-gray-500 font-medium' style={{ fontFamily: 'DM Sans, sans-serif' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id='services' className='relative py-24 md:py-32 overflow-hidden' style={{ backgroundColor: '#f8fafc' }}>
        <div className='max-w-7xl mx-auto px-6 md:px-12 relative z-10'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-start'>

            {/* Left Column — Sticky Text */}
            <div className='lg:col-span-4 lg:sticky lg:top-32'>
              <span className='inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6' style={{ color: '#306CEC', backgroundColor: 'rgba(48,108,236,0.08)', fontFamily: 'DM Sans, sans-serif' }}>
                Our Services
              </span>
              <h2 className='text-4xl md:text-5xl font-bold text-gray-900 leading-[1.15] mb-6' style={{ fontFamily: 'League Spartan, sans-serif' }}>
                We Provide Best{' '}
                <span style={{ color: '#306CEC' }}>Consultancy</span>{' '}
                Services
              </h2>
              <p className='text-gray-500 text-lg leading-relaxed mb-10' style={{ fontFamily: 'DM Sans, sans-serif' }}>
                From strategy to execution, we deliver end-to-end consulting that turns bold ideas into measurable business outcomes.
              </p>
              <Link href='/#get-in-touch' className='inline-flex items-center gap-2.5 px-8 py-4 text-white font-semibold transition-all hover:brightness-110 hover:shadow-lg hover:shadow-blue-500/20' style={{ backgroundColor: '#306CEC', borderRadius: '12px 40px 12px 40px', fontFamily: 'DM Sans, sans-serif' }}>
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>

            {/* Right Column — Cards */}
            <div className='lg:col-span-8'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5'>
                {services.map((service, index) => (
                  <Link
                    key={service.id}
                    href={service.href}
                    className='group relative p-4 transition-all duration-300 hover:-translate-y-2 border flex flex-col'
                    onMouseEnter={() => setHoveredCard(service.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      backgroundColor: service.id === 2 ? '#306CEC' : (hoveredCard === service.id ? 'rgba(48,108,236,0.05)' : '#ffffff'),
                      borderColor: service.id === 2 ? '#306CEC' : (hoveredCard === service.id ? '#306CEC' : '#e5e7eb'),
                      borderRadius: '12px 40px 12px 40px',
                      height: '200px',
                    }}
                  >
                    <div className='w-9 h-9 flex items-center justify-center mb-3 transition-all duration-300 [&>svg]:w-5 [&>svg]:h-5' style={{
                      background: service.id === 2 ? 'rgba(255,255,255,0.2)' : (hoveredCard === service.id ? '#306CEC' : 'rgba(48,108,236,0.08)'),
                      color: service.id === 2 ? '#fff' : (hoveredCard === service.id ? '#fff' : '#306CEC'),
                      borderRadius: '8px 20px 8px 20px',
                    }}>
                      {service.icon}
                    </div>
                    <h3 className={`text-sm font-bold mb-1.5 leading-snug transition-colors ${service.id === 2 ? 'text-white' : 'text-gray-900 group-hover:text-[#306CEC]'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                      {service.title}
                    </h3>
                    <p className={`text-xs leading-relaxed mb-3 flex-1 ${service.id === 2 ? 'text-white/80' : 'text-gray-400'}`} style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {service.shortDesc}
                    </p>
                    <span className='inline-flex items-center gap-1.5 text-[0.65rem] font-semibold tracking-wide uppercase transition-all' style={{ color: service.id === 2 ? '#fff' : '#306CEC', fontFamily: 'DM Sans, sans-serif' }}>
                      Learn More
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 transition-transform group-hover:translate-x-1"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className='py-20 md:py-28 bg-white'>
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <div className='text-center max-w-2xl mx-auto mb-16'>
            <span className='inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4' style={{ color: '#306CEC', backgroundColor: 'rgba(48,108,236,0.08)', fontFamily: 'DM Sans, sans-serif' }}>Our Process</span>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4' style={{ fontFamily: 'League Spartan, sans-serif' }}>How We Work</h2>
            <p className='text-gray-500 text-lg leading-relaxed' style={{ fontFamily: 'DM Sans, sans-serif' }}>A proven four-step process that turns your challenges into competitive advantages.</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {process.map((p, i) => (
              <div key={i} className='relative group p-6 border transition-all duration-300 hover:-translate-y-1' style={{ backgroundColor: '#fff', borderColor: '#e5e7eb', borderRadius: '12px 40px 12px 40px' }}>
                <div className='text-5xl font-bold mb-4' style={{ color: 'rgba(48,108,236,0.15)', fontFamily: 'League Spartan, sans-serif' }}>{p.step}</div>
                <h3 className='text-xl font-bold text-gray-900 mb-2' style={{ fontFamily: 'League Spartan, sans-serif' }}>{p.title}</h3>
                <p className='text-gray-500 text-sm leading-relaxed' style={{ fontFamily: 'DM Sans, sans-serif' }}>{p.desc}</p>
                {i < process.length - 1 && (
                  <div className='hidden lg:block absolute top-10 right-0 w-12 h-px' style={{ backgroundColor: 'rgba(48,108,236,0.2)', transform: 'translateX(50%)' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className='py-20 md:py-24' style={{ backgroundColor: '#f8fafc' }}>
        <div className='max-w-4xl mx-auto px-6 md:px-12 text-center'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6' style={{ fontFamily: 'League Spartan, sans-serif' }}>Ready to Transform Your Business?</h2>
          <p className='text-lg text-gray-500 leading-relaxed mb-10 max-w-2xl mx-auto' style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Partner with us and gain access to world-class consulting that drives real, measurable growth.
          </p>
          <div className='flex flex-wrap justify-center gap-4'>
            <Link href='/#get-in-touch' className='inline-flex items-center gap-2 px-8 py-4 text-white font-semibold transition-all hover:brightness-110' style={{ backgroundColor: '#306CEC', borderRadius: '12px 40px 12px 40px', fontFamily: 'DM Sans, sans-serif' }}>
              Schedule a Consultation
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
            </Link>
            <Link href='/' className='inline-flex items-center gap-2 px-8 py-4 text-gray-700 font-semibold border border-gray-300 hover:bg-gray-50 transition-all' style={{ borderRadius: '12px 40px 12px 40px', fontFamily: 'DM Sans, sans-serif' }}>
              Back to Home
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

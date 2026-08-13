'use client';

import { useState } from 'react';
import Link from 'next/link';
import { agencies } from '@/data/agencies';

const layers = [
  {
    tag: '01 — Entry Point',
    title: 'Impact360',
    desc: 'Impact360 discovers entrepreneurs beyond traditional hubs.',
    href: '/agencies/impact360',
  },
  {
    tag: '02 — Execution',
    title: 'TOIG Agencies',
    desc: 'Six agencies to build, strengthen, and scale.',
    href: '#agencies',
  },
  {
    tag: '03 — The Future Layer',
    title: 'Platform Infrastructure',
    desc: 'Shared infrastructure businesses can depend on.',
    href: null,
  },
];

const stats = [
  { value: '6', label: 'Specialized Agencies' },
  { value: '200+', label: 'Businesses Served' },
  { value: '18+', label: 'Countries Reached' },
  { value: 'Pan-Africa', label: 'Reach & Impact' },
];

const process = [
  { step: '01', title: 'Diagnose', desc: 'We find the real problem, not just symptoms.' },
  { step: '02', title: 'Design', desc: 'We tailor solutions to your context and capacity.' },
  { step: '03', title: 'Build', desc: "The right agency implements what's needed." },
  { step: '04', title: 'Execute & Scale', desc: 'We support rollout and sustainable growth.' },
];

export default function AgenciesPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  function renderAgencyCard(agency: (typeof agencies)[number], index: number) {
    const featured = index === 2;
    return (
      <Link
        key={agency.slug}
        href={`/agencies/${agency.slug}`}
        className='group relative p-7 w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border flex flex-col'
        onMouseEnter={() => setHoveredCard(index)}
        onMouseLeave={() => setHoveredCard(null)}
        style={{
          backgroundColor: featured ? '#306CEC' : '#ffffff',
          borderColor: featured ? '#306CEC' : (hoveredCard === index ? '#306CEC' : '#e5e7eb'),
          borderRadius: '16px 48px 16px 48px',
        }}
      >
        <div className='w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 [&>svg]:w-6 [&>svg]:h-6' style={{
          background: featured ? 'rgba(255,255,255,0.2)' : (hoveredCard === index ? '#306CEC' : 'rgba(48,108,236,0.08)'),
          color: featured ? '#fff' : (hoveredCard === index ? '#fff' : '#306CEC'),
        }}>
          {agency.logoImage ? (
            <img src={agency.logoImage} alt={`${agency.name} logo`} className='w-7 h-7 object-contain' />
          ) : (
            agency.icon
          )}
        </div>
        <p className={`text-[11px] font-bold tracking-widest uppercase mb-2 ${featured ? 'text-white/70' : 'text-gray-400'}`} style={{ fontFamily: 'DM Sans, sans-serif' }}>
          {agency.category}
        </p>
        <h3 className={`text-lg font-bold mb-2 leading-snug transition-colors ${featured ? 'text-white' : 'text-gray-900 group-hover:text-[#306CEC]'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
          {agency.name}
        </h3>
        <p className={`text-sm leading-relaxed mb-5 flex-1 ${featured ? 'text-white/80' : 'text-gray-500'}`} style={{ fontFamily: 'DM Sans, sans-serif' }}>
          {agency.description}
        </p>
        <span className='inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase transition-all' style={{ color: featured ? '#fff' : '#306CEC', fontFamily: 'DM Sans, sans-serif' }}>
          Learn More
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
        </span>
      </Link>
    );
  }

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
            <div className='space-y-7'>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight' style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Six Agencies. <br className='hidden md:block' /><span className='bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent'>One Infrastructure.</span>
              </h1>
              <p className='text-lg md:text-xl leading-relaxed max-w-xl' style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'DM Sans, sans-serif' }}>
                We don&apos;t just advise. We build the systems businesses need to grow.
              </p>
              <div className='flex flex-wrap gap-4 pt-4'>
                <Link href='#agencies' className='inline-flex items-center gap-2 px-8 py-4 rounded-lg text-white font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02]' style={{ backgroundColor: '#306CEC', fontFamily: 'DM Sans, sans-serif' }}>
                  Explore Our Agencies
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                </Link>
                <Link href='/#get-in-touch' className='inline-flex items-center gap-2 px-8 py-4 rounded-lg text-white font-semibold border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all' style={{ backdropFilter: 'blur(8px)', fontFamily: 'DM Sans, sans-serif' }}>
                  Book a Consultation
                </Link>
              </div>
            </div>

            {/* Right – Icon Grid */}
            <div className='hidden lg:grid grid-cols-3 gap-4'>
              {agencies.map((a) => (
                <div key={a.slug} className='group rounded-xl p-4 border border-white/10 hover:border-blue-400/30 hover:scale-[1.03] transition-all duration-300 cursor-default' style={{ backgroundColor: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(8px)' }}>
                  <div className='w-9 h-9 rounded-lg flex items-center justify-center mb-3' style={{ backgroundColor: 'rgba(48,108,236,0.15)' }}>
                    <div className='text-blue-400 group-hover:text-blue-300 transition-colors [&>svg]:w-5 [&>svg]:h-5'>{a.icon}</div>
                  </div>
                  <p className='text-sm text-white font-semibold leading-snug' style={{ fontFamily: 'DM Sans, sans-serif' }}>{a.shortName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

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

      {/* Three Layers */}
      <section className='py-20 md:py-24' style={{ backgroundColor: '#f8fafc' }}>
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <div className='text-center max-w-2xl mx-auto mb-14'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4' style={{ fontFamily: 'League Spartan, sans-serif' }}>A Three-Layer Infrastructure</h2>
            <p className='text-gray-500 text-lg leading-relaxed' style={{ fontFamily: 'DM Sans, sans-serif' }}>From discovery to execution to sustained growth.</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {layers.map((layer, i) => (
              <div key={i} className='relative p-8 border bg-white transition-all duration-300 hover:-translate-y-1' style={{ borderColor: '#e5e7eb', borderRadius: '16px 48px 16px 48px' }}>
                <span className='inline-block text-[11px] font-bold tracking-[0.2em] uppercase mb-4' style={{ color: '#306CEC' }}>{layer.tag}</span>
                <h3 className='text-2xl font-bold text-gray-900 mb-3' style={{ fontFamily: 'League Spartan, sans-serif' }}>{layer.title}</h3>
                <p className='text-gray-500 text-sm leading-relaxed mb-4' style={{ fontFamily: 'DM Sans, sans-serif' }}>{layer.desc}</p>
                {layer.href && (
                  <Link href={layer.href} className='inline-flex items-center gap-1.5 text-[12px] font-bold tracking-widest uppercase' style={{ color: '#306CEC', fontFamily: 'DM Sans, sans-serif' }}>
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agencies Section */}
      <section id='agencies' className='relative py-24 md:py-32 overflow-hidden bg-white'>
        <div className='max-w-7xl mx-auto px-6 md:px-12 relative z-10'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-start'>

            <div className='lg:col-span-4 lg:sticky lg:top-32'>
              <h2 className='text-4xl md:text-5xl font-bold text-gray-900 leading-[1.15] mb-6' style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Our{' '}
                <span style={{ color: '#306CEC' }}>Agencies</span>
              </h2>
              <p className='text-gray-500 text-lg leading-relaxed mb-10' style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Use one agency, or all of them together.
              </p>
              <Link href='/#get-in-touch' className='inline-flex items-center gap-2.5 px-8 py-4 text-white font-semibold transition-all hover:brightness-110 hover:shadow-lg hover:shadow-blue-500/20' style={{ backgroundColor: '#306CEC', borderRadius: '12px 40px 12px 40px', fontFamily: 'DM Sans, sans-serif' }}>
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>

            <div className='lg:col-span-8'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 items-start'>
                {agencies.map((agency, index) => renderAgencyCard(agency, index))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className='py-20 md:py-28' style={{ backgroundColor: '#f8fafc' }}>
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <div className='text-center max-w-2xl mx-auto mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4' style={{ fontFamily: 'League Spartan, sans-serif' }}>How We Work</h2>
            <p className='text-gray-500 text-lg leading-relaxed' style={{ fontFamily: 'DM Sans, sans-serif' }}>The same approach, across every agency.</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {process.map((p, i) => (
              <div key={i} className='relative group p-6 border bg-white transition-all duration-300 hover:-translate-y-1' style={{ borderColor: '#e5e7eb', borderRadius: '12px 40px 12px 40px' }}>
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
      <section className='py-20 md:py-24 bg-white'>
        <div className='max-w-4xl mx-auto px-6 md:px-12 text-center'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6' style={{ fontFamily: 'League Spartan, sans-serif' }}>Ready to Build on TOIG Infrastructure?</h2>
          <p className='text-lg text-gray-500 leading-relaxed mb-10 max-w-2xl mx-auto' style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Partner with the agency that matches your stage.
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

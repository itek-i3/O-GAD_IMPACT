'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import BookingModal from '@/components/BookingModal';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function anim(inView: boolean, delay = 0): React.CSSProperties {
  return inView
    ? { animation: `slideInUp 0.55s ease-out ${delay}s both` }
    : { opacity: 0 };
}

function fadeAnim(inView: boolean, delay = 0): React.CSSProperties {
  return inView
    ? { animation: `fadeIn 0.6s ease-out ${delay}s both` }
    : { opacity: 0 };
}

export default function BusinessStrategyPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const overviewSection = useInView();
  const offeringsSection = useInView();
  const approachSection = useInView();

  const offerings = [
    {
      title: 'Strategic Planning & Roadmapping',
      desc: 'We develop 3-5 year strategic plans aligned with your vision, market opportunities, and organizational capabilities.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
        </svg>
      ),
    },
    {
      title: 'Business Model Innovation',
      desc: 'Explore new revenue streams, market segments, and operational models that drive growth and competitive advantage.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" />
        </svg>
      ),
    },
    {
      title: 'Organizational Restructuring',
      desc: 'Redesign your organizational structure, roles, and processes to support strategic execution and scale.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V20.25a.75.75 0 0 0 1.28.53l3.58-3.58A48.408 48.408 0 0 0 12 17.25c2.115 0 4.198-.137 6.24-.402 1.608-.209 2.76-1.614 2.76-3.235v-.126Z" />
        </svg>
      ),
    },
    {
      title: 'Performance Optimization',
      desc: 'Identify and implement operational improvements that enhance efficiency, reduce costs, and improve margins.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
        </svg>
      ),
    },
  ];

  const steps = [
    { num: '01', title: 'Discovery & Assessment', desc: 'We assess current state, market landscape, competitive positioning, and organizational capabilities to understand where you truly stand.' },
    { num: '02', title: 'Strategy Development', desc: 'We develop a comprehensive strategy with clear vision, goals, and key initiatives tailored to your unique context and ambitions.' },
    { num: '03', title: 'Organizational Alignment', desc: 'We align structure, processes, and culture to support strategic execution — ensuring your team moves in one direction.' },
    { num: '04', title: 'Implementation Support', desc: 'We guide execution with detailed roadmaps, KPIs, and governance structures so momentum never stalls.' },
    { num: '05', title: 'Monitoring & Refinement', desc: 'We establish systems to track progress and refine strategy based on market changes and emerging opportunities.' },
  ];

  const stats = [
    { value: '150+', label: 'Projects Delivered' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '12+', label: 'Industries Served' },
  ];

  return (
    <main className='min-h-screen bg-white'>

      {/* ── Hero ── */}
      <section
        className='relative min-h-[78vh] flex items-end overflow-hidden'
        style={{ backgroundImage: "url('/images/DSC_2662.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
      >
        <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20' />
        <div className='absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent' />
        <div className='relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-28 pb-16'>
          <div className='flex items-center gap-2 text-[12px] font-medium mb-10' style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'DM Sans, sans-serif' }}>
            <Link href='/' className='hover:text-white/70 transition-colors'>Home</Link>
            <span>/</span>
            <Link href='/services' className='hover:text-white/70 transition-colors'>Services</Link>
            <span>/</span>
            <span style={{ color: 'rgba(255,255,255,0.75)' }}>Business & Strategy</span>
          </div>
          <div className='flex items-end gap-10'>
            <div className='max-w-2xl'>
              <p className='text-[11px] font-bold tracking-[0.25em] uppercase mb-4' style={{ color: '#306CEC', fontFamily: 'DM Sans, sans-serif', opacity: 0, animation: 'slideInUp 0.5s ease-out 0.1s both' }}>Service Area</p>
              <h1 className='font-bold text-white leading-[1.05] mb-5' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', opacity: 0, animation: 'slideInUp 0.55s ease-out 0.2s both' }}>
                Business & Strategy Consultancy
              </h1>
              <p className='text-base md:text-lg leading-relaxed mb-8' style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'DM Sans, sans-serif', maxWidth: '480px', opacity: 0, animation: 'slideInUp 0.55s ease-out 0.3s both' }}>
                Strategic clarity, organizational alignment, and execution excellence for sustainable business growth.
              </p>
              <div style={{ opacity: 0, animation: 'slideInUp 0.55s ease-out 0.4s both' }}>
                <button onClick={() => setIsBookingOpen(true)} className='text-white px-7 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90' style={{ backgroundColor: '#306CEC', fontFamily: 'DM Sans, sans-serif' }}>
                  Book a Session
                </button>
              </div>
            </div>
            <div className='hidden md:flex w-32 h-32 rounded-3xl flex-shrink-0 items-center justify-center mb-1' style={{ backgroundColor: 'rgba(48,108,236,0.15)', border: '1px solid rgba(48,108,236,0.3)', opacity: 0, animation: 'fadeIn 0.8s ease-out 0.5s both' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#306CEC" className="w-14 h-14">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
              </svg>
            </div>
          </div>
        </div>
        <div className='absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none'>
          <svg viewBox='0 0 1440 60' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-full h-auto'>
            <path d='M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z' fill='white' />
          </svg>
        </div>
      </section>

      {/* ── Overview ── */}
      <section className='py-16 md:py-20 bg-white overflow-hidden'>
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <div ref={overviewSection.ref} className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>

            {/* Left */}
            <div>
              <span className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase mb-4' style={{ color: '#306CEC', backgroundColor: 'rgba(48,108,236,0.08)', fontFamily: 'DM Sans, sans-serif', ...anim(overviewSection.inView, 0) }}>
                <span className='w-1.5 h-1.5 rounded-full' style={{ backgroundColor: '#306CEC' }} />
                Overview
              </span>
              <h2 className='font-bold text-gray-900 leading-tight mb-4' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', ...anim(overviewSection.inView, 0.1) }}>
                The Strategic Clarity <br /><span style={{ color: '#306CEC' }}>You Need to Win</span>
              </h2>
              <p className='text-[17px] text-gray-600 leading-relaxed mb-3' style={{ fontFamily: 'DM Sans, sans-serif', ...anim(overviewSection.inView, 0.2) }}>
                Many organizations struggle with unclear strategy and fragmented execution. We help you define a clear strategic vision, align your organization around it, and execute with precision.
              </p>
              <p className='text-[17px] text-gray-600 leading-relaxed mb-7' style={{ fontFamily: 'DM Sans, sans-serif', ...anim(overviewSection.inView, 0.25) }}>
                Our approach combines deep market analysis, competitive positioning, and operational excellence to create strategies that deliver measurable business impact.
              </p>

              <div className='grid grid-cols-3 gap-4 pt-6 mb-7 border-t border-gray-100' style={anim(overviewSection.inView, 0.3)}>
                {stats.map((s, i) => (
                  <div key={i}>
                    <p className='text-3xl font-bold mb-0.5' style={{ color: '#306CEC', fontFamily: 'League Spartan, sans-serif' }}>{s.value}</p>
                    <p className='text-sm text-gray-500 leading-snug' style={{ fontFamily: 'DM Sans, sans-serif' }}>{s.label}</p>
                  </div>
                ))}
              </div>

              <div style={anim(overviewSection.inView, 0.38)}>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className='inline-flex items-center gap-2.5 text-white px-7 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/25'
                  style={{ backgroundColor: '#306CEC', fontFamily: 'DM Sans, sans-serif' }}
                >
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </button>
              </div>
            </div>

            {/* Right */}
            <div className='relative' style={fadeAnim(overviewSection.inView, 0.2)}>
              <div className='rounded-3xl overflow-hidden shadow-2xl'>
                <img
                  src="/images/DSC_2614.jpg"
                  alt='Business Strategy'
                  className='w-full h-[400px] object-cover hover:scale-[1.03] transition-transform duration-700'
                />
              </div>
              <div className='absolute -bottom-5 -left-5 p-5 rounded-2xl shadow-2xl max-w-[240px]' style={{ backgroundColor: '#306CEC' }}>
                <div className='flex items-center gap-2 mb-2'>
                  <div className='w-6 h-6 rounded-lg flex items-center justify-center' style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" /></svg>
                  </div>
                  <p className='text-white font-bold text-sm' style={{ fontFamily: 'League Spartan, sans-serif' }}>Strategy-Led Growth</p>
                </div>
                <p className='text-white/90 text-xs leading-relaxed' style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Aligning your vision with market realities for lasting competitive advantage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What We Offer ── */}
      <section className='py-16 md:py-20' style={{ backgroundColor: '#f0f5ff' }}>
        <div className='max-w-7xl mx-auto px-6 md:px-12'>

          <div ref={offeringsSection.ref} className='flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10'>
            <div>
              <span className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase mb-4' style={{ color: '#306CEC', backgroundColor: 'rgba(48,108,236,0.1)', fontFamily: 'DM Sans, sans-serif', ...anim(offeringsSection.inView, 0) }}>
                <span className='w-1.5 h-1.5 rounded-full' style={{ backgroundColor: '#306CEC' }} />
                What We Offer
              </span>
              <h2 className='font-bold text-gray-900' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', ...anim(offeringsSection.inView, 0.1) }}>Our Offerings</h2>
            </div>
            <p className='text-gray-600 text-sm leading-relaxed md:max-w-xs' style={{ fontFamily: 'DM Sans, sans-serif', ...anim(offeringsSection.inView, 0.15) }}>
              Four core areas designed to unlock growth and strategic clarity.
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {offerings.map((item, idx) => (
              <div
                key={idx}
                className='group bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-default'
                style={{ ...anim(offeringsSection.inView, 0.15 + idx * 0.08) }}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className='flex items-center justify-between mb-4'>
                  <div className='w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300' style={{ backgroundColor: hoveredCard === idx ? 'rgba(48,108,236,0.15)' : 'rgba(48,108,236,0.08)', color: '#306CEC' }}>
                    {item.icon}
                  </div>
                  <span className='text-xs font-bold tracking-widest' style={{ color: 'rgba(48,108,236,0.4)', fontFamily: 'DM Sans, sans-serif' }}>0{idx + 1}</span>
                </div>
                <h3 className='text-[15px] font-bold text-gray-900 mb-2 leading-snug' style={{ fontFamily: 'League Spartan, sans-serif' }}>{item.title}</h3>
                <p className='text-gray-600 text-sm leading-relaxed flex-1' style={{ fontFamily: 'DM Sans, sans-serif' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Approach ── */}
      <section className='py-16 md:py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-6 md:px-12'>

          <div ref={approachSection.ref} className='flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10'>
            <div>
              <span className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase mb-4' style={{ color: '#306CEC', backgroundColor: 'rgba(48,108,236,0.08)', fontFamily: 'DM Sans, sans-serif', ...anim(approachSection.inView, 0) }}>
                <span className='w-1.5 h-1.5 rounded-full' style={{ backgroundColor: '#306CEC' }} />
                Process
              </span>
              <h2 className='font-bold text-gray-900' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', ...anim(approachSection.inView, 0.1) }}>Our Approach</h2>
            </div>
            <div style={anim(approachSection.inView, 0.15)}>
              <button
                onClick={() => setIsBookingOpen(true)}
                className='inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 hover:shadow-md hover:shadow-blue-500/20'
                style={{ backgroundColor: '#306CEC', fontFamily: 'DM Sans, sans-serif' }}
              >
                Book a Session
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
              </button>
            </div>
          </div>

          {/* Row 1: steps 01–03 */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
            {steps.slice(0, 3).map((step, idx) => (
              <div
                key={idx}
                className='group rounded-2xl p-6 border border-gray-100 hover:border-blue-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300'
                style={{ backgroundColor: '#fafafa', ...anim(approachSection.inView, 0.2 + idx * 0.08) }}
              >
                <div className='flex items-center gap-3 mb-3'>
                  <div className='w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0' style={{ backgroundColor: 'rgba(48,108,236,0.1)', border: '1.5px solid rgba(48,108,236,0.2)' }}>
                    <span className='text-xs font-bold' style={{ color: '#306CEC', fontFamily: 'League Spartan, sans-serif' }}>{step.num}</span>
                  </div>
                  <h3 className='text-[15px] font-bold text-gray-900 leading-snug' style={{ fontFamily: 'League Spartan, sans-serif' }}>{step.title}</h3>
                </div>
                <p className='text-gray-600 text-sm leading-relaxed' style={{ fontFamily: 'DM Sans, sans-serif' }}>{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Row 2: steps 04–05 */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:w-2/3'>
            {steps.slice(3).map((step, idx) => (
              <div
                key={idx + 3}
                className='group rounded-2xl p-6 border border-gray-100 hover:border-blue-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300'
                style={{ backgroundColor: '#fafafa', ...anim(approachSection.inView, 0.44 + idx * 0.08) }}
              >
                <div className='flex items-center gap-3 mb-3'>
                  <div className='w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0' style={{ backgroundColor: 'rgba(48,108,236,0.1)', border: '1.5px solid rgba(48,108,236,0.2)' }}>
                    <span className='text-xs font-bold' style={{ color: '#306CEC', fontFamily: 'League Spartan, sans-serif' }}>{step.num}</span>
                  </div>
                  <h3 className='text-[15px] font-bold text-gray-900 leading-snug' style={{ fontFamily: 'League Spartan, sans-serif' }}>{step.title}</h3>
                </div>
                <p className='text-gray-600 text-sm leading-relaxed' style={{ fontFamily: 'DM Sans, sans-serif' }}>{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} defaultService="business-strategy" />
    </main>
  );
}

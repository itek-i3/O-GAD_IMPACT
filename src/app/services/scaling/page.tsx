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

export default function ScalingPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const overviewSection = useInView();
  const offeringsSection = useInView();
  const approachSection = useInView();

  const offerings = [
    {
      title: 'Expansion Strategy',
      desc: 'Market expansion and growth strategy that identifies high-value opportunities and mitigates execution risks.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        </svg>
      ),
    },
    {
      title: 'Market Entry Planning',
      desc: 'Comprehensive planning for entering new geographic markets or customer segments with maximum precision.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      ),
    },
    {
      title: 'Operational Scaling',
      desc: 'Process design and infrastructure improvements to support 2x, 5x, or 10x growth without breaking down.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      ),
    },
    {
      title: 'Team & Leadership Scaling',
      desc: 'Organizational design and talent strategy to scale your leadership team and operational capacity effectively.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
        </svg>
      ),
    },
  ];

  const steps = [
    { num: '01', title: 'Growth Stage Assessment', desc: 'We assess your current stage of maturity and identify the key constraints, bottlenecks, and catalysts to growth.' },
    { num: '02', title: 'Expansion Opportunity Analysis', desc: 'We analyze expansion opportunities — new markets, segments, or products — and prioritize by impact and feasibility.' },
    { num: '03', title: 'Scaling Roadmap', desc: 'We develop a detailed roadmap for scaling operations, technology, team, and go-to-market efforts.' },
    { num: '04', title: 'Execution Support', desc: 'We support execution of the scaling roadmap with clear milestones, metrics, and real-time course corrections.' },
    { num: '05', title: 'Continuous Evolution', desc: 'We help organizations continuously evolve their structure, processes, and strategy as each new growth stage demands.' },
  ];

  const stats = [
    { value: '5x', label: 'Avg Growth Achieved' },
    { value: '30+', label: 'Expansion Projects' },
    { value: '15+', label: 'Markets Entered' },
  ];

  return (
    <main className='min-h-screen bg-white'>

      {/* ── Hero ── */}
      <section
        className='relative min-h-[78vh] flex items-end overflow-hidden'
        style={{ backgroundImage: "url('/images/DSC_2759.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
      >
        <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20' />
        <div className='absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent' />
        <div className='relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-28 pb-16'>
          <div className='flex items-center gap-2 text-[12px] font-medium mb-10' style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'DM Sans, sans-serif' }}>
            <Link href='/' className='hover:text-white/70 transition-colors'>Home</Link>
            <span>/</span>
            <Link href='/services' className='hover:text-white/70 transition-colors'>Services</Link>
            <span>/</span>
            <span style={{ color: 'rgba(255,255,255,0.75)' }}>Scaling & Expansion</span>
          </div>
          <div className='flex items-end gap-10'>
            <div className='max-w-2xl'>
              <p className='text-[11px] font-bold tracking-[0.25em] uppercase mb-4' style={{ color: '#306CEC', fontFamily: 'DM Sans, sans-serif', opacity: 0, animation: 'slideInUp 0.5s ease-out 0.1s both' }}>Service Area</p>
              <h1 className='font-bold text-white leading-[1.05] mb-5' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', opacity: 0, animation: 'slideInUp 0.55s ease-out 0.2s both' }}>
                Scaling & Expansion Support
              </h1>
              <p className='text-base md:text-lg leading-relaxed mb-8' style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'DM Sans, sans-serif', maxWidth: '480px', opacity: 0, animation: 'slideInUp 0.55s ease-out 0.3s both' }}>
                Prepare your business for successful scaling and market expansion with comprehensive strategic support.
              </p>
              <div style={{ opacity: 0, animation: 'slideInUp 0.55s ease-out 0.4s both' }}>
                <button onClick={() => setIsBookingOpen(true)} className='text-white px-7 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90' style={{ backgroundColor: '#306CEC', fontFamily: 'DM Sans, sans-serif' }}>
                  Book a Session
                </button>
              </div>
            </div>
            <div className='hidden md:flex w-32 h-32 rounded-3xl flex-shrink-0 items-center justify-center mb-1' style={{ backgroundColor: 'rgba(48,108,236,0.15)', border: '1px solid rgba(48,108,236,0.3)', opacity: 0, animation: 'fadeIn 0.8s ease-out 0.5s both' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#306CEC" className="w-14 h-14">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
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

            <div>
              <span className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase mb-4' style={{ color: '#306CEC', backgroundColor: 'rgba(48,108,236,0.08)', fontFamily: 'DM Sans, sans-serif', ...anim(overviewSection.inView, 0) }}>
                <span className='w-1.5 h-1.5 rounded-full' style={{ backgroundColor: '#306CEC' }} />
                Overview
              </span>
              <h2 className='font-bold text-gray-900 leading-tight mb-4' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', ...anim(overviewSection.inView, 0.1) }}>
                Scale Built on <br /><span style={{ color: '#306CEC' }}>Strong Foundations</span>
              </h2>
              <p className='text-[17px] text-gray-600 leading-relaxed mb-3' style={{ fontFamily: 'DM Sans, sans-serif', ...anim(overviewSection.inView, 0.2) }}>
                Scaling isn't just about growth — it's about sustainable growth on solid foundations. Many organizations stumble when growing because they lack the infrastructure, processes, or leadership depth to support expansion.
              </p>
              <p className='text-[17px] text-gray-600 leading-relaxed mb-7' style={{ fontFamily: 'DM Sans, sans-serif', ...anim(overviewSection.inView, 0.25) }}>
                We guide organizations through multiple growth stages — from startup formation through regional expansion to market leadership — ensuring that growth is profitable, sustainable, and aligned with your vision.
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

            <div className='relative' style={fadeAnim(overviewSection.inView, 0.2)}>
              <div className='rounded-3xl overflow-hidden shadow-2xl'>
                <img
                  src="/images/_DSC0139.jpg"
                  alt='Scaling & Expansion'
                  className='w-full h-[400px] object-cover hover:scale-[1.03] transition-transform duration-700'
                />
              </div>
              <div className='absolute -bottom-5 -left-5 p-5 rounded-2xl shadow-2xl max-w-[240px]' style={{ backgroundColor: '#306CEC' }}>
                <div className='flex items-center gap-2 mb-2'>
                  <div className='w-6 h-6 rounded-lg flex items-center justify-center' style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
                  </div>
                  <p className='text-white font-bold text-sm' style={{ fontFamily: 'League Spartan, sans-serif' }}>Scale Without Limits</p>
                </div>
                <p className='text-white/90 text-xs leading-relaxed' style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Building the infrastructure that lets your business grow without breaking.
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
              Four core areas designed to take your business from where it is to where it needs to be.
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

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} defaultService="scaling" />
    </main>
  );
}

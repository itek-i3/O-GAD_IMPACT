'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import BookingModal from '@/components/BookingModal';
import type { Agency } from '@/data/agencies';

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
  return inView ? { animation: `slideInUp 0.55s ease-out ${delay}s both` } : { opacity: 0 };
}

function fadeAnim(inView: boolean, delay = 0): React.CSSProperties {
  return inView ? { animation: `fadeIn 0.6s ease-out ${delay}s both` } : { opacity: 0 };
}

export default function AgencyDetail({ agency }: { agency: Agency }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const overviewSection = useInView();
  const offeringsSection = useInView();
  const approachSection = useInView();

  return (
    <main className='min-h-screen bg-white'>

      {/* ── Hero ── */}
      <section
        className='relative min-h-[100vh] flex items-end overflow-hidden'
        style={{ backgroundImage: `url(${agency.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
      >
        <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20' />
        <div className='absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent' />
        <div className='relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-28 pb-32'>
          <div className='flex items-center gap-2 text-[12px] font-medium mb-10' style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'DM Sans, sans-serif' }}>
            <Link href='/' className='hover:text-white/70 transition-colors'>Home</Link>
            <span>/</span>
            <Link href='/agencies' className='hover:text-white/70 transition-colors'>Agencies</Link>
            <span>/</span>
            <span style={{ color: 'rgba(255,255,255,0.75)' }}>{agency.shortName}</span>
          </div>
          <div className='flex items-end gap-10'>
            <div className='max-w-2xl'>
              <div className='flex items-center gap-4 mb-3'>
                {agency.logoImage ? (
                  <div
                    className='hidden md:flex w-16 h-16 rounded-2xl flex-shrink-0 items-center justify-center p-3'
                    style={{ backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.3)', opacity: 0, animation: 'fadeIn 0.8s ease-out 0.05s both' }}
                  >
                    <img src={agency.logoImage} alt={`${agency.name} logo`} className='w-full h-full object-contain' />
                  </div>
                ) : (
                  <div
                    className='hidden md:flex w-16 h-16 rounded-2xl flex-shrink-0 items-center justify-center'
                    style={{ backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.3)', opacity: 0, animation: 'fadeIn 0.8s ease-out 0.05s both' }}
                  >
                    <div className='text-white [&>svg]:w-7 [&>svg]:h-7'>{agency.icon}</div>
                  </div>
                )}
                <div>
                  <p className='text-[11px] font-bold tracking-[0.25em] uppercase mb-4' style={{ color: '#306CEC', fontFamily: 'DM Sans, sans-serif', opacity: 0, animation: 'slideInUp 0.5s ease-out 0.1s both' }}>{agency.category}</p>
                  <h1 className='font-bold text-white leading-[1.05] mb-5' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', opacity: 0, animation: 'slideInUp 0.55s ease-out 0.2s both' }}>
                    {agency.name}
                  </h1>
                </div>
              </div>
              <p className='text-base md:text-lg leading-relaxed mb-8' style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'DM Sans, sans-serif', maxWidth: '480px', opacity: 0, animation: 'slideInUp 0.55s ease-out 0.3s both' }}>
                {agency.tagline}
              </p>
              <div style={{ opacity: 0, animation: 'slideInUp 0.55s ease-out 0.4s both' }}>
                <button onClick={() => setIsBookingOpen(true)} className='text-white px-7 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90' style={{ backgroundColor: '#306CEC', fontFamily: 'DM Sans, sans-serif' }}>
                  Book a Session
                </button>
              </div>
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
              <h2 className='font-bold text-gray-900 leading-tight mb-4' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', ...anim(overviewSection.inView, 0) }}>
                {agency.overviewTitle} <br /><span style={{ color: '#306CEC' }}>{agency.overviewHighlight}</span>
              </h2>
              {agency.overviewParagraphs.map((p, i) => (
                <p key={i} className={`text-[17px] text-gray-600 leading-relaxed ${i === agency.overviewParagraphs.length - 1 ? 'mb-7' : 'mb-3'}`} style={{ fontFamily: 'DM Sans, sans-serif', ...anim(overviewSection.inView, 0.2 + i * 0.05) }}>
                  {p}
                </p>
              ))}

              <div className='grid grid-cols-3 gap-4 pt-6 mb-7 border-t border-gray-100' style={anim(overviewSection.inView, 0.3)}>
                {agency.stats.map((s, i) => (
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
                  src={agency.overviewImage}
                  alt={agency.name}
                  className='w-full h-[400px] object-cover hover:scale-[1.03] transition-transform duration-700'
                />
              </div>
              <div className='absolute -bottom-5 -left-5 p-5 rounded-2xl shadow-2xl max-w-[240px]' style={{ backgroundColor: '#306CEC' }}>
                <div className='flex items-center gap-2 mb-2'>
                  <div className='w-6 h-6 rounded-lg flex items-center justify-center' style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>
                  </div>
                  <p className='text-white font-bold text-sm' style={{ fontFamily: 'League Spartan, sans-serif' }}>{agency.calloutTitle}</p>
                </div>
                <p className='text-white/90 text-xs leading-relaxed' style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  {agency.calloutDesc}
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
              <h2 className='font-bold text-gray-900' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', ...anim(offeringsSection.inView, 0) }}>Our Offerings</h2>
            </div>
            <p className='text-gray-600 text-sm leading-relaxed md:max-w-xs' style={{ fontFamily: 'DM Sans, sans-serif', ...anim(offeringsSection.inView, 0.15) }}>
              {agency.offeringsIntro}
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {agency.offerings.map((item, idx) => (
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
              <h2 className='font-bold text-gray-900' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', ...anim(approachSection.inView, 0) }}>Our Approach</h2>
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
            {agency.steps.slice(0, 3).map((step, idx) => (
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
            {agency.steps.slice(3).map((step, idx) => (
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

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} defaultService={agency.slug} calendlyUrl={agency.calendlyUrl} />
    </main>
  );
}

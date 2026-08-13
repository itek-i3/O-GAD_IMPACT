'use client';
import { Fragment, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import BookingModal from '@/components/BookingModal';
import type { Agency } from '@/data/agencies';

const ACCENT = '#306CEC';

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

export default function ITekDetail({ agency }: { agency: Agency }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const overviewSection = useInView();
  const offeringsSection = useInView();
  const approachSection = useInView();
  const ctaSection = useInView();

  const galleryImages = ['/images/_DSC0150.jpg', '/photo/S43A0051.jpg', '/images/_DSC2948.jpg'];

  return (
    <main className='min-h-screen bg-white'>

      {/* ── Hero ── */}
      <section
        className='relative min-h-[100vh] flex items-end overflow-hidden'
        style={{ backgroundImage: `url(${agency.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
      >
        <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10' />
        <div className='absolute inset-0' style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.45) 20%, rgba(0,0,0,0.15) 35%, transparent 52%)' }} />
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
                  <p className='text-[11px] font-bold tracking-[0.25em] uppercase mb-4' style={{ color: ACCENT, fontFamily: 'DM Sans, sans-serif', opacity: 0, animation: 'slideInUp 0.5s ease-out 0.1s both' }}>{agency.category}</p>
                  <h1 className='font-bold text-white leading-[1.05] mb-5' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', opacity: 0, animation: 'slideInUp 0.55s ease-out 0.2s both' }}>
                    {agency.name}
                  </h1>
                </div>
              </div>
              <p className='text-base md:text-lg leading-relaxed mb-8' style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'DM Sans, sans-serif', maxWidth: '480px', opacity: 0, animation: 'slideInUp 0.55s ease-out 0.3s both' }}>
                {agency.tagline}
              </p>
              <div style={{ opacity: 0, animation: 'slideInUp 0.55s ease-out 0.4s both' }}>
                <button onClick={() => setIsBookingOpen(true)} className='text-white px-7 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90' style={{ backgroundColor: ACCENT, fontFamily: 'DM Sans, sans-serif' }}>
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

      {/* ── Overview — modular system grid ── */}
      <section className='py-20 md:py-28 bg-white overflow-hidden'>
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <div ref={overviewSection.ref} className='grid grid-cols-1 lg:grid-cols-2 gap-14 items-center'>

            <div className='order-2 lg:order-1'>
              <h2 className='font-bold text-gray-900 leading-tight mb-5' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', ...anim(overviewSection.inView, 0) }}>
                {agency.overviewTitle} <br /><span style={{ color: ACCENT }}>{agency.overviewHighlight}</span>
              </h2>
              {agency.overviewParagraphs.map((p, i) => (
                <p key={i} className={`text-[17px] text-gray-600 leading-relaxed ${i === agency.overviewParagraphs.length - 1 ? 'mb-8' : 'mb-4'}`} style={{ fontFamily: 'DM Sans, sans-serif', ...anim(overviewSection.inView, 0.16 + i * 0.06) }}>
                  {p}
                </p>
              ))}

              <div className='flex flex-wrap gap-x-10 gap-y-5 pt-7 mb-8 border-t border-gray-100' style={anim(overviewSection.inView, 0.32)}>
                {agency.stats.map((s, i) => (
                  <div key={i}>
                    <p className='text-3xl font-bold mb-0.5' style={{ color: ACCENT, fontFamily: 'League Spartan, sans-serif' }}>{s.value}</p>
                    <p className='text-sm text-gray-500 leading-snug' style={{ fontFamily: 'DM Sans, sans-serif' }}>{s.label}</p>
                  </div>
                ))}
              </div>

              <div style={anim(overviewSection.inView, 0.4)}>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className='inline-flex items-center gap-2.5 text-white px-7 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/25'
                  style={{ backgroundColor: ACCENT, fontFamily: 'DM Sans, sans-serif' }}
                >
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </button>
              </div>
            </div>

            <div className='order-1 lg:order-2 grid grid-cols-2 gap-4' style={fadeAnim(overviewSection.inView, 0.15)}>
              <div className='rounded-2xl overflow-hidden shadow-xl'>
                <img src={galleryImages[0]} alt={agency.name} className='w-full h-44 object-cover hover:scale-105 transition-transform duration-700' />
              </div>
              <div className='rounded-2xl overflow-hidden shadow-xl'>
                <img src={galleryImages[1]} alt={agency.name} className='w-full h-44 object-cover hover:scale-105 transition-transform duration-700' />
              </div>
              <div className='rounded-2xl overflow-hidden shadow-xl relative'>
                <img src={galleryImages[2]} alt={agency.name} className='w-full h-44 object-cover hover:scale-105 transition-transform duration-700' />
                <div className='absolute bottom-2 left-2 right-2 p-2.5 rounded-lg' style={{ backgroundColor: 'rgba(8,10,20,0.55)', backdropFilter: 'blur(6px)' }}>
                  <p className='text-white text-[10px] font-bold leading-snug' style={{ fontFamily: 'League Spartan, sans-serif' }}>{agency.calloutTitle}</p>
                </div>
              </div>
              <div className='rounded-2xl overflow-hidden shadow-xl relative'>
                <img src='/images/DSC_2565.jpg' alt={agency.name} className='w-full h-44 object-cover hover:scale-105 transition-transform duration-700' />
                <div className='absolute bottom-2 left-2 right-2 p-2.5 rounded-lg' style={{ backgroundColor: 'rgba(8,10,20,0.55)', backdropFilter: 'blur(6px)' }}>
                  <p className='text-white text-[15px] font-bold leading-none mb-0.5' style={{ fontFamily: 'League Spartan, sans-serif' }}>{agency.stats[2]?.value ?? agency.stats[0].value}</p>
                  <p className='text-white/80 text-[10px] leading-snug'>{agency.stats[2]?.label ?? agency.stats[0].label}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Every System, Engineered — modular grid with connectors ── */}
      <section className='relative py-20 md:py-28 overflow-hidden' style={{ backgroundColor: '#fafafa' }}>
        <div className='max-w-7xl mx-auto px-6 md:px-12 relative'>
          <div ref={offeringsSection.ref}>
            <div className='text-center max-w-xl mx-auto mb-14' style={anim(offeringsSection.inView, 0)}>
              <h2 className='font-bold text-gray-900' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}>Every System, Engineered</h2>
            </div>

            <div className='relative max-w-4xl mx-auto'>
              <div className='hidden md:block absolute left-1/2 top-6 bottom-6 w-px -translate-x-1/2' style={{ backgroundColor: 'rgba(48,108,236,0.15)' }} />
              <div className='hidden md:block absolute top-1/2 left-6 right-6 h-px -translate-y-1/2' style={{ backgroundColor: 'rgba(48,108,236,0.15)' }} />
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 relative'>
                {agency.offerings.map((item, idx) => (
                  <div key={idx} className='relative bg-white rounded-2xl border border-gray-100 p-7' style={{ boxShadow: '0 8px 24px rgba(15,23,42,0.06)', ...anim(offeringsSection.inView, 0.08 + idx * 0.08) }}>
                    <span className='absolute top-6 right-7 text-[11px]' style={{ color: 'rgba(48,108,236,0.4)', fontFamily: 'monospace' }}>0{idx + 1}</span>
                    <div className='w-12 h-12 rounded-lg flex items-center justify-center mb-5' style={{ backgroundColor: 'rgba(48,108,236,0.08)', color: ACCENT }}>
                      <div className='[&>svg]:w-6 [&>svg]:h-6'>{item.icon}</div>
                    </div>
                    <h3 className='font-bold text-gray-900 text-[17px] mb-2' style={{ fontFamily: 'League Spartan, sans-serif' }}>{item.title}</h3>
                    <p className='text-gray-600 text-[13px] leading-relaxed'>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Approach — build pipeline ── */}
      <section className='py-20 md:py-28' style={{ backgroundColor: '#fafafa' }}>
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <div ref={approachSection.ref}>
            <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16'>
              <div>
                <h2 className='font-bold text-gray-900' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', ...anim(approachSection.inView, 0) }}>Our Approach</h2>
              </div>
              <div style={anim(approachSection.inView, 0.1)}>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className='inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 hover:shadow-md hover:shadow-blue-500/20'
                  style={{ backgroundColor: ACCENT, fontFamily: 'DM Sans, sans-serif' }}
                >
                  Book a Session
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </button>
              </div>
            </div>

            <div className='hidden md:flex items-stretch gap-2'>
              {agency.steps.map((step, idx) => (
                <Fragment key={idx}>
                  <div className='flex-1 rounded-xl border border-gray-100 bg-white p-5' style={anim(approachSection.inView, 0.12 + idx * 0.08)}>
                    <span className='inline-flex w-7 h-7 rounded-md items-center justify-center text-white text-[11px] font-bold mb-4' style={{ backgroundColor: ACCENT }}>{step.num}</span>
                    <h3 className='text-[13px] font-bold text-gray-900 mb-1.5 leading-snug' style={{ fontFamily: 'League Spartan, sans-serif' }}>{step.title}</h3>
                    <p className='text-gray-600 text-[11px] leading-relaxed'>{step.desc}</p>
                  </div>
                  {idx < agency.steps.length - 1 && (
                    <div className='flex items-center justify-center flex-shrink-0' style={{ width: '20px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="rgba(48,108,236,0.35)" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  )}
                </Fragment>
              ))}
            </div>

            <div className='md:hidden space-y-3'>
              {agency.steps.map((step, idx) => (
                <div key={idx}>
                  <div className='flex gap-4 rounded-xl p-5 border border-gray-100 bg-white' style={anim(approachSection.inView, 0.1 + idx * 0.06)}>
                    <div className='w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0' style={{ backgroundColor: ACCENT }}>
                      <span className='text-white text-[11px] font-bold' style={{ fontFamily: 'League Spartan, sans-serif' }}>{step.num}</span>
                    </div>
                    <div>
                      <h3 className='text-[14px] font-bold text-gray-900 mb-1' style={{ fontFamily: 'League Spartan, sans-serif' }}>{step.title}</h3>
                      <p className='text-gray-600 text-[13px] leading-relaxed'>{step.desc}</p>
                    </div>
                  </div>
                  {idx < agency.steps.length - 1 && (
                    <div className='flex justify-center py-1'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="rgba(48,108,236,0.35)" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA — full-bleed photo close ── */}
      <section className='relative py-28 md:py-36 overflow-hidden' style={{ backgroundImage: `url(${agency.overviewImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className='absolute inset-0' style={{ background: 'linear-gradient(180deg, rgba(8,10,20,0.75) 0%, rgba(8,10,20,0.9) 100%)' }} />
        <div className='max-w-3xl mx-auto px-6 md:px-12 text-center relative'>
          <div ref={ctaSection.ref}>
            <p className='text-xs font-bold tracking-[0.25em] uppercase mb-5' style={{ color: '#7ea6f5', fontFamily: 'monospace', ...anim(ctaSection.inView, 0) }}>
              {'> '}{agency.calloutTitle}
            </p>
            <h2 className='font-bold text-white leading-[1.1] mb-6' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', ...anim(ctaSection.inView, 0.08) }}>
              {agency.calloutDesc}
            </h2>
            <div className='flex flex-wrap justify-center gap-4 mt-4' style={anim(ctaSection.inView, 0.16)}>
              <button
                onClick={() => setIsBookingOpen(true)}
                className='inline-flex items-center gap-2.5 text-white px-7 py-3.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/20'
                style={{ backgroundColor: ACCENT, fontFamily: 'DM Sans, sans-serif' }}
              >
                Book a Session
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
              </button>
              <Link
                href='/agencies'
                className='inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white border border-white/30 hover:bg-white/10 transition-all'
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Explore Other Agencies
              </Link>
            </div>
          </div>
        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} defaultService={agency.slug} calendlyUrl={agency.calendlyUrl} />
    </main>
  );
}

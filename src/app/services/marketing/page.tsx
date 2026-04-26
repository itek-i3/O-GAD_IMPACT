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

export default function MarketingPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const overviewSection = useInView();
  const offeringsSection = useInView();
  const approachSection = useInView();

  const offerings = [
    {
      title: 'Go-to-Market Strategy',
      desc: 'Comprehensive market entry and expansion strategies that identify target customers and competitive positioning.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
    },
    {
      title: 'Brand Positioning',
      desc: 'Clear brand strategy that differentiates your offering and resonates deeply with your target market.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-6.75c-.622 0-1.125.504-1.125 1.125V18.75m9 0h-9M10.5 6.375a.75.75 0 0 1-.563-.257 4.5 4.5 0 0 1-.375-.468 6.75 6.75 0 0 1-1.313-4.022l.002-.042C8.25 1.348 10.153.75 12 .75s3.75.598 3.75 1.836v.028A6.75 6.75 0 0 1 14.437 6.65a4.5 4.5 0 0 1-.375.468.75.75 0 0 1-.562.257H10.5Z" />
        </svg>
      ),
    },
    {
      title: 'Sales Process Optimization',
      desc: 'Sales strategy, process design, and team enablement to improve conversion rates and deal velocity.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
      ),
    },
    {
      title: 'Growth Marketing Programs',
      desc: 'Marketing campaigns and programs designed to acquire, convert, and retain customers profitably at scale.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Z" />
        </svg>
      ),
    },
  ];

  const steps = [
    { num: '01', title: 'Market & Customer Analysis', desc: 'We deeply understand your target market, customer needs, buying behaviors, and the competitive landscape you operate in.' },
    { num: '02', title: 'Brand & Positioning Strategy', desc: 'We develop positioning and branding that sets you apart from competitors and resonates powerfully with customers.' },
    { num: '03', title: 'Go-to-Market Planning', desc: 'We create comprehensive go-to-market plans spanning product, pricing, distribution, and promotion channels.' },
    { num: '04', title: 'Channel Optimization', desc: 'We identify the optimal customer acquisition channels for your business and optimize each for maximum efficiency.' },
    { num: '05', title: 'Execution & Measurement', desc: 'We oversee execution and establish robust metrics to measure marketing effectiveness and return on investment.' },
  ];

  const stats = [
    { value: '3x', label: 'Avg Revenue Growth' },
    { value: '80+', label: 'Campaigns Launched' },
    { value: '95%', label: 'Client Retention' },
  ];

  return (
    <main className='min-h-screen bg-white'>

      {/* ── Hero ── */}
      <section
        className='relative min-h-[78vh] flex items-end overflow-hidden'
        style={{ backgroundImage: 'url(/images/_DSC2948.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
      >
        <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20' />
        <div className='absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent' />
        <div className='relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-28 pb-16'>
          <div className='flex items-center gap-2 text-[12px] font-medium mb-10' style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'DM Sans, sans-serif' }}>
            <Link href='/' className='hover:text-white/70 transition-colors'>Home</Link>
            <span>/</span>
            <Link href='/services' className='hover:text-white/70 transition-colors'>Services</Link>
            <span>/</span>
            <span style={{ color: 'rgba(255,255,255,0.75)' }}>Marketing & Growth</span>
          </div>
          <div className='flex items-end gap-10'>
            <div className='max-w-2xl'>
              <p className='text-[11px] font-bold tracking-[0.25em] uppercase mb-4' style={{ color: '#306CEC', fontFamily: 'DM Sans, sans-serif', opacity: 0, animation: 'slideInUp 0.5s ease-out 0.1s both' }}>Service Area</p>
              <h1 className='font-bold text-white leading-[1.05] mb-5' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', opacity: 0, animation: 'slideInUp 0.55s ease-out 0.2s both' }}>
                Marketing, Sales & Growth Advisory
              </h1>
              <p className='text-base md:text-lg leading-relaxed mb-8' style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'DM Sans, sans-serif', maxWidth: '480px', opacity: 0, animation: 'slideInUp 0.55s ease-out 0.3s both' }}>
                Build a powerful engine for customer acquisition, conversion, and sustainable revenue growth.
              </p>
              <div style={{ opacity: 0, animation: 'slideInUp 0.55s ease-out 0.4s both' }}>
                <button onClick={() => setIsBookingOpen(true)} className='text-white px-7 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90' style={{ backgroundColor: '#306CEC', fontFamily: 'DM Sans, sans-serif' }}>
                  Book a Session
                </button>
              </div>
            </div>
            <div className='hidden md:flex w-32 h-32 rounded-3xl flex-shrink-0 items-center justify-center mb-1' style={{ backgroundColor: 'rgba(48,108,236,0.15)', border: '1px solid rgba(48,108,236,0.3)', opacity: 0, animation: 'fadeIn 0.8s ease-out 0.5s both' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#306CEC" className="w-14 h-14">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38a.75.75 0 0 1-1.021-.27 18.632 18.632 0 0 1-2.414-6.404m5.57 0c-.823-.07-1.639-.178-2.439-.321m2.44.321c.68-.06 1.353-.09 2.033-.09h.376c.508 0 .97-.318 1.079-.814a4.49 4.49 0 0 0-.218-2.577 4.501 4.501 0 0 0-2.658-2.658 4.49 4.49 0 0 0-2.577-.218c-.496.11-.814.571-.814 1.079v.376c0 .68-.03 1.353-.09 2.033m0 2.44-.008.119c-.003.07-.009.14-.017.21a18.649 18.649 0 0 1-2.414 6.404.75.75 0 0 1-1.021.27l-.657-.38c-.524-.301-.71-.96-.463-1.511.382-.891.713-1.821.985-2.783" />
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
                Growth Through <br /><span style={{ color: '#306CEC' }}>Strategic Marketing</span>
              </h2>
              <p className='text-[17px] text-gray-600 leading-relaxed mb-3' style={{ fontFamily: 'DM Sans, sans-serif', ...anim(overviewSection.inView, 0.2) }}>
                Revenue growth requires more than great products — it requires a comprehensive go-to-market strategy. We help organizations find, convert, and retain customers profitably.
              </p>
              <p className='text-[17px] text-gray-600 leading-relaxed mb-7' style={{ fontFamily: 'DM Sans, sans-serif', ...anim(overviewSection.inView, 0.25) }}>
                From brand positioning to sales enablement to growth marketing programs, we build the revenue engine your business needs to scale and sustain momentum.
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
                  src='/images/_DSC2917.jpg'
                  alt='Marketing, Sales & Growth'
                  className='w-full h-[400px] object-cover hover:scale-[1.03] transition-transform duration-700'
                />
              </div>
              <div className='absolute -bottom-5 -left-5 p-5 rounded-2xl shadow-2xl max-w-[240px]' style={{ backgroundColor: '#306CEC' }}>
                <div className='flex items-center gap-2 mb-2'>
                  <div className='w-6 h-6 rounded-lg flex items-center justify-center' style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" /></svg>
                  </div>
                  <p className='text-white font-bold text-sm' style={{ fontFamily: 'League Spartan, sans-serif' }}>Revenue-Driven Growth</p>
                </div>
                <p className='text-white/90 text-xs leading-relaxed' style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Connecting your brand to customers who need exactly what you offer.
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
              Four core areas designed to build and scale your revenue engine.
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

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} defaultService="marketing" />
    </main>
  );
}

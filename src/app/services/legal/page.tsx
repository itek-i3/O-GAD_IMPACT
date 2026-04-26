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

export default function LegalPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const overviewSection = useInView();
  const offeringsSection = useInView();
  const approachSection = useInView();

  const offerings = [
    {
      title: 'Business Entity Setup',
      desc: 'Proper structuring of your business entity across different jurisdictions with tax optimization in mind.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      ),
    },
    {
      title: 'Corporate Governance',
      desc: 'Governance frameworks and policies that protect the business while enabling growth and sound decision-making.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
      ),
    },
    {
      title: 'Contract Review & Drafting',
      desc: 'Review and creation of key commercial contracts that protect your interests and enable smooth operations.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
        </svg>
      ),
    },
    {
      title: 'Regulatory Compliance',
      desc: 'Guidance on regulatory requirements across different jurisdictions and industries to keep you fully compliant.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
      ),
    },
  ];

  const steps = [
    { num: '01', title: 'Current Structure Review', desc: 'We assess your current legal and corporate structure and identify areas of risk, inefficiency, or potential improvement.' },
    { num: '02', title: 'Jurisdictional Analysis', desc: 'We identify requirements across all jurisdictions where you operate or plan to expand, surfacing hidden obligations.' },
    { num: '03', title: 'Restructuring Plan', desc: 'We develop a clear plan for restructuring your entity and governance to optimize for growth and compliance.' },
    { num: '04', title: 'Implementation Support', desc: 'We oversee the execution of restructuring with minimal operational disruption to your day-to-day business.' },
    { num: '05', title: 'Ongoing Compliance', desc: 'We establish systems and processes for continuous compliance monitoring and proactive regulatory reporting.' },
  ];

  const stats = [
    { value: '20+', label: 'Jurisdictions Covered' },
    { value: '500+', label: 'Contracts Reviewed' },
    { value: '100%', label: 'Compliance Rate' },
  ];

  return (
    <main className='min-h-screen bg-white'>

      {/* ── Hero ── */}
      <section
        className='relative min-h-[78vh] flex items-end overflow-hidden'
        style={{ backgroundImage: "url('/images/_DSC0150.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
      >
        <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20' />
        <div className='absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent' />
        <div className='relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-28 pb-16'>
          <div className='flex items-center gap-2 text-[12px] font-medium mb-10' style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'DM Sans, sans-serif' }}>
            <Link href='/' className='hover:text-white/70 transition-colors'>Home</Link>
            <span>/</span>
            <Link href='/services' className='hover:text-white/70 transition-colors'>Services</Link>
            <span>/</span>
            <span style={{ color: 'rgba(255,255,255,0.75)' }}>Legal & Structuring</span>
          </div>
          <div className='flex items-end gap-10'>
            <div className='max-w-2xl'>
              <p className='text-[11px] font-bold tracking-[0.25em] uppercase mb-4' style={{ color: '#306CEC', fontFamily: 'DM Sans, sans-serif', opacity: 0, animation: 'slideInUp 0.5s ease-out 0.1s both' }}>Service Area</p>
              <h1 className='font-bold text-white leading-[1.05] mb-5' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', opacity: 0, animation: 'slideInUp 0.55s ease-out 0.2s both' }}>
                Legal & Business Structuring
              </h1>
              <p className='text-base md:text-lg leading-relaxed mb-8' style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'DM Sans, sans-serif', maxWidth: '480px', opacity: 0, animation: 'slideInUp 0.55s ease-out 0.3s both' }}>
                Ensure your business is properly structured for growth while maintaining legal and regulatory compliance.
              </p>
              <div style={{ opacity: 0, animation: 'slideInUp 0.55s ease-out 0.4s both' }}>
                <button onClick={() => setIsBookingOpen(true)} className='text-white px-7 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90' style={{ backgroundColor: '#306CEC', fontFamily: 'DM Sans, sans-serif' }}>
                  Book a Session
                </button>
              </div>
            </div>
            <div className='hidden md:flex w-32 h-32 rounded-3xl flex-shrink-0 items-center justify-center mb-1' style={{ backgroundColor: 'rgba(48,108,236,0.15)', border: '1px solid rgba(48,108,236,0.3)', opacity: 0, animation: 'fadeIn 0.8s ease-out 0.5s both' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#306CEC" className="w-14 h-14">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
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
                Compliance Meets <br /><span style={{ color: '#306CEC' }}>Growth</span>
              </h2>
              <p className='text-[17px] text-gray-600 leading-relaxed mb-3' style={{ fontFamily: 'DM Sans, sans-serif', ...anim(overviewSection.inView, 0.2) }}>
                Legal and regulatory compliance shouldn't be a constraint on growth — it should be a foundation for it. We bridge the gap between legal protection and business strategy.
              </p>
              <p className='text-[17px] text-gray-600 leading-relaxed mb-7' style={{ fontFamily: 'DM Sans, sans-serif', ...anim(overviewSection.inView, 0.25) }}>
                From entity setup to multi-jurisdictional governance, we ensure your organization is legally sound and agile enough to scale confidently into new markets.
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
                  src="/images/_DSC9926.jpg"
                  alt='Legal & Business Structuring'
                  className='w-full h-[400px] object-cover hover:scale-[1.03] transition-transform duration-700'
                />
              </div>
              <div className='absolute -bottom-5 -left-5 p-5 rounded-2xl shadow-2xl max-w-[240px]' style={{ backgroundColor: '#306CEC' }}>
                <div className='flex items-center gap-2 mb-2'>
                  <div className='w-6 h-6 rounded-lg flex items-center justify-center' style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
                  </div>
                  <p className='text-white font-bold text-sm' style={{ fontFamily: 'League Spartan, sans-serif' }}>Built for Compliance</p>
                </div>
                <p className='text-white/90 text-xs leading-relaxed' style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Structuring your business to withstand scrutiny and scale with confidence.
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
              Four core areas designed to protect your business and enable confident growth.
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

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} defaultService="legal" />
    </main>
  );
}

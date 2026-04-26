'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function useInView(threshold = 0.12) {
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

export default function AboutSection() {

  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const introSection = useInView();
  const servicesSection = useInView();
  const processSection = useInView();

  const services = [
    {
      title: 'Business & Strategy Consultancy',
      desc: 'We help organizations define clarity, direction, and execution plans that deliver real results.',
      href: '/services/business-strategy',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
        </svg>
      )
    },
    {
      title: 'Technology & Digital Transformation',
      desc: 'We integrate technology as a core growth and efficiency driver across your organization.',
      href: '/services/technology',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
        </svg>
      )
    },
    {
      title: 'Legal & Business Structuring',
      desc: 'We bridge the gap between legal compliance and business growth with strategic counsel.',
      href: '/services/legal',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
        </svg>
      )
    },
    {
      title: 'Marketing, Sales & Growth Advisory',
      desc: 'We help organizations find, convert, and retain customers with proven growth strategies.',
      href: '/services/marketing',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
        </svg>
      )
    },
    {
      title: 'Scaling & Expansion Support',
      desc: 'We prepare businesses for sustainable regional and market expansion across Africa.',
      href: '/services/scaling',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        </svg>
      )
    }
  ];

  const steps = [
    { number: '01', title: 'Diagnose', desc: 'We assess the real problem, not just the symptoms.' },
    { number: '02', title: 'Design', desc: 'We co-create solutions tailored to context and capacity.' },
    { number: '03', title: 'Build', desc: 'We implement the systems, structures, and tools.' },
    { number: '04', title: 'Execute', desc: 'We support rollout, adoption, and optimization.' },
    { number: '05', title: 'Scale', desc: 'We prepare organizations for sustainable growth.' }
  ];

  const stats = [
    { number: '200+', label: 'Clients Served' },
    { number: '10+', label: 'Years Experience' },
    { number: '5', label: 'Service Areas' },
    { number: 'Pan-Africa', label: 'Reach & Impact' }
  ];

  return (
    <section id='our-company' className='bg-white'>

      {/* ── Company Intro ── */}
      <div className='pt-24 md:pt-32 pb-20 md:pb-28'>
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <div ref={introSection.ref}>

            <span className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase mb-8' style={{ color: '#306CEC', backgroundColor: 'rgba(48,108,236,0.08)', fontFamily: 'DM Sans, sans-serif', ...anim(introSection.inView, 0) }}>
              <span className='w-1.5 h-1.5 rounded-full' style={{ backgroundColor: '#306CEC' }} />
              Who We Are
            </span>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16'>
              {/* Left — headline + body text */}
              <div>
                <h2 className='font-bold text-gray-900 leading-[1.05] mb-8' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', ...anim(introSection.inView, 0.08) }}>
                  We design, build, and implement — not just advise.
                </h2>
                <p className='text-[17px] text-gray-600 leading-relaxed mb-6' style={{ fontFamily: 'DM Sans, sans-serif', ...anim(introSection.inView, 0.14) }}>
                  The O'Gad Impact Group is a multidisciplinary consultancy firm focused on building sustainable businesses, future-ready organizations, and high-impact entrepreneurial ecosystems across Africa.
                </p>
                <p className='text-[17px] text-gray-600 leading-relaxed' style={{ fontFamily: 'DM Sans, sans-serif', ...anim(introSection.inView, 0.18) }}>
                  We work at the intersection of strategy, technology, law, and growth — helping founders, institutions, and enterprises move from ideas to execution, and from growth to scale.
                </p>
              </div>

              {/* Right — image */}
              <div style={anim(introSection.inView, 0.22)}>
                <div className='rounded-3xl overflow-hidden shadow-2xl'>
                  <Image
                    src='/images/our-company.jpg'
                    alt='Our Company'
                    width={640}
                    height={420}
                    className='w-full h-80 object-cover hover:scale-[1.03] transition-transform duration-700'
                    unoptimized
                  />
                </div>
              </div>
            </div>

            {/* Stats bar */}
            <div className='grid grid-cols-2 md:grid-cols-4 rounded-3xl overflow-hidden border border-gray-100' style={{ backgroundColor: '#f0f5ff' }}>
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`py-8 px-6 flex flex-col items-center text-center ${idx < stats.length - 1 ? 'border-r border-blue-100' : ''}`}
                  style={anim(introSection.inView, 0.28 + idx * 0.06)}
                >
                  <div className='text-3xl md:text-4xl font-bold mb-1' style={{ color: '#306CEC', fontFamily: 'League Spartan, sans-serif' }}>
                    {stat.number}
                  </div>
                  <div className='text-sm text-gray-500 font-medium leading-snug' style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Services ── */}
      <div className='py-20 md:py-28' style={{ backgroundColor: '#f0f5ff' }}>
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <div ref={servicesSection.ref}>

            <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12'>
              <div>
                <span className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase mb-5' style={{ color: '#306CEC', backgroundColor: 'rgba(48,108,236,0.1)', fontFamily: 'DM Sans, sans-serif', ...anim(servicesSection.inView, 0) }}>
                  <span className='w-1.5 h-1.5 rounded-full' style={{ backgroundColor: '#306CEC' }} />
                  What We Do
                </span>
                <h2 className='font-bold text-gray-900' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', ...anim(servicesSection.inView, 0.08) }}>
                  Our Services
                </h2>
              </div>
              <Link
                href='/services'
                className='inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3'
                style={{ color: '#306CEC', fontFamily: 'DM Sans, sans-serif', ...anim(servicesSection.inView, 0.12) }}
              >
                View All Services
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                </svg>
              </Link>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {services.map((service, idx) => (
                <Link key={idx} href={service.href} className='block'>
                  <div
                    className='group p-7 rounded-2xl bg-white border border-gray-100 hover:border-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full min-h-[200px] flex flex-col cursor-pointer'
                    style={anim(servicesSection.inView, 0.1 + idx * 0.07)}
                    onMouseEnter={() => setHoveredService(idx)}
                    onMouseLeave={() => setHoveredService(null)}
                  >
                    <div className='w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300' style={{ backgroundColor: hoveredService === idx ? 'rgba(48,108,236,0.15)' : 'rgba(48,108,236,0.08)', color: '#306CEC' }}>
                      {service.icon}
                    </div>
                    <h3 className='text-[16px] font-bold text-gray-900 mb-2.5 leading-snug flex-1' style={{ fontFamily: 'League Spartan, sans-serif' }}>
                      {service.title}
                    </h3>
                    <p className='text-sm text-gray-600 leading-relaxed mb-4' style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {service.desc}
                    </p>
                    <span className='inline-flex items-center gap-2 text-[12px] font-bold tracking-widest uppercase transition-all group-hover:gap-3 duration-300' style={{ color: hoveredService === idx ? '#306CEC' : 'rgba(48,108,236,0.4)', fontFamily: 'DM Sans, sans-serif' }}>
                      Explore
                      <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── How We Work ── */}
      <div className='bg-white py-20 md:py-28'>
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <div ref={processSection.ref}>

            <div className='mb-14 flex flex-col md:flex-row md:items-end gap-6 md:gap-16'>
              <div>
                <span className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase mb-5' style={{ color: '#306CEC', backgroundColor: 'rgba(48,108,236,0.08)', fontFamily: 'DM Sans, sans-serif', ...anim(processSection.inView, 0) }}>
                  <span className='w-1.5 h-1.5 rounded-full' style={{ backgroundColor: '#306CEC' }} />
                  Our Process
                </span>
                <h2 className='font-bold text-gray-900' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', ...anim(processSection.inView, 0.08) }}>
                  How We Work
                </h2>
              </div>
              <p className='text-[17px] text-gray-600 max-w-sm leading-relaxed' style={{ fontFamily: 'DM Sans, sans-serif', ...anim(processSection.inView, 0.14) }}>
                Our approach is practical, collaborative, and execution-focused at every stage.
              </p>
            </div>

            {/* Steps */}
            <div className='relative'>
              <div className='hidden md:block absolute h-px top-7' style={{ left: '2rem', right: '2rem', zIndex: 0, backgroundColor: 'rgba(48,108,236,0.15)' }} />
              <div className='grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4'>
                {steps.map((step, idx) => (
                  <div key={idx} className='relative flex md:flex-col items-start gap-5 md:gap-0' style={anim(processSection.inView, 0.12 + idx * 0.08)}>
                    <div className='relative z-10 flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center md:mb-6 border-4 border-white shadow-md' style={{ backgroundColor: '#306CEC' }}>
                      <span className='text-white text-[13px] font-bold' style={{ fontFamily: 'League Spartan, sans-serif' }}>
                        {step.number}
                      </span>
                    </div>
                    <div>
                      <h3 className='text-[17px] font-bold text-gray-900 mb-1.5' style={{ fontFamily: 'League Spartan, sans-serif' }}>
                        {step.title}
                      </h3>
                      <p className='text-sm text-gray-600 leading-relaxed' style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { agencies } from '@/data/agencies';

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

const layers = [
  {
    tag: '01',
    title: 'Impact360',
    subtitle: 'The Ecosystem & Decentralization Engine',
    desc: "The entry point into the TOIG ecosystem. Impact360 decentralizes access to opportunity, reaching entrepreneurs and businesses beyond traditional hubs.",
  },
  {
    tag: '02',
    title: 'TOIG Agencies',
    subtitle: 'The Execution Infrastructure',
    desc: 'Six specialized agencies give businesses the capabilities to build, strengthen, and scale — across growth, technology, media, events, and capital.',
  },
  {
    tag: '03',
    title: 'Platform Infrastructure',
    subtitle: 'The Future Layer',
    desc: 'As the ecosystem grows, TOIG is building shared infrastructure — operating systems, data intelligence, and capital networks businesses can depend on.',
  },
];

const shifts = [
  { from: 'Consulting', to: 'Execution', desc: 'We\'re moving beyond advice to actively building and operating the systems businesses need.' },
  { from: 'Programs', to: 'Infrastructure', desc: 'We\'re moving beyond short-term initiatives to long-term platforms businesses can depend on.' },
  { from: 'Supporting Entrepreneurs', to: 'Powering Businesses', desc: 'We\'re shifting from helping founders learn and connect to providing the infrastructure that lets them grow.' },
  { from: 'One-Time Engagements', to: 'Long-Term Partnerships', desc: 'We build recurring relationships, becoming an integrated growth partner throughout a business’s journey.' },
  { from: 'Individual Services', to: 'Integrated Business Systems', desc: 'Our agencies work as one ecosystem, giving businesses the full range of capabilities they need to grow.' },
];

const advantageGaps = [
  'Strong systems',
  'Operational discipline',
  'Technology adoption',
  'Market access',
  'Strategic support',
  'Growth capital',
];

const steps = [
  { number: '01', title: 'Diagnose', desc: 'We assess the real problem, not just the symptoms.' },
  { number: '02', title: 'Design', desc: 'We co-create solutions tailored to context and capacity.' },
  { number: '03', title: 'Build', desc: 'We implement the systems, structures, and tools.' },
  { number: '04', title: 'Execute', desc: 'We support rollout, adoption, and optimization.' },
  { number: '05', title: 'Scale', desc: 'We prepare organizations for sustainable growth.' }
];

const stats = [
  { number: '200+', label: 'Businesses Served' },
  { number: '6', label: 'Specialized Agencies' },
  { number: '10+', label: 'Years Experience' },
  { number: 'Pan-Africa', label: 'Reach & Impact' },
];

export default function AboutSection() {

  const [hoveredAgency, setHoveredAgency] = useState<number | null>(null);
  const introSection = useInView();
  const layersSection = useInView();
  const agenciesSection = useInView();
  const shiftSection = useInView();
  const advantageSection = useInView();
  const processSection = useInView();

  return (
    <section id='our-company' className='bg-white'>

      {/* ── Company Intro ── */}
      <div className='pt-24 md:pt-32 pb-20 md:pb-28'>
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <div ref={introSection.ref}>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16'>
              {/* Left — headline + body text */}
              <div>
                <h2 className='font-bold text-gray-900 leading-[1.05] mb-8' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', ...anim(introSection.inView, 0.08) }}>
                  We don&apos;t advise. We build infrastructure.
                </h2>
                <p className='text-[17px] text-gray-600 leading-relaxed mb-6' style={{ fontFamily: 'DM Sans, sans-serif', ...anim(introSection.inView, 0.14) }}>
                  The O&apos;GAD Impact Group (TOIG) is a business infrastructure company. We build what African businesses need to start, scale, and compete globally.
                </p>
                <p className='text-[17px] text-gray-600 leading-relaxed' style={{ fontFamily: 'DM Sans, sans-serif', ...anim(introSection.inView, 0.18) }}>
                  African businesses don&apos;t lack ideas or ambition. They lack reliable infrastructure to execute and grow. TOIG builds that infrastructure.
                </p>
              </div>

              {/* Right — offset photo collage with a connecting frame accent, CSPLUS-style */}
              <div style={anim(introSection.inView, 0.22)} className='relative pb-8 pr-6 pt-2'>
                {/* Decorative offset frame — purely decorative, sits behind the photos to echo a connected collage */}
                <div className='hidden md:block absolute -top-4 -right-2 w-2/3 h-3/5 rounded-3xl pointer-events-none' style={{ border: '2px solid rgba(48,108,236,0.3)' }} />

                <div className='relative grid grid-cols-3 gap-4'>
                  <div className='col-span-2 rounded-2xl overflow-hidden shadow-xl'>
                    <Image
                      src='/photo/S43A0049.jpg'
                      alt='Our Company'
                      width={480}
                      height={320}
                      className='w-full h-56 object-cover hover:scale-105 transition-transform duration-700'
                      unoptimized
                    />
                  </div>
                  <div className='rounded-2xl overflow-hidden shadow-xl' style={{ marginTop: '2.5rem' }}>
                    <Image
                      src='/photo/S43A9154.jpg'
                      alt='Our Company'
                      width={220}
                      height={320}
                      className='w-full h-44 object-cover hover:scale-105 transition-transform duration-700'
                      unoptimized
                    />
                  </div>
                  <div className='col-span-3 rounded-2xl overflow-hidden shadow-xl'>
                    <Image
                      src='/photo/S43A9091.jpg'
                      alt='Our Company'
                      width={640}
                      height={220}
                      className='w-full h-36 object-cover hover:scale-105 transition-transform duration-700'
                      unoptimized
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Stats bar — connected strip, not individual cards */}
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

      {/* ── Vision, Mission & Strategic Shift ── */}
      <div className='py-20 md:py-28 bg-white'>
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <div ref={shiftSection.ref}>

            <div className='text-center max-w-2xl mx-auto mb-10' style={anim(shiftSection.inView, 0)}>
              <h3 className='font-bold text-gray-900' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}>Our Strategic Shift</h3>
              <p className='text-gray-500 mt-3' style={{ fontFamily: 'DM Sans, sans-serif' }}>
                TOIG is evolving from a business support organization into a business infrastructure company. Africa&apos;s next phase of growth will come from systems that let businesses survive, scale, and compete.
              </p>
            </div>

            <div className='relative mb-16'>
              <div className='hidden lg:block absolute h-px' style={{ left: '10%', right: '10%', top: '48px', backgroundColor: '#e5e7eb', zIndex: 0 }} />
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative'>
                {shifts.map((shift, idx) => (
                  <div
                    key={idx}
                    className='group rounded-2xl p-6 border border-gray-100 hover:border-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center bg-white'
                    style={anim(shiftSection.inView, 0.06 + idx * 0.07)}
                  >
                    <div
                      className='w-9 h-9 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm transition-colors duration-300'
                      style={{ backgroundColor: '#306CEC' }}
                    >
                      <span className='text-white text-xs font-bold' style={{ fontFamily: 'League Spartan, sans-serif' }}>0{idx + 1}</span>
                    </div>
                    <p className='text-sm font-bold text-gray-900 mb-2 transition-colors group-hover:text-[#306CEC]' style={{ fontFamily: 'DM Sans, sans-serif' }}>{shift.to}</p>
                    <p className='text-xs text-gray-500 leading-relaxed' style={{ fontFamily: 'DM Sans, sans-serif' }}>{shift.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
              <div className='rounded-3xl p-8 md:p-10 border border-gray-100' style={{ backgroundColor: '#fafafa', ...anim(shiftSection.inView, 0.44) }}>
                <div className='w-10 h-10 rounded-xl flex items-center justify-center mb-5' style={{ backgroundColor: 'rgba(48,108,236,0.08)', color: '#306CEC' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </div>
                <span className='inline-block text-[11px] font-bold tracking-[0.2em] uppercase mb-4' style={{ color: '#306CEC' }}>Our Vision</span>
                <p className='text-xl md:text-2xl font-bold text-gray-900 leading-snug' style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  To become Africa&apos;s leading business infrastructure company.
                </p>
              </div>
              <div className='rounded-3xl p-8 md:p-10' style={{ backgroundColor: '#306CEC', ...anim(shiftSection.inView, 0.5) }}>
                <div className='w-10 h-10 rounded-xl flex items-center justify-center mb-5' style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                  </svg>
                </div>
                <span className='inline-block text-[11px] font-bold tracking-[0.2em] uppercase mb-4 text-white/70'>Our Mission</span>
                <p className='text-xl md:text-2xl font-bold text-white leading-snug' style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  To power African businesses through technology, execution, and capital.
                </p>
              </div>
              <div className='rounded-3xl p-8 md:p-10 border border-gray-100' style={{ backgroundColor: '#fafafa', ...anim(shiftSection.inView, 0.56) }}>
                <div className='w-10 h-10 rounded-xl flex items-center justify-center mb-5' style={{ backgroundColor: 'rgba(48,108,236,0.08)', color: '#306CEC' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                </div>
                <span className='inline-block text-[11px] font-bold tracking-[0.2em] uppercase mb-4' style={{ color: '#306CEC' }}>Our Core Mandate</span>
                <p className='text-xl md:text-2xl font-bold text-gray-900 leading-snug' style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  To take African businesses from ideas to scalable enterprises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Three-Layer Architecture ── */}
      <div className='py-20 md:py-28' style={{ backgroundColor: '#f0f5ff' }}>
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <div ref={layersSection.ref}>
            <div className='text-center max-w-2xl mx-auto mb-14'>
              <h2 className='font-bold text-gray-900' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', ...anim(layersSection.inView, 0) }}>
                Our Strategic Architecture
              </h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 pb-3'>
              {layers.map((layer, idx) => (
                <div key={idx} className='relative' style={anim(layersSection.inView, 0.14 + idx * 0.1)}>
                  {/* Two static "ghost" sheets peeking out behind the card — purely decorative, no text,
                      so they're safe to overlap (unlike the card itself). Gives a literal stacked-layers feel. */}
                  <div className='absolute inset-0 rounded-3xl border border-gray-100' style={{ backgroundColor: '#e4ecfd', transform: 'translate(9px, 9px)' }} />
                  <div className='absolute inset-0 rounded-3xl border border-gray-100' style={{ backgroundColor: '#f2f6fe', transform: 'translate(4.5px, 4.5px)' }} />
                  <div className='relative bg-white rounded-3xl p-8 border border-gray-100 shadow-lg'>
                    <span className='text-4xl font-bold' style={{ color: 'rgba(48,108,236,0.15)', fontFamily: 'League Spartan, sans-serif' }}>{layer.tag}</span>
                    <h3 className='text-xl font-bold text-gray-900 mt-3 mb-1' style={{ fontFamily: 'League Spartan, sans-serif' }}>{layer.title}</h3>
                    <p className='text-[11px] font-bold tracking-widest uppercase mb-4' style={{ color: '#306CEC' }}>{layer.subtitle}</p>
                    <p className='text-gray-600 text-sm leading-relaxed' style={{ fontFamily: 'DM Sans, sans-serif' }}>{layer.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Our Agencies — same sidebar + grid arrangement as the /agencies page ── */}
      <div className='py-20 md:py-28 bg-white'>
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <div ref={agenciesSection.ref} className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-start'>

            <div className='lg:col-span-4 lg:sticky lg:top-32'>
              <h2 className='font-bold text-gray-900 mb-5' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', ...anim(agenciesSection.inView, 0) }}>
                Our Agencies
              </h2>
              <p className='text-gray-500 text-lg leading-relaxed mb-8' style={{ fontFamily: 'DM Sans, sans-serif', ...anim(agenciesSection.inView, 0.12) }}>
                Use one agency, or all of them together.
              </p>
              <Link
                href='/agencies'
                className='inline-flex items-center gap-2.5 text-white px-7 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/25'
                style={{ backgroundColor: '#306CEC', fontFamily: 'DM Sans, sans-serif', ...anim(agenciesSection.inView, 0.16) }}
              >
                View All Agencies
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                </svg>
              </Link>
            </div>

            {/* Same card design as the /agencies page, for consistency */}
            <div className='lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 items-start'>
              {agencies.map((agency, idx) => {
                const featured = idx === 2;
                return (
                  <Link
                    key={agency.slug}
                    href={`/agencies/${agency.slug}`}
                    className='group relative p-7 w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border flex flex-col'
                    style={{
                      backgroundColor: featured ? '#306CEC' : '#ffffff',
                      borderColor: featured ? '#306CEC' : (hoveredAgency === idx ? '#306CEC' : '#e5e7eb'),
                      borderRadius: '16px 48px 16px 48px',
                      ...anim(agenciesSection.inView, 0.1 + idx * 0.07),
                    }}
                    onMouseEnter={() => setHoveredAgency(idx)}
                    onMouseLeave={() => setHoveredAgency(null)}
                  >
                    <div className='w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 [&>svg]:w-6 [&>svg]:h-6' style={{
                      background: featured ? 'rgba(255,255,255,0.2)' : (hoveredAgency === idx ? '#306CEC' : 'rgba(48,108,236,0.08)'),
                      color: featured ? '#fff' : (hoveredAgency === idx ? '#fff' : '#306CEC'),
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
                      Explore
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── The TOIG Advantage ── */}
      <div className='py-20 md:py-28' style={{ backgroundColor: '#0a1120' }}>
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <div ref={advantageSection.ref} className='max-w-2xl mx-auto text-center'>
            <h2 className='font-bold text-white leading-[1.1] mb-6' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(2rem, 4.2vw, 3.2rem)', ...anim(advantageSection.inView, 0) }}>
              Most businesses don&apos;t fail because they lack potential.
            </h2>
            <p className='text-[17px] leading-relaxed mb-8' style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'DM Sans, sans-serif', ...anim(advantageSection.inView, 0.14) }}>
              They fail because they lack the capabilities to turn potential into a running business. TOIG brings those capabilities together.
            </p>
            <div className='grid grid-cols-2 gap-3 max-w-md mx-auto' style={anim(advantageSection.inView, 0.2)}>
              {advantageGaps.map((gap, idx) => (
                <div key={idx} className='flex items-center gap-3 rounded-xl px-4 py-3' style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <span className='w-1.5 h-1.5 rounded-full flex-shrink-0' style={{ backgroundColor: '#7ea6f5' }} />
                  <span className='text-sm text-white font-medium' style={{ fontFamily: 'DM Sans, sans-serif' }}>{gap}</span>
                </div>
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
                <h2 className='font-bold text-gray-900' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', ...anim(processSection.inView, 0) }}>
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
                    <span
                      className='hidden md:block absolute -top-3 right-0 text-7xl font-bold pointer-events-none select-none'
                      style={{ color: 'rgba(48,108,236,0.06)', fontFamily: 'League Spartan, sans-serif', zIndex: 0 }}
                    >
                      {step.number}
                    </span>
                    <div className='relative z-10 flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center md:mb-6 border-4 border-white shadow-md' style={{ backgroundColor: '#306CEC' }}>
                      <span className='text-white text-[13px] font-bold' style={{ fontFamily: 'League Spartan, sans-serif' }}>
                        {step.number}
                      </span>
                    </div>
                    <div className='relative z-10'>
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

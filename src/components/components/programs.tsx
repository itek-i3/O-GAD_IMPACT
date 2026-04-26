'use client';
import { useState, useRef, useEffect } from 'react';
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

const programs = [
  {
    tag: 'Incubation',
    title: 'Business Incubation Program',
    duration: 'Ongoing Cohorts',
    desc: 'We support founders from idea to execution — providing structured mentorship, business model validation, legal setup, and early-stage resources to turn concepts into viable, operating businesses. Designed to remove the barriers that stop great ideas from becoming great companies.',
    outcomes: ['Validated Business Model', 'Legal & Structure Setup', 'Mentor-Led Roadmap'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    tag: 'Acceleration',
    title: 'Startup Acceleration Track',
    duration: '12-Week Intensive',
    desc: 'A high-intensity acceleration program for early-stage ventures ready to scale. Participants receive investor readiness training, strategic growth coaching, access to a pan-African mentor network, and pathways to funding — all within a structured 12-week cohort.',
    outcomes: ['Investor Pitch Ready', 'Growth Strategy', 'Pan-Africa Network'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      </svg>
    ),
  },
  {
    tag: 'Decentralization',
    title: 'Decentralized Innovation Hubs',
    duration: 'Continent-Wide',
    desc: 'We believe world-class entrepreneurship resources should not be locked in a single city. Our decentralization initiative brings incubation support, bootcamps, and strategic programs directly to founders in underserved regions — breaking barriers and building ecosystems everywhere.',
    outcomes: ['Local Hub Access', 'Regional Ecosystems', 'Equal Opportunity'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    tag: 'Community',
    title: 'Events, Bootcamps & Meetups',
    duration: 'Year-Round',
    desc: 'We run targeted workshops, intensive bootcamps, and founder meetups that help innovators learn, connect, and grow. Each event is designed to deliver practical skills and real relationships — not just inspiration.',
    outcomes: ['Practical Workshops', 'Founder Community', 'Peer Learning'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
];

const stats = [
  { value: '500+', label: 'Program Participants' },
  { value: '18+', label: 'Countries Represented' },
  { value: '85%', label: 'Business Survival Rate' },
  { value: '4', label: 'Program Tracks' },
];

export default function ProgramsSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const headerSection = useInView();
  const cardsSection = useInView();
  const statsSection = useInView();

  return (
    <section id="programs" className="bg-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── Header ── */}
        <div ref={headerSection.ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-16">
          <div>
            <div className="flex items-center gap-4 mb-5" style={anim(headerSection.inView, 0)}>
              <Image
                src="/images/impact360-logo.png"
                alt="Impact360"
                width={52}
                height={52}
                className="rounded-full flex-shrink-0 shadow-md"
                unoptimized
              />
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: '#306CEC', backgroundColor: 'rgba(48,108,236,0.08)', fontFamily: 'DM Sans, sans-serif' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#306CEC' }} />
                The Impact360 Initiative
              </span>
            </div>
            <h2 className="font-bold text-gray-900 leading-[1.05]" style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', ...anim(headerSection.inView, 0.1) }}>
              Decentralizing Innovation <br /><span style={{ color: '#306CEC' }}>Across Africa</span>
            </h2>
          </div>
          <div>
            <p className="text-[17px] text-gray-600 leading-relaxed mb-6" style={{ fontFamily: 'DM Sans, sans-serif', ...anim(headerSection.inView, 0.15) }}>
              Impact360 is our pan-African initiative breaking barriers and bringing world-class incubation, acceleration, and entrepreneurship resources to every corner of the continent — empowering founders everywhere to build sustainable, scalable solutions.
            </p>
            <div style={anim(headerSection.inView, 0.22)}>
              <a
                href="https://www.impact360.africa/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-white px-7 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/25"
                style={{ backgroundColor: '#306CEC', fontFamily: 'DM Sans, sans-serif' }}
              >
                Visit Impact360 Africa
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ── Program Cards ── */}
        <div ref={cardsSection.ref} className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {programs.map((program, idx) => (
            <div
              key={idx}
              className="group rounded-3xl p-7 border border-gray-100 hover:border-blue-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              style={{ backgroundColor: hoveredCard === idx ? '#fafeff' : '#fafafa', ...anim(cardsSection.inView, 0.1 + idx * 0.08) }}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300" style={{ backgroundColor: hoveredCard === idx ? 'rgba(48,108,236,0.12)' : 'rgba(48,108,236,0.07)', color: '#306CEC' }}>
                  {program.icon}
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase" style={{ color: '#306CEC', backgroundColor: 'rgba(48,108,236,0.08)', fontFamily: 'DM Sans, sans-serif' }}>
                    {program.tag}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-gray-100 text-gray-500" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {program.duration}
                  </span>
                </div>
              </div>

              {/* Title + Description */}
              <h3 className="text-[20px] font-bold text-gray-900 mb-3 leading-snug" style={{ fontFamily: 'League Spartan, sans-serif' }}>{program.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5" style={{ fontFamily: 'DM Sans, sans-serif' }}>{program.desc}</p>

              {/* Outcomes */}
              <div className="flex flex-wrap gap-2 mb-5">
                {program.outcomes.map((outcome, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-600 px-3 py-1.5 rounded-xl bg-white border border-gray-100" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#306CEC' }} />
                    {outcome}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-1.5 text-[12px] font-bold tracking-widest uppercase transition-colors duration-300 mt-auto" style={{ color: hoveredCard === idx ? '#306CEC' : 'rgba(48,108,236,0.4)', fontFamily: 'DM Sans, sans-serif' }}>
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* ── Stats Bar ── */}
        <div ref={statsSection.ref} className="grid grid-cols-2 md:grid-cols-4 rounded-3xl overflow-hidden border border-gray-100" style={{ backgroundColor: '#f0f5ff' }}>
          {stats.map((s, i) => (
            <div
              key={i}
              className={`py-8 px-6 flex flex-col items-center text-center ${i < stats.length - 1 ? 'border-r border-blue-100' : ''}`}
              style={anim(statsSection.inView, 0.1 + i * 0.07)}
            >
              <p className="text-3xl md:text-4xl font-bold mb-1" style={{ color: '#306CEC', fontFamily: 'League Spartan, sans-serif' }}>{s.value}</p>
              <p className="text-sm text-gray-500 leading-snug" style={{ fontFamily: 'DM Sans, sans-serif' }}>{s.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

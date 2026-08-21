'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { members, type Member } from '@/data/members';

const ACCENT = '#306CEC';
const DUOTONE = 'url(#director-duotone)';

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

function DirectorRow({
  member,
  index,
  sectionRef,
}: {
  member: Member;
  index: number;
  sectionRef: (el: HTMLElement | null) => void;
}) {
  const isEven = index % 2 === 0;
  const number = String(index + 1).padStart(2, '0');
  const [inViewRef, inView] = useInView<HTMLDivElement>();

  return (
    <section
      id={`director-${member.slug}`}
      data-slug={member.slug}
      ref={sectionRef}
      className='scroll-mt-32'
      style={{ backgroundColor: isEven ? '#ffffff' : '#fafafa' }}
    >
      <div className='max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24'>
        <div
          ref={inViewRef}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-700 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >

          {/* Photo */}
          <div className={`relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className='relative max-w-[380px] mx-auto lg:mx-0'>
              <div
                className='absolute rounded-3xl'
                style={{ inset: 0, transform: 'translate(18px, 18px)', backgroundColor: 'rgba(48,108,236,0.12)' }}
              />
              <Link href={`/members/${member.slug}`} className='group block relative'>
                <div className='relative overflow-hidden rounded-3xl shadow-xl' style={{ aspectRatio: '4 / 5' }}>
                  <div className='absolute inset-0 transition-transform duration-700 group-hover:scale-105'>
                    <img
                      src={member.photo}
                      alt={member.name}
                      className='absolute inset-0 w-full h-full object-cover'
                      style={{ objectPosition: member.objectPosition || 'center' }}
                    />
                    <div
                      aria-hidden='true'
                      className='absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100'
                      style={{ background: 'radial-gradient(ellipse 60% 55% at 50% 38%, transparent 40%, rgba(0,0,0,0.75) 100%)' }}
                    />
                  </div>
                  <div className='absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl' />
                </div>
                <span
                  className='absolute -bottom-4 -right-4 md:-right-6 flex items-center justify-center rounded-full text-white font-bold shadow-lg'
                  style={{ backgroundColor: ACCENT, width: 56, height: 56, fontFamily: 'League Spartan, sans-serif', fontSize: 15 }}
                >
                  {number}
                </span>
              </Link>
            </div>
          </div>

          {/* Content */}
          <div className={`relative ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
            <span
              aria-hidden='true'
              className='absolute -top-8 md:-top-12 -left-1 font-bold select-none pointer-events-none leading-none'
              style={{
                fontFamily: 'League Spartan, sans-serif',
                fontSize: 'clamp(5rem, 10vw, 8.5rem)',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(15,23,42,0.08)',
                zIndex: 0,
              }}
            >
              {number}
            </span>

            <div className='relative z-10'>
              <div className='flex items-center gap-3 mb-4'>
                <span className='block w-6 h-px' style={{ backgroundColor: ACCENT }} />
                <span className='text-[11px] font-bold tracking-[0.22em] uppercase' style={{ color: ACCENT, fontFamily: 'DM Sans, sans-serif' }}>
                  {member.agency ?? 'TOIG Leadership'}
                </span>
              </div>

              <h2 className='font-bold text-gray-900 leading-[1.05] mb-2' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)' }}>
                {member.name}
              </h2>
              <p className='text-gray-500 mb-6' style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {member.role}
              </p>

              <p className='text-[15px] text-gray-600 leading-relaxed mb-7 max-w-lg' style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {member.description}
              </p>

              <div className='flex flex-wrap gap-2.5 mb-8'>
                {member.expertise.map((tag) => (
                  <span
                    key={tag}
                    className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[12px] font-semibold text-gray-700 border border-gray-200'
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    <span className='w-1.5 h-1.5 rounded-full flex-shrink-0' style={{ backgroundColor: ACCENT }} />
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/members/${member.slug}`}
                className='inline-flex items-center gap-2.5 text-sm font-semibold transition-all hover:gap-3.5'
                style={{ color: ACCENT, fontFamily: 'DM Sans, sans-serif' }}
              >
                View Full Profile
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-4 h-4'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3' />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MembersPage() {
  const sectionsRef = useRef<Array<HTMLElement | null>>([]);
  const heroSentinelRef = useRef<HTMLDivElement | null>(null);
  const [activeSlug, setActiveSlug] = useState(members[0].slug);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slug = entry.target.getAttribute('data-slug');
            if (slug) setActiveSlug(slug);
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );
    sectionsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = heroSentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollToMember = (slug: string) => {
    document.getElementById(`director-${slug}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className='min-h-screen bg-white'>

      {/* Duotone photo treatment — navy shadows, ice-blue highlights, applied via SVG filter */}
      <svg width='0' height='0' style={{ position: 'absolute' }} aria-hidden='true'>
        <defs>
          <filter id='director-duotone'>
            <feColorMatrix
              type='matrix'
              values='0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0'
            />
            <feComponentTransfer>
              <feFuncR type='table' tableValues='0.0431 0.8627' />
              <feFuncG type='table' tableValues='0.0745 0.9098' />
              <feFuncB type='table' tableValues='0.1882 1' />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      {/* Hero */}
      <section className='relative overflow-hidden min-h-[45vh] flex items-center' style={{ backgroundImage: 'url(/images/DSC_2608.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className='absolute inset-0' style={{ background: 'linear-gradient(160deg, rgba(0,0,0,0.82) 0%, rgba(5,12,30,0.65) 40%, rgba(10,22,50,0.45) 70%, rgba(48,108,236,0.22) 100%)' }} />
        <div className='max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-20 relative z-10 w-full'>
          <div className='flex items-center gap-3 mb-5'>
            <span className='block w-8 h-px bg-white/50' />
            <span className='text-[11px] font-bold tracking-[0.25em] uppercase text-white/70' style={{ fontFamily: 'DM Sans, sans-serif' }}>
              The People Behind TOIG
            </span>
          </div>
          <h1 className='font-bold text-white leading-[1.05] mb-5' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}>
            Meet the Directors
          </h1>
          <p className='text-lg leading-relaxed max-w-xl' style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'DM Sans, sans-serif' }}>
            Five people running TOIG&apos;s agencies day to day &mdash; each one leading a different piece of the group.
          </p>
        </div>
        <div className='absolute bottom-0 left-0 w-full overflow-hidden leading-none'>
          <svg viewBox='0 0 1440 60' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-full h-auto'>
            <path d='M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z' fill='white' />
          </svg>
        </div>
      </section>

      {/* Side rail — scroll-spy jump nav, sits in the page margin so it never overlaps content */}
      <div
        className={`fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden min-[1440px]:flex flex-col items-center gap-3 py-4 px-2.5 rounded-full bg-white/90 backdrop-blur-md border border-gray-100 shadow-[0_8px_30px_rgba(15,23,42,0.08)] transition-opacity duration-500 ${
          pastHero ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {members.map((m) => {
          const isActive = activeSlug === m.slug;
          return (
            <button
              key={m.slug}
              onClick={() => scrollToMember(m.slug)}
              aria-label={`Jump to ${m.name}`}
              aria-current={isActive}
              className='group relative'
            >
              <span
                className='block rounded-full overflow-hidden transition-all duration-300'
                style={{
                  width: isActive ? 40 : 30,
                  height: isActive ? 40 : 30,
                  border: `2px solid ${isActive ? ACCENT : 'transparent'}`,
                  opacity: isActive ? 1 : 0.55,
                }}
              >
                <img
                  src={m.photo}
                  alt=''
                  className='w-full h-full object-cover'
                  style={{ objectPosition: m.objectPosition || 'center', filter: DUOTONE }}
                />
              </span>
              <span
                className='absolute right-full top-1/2 -translate-y-1/2 mr-3 whitespace-nowrap rounded-md px-2.5 py-1.5 text-[11px] font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'
                style={{ backgroundColor: '#0f172a', fontFamily: 'DM Sans, sans-serif' }}
              >
                {m.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Director rows */}
      <div className='relative'>
        <div ref={heroSentinelRef} />

        {members.map((member, idx) => (
          <DirectorRow
            key={member.slug}
            member={member}
            index={idx}
            sectionRef={(el) => {
              sectionsRef.current[idx] = el;
            }}
          />
        ))}
      </div>
    </main>
  );
}

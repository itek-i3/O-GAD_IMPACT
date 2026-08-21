'use client';

import { useState } from 'react';
import Link from 'next/link';
import BookingModal from '@/components/BookingModal';
import type { Member } from '@/data/members';
import { getAgency } from '@/data/agencies';

const ACCENT = '#306CEC';

export default function MemberDetail({ member }: { member: Member }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const agency = member.agencySlug ? getAgency(member.agencySlug) : undefined;
  const firstName = member.name.split(' ')[0];
  const bioParagraphs = member.bio ?? [agency ? `${member.description} ${agency.description}` : `${member.description} As TOIG's ${member.role}, ${firstName} helps set the direction for every agency in the group.`];

  return (
    <main className='min-h-screen bg-white'>
      <section className='py-16 md:py-24'>
        <div className='max-w-6xl mx-auto px-6 md:px-12'>
          <div className='flex items-center gap-2 text-[12px] font-medium mb-10' style={{ color: '#9ca3af', fontFamily: 'DM Sans, sans-serif' }}>
            <Link href='/' className='hover:text-gray-900 transition-colors'>Home</Link>
            <span>/</span>
            <Link href='/members' className='hover:text-gray-900 transition-colors'>Directors</Link>
            <span>/</span>
            <span className='text-gray-700'>{member.name}</span>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-14 items-start'>

            {/* Left — photo panel */}
            <div className='relative w-full max-w-[360px] mx-auto lg:mx-0'>
              <div className='rounded-3xl overflow-hidden shadow-xl' style={{ backgroundColor: '#f4f4f5' }}>
                <img
                  src={member.photo}
                  alt={member.name}
                  className='w-full object-cover'
                  style={{ aspectRatio: '4 / 5', objectPosition: member.objectPosition || 'center', filter: 'saturate(0.9) contrast(1.03)' }}
                />
              </div>
              {member.agency && (
                <div className='absolute bottom-4 right-4 bg-white rounded-2xl shadow-lg px-4 py-3'>
                  <p className='text-[9px] font-bold tracking-[0.15em] uppercase mb-0.5' style={{ color: ACCENT }}>Agency</p>
                  <p className='font-bold text-gray-900 text-[13px]' style={{ fontFamily: 'League Spartan, sans-serif' }}>{member.agency}</p>
                </div>
              )}
            </div>

            {/* Right — details */}
            <div>
              <div className='flex items-center gap-3 mb-4'>
                <span className='block w-6 h-px' style={{ backgroundColor: ACCENT }} />
                <span className='text-[11px] font-bold tracking-[0.22em] uppercase' style={{ color: ACCENT, fontFamily: 'DM Sans, sans-serif' }}>
                  {agency?.category ?? 'TOIG Leadership'}
                </span>
              </div>

              <h1 className='font-bold leading-[1.05] mb-6' style={{ color: ACCENT, fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)' }}>
                {member.title}
              </h1>

              <p className='text-[11px] font-bold tracking-[0.2em] uppercase mb-2' style={{ color: '#9ca3af', fontFamily: 'DM Sans, sans-serif' }}>
                Meet Your Expert
              </p>
              <h2 className='font-bold text-gray-900 mb-1' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
                {member.name}
              </h2>
              <p className='text-gray-500 mb-7' style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {member.role}{member.agency ? `, ${member.agency}` : ''}
              </p>

              <p className='text-[15px] text-gray-600 leading-relaxed mb-8' style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {member.description}
              </p>

              <div className='flex flex-wrap gap-2.5 mb-10'>
                {member.expertise.map((tag, i) => (
                  <span
                    key={i}
                    className='inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold text-gray-700 border border-gray-200'
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    <span className='w-1.5 h-1.5 rounded-full flex-shrink-0' style={{ backgroundColor: ACCENT }} />
                    {tag}
                  </span>
                ))}
              </div>

              <div className='flex flex-wrap items-center gap-4'>
                {agency ? (
                  <>
                    <button
                      onClick={() => setIsBookingOpen(true)}
                      className='inline-flex items-center gap-2.5 text-white px-7 py-3.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/25'
                      style={{ backgroundColor: ACCENT, fontFamily: 'DM Sans, sans-serif' }}
                    >
                      Book a Session with {member.name.split(' ')[0]}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                    </button>
                    <Link
                      href={`/agencies/${member.agencySlug}`}
                      className='inline-flex items-center gap-2 text-sm font-semibold transition-all'
                      style={{ color: ACCENT, fontFamily: 'DM Sans, sans-serif' }}
                    >
                      View {member.agency}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                    </Link>
                  </>
                ) : (
                  <Link
                    href='/#get-in-touch'
                    className='inline-flex items-center gap-2.5 text-white px-7 py-3.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/25'
                    style={{ backgroundColor: ACCENT, fontFamily: 'DM Sans, sans-serif' }}
                  >
                    Get in Touch
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About — bio + trust points, booking callout ── */}
      <section className='py-16 md:py-24' style={{ backgroundColor: '#fafafa' }}>
        <div className='max-w-6xl mx-auto px-6 md:px-12'>
          <div className='grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-14 items-start'>

            {/* Left — bio */}
            <div>
              <div className='flex items-center gap-3 mb-4'>
                <span className='block w-6 h-px' style={{ backgroundColor: ACCENT }} />
                <span className='text-[11px] font-bold tracking-[0.22em] uppercase' style={{ color: ACCENT, fontFamily: 'DM Sans, sans-serif' }}>
                  About {firstName}
                </span>
              </div>
              <h2 className='font-bold text-gray-900 mb-6' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}>
                How {firstName} Works
              </h2>
              <div className='space-y-4 mb-9'>
                {bioParagraphs.map((paragraph, i) => (
                  <p key={i} className='text-[15px] text-gray-600 leading-relaxed' style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {member.expertise.map((tag, i) => (
                  <div key={i} className='flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke={ACCENT} className="w-4 h-4 flex-shrink-0 mt-0.5"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                    <span className='text-[14px] text-gray-700 font-medium' style={{ fontFamily: 'DM Sans, sans-serif' }}>Specializes in {tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — booking callout */}
            <div className='rounded-3xl bg-white border border-gray-100 p-8 shadow-sm'>
              <span className='text-[11px] font-bold tracking-[0.2em] uppercase' style={{ color: ACCENT, fontFamily: 'DM Sans, sans-serif' }}>
                {agency ? 'Book a Session' : 'Get in Touch'}
              </span>
              <h3 className='font-bold text-gray-900 mt-2 mb-3' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)' }}>
                {agency ? `Book Time with ${firstName}` : `Connect with ${firstName}`}
              </h3>
              <p className='text-gray-500 text-[14px] leading-relaxed mb-7' style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {agency
                  ? `Bring a real challenge. Leave with a clear next step for ${agency.name}.`
                  : `Reach out to connect with ${firstName} directly.`}
              </p>
              {agency ? (
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className='w-full inline-flex items-center justify-center gap-2.5 text-white px-6 py-3.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/25'
                  style={{ backgroundColor: ACCENT, fontFamily: 'DM Sans, sans-serif' }}
                >
                  Request Session
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </button>
              ) : (
                <Link
                  href='/#get-in-touch'
                  className='w-full inline-flex items-center justify-center gap-2.5 text-white px-6 py-3.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/25'
                  style={{ backgroundColor: ACCENT, fontFamily: 'DM Sans, sans-serif' }}
                >
                  Get in Touch
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {agency && (
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          defaultService={agency.slug}
          calendlyUrl={agency.calendlyUrl}
        />
      )}
    </main>
  );
}

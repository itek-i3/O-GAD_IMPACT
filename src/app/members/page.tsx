'use client';

const members = [
  { name: 'Collins Aroni', role: 'Executive Director', agency: 'I3X Africa', photo: '/profile/collins.jpeg', description: 'Leads strategic direction and growth for I3X Africa.' },
  { name: 'Maison Shani', role: 'Executive Director', agency: 'I3 Studios', photo: '/profile/Maison.png', description: 'Heads creative operations and studio partnerships.' },
  { name: 'Mercy Protas', role: 'Executive Director', agency: 'I3 Plus', photo: '/profile/Mercy.jpeg', description: 'Oversees programs, partnerships and member success.' },
  { name: 'Samuel Obukosia', role: 'Executive Director', agency: 'I3 Launchpad', photo: '/profile/Samuel.jpeg', objectPosition: 'center top', description: 'Runs incubation and acceleration programs.' },
  { name: 'Mariama Waiganjo', role: 'Law and Governance Lead', agency: null, photo: '/profile/Mariama.jpeg', description: 'Advises on legal frameworks, compliance, and governance.' },
];

export default function MembersPage() {
  return (
    <main className='min-h-screen bg-white'>

      {/* Hero */}
      <section className='relative overflow-hidden min-h-[55vh] flex items-center' style={{ backgroundImage: 'url(/images/DSC_2608.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className='absolute inset-0' style={{ background: 'linear-gradient(160deg, rgba(0,0,0,0.8) 0%, rgba(5,12,30,0.6) 40%, rgba(10,22,50,0.4) 70%, rgba(48,108,236,0.2) 100%)' }} />
        <div className='max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-20 relative z-10 w-full'>
          <h1 className='font-bold text-white leading-[1.05] mb-5' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}>
            Meet the Team
          </h1>
          <p className='text-lg leading-relaxed max-w-xl' style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'DM Sans, sans-serif' }}>
            The people running TOIG&apos;s agencies day to day.
          </p>
        </div>
        <div className='absolute bottom-0 left-0 w-full overflow-hidden leading-none'>
          <svg viewBox='0 0 1440 60' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-full h-auto'>
            <path d='M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z' fill='white' />
          </svg>
        </div>
      </section>

      {/* Member grid */}
      <section className='py-20 md:py-28'>
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {members.map((member, idx) => (
              <div
                key={idx}
                className='group rounded-3xl border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white'
              >
                <div className='p-8 relative' style={{ backgroundColor: '#fafafa' }}>
                  <img
                    src={member.photo}
                    alt={member.name}
                    className='w-28 h-28 rounded-full object-cover mx-auto border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-500'
                    style={{ objectPosition: member.objectPosition || 'center' }}
                  />

                  <h3 className='text-lg font-bold text-gray-900 mt-4 mb-1 text-center' style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    {member.name}
                  </h3>
                  <p className='text-sm font-semibold text-center' style={{ color: '#306CEC', fontFamily: 'DM Sans, sans-serif' }}>
                    {member.role}{member.agency ? `, ${member.agency}` : ''}
                  </p>
                  <p className='text-sm text-gray-600 mt-3 text-center' style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';

function useInView(threshold = 0.1) {
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

const contactDetails = [
  {
    label: 'Email',
    value: 'hello@ogadimpact.com',
    href: 'mailto:hello@ogadimpact.com',
    icon: (
      <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '+234 800 000 0000',
    href: 'tel:+2348000000000',
    icon: (
      <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
      </svg>
    ),
  },
  {
    label: 'Location',
    value: 'Lagos, Nigeria — Pan-Africa',
    href: null,
    icon: (
      <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
      </svg>
    ),
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    serviceType: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const section = useInView();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', companyName: '', email: '', serviceType: '', description: '' });
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div id='get-in-touch' className='relative py-24 md:py-32 overflow-hidden' style={{ backgroundImage: 'url(/images/contact.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className='absolute inset-0 bg-gradient-to-br from-black/80 via-black/65 to-black/50' />
      <div className='absolute inset-0' style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(48,108,236,0.15) 0%, transparent 60%)' }} />

      <div className='max-w-7xl mx-auto px-6 md:px-12 relative z-10'>
        <div ref={section.ref} className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-start'>

          {/* ── Left: Info ── */}
          <div className='lg:sticky lg:top-28'>
            <span className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase mb-6' style={{ color: '#306CEC', backgroundColor: 'rgba(48,108,236,0.2)', fontFamily: 'DM Sans, sans-serif', ...anim(section.inView, 0) }}>
              <span className='w-1.5 h-1.5 rounded-full' style={{ backgroundColor: '#306CEC' }} />
              Get In Touch
            </span>
            <h2 className='font-bold text-white leading-[1.05] mb-5' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', ...anim(section.inView, 0.08) }}>
              Let's Build <br />Something Great
            </h2>
            <p className='text-[17px] leading-relaxed mb-10' style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'DM Sans, sans-serif', ...anim(section.inView, 0.14) }}>
              Tell us about your goals and challenges. Our team will reach out within 24 hours to explore how we can help you move forward.
            </p>

            {/* Contact details */}
            <div className='flex flex-col gap-4 mb-10'>
              {contactDetails.map((item, idx) => (
                <div key={idx} className='flex items-center gap-4' style={anim(section.inView, 0.2 + idx * 0.07)}>
                  <div className='w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0' style={{ backgroundColor: 'rgba(48,108,236,0.8)' }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className='text-xs font-semibold tracking-widest uppercase mb-0.5' style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'DM Sans, sans-serif' }}>{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className='text-[15px] font-semibold text-white hover:text-blue-300 transition-colors' style={{ fontFamily: 'DM Sans, sans-serif' }}>{item.value}</a>
                    ) : (
                      <p className='text-[15px] font-semibold text-white' style={{ fontFamily: 'DM Sans, sans-serif' }}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className='h-px mb-8' style={{ backgroundColor: 'rgba(255,255,255,0.1)', ...anim(section.inView, 0.38) }} />

            {/* Trust badges */}
            <div className='flex flex-wrap gap-3' style={anim(section.inView, 0.42)}>
              {['Pan-African Reach', 'Response within 24h', '200+ Clients Served'].map((badge, i) => (
                <span key={i} className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold' style={{ color: 'rgba(255,255,255,0.6)', backgroundColor: 'rgba(255,255,255,0.08)', fontFamily: 'DM Sans, sans-serif' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#306CEC" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div style={anim(section.inView, 0.18)}>
            <div className='bg-white rounded-3xl shadow-2xl p-8 md:p-10'>

              {submitted ? (
                <div className='flex flex-col items-center justify-center py-12 text-center'>
                  <div className='w-16 h-16 rounded-full flex items-center justify-center mb-5' style={{ backgroundColor: 'rgba(48,108,236,0.1)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#306CEC" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className='text-2xl font-bold text-gray-900 mb-2' style={{ fontFamily: 'League Spartan, sans-serif' }}>Message Sent!</h3>
                  <p className='text-gray-500 text-sm' style={{ fontFamily: 'DM Sans, sans-serif' }}>Thank you — we'll be in touch within 24 hours.</p>
                </div>
              ) : (
                <>
                  <div className='mb-7'>
                    <h3 className='text-2xl font-bold text-gray-900 mb-1.5' style={{ fontFamily: 'League Spartan, sans-serif' }}>Send Us a Message</h3>
                    <p className='text-sm text-gray-500' style={{ fontFamily: 'DM Sans, sans-serif' }}>All fields are required.</p>
                  </div>

                  <form onSubmit={handleSubmit} className='space-y-5'>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-xs font-bold tracking-widest uppercase text-gray-700 mb-2' style={{ fontFamily: 'DM Sans, sans-serif' }}>Name</label>
                        <input
                          type='text' name='name' value={formData.name} onChange={handleChange} required
                          className='w-full px-4 py-3 rounded-xl text-sm text-gray-900 border border-gray-200 outline-none transition-all placeholder-gray-400'
                          style={{ fontFamily: 'DM Sans, sans-serif' }}
                          onFocus={e => { e.target.style.borderColor = '#306CEC'; e.target.style.boxShadow = '0 0 0 3px rgba(48,108,236,0.1)'; }}
                          onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; }}
                          placeholder='Your name'
                        />
                      </div>
                      <div>
                        <label className='block text-xs font-bold tracking-widest uppercase text-gray-700 mb-2' style={{ fontFamily: 'DM Sans, sans-serif' }}>Email</label>
                        <input
                          type='email' name='email' value={formData.email} onChange={handleChange} required
                          className='w-full px-4 py-3 rounded-xl text-sm text-gray-900 border border-gray-200 outline-none transition-all placeholder-gray-400'
                          style={{ fontFamily: 'DM Sans, sans-serif' }}
                          onFocus={e => { e.target.style.borderColor = '#306CEC'; e.target.style.boxShadow = '0 0 0 3px rgba(48,108,236,0.1)'; }}
                          onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; }}
                          placeholder='your@email.com'
                        />
                      </div>
                    </div>

                    <div>
                      <label className='block text-xs font-bold tracking-widest uppercase text-gray-700 mb-2' style={{ fontFamily: 'DM Sans, sans-serif' }}>Company</label>
                      <input
                        type='text' name='companyName' value={formData.companyName} onChange={handleChange} required
                        className='w-full px-4 py-3 rounded-xl text-sm text-gray-900 border border-gray-200 outline-none transition-all placeholder-gray-400'
                        style={{ fontFamily: 'DM Sans, sans-serif' }}
                        onFocus={e => { e.target.style.borderColor = '#306CEC'; e.target.style.boxShadow = '0 0 0 3px rgba(48,108,236,0.1)'; }}
                        onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; }}
                        placeholder='Your company or organization'
                      />
                    </div>

                    <div>
                      <label className='block text-xs font-bold tracking-widest uppercase text-gray-700 mb-2' style={{ fontFamily: 'DM Sans, sans-serif' }}>Service</label>
                      <select
                        name='serviceType' value={formData.serviceType} onChange={handleChange} required
                        className='w-full px-4 py-3 rounded-xl text-sm border border-gray-200 outline-none transition-all'
                        style={{ fontFamily: 'DM Sans, sans-serif', color: formData.serviceType ? '#111827' : '#9ca3af' }}
                        onFocus={e => { e.currentTarget.style.borderColor = '#306CEC'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(48,108,236,0.1)'; }}
                        onBlur={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }}
                      >
                        <option value=''>Select a service...</option>
                        <option value='business'>Business & Strategy Consultancy</option>
                        <option value='technology'>Technology & Digital Transformation</option>
                        <option value='legal'>Legal & Business Structuring</option>
                        <option value='marketing'>Marketing, Sales & Growth Advisory</option>
                        <option value='scaling'>Scaling & Expansion Support</option>
                        <option value='programs'>Impact360 Programs</option>
                      </select>
                    </div>

                    <div>
                      <label className='block text-xs font-bold tracking-widest uppercase text-gray-700 mb-2' style={{ fontFamily: 'DM Sans, sans-serif' }}>Message</label>
                      <textarea
                        name='description' value={formData.description} onChange={handleChange} required rows={4}
                        className='w-full px-4 py-3 rounded-xl text-sm text-gray-900 border border-gray-200 outline-none transition-all resize-none placeholder-gray-400'
                        style={{ fontFamily: 'DM Sans, sans-serif' }}
                        onFocus={e => { e.currentTarget.style.borderColor = '#306CEC'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(48,108,236,0.1)'; }}
                        onBlur={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }}
                        placeholder='Tell us about your goals and challenges...'
                      />
                    </div>

                    <button
                      type='submit'
                      className='w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.01] active:scale-[0.99]'
                      style={{ backgroundColor: '#306CEC', fontFamily: 'League Spartan, sans-serif', letterSpacing: '0.05em' }}
                    >
                      Send Message →
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

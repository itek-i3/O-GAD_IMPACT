'use client';

import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { CALENDLY_URL } from '@/lib/bookingUtils';
import { getAgency } from '@/data/agencies';

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
    value: 'ogadimpactgroup@gmail.com',
    href: 'https://mail.google.com/mail/?view=cm&to=ogadimpactgroup@gmail.com',
    icon: (
      <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '+254 113 569 079',
    href: 'tel:+254113569079',
    icon: (
      <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
      </svg>
    ),
  },
  {
    label: 'Location',
    value: 'Nakuru, Kenya — Pan-Africa',
    href: null,
    icon: (
      <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
      </svg>
    ),
  },
];

const trustStats = [
  { value: 'Pan-Africa', label: 'Reach' },
  { value: '24h', label: 'Response Time' },
  { value: '200+', label: 'Clients Served' },
];

export default function ContactSection() {
  const [step, setStep] = useState<'form' | 'calendly' | 'success'>('form');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    serviceRequested: '',
    budgetRange: '',
    projectDescription: '',
  });
  const [error, setError] = useState<string | null>(null);
  const savedFormData = useRef<any>(null);
  const section = useInView();

  // Auto-reset to form after success
  useEffect(() => {
    if (step !== 'success') return;
    const timer = setTimeout(() => {
      setStep('form');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        companyName: '',
        serviceRequested: '',
        budgetRange: '',
        projectDescription: '',
      });
    }, 4000);
    return () => clearTimeout(timer);
  }, [step]);

  // Inject Calendly script when on calendly step
  useEffect(() => {
    if (step !== 'calendly') return;
    if (!document.getElementById('calendly-widget-script')) {
      const script = document.createElement('script');
      script.id = 'calendly-widget-script';
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, [step]);

  // Listen for Calendly event_scheduled and save to Supabase
  useEffect(() => {
    if (step !== 'calendly') return;
    async function handleCalendlyEvent(e: MessageEvent) {
      if (e.data?.event !== 'calendly.event_scheduled') return;
      const scheduledStartTime: string | null = e.data?.payload?.event?.start_time ?? null;
      setError(null);
      try {
        const fd = savedFormData.current;
        const { error: supabaseError } = await supabase
          .from('booking_requests')
          .insert([{
            user_id: null,
            first_name: fd.firstName,
            last_name: fd.lastName,
            email: fd.email,
            phone: fd.phone,
            company_name: fd.companyName,
            service_requested: fd.serviceRequested,
            project_description: fd.projectDescription,
            budget_range: fd.budgetRange,
            preferred_contact_method: 'email',
            scheduled_date: scheduledStartTime,
            status: 'scheduled',
          }]);
        if (supabaseError) throw supabaseError;
        setStep('success');
      } catch (err: any) {
        setError(err.message || 'Failed to save your booking. Please try again.');
        setStep('form');
      }
    }
    window.addEventListener('message', handleCalendlyEvent);
    return () => window.removeEventListener('message', handleCalendlyEvent);
  }, [step]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    savedFormData.current = { ...formData };
    setStep('calendly');
  };

  const consultantCalendlyUrl = getAgency(formData.serviceRequested)?.calendlyUrl ?? CALENDLY_URL;
  const calendlyUrl = `${consultantCalendlyUrl}?hide_gdpr_banner=1&primary_color=306CEC&name=${encodeURIComponent(formData.firstName + ' ' + formData.lastName)}&email=${encodeURIComponent(formData.email)}`;

  return (
    <div id='get-in-touch' className='relative py-24 md:py-32 overflow-hidden' style={{ backgroundImage: 'url(/images/DSC_2662.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className='absolute inset-0 bg-gradient-to-br from-black/80 via-black/65 to-black/50' />
      <div className='absolute inset-0' style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(48,108,236,0.15) 0%, transparent 60%)' }} />

      <div className='max-w-7xl mx-auto px-6 md:px-12 relative z-10'>
        <div ref={section.ref} className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-start'>

          {/* ── Left: Info ── */}
          <div className='lg:sticky lg:top-28'>
            <h2 className='font-bold text-white leading-[1.05] mb-5' style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', ...anim(section.inView, 0) }}>
              Let's Build <br />Something Great
            </h2>
            <p className='text-[17px] leading-relaxed mb-10' style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'DM Sans, sans-serif', ...anim(section.inView, 0.14) }}>
              Tell us about your goals. Our team will reach out within 24 hours to help you move forward.
            </p>

            {/* Contact details — frosted glass tiles over the photo background */}
            <div className='flex flex-col gap-3 mb-10'>
              {contactDetails.map((item, idx) => (
                <div key={idx} style={anim(section.inView, 0.2 + idx * 0.07)}>
                  <div
                    className='flex items-center gap-4 rounded-2xl px-5 py-4'
                    style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(14px)' }}
                  >
                    <div className='w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0' style={{ backgroundColor: 'rgba(48,108,236,0.8)' }}>
                      {item.icon}
                    </div>
                    <div>
                      <p className='text-xs font-semibold tracking-widest uppercase mb-0.5' style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'DM Sans, sans-serif' }}>{item.label}</p>
                      {item.href ? (
                        <a href={item.href} target='_blank' rel='noopener noreferrer' className='text-[15px] font-semibold text-white hover:text-blue-300 transition-colors' style={{ fontFamily: 'DM Sans, sans-serif' }}>{item.value}</a>
                      ) : (
                        <p className='text-[15px] font-semibold text-white' style={{ fontFamily: 'DM Sans, sans-serif' }}>{item.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust stats — glass tiles echoing the stat-card treatment used elsewhere on the site */}
            <div className='grid grid-cols-3 gap-3' style={anim(section.inView, 0.42)}>
              {trustStats.map((stat, i) => (
                <div
                  key={i}
                  className='rounded-2xl px-3 py-4 text-center'
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(14px)' }}
                >
                  <p className='text-lg font-bold text-white mb-0.5' style={{ fontFamily: 'League Spartan, sans-serif' }}>{stat.value}</p>
                  <p className='text-[10px] uppercase tracking-wide' style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'DM Sans, sans-serif' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Form / Calendar / Success ── */}
          <div style={anim(section.inView, 0.18)}>
            <div className='bg-white rounded-3xl shadow-2xl p-8 md:p-10' style={{ fontFamily: 'DM Sans, sans-serif' }}>

              {/* Success */}
              {step === 'success' && (
                <div className='text-center py-12'>
                  <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <svg className='w-8 h-8 text-green-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                    </svg>
                  </div>
                  <h3 className='text-2xl font-bold text-gray-900 mb-2' style={{ fontFamily: 'League Spartan, sans-serif' }}>Session Booked!</h3>
                  <p className='text-gray-500 text-sm max-w-xs mx-auto'>Your session has been scheduled. You'll receive a confirmation email shortly.</p>
                </div>
              )}

              {/* Form */}
              {step === 'form' && (
                <>
                  <div className='flex items-center gap-2 mb-6'>
                    <div className='flex items-center gap-1.5 text-sm font-medium text-[#306CEC]'>
                      <span className='w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-[#306CEC] text-white'>1</span>
                      Your Details
                    </div>
                    <div className='flex-1 h-px bg-gray-200 mx-1' />
                    <div className='flex items-center gap-1.5 text-sm font-medium text-gray-400'>
                      <span className='w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-gray-200 text-gray-500'>2</span>
                      Pick a Time
                    </div>
                  </div>

                  <div className='mb-6'>
                    <h3 className='text-2xl font-bold text-gray-900 mb-1.5' style={{ fontFamily: 'League Spartan, sans-serif' }}>Book a Session</h3>
                    <p className='text-sm text-gray-500'>Tell us what you need — we'll open the scheduler for the right specialist.</p>
                  </div>

                  {error && (
                    <div className='mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm'>{error}</div>
                  )}

                  <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-xs font-bold tracking-widest uppercase text-gray-700 mb-2'>First Name *</label>
                        <input type='text' name='firstName' value={formData.firstName} onChange={handleChange} required
                          className='w-full px-4 py-2.5 rounded-xl text-sm text-gray-900 border border-gray-200 outline-none transition-all placeholder-gray-400'
                          onFocus={e => { e.target.style.borderColor = '#306CEC'; e.target.style.boxShadow = '0 0 0 3px rgba(48,108,236,0.1)'; }}
                          onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; }}
                          placeholder='Jane' />
                      </div>
                      <div>
                        <label className='block text-xs font-bold tracking-widest uppercase text-gray-700 mb-2'>Last Name *</label>
                        <input type='text' name='lastName' value={formData.lastName} onChange={handleChange} required
                          className='w-full px-4 py-2.5 rounded-xl text-sm text-gray-900 border border-gray-200 outline-none transition-all placeholder-gray-400'
                          onFocus={e => { e.target.style.borderColor = '#306CEC'; e.target.style.boxShadow = '0 0 0 3px rgba(48,108,236,0.1)'; }}
                          onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; }}
                          placeholder='Doe' />
                      </div>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-xs font-bold tracking-widest uppercase text-gray-700 mb-2'>Email *</label>
                        <input type='email' name='email' value={formData.email} onChange={handleChange} required
                          className='w-full px-4 py-2.5 rounded-xl text-sm text-gray-900 border border-gray-200 outline-none transition-all placeholder-gray-400'
                          onFocus={e => { e.target.style.borderColor = '#306CEC'; e.target.style.boxShadow = '0 0 0 3px rgba(48,108,236,0.1)'; }}
                          onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; }}
                          placeholder='jane@company.com' />
                      </div>
                      <div>
                        <label className='block text-xs font-bold tracking-widest uppercase text-gray-700 mb-2'>Phone *</label>
                        <input type='tel' name='phone' value={formData.phone} onChange={handleChange} required
                          className='w-full px-4 py-2.5 rounded-xl text-sm text-gray-900 border border-gray-200 outline-none transition-all placeholder-gray-400'
                          onFocus={e => { e.target.style.borderColor = '#306CEC'; e.target.style.boxShadow = '0 0 0 3px rgba(48,108,236,0.1)'; }}
                          onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; }}
                          placeholder='+254 700 000 000' />
                      </div>
                    </div>

                    <div>
                      <label className='block text-xs font-bold tracking-widest uppercase text-gray-700 mb-2'>Company</label>
                      <input type='text' name='companyName' value={formData.companyName} onChange={handleChange}
                        className='w-full px-4 py-2.5 rounded-xl text-sm text-gray-900 border border-gray-200 outline-none transition-all placeholder-gray-400'
                        onFocus={e => { e.target.style.borderColor = '#306CEC'; e.target.style.boxShadow = '0 0 0 3px rgba(48,108,236,0.1)'; }}
                        onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; }}
                        placeholder='Acme Corp' />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-xs font-bold tracking-widest uppercase text-gray-700 mb-2'>Service</label>
                        <select name='serviceRequested' value={formData.serviceRequested} onChange={handleChange}
                          className='w-full px-4 py-2.5 rounded-xl text-sm border border-gray-200 outline-none transition-all'
                          style={{ color: formData.serviceRequested ? '#111827' : '#9ca3af' }}
                          onFocus={e => { e.currentTarget.style.borderColor = '#306CEC'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(48,108,236,0.1)'; }}
                          onBlur={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }}>
                          <option value=''>Select...</option>
                          <option value='i3-plus-marketing'>I3 Plus</option>
                          <option value='i3x-events'>I3X Africa</option>
                          <option value='i3-launchpad'>I3 Launchpad</option>
                          <option value='itek'>iTek</option>
                          <option value='i3-studios'>I3 Studios</option>
                          <option value='impact360'>Impact360</option>
                          <option value='other'>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className='block text-xs font-bold tracking-widest uppercase text-gray-700 mb-2'>Budget</label>
                        <select name='budgetRange' value={formData.budgetRange} onChange={handleChange}
                          className='w-full px-4 py-2.5 rounded-xl text-sm border border-gray-200 outline-none transition-all'
                          style={{ color: formData.budgetRange ? '#111827' : '#9ca3af' }}
                          onFocus={e => { e.currentTarget.style.borderColor = '#306CEC'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(48,108,236,0.1)'; }}
                          onBlur={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }}>
                          <option value=''>Select a range...</option>
                          <option value='Under 500k KES'>Under 500,000 KES</option>
                          <option value='500k - 1M KES'>500,000 – 1,000,000 KES</option>
                          <option value='1M - 5M KES'>1,000,000 – 5,000,000 KES</option>
                          <option value='5M+ KES'>5,000,000+ KES</option>
                          <option value='Not Sure'>Not Sure</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className='block text-xs font-bold tracking-widest uppercase text-gray-700 mb-2'>Project Details *</label>
                      <textarea name='projectDescription' value={formData.projectDescription} onChange={handleChange} required rows={3}
                        className='w-full px-4 py-2.5 rounded-xl text-sm text-gray-900 border border-gray-200 outline-none transition-all resize-none placeholder-gray-400'
                        onFocus={e => { e.currentTarget.style.borderColor = '#306CEC'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(48,108,236,0.1)'; }}
                        onBlur={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }}
                        placeholder='Tell us about your goals and challenges...' />
                    </div>

                    <button type='submit'
                      className='w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.01] active:scale-[0.99]'
                      style={{ backgroundColor: '#306CEC', fontFamily: 'League Spartan, sans-serif', letterSpacing: '0.05em' }}>
                      Next: Pick a Time →
                    </button>
                  </form>
                </>
              )}

              {/* Calendly */}
              {step === 'calendly' && (
                <>
                  <div className='flex items-center gap-2 mb-4'>
                    <div className='flex items-center gap-2 mb-6 w-full'>
                      <div className='flex items-center gap-1.5 text-sm font-medium text-gray-400'>
                        <span className='w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-gray-200 text-gray-500'>1</span>
                        Your Details
                      </div>
                      <div className='flex-1 h-px bg-gray-200 mx-1' />
                      <div className='flex items-center gap-1.5 text-sm font-medium text-[#306CEC]'>
                        <span className='w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-[#306CEC] text-white'>2</span>
                        Pick a Time
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-3 mb-4'>
                    <button onClick={() => setStep('form')} className='text-gray-400 hover:text-gray-600 transition-colors'>
                      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                      </svg>
                    </button>
                    <div>
                      <h3 className='text-2xl font-bold text-gray-900 leading-tight' style={{ fontFamily: 'League Spartan, sans-serif' }}>Pick a Time</h3>
                      <p className='text-gray-500 text-sm'>Select an available slot from our calendar below.</p>
                    </div>
                  </div>
                  {error && (
                    <div className='mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm'>{error}</div>
                  )}
                  <div className='calendly-inline-widget rounded-xl overflow-hidden border border-gray-100'
                    data-url={calendlyUrl}
                    style={{ minWidth: '320px', height: '630px' }} />
                </>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

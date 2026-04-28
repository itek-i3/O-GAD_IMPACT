'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { CALENDLY_URL } from '@/lib/bookingUtils';
import type { User } from '@supabase/supabase-js';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultService?: string;
}

export default function BookingModal({ isOpen, onClose, defaultService = '' }: BookingModalProps) {
    const [step, setStep] = useState<'form' | 'calendly' | 'success'>('form');
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const savedFormData = useRef<any>(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        companyName: '',
        serviceRequested: defaultService,
        projectDescription: '',
        budgetRange: '',
        preferredContactMethod: 'email',
    });

    useEffect(() => {
        if (!isOpen) return;
        document.body.style.overflow = 'hidden';

        async function checkAuth() {
            setLoadingAuth(true);
            const { data: { session } } = await supabase.auth.getSession();
            const u = session?.user ?? null;
            setUser(u);
            if (u) {
                setFormData(prev => ({
                    ...prev,
                    email: u.email || '',
                    firstName: u.user_metadata?.first_name || '',
                    lastName: u.user_metadata?.last_name || ''
                }));
            }
            setLoadingAuth(false);
        }

        checkAuth();
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    useEffect(() => {
        if (step !== 'calendly') return;

        async function handleCalendlyEvent(e: MessageEvent) {
            if (e.data?.event !== 'calendly.event_scheduled') return;

            const scheduledStartTime: string | null =
                e.data?.payload?.event?.start_time ?? null;

            setError(null);
            try {
                const fd = savedFormData.current;
                const { error: supabaseError } = await supabase
                    .from('booking_requests')
                    .insert([{
                        user_id: user?.id,
                        first_name: fd.firstName,
                        last_name: fd.lastName,
                        email: fd.email,
                        phone: fd.phone,
                        company_name: fd.companyName,
                        service_requested: fd.serviceRequested,
                        project_description: fd.projectDescription,
                        budget_range: fd.budgetRange,
                        preferred_contact_method: fd.preferredContactMethod,
                        scheduled_date: scheduledStartTime,
                        status: 'scheduled',
                    }]);

                if (supabaseError) throw supabaseError;
                setStep('success');
                setTimeout(() => {
                    onClose();
                    setStep('form');
                    setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        companyName: '',
                        serviceRequested: defaultService,
                        projectDescription: '',
                        budgetRange: '',
                        preferredContactMethod: 'email',
                    });
                    savedFormData.current = null;
                }, 4000);
            } catch (err: any) {
                setError(err.message || 'Failed to save your booking. Please try again.');
                setStep('form');
            }
        }

        window.addEventListener('message', handleCalendlyEvent);
        return () => window.removeEventListener('message', handleCalendlyEvent);
    }, [step, user, defaultService, onClose]);

    // Inject Calendly widget script when on the calendly step
    useEffect(() => {
        if (step !== 'calendly') return;
        const existing = document.getElementById('calendly-widget-script');
        if (!existing) {
            const script = document.createElement('script');
            script.id = 'calendly-widget-script';
            script.src = 'https://assets.calendly.com/assets/external/widget.js';
            script.async = true;
            document.head.appendChild(script);
        }
    }, [step]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFormNext = (e: React.FormEvent) => {
        e.preventDefault();
        savedFormData.current = { ...formData };
        setStep('calendly');
    };

    const calendlyUrl = `${CALENDLY_URL}?hide_gdpr_banner=1&primary_color=306CEC&name=${encodeURIComponent(formData.firstName + ' ' + formData.lastName)}&email=${encodeURIComponent(formData.email)}`;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
            <div className={`bg-white rounded-2xl w-full shadow-2xl overflow-hidden my-4 transition-all duration-300 ${step === 'calendly' ? 'max-w-3xl' : 'max-w-xl'}`}>
                <div className="p-5 md:p-6 relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {(step === 'form' || step === 'calendly') && !loadingAuth && user && (
                        <div className="flex items-center gap-2 mb-6">
                            <div className={`flex items-center gap-1.5 text-sm font-medium ${step === 'form' ? 'text-[#306CEC]' : 'text-gray-400'}`}>
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 'form' ? 'bg-[#306CEC] text-white' : 'bg-gray-200 text-gray-500'}`}>1</span>
                                Your Details
                            </div>
                            <div className="flex-1 h-px bg-gray-200 mx-1" />
                            <div className={`flex items-center gap-1.5 text-sm font-medium ${step === 'calendly' ? 'text-[#306CEC]' : 'text-gray-400'}`}>
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 'calendly' ? 'bg-[#306CEC] text-white' : 'bg-gray-200 text-gray-500'}`}>2</span>
                                Pick a Time
                            </div>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>Session Booked!</h3>
                            <p className="text-gray-600" style={{ fontFamily: 'DM Sans, sans-serif' }}>Your session has been scheduled. You will receive a confirmation email shortly. You can track your booking in your dashboard.</p>
                        </div>
                    )}

                    {step === 'form' && loadingAuth && (
                        <div className="py-12 flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#306CEC]"></div>
                        </div>
                    )}

                    {step === 'form' && !loadingAuth && !user && (
                        <div className="text-center py-10">
                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-[#306CEC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>Sign In Required</h3>
                            <p className="text-gray-600 mb-6 max-w-sm mx-auto" style={{ fontFamily: 'DM Sans, sans-serif' }}>You must be logged in to book a session. This allows you to track your request status.</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-3">
                                <a href="/auth/login" className="px-6 py-2.5 bg-[#306CEC] text-white font-medium rounded-lg hover:bg-blue-700 transition-colors" style={{ fontFamily: 'DM Sans, sans-serif' }}>Log In</a>
                                <a href="/auth/signup" className="px-6 py-2.5 bg-white text-gray-700 border border-gray-300 font-medium rounded-lg hover:bg-gray-50 transition-colors" style={{ fontFamily: 'DM Sans, sans-serif' }}>Create Account</a>
                            </div>
                        </div>
                    )}

                    {step === 'form' && !loadingAuth && user && (
                        <>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'League Spartan, sans-serif' }}>Book a Session</h2>
                                <p className="text-gray-600 text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>Tell us about your needs, then pick a time that works for you.</p>
                            </div>

                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>
                            )}

                            <form onSubmit={handleFormNext} className="space-y-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                                        <input required name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306CEC] focus:border-[#306CEC] outline-none text-gray-900" placeholder="Jane" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                                        <input required name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306CEC] focus:border-[#306CEC] outline-none text-gray-900" placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306CEC] focus:border-[#306CEC] outline-none text-gray-900" placeholder="jane@company.com" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                                        <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306CEC] focus:border-[#306CEC] outline-none text-gray-900" placeholder="+254 700 000 000" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                    <input name="companyName" value={formData.companyName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306CEC] focus:border-[#306CEC] outline-none text-gray-900" placeholder="Acme Corp" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Needed</label>
                                        <select name="serviceRequested" value={formData.serviceRequested} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306CEC] focus:border-[#306CEC] outline-none text-gray-900">
                                            <option value="">Select a service...</option>
                                            <option value="business-strategy">Business and Strategy</option>
                                            <option value="technology">Technology and Digital</option>
                                            <option value="legal">Legal and Structuring</option>
                                            <option value="marketing">Marketing and Sales</option>
                                            <option value="scaling">Scaling and Expansion</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Budget</label>
                                        <select name="budgetRange" value={formData.budgetRange} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306CEC] focus:border-[#306CEC] outline-none text-gray-900">
                                            <option value="">Select a range...</option>
                                            <option value="Under 500k KES">Under 500,000 KES</option>
                                            <option value="500k - 1M KES">500,000 - 1,000,000 KES</option>
                                            <option value="1M - 5M KES">1,000,000 - 5,000,000 KES</option>
                                            <option value="5M+ KES">5,000,000+ KES</option>
                                            <option value="Not Sure">Not Sure</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Details *</label>
                                    <textarea required name="projectDescription" value={formData.projectDescription} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306CEC] focus:border-[#306CEC] outline-none text-gray-900 resize-none" placeholder="Tell us about your goals, challenges, and what you hope to achieve..." />
                                </div>
                                <button type="submit" className="w-full py-3 px-4 bg-[#306CEC] hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                                    Next: Pick a Time
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </form>
                        </>
                    )}

                    {step === 'calendly' && (
                        <>
                            <div className="mb-4 flex items-center gap-3">
                                <button onClick={() => setStep('form')} className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'League Spartan, sans-serif' }}>Pick a Time</h2>
                                    <p className="text-gray-500 text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>Select an available slot from our calendar below.</p>
                                </div>
                            </div>
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>
                            )}
                            <div
                                className="calendly-inline-widget rounded-xl overflow-hidden border border-gray-100"
                                data-url={calendlyUrl}
                                style={{ minWidth: '320px', height: '630px' }}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
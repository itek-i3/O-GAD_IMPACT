'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: { data: { first_name: formData.firstName, last_name: formData.lastName } }
            });
            if (signUpError) throw signUpError;
            if (data?.user?.identities?.length === 0) {
                setError('Email already in use.');
            } else if (data?.session === null) {
                setSuccess(true);
            } else {
                router.push('/dashboard');
                router.refresh();
            }
        } catch (err: any) {
            setError(err.message || 'Error creating account. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(48,108,236,0.1)' }}>
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#306CEC' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'League Spartan, sans-serif' }}>Check your email</h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        We've sent a verification link to <strong className="text-gray-700">{formData.email}</strong>. Please verify your email to continue.
                    </p>
                    <Link href="/auth/login" className="text-sm font-semibold transition-colors" style={{ color: '#306CEC', fontFamily: 'DM Sans, sans-serif' }}>
                        Return to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex">
            {/* Left panel */}
            <div
                className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 relative overflow-hidden"
                style={{ backgroundColor: '#030712' }}
            >
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '48px 48px'
                }} />
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-20 blur-[100px]" style={{ backgroundColor: '#306CEC' }} />

                <Link href="/" className="flex items-center gap-2.5 relative z-10">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#306CEC' }}>
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="text-[14px] font-bold text-white" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                        THE O'GAD <span className="font-light opacity-70">IMPACT GROUP</span>
                    </span>
                </Link>

                <div className="relative z-10">
                    <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-6" style={{ color: '#306CEC', fontFamily: 'DM Sans, sans-serif' }}>
                        Join Us
                    </p>
                    <h2 className="font-bold text-white leading-[1.1] mb-6" style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
                        Start your journey with us today.
                    </h2>
                    <p className="text-gray-400 leading-relaxed text-[15px]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        Create your account to book consultations, track your sessions, and access the full suite of O'GAD services.
                    </p>
                </div>

                <div className="relative z-10 border-l-2 pl-5" style={{ borderColor: '#306CEC' }}>
                    <p className="text-white/60 text-sm italic leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        "We champion the bold to achieve the extraordinary."
                    </p>
                    <p className="text-white/30 text-xs mt-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>The O'GAD Impact Group</p>
                </div>
            </div>

            {/* Right panel */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
                <div className="w-full max-w-sm">
                    <Link href="/" className="flex items-center gap-2 mb-10 lg:hidden">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#306CEC' }}>
                            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="text-[13px] font-bold text-gray-900" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                            THE O'GAD IMPACT GROUP
                        </span>
                    </Link>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                        Create an account
                    </h1>
                    <p className="text-sm text-gray-500 mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        Already have one?{' '}
                        <Link href="/auth/login" className="font-semibold transition-colors" style={{ color: '#306CEC' }}>
                            Sign in
                        </Link>
                    </p>

                    {error && (
                        <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5" style={{ fontFamily: 'DM Sans, sans-serif' }}>First Name</label>
                                <input
                                    name="firstName" type="text" required value={formData.firstName} onChange={handleChange} placeholder="Jane"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-[#306CEC] focus:ring-2 focus:ring-[#306CEC]/10 transition-all"
                                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5" style={{ fontFamily: 'DM Sans, sans-serif' }}>Last Name</label>
                                <input
                                    name="lastName" type="text" required value={formData.lastName} onChange={handleChange} placeholder="Doe"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-[#306CEC] focus:ring-2 focus:ring-[#306CEC]/10 transition-all"
                                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5" style={{ fontFamily: 'DM Sans, sans-serif' }}>Email address</label>
                            <input
                                name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="jane@company.com"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-[#306CEC] focus:ring-2 focus:ring-[#306CEC]/10 transition-all"
                                style={{ fontFamily: 'DM Sans, sans-serif' }}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5" style={{ fontFamily: 'DM Sans, sans-serif' }}>Password</label>
                            <input
                                name="password" type="password" required minLength={6} value={formData.password} onChange={handleChange} placeholder="Min. 6 characters"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-[#306CEC] focus:ring-2 focus:ring-[#306CEC]/10 transition-all"
                                style={{ fontFamily: 'DM Sans, sans-serif' }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                            style={{ backgroundColor: '#306CEC', fontFamily: 'DM Sans, sans-serif' }}
                        >
                            {isLoading ? 'Creating account…' : 'Create Account'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { checkIsAdmin } from '@/lib/checkAdmin';

export default function Login() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });
            if (signInError) throw signInError;
            const isAdmin = data.user ? await checkIsAdmin(data.user.id) : false;
            router.push(isAdmin ? '/admin/dashboard' : '/');
        } catch (err: any) {
            setError(err.message || 'Invalid login credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left panel — brand */}
            <div
                className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 relative overflow-hidden"
                style={{ backgroundColor: '#030712' }}
            >
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '48px 48px'
                }} />
                {/* Blue glow */}
                <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-20 blur-[100px]" style={{ backgroundColor: '#306CEC' }} />

                {/* Logo */}
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

                {/* Mid content */}
                <div className="relative z-10">
                    <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-6" style={{ color: '#306CEC', fontFamily: 'DM Sans, sans-serif' }}>
                        Admin Portal
                    </p>
                    <h2 className="font-bold text-white leading-[1.1] mb-6" style={{ fontFamily: 'League Spartan, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
                        Manage every booking request in one place.
                    </h2>
                    <p className="text-gray-400 leading-relaxed text-[15px]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        Sign in to review incoming consultations and keep the team aligned across every agency.
                    </p>
                </div>

                {/* Bottom quote */}
                <div className="relative z-10 border-l-2 pl-5" style={{ borderColor: '#306CEC' }}>
                    <p className="text-white/60 text-sm italic leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        "Our work goes beyond advisory. We design, build, and implement."
                    </p>
                    <p className="text-white/30 text-xs mt-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>The O'GAD Impact Group</p>
                </div>
            </div>

            {/* Right panel — form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
                <div className="w-full max-w-sm">
                    {/* Mobile logo */}
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
                        Welcome back
                    </h1>
                    <p className="text-sm text-gray-500 mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        Admin sign-in for The O'GAD Impact Group.
                    </p>

                    {error && (
                        <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                                Email address
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="jane@company.com"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-[#306CEC] focus:ring-2 focus:ring-[#306CEC]/10 transition-all"
                                style={{ fontFamily: 'DM Sans, sans-serif' }}
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-sm font-semibold text-gray-700" style={{ fontFamily: 'DM Sans, sans-serif' }}>Password</label>
                                <a href="#" className="text-xs font-medium transition-colors" style={{ color: '#306CEC', fontFamily: 'DM Sans, sans-serif' }}>
                                    Forgot password?
                                </a>
                            </div>
                            <input
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-[#306CEC] focus:ring-2 focus:ring-[#306CEC]/10 transition-all"
                                style={{ fontFamily: 'DM Sans, sans-serif' }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                            style={{ backgroundColor: '#306CEC', fontFamily: 'DM Sans, sans-serif' }}
                        >
                            {isLoading ? 'Signing in…' : 'Sign in'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

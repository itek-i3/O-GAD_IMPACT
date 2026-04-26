'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

interface BookingRequest {
    id: string;
    service_requested: string;
    status: string;
    created_at: string;
    project_description: string;
    scheduled_date: string | null;
}

export default function Dashboard() {
    const [requests, setRequests] = useState<BookingRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                const user = session?.user ?? null;

                if (!user) {
                    window.location.href = '/auth/login';
                    return;
                }

                setUserName(user.user_metadata?.first_name || user.email?.split('@')[0] || 'User');

                const { data: bookingData, error } = await supabase
                    .from('booking_requests')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setRequests(bookingData || []);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchDashboardData();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'contacted': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'approved': return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
            case 'resolved': return 'bg-gray-100 text-gray-800 border-gray-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const formatService = (service: string) => {
        return service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#306CEC]"></div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50/50 pb-20 font-body">
            {/* Premium Animated Header */}
            <div className="relative w-full h-[320px] overflow-hidden">
                <Image
                    src="/images/hero_images/Home-hero.jpg"
                    alt="Client Dashboard Banner"
                    fill
                    className="object-cover w-full h-full animate-zoomIn"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-blue-900/40"></div>

                <div className="absolute inset-0 max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center">
                    <div className="space-y-4 animate-fadeIn">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-blue-200 bg-blue-900/30 border border-blue-400/20 uppercase animate-slideInLeft">
                            Client Portal
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white font-heading animate-slideInLeft" style={{ animationDelay: '0.1s', opacity: 0, animation: 'slideInLeft 0.8s ease-out 0.1s forwards' }}>
                            Welcome back, <span className="text-[#306CEC]">{userName}</span>!
                        </h1>
                        <p className="text-lg text-gray-300 max-w-2xl animate-slideInLeft" style={{ animationDelay: '0.2s', opacity: 0, animation: 'slideInLeft 0.8s ease-out 0.2s forwards' }}>
                            Manage your consultation requests, track project statuses, and review scheduled meetings all in one place.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-4 relative z-10">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden animate-slideInUp" style={{ animationDelay: '0.3s', opacity: 0, animation: 'slideInUp 0.8s ease-out 0.3s forwards' }}>
                    <div className="px-6 md:px-8 py-6 border-b border-gray-100 bg-white/50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <h2 className="text-xl font-bold text-gray-900 font-heading flex items-center gap-2">
                            <div className="p-1.5 bg-blue-100 rounded-md text-[#306CEC]">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                            </div>
                            Your Booked Sessions
                        </h2>
                        <Link href="/services" className="text-sm font-medium text-white hover:bg-blue-700 bg-[#306CEC] px-5 py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md text-center">
                            Book New Session
                        </Link>
                    </div>

                    {requests.length === 0 ? (
                        <div className="p-16 text-center bg-gray-50/50">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100">
                                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2 font-heading">No sessions booked yet</h3>
                            <p className="text-gray-500 mb-8 max-w-sm mx-auto text-lg pt-2">You haven't requested any consultations yet. Explore our services to find the right fit for your business.</p>
                            <Link href="/services" className="inline-block px-8 py-3.5 bg-[#306CEC] text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                                Explore Services
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100 bg-white">
                            {requests.map((request, idx) => (
                                <div
                                    key={request.id}
                                    className="p-6 md:p-8 hover:bg-blue-50/30 transition-all duration-300 animate-fadeIn"
                                    style={{ animationDelay: `${0.1 * idx}s` }}
                                >
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-5">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">{formatService(request.service_requested)}</h3>
                                            <p className="text-sm text-gray-500 font-medium tracking-wide">
                                                Requested on <span className="text-gray-700">{new Date(request.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}</span>
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-start md:items-end gap-3 min-w-max">
                                            <span className={`inline-flex items-center px-3.5 py-1.5 rounded-md text-xs font-bold border ${getStatusColor(request.status)} uppercase tracking-wider shadow-sm`}>
                                                {request.status}
                                            </span>
                                            {request.scheduled_date && (
                                                <div className="text-sm font-bold text-[#306CEC] flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-md border border-blue-100 shadow-sm">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    {new Date(request.scheduled_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="bg-gray-50/80 p-5 rounded-xl border border-gray-100">
                                        <p className="text-gray-600 text-sm leading-relaxed font-medium">
                                            {request.project_description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';
import { getStatusColor, formatService } from '@/lib/bookingUtils';
import AdminBookingModal from '@/components/AdminBookingModal';

interface BookingRequest {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    company_name: string;
    service_requested: string;
    project_description: string;
    budget_range: string;
    status: string;
    scheduled_date: string | null;
    admin_notes: string | null;
    created_at: string;
}

export default function AdminDashboard() {
    const [requests, setRequests] = useState<BookingRequest[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('booking_requests')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setRequests(data || []);
        } catch (error) {
            console.error('Error fetching admin requests:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();

        // Real-time subscription — auto-refresh when any booking is inserted or updated
        const channel = supabase
            .channel('booking_requests_admin')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'booking_requests' }, () => {
                fetchRequests();
            })
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, []);

    const handleRowClick = (booking: BookingRequest) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };


    return (
        <div className="min-h-screen bg-gray-50/50 font-body pb-20">
            {/* Premium Animated Header */}
            <div className="relative w-full h-[320px] overflow-hidden">
                <Image
                    src="/images/hero_images/business-hero (2).jpg"
                    alt="Admin Portal Banner"
                    fill
                    className="object-cover w-full h-full animate-zoomIn"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-blue-900/40"></div>

                <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
                    <div className="space-y-4 animate-fadeIn">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-blue-200 bg-blue-900/30 border border-blue-400/20 uppercase animate-slideInLeft">
                            Executive Portal
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white font-heading animate-slideInLeft" style={{ animationDelay: '0.1s', opacity: 0, animation: 'slideInLeft 0.8s ease-out 0.1s forwards' }}>
                            Command Center
                        </h1>
                        <p className="text-lg text-gray-300 max-w-2xl animate-slideInLeft" style={{ animationDelay: '0.2s', opacity: 0, animation: 'slideInLeft 0.8s ease-out 0.2s forwards' }}>
                            Review bookings, schedule meetings, and manage the client pipeline with precision.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-10">

                {/* Glassmorphic Stat Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-slideInUp" style={{ animationDelay: '0.3s', opacity: 0, animation: 'slideInUp 0.8s ease-out 0.3s forwards' }}>
                    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/40 p-5 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Requests</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{requests.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100/50 rounded-full flex items-center justify-center text-[#306CEC]">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/40 p-5 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Pending Action</p>
                                <p className="text-3xl font-bold text-yellow-600 mt-1">{requests.filter(r => r.status === 'pending').length}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100/50 rounded-full flex items-center justify-center text-yellow-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/40 p-5 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Scheduled</p>
                                <p className="text-3xl font-bold text-purple-600 mt-1">{requests.filter(r => r.status === 'scheduled').length}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100/50 rounded-full flex items-center justify-center text-purple-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="animate-slideInUp" style={{ animationDelay: '0.4s', opacity: 0, animation: 'slideInUp 0.8s ease-out 0.4s forwards' }}>
                        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden mb-8">
                            <div className="px-6 py-5 border-b border-gray-100 bg-white/50 backdrop-blur-sm flex justify-between items-center">
                                <h2 className="text-lg font-bold text-gray-900 font-heading">Recent Requests</h2>
                                <span className="text-sm text-gray-500 font-medium">Sorted by Newest</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-100">
                                    <thead className="bg-gray-50/50">
                                        <tr>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Service</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Submitted</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Schedule</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100 text-sm">
                                        {loading ? (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-12 text-center">
                                                    <div className="flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#306CEC]"></div></div>
                                                </td>
                                            </tr>
                                        ) : requests.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                                    No booking requests found.
                                                </td>
                                            </tr>
                                        ) : (
                                            requests.map((request, idx) => (
                                                <tr
                                                    key={request.id}
                                                    onClick={() => handleRowClick(request)}
                                                    className="hover:bg-blue-50/50 cursor-pointer transition-all duration-200 group animate-fadeIn"
                                                    style={{ animationDelay: `${0.1 * idx}s` }}
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="font-semibold text-gray-900 group-hover:text-[#306CEC] transition-colors flex items-center gap-2">
                                                            <div className="w-8 h-8 rounded-full bg-blue-100 text-[#306CEC] flex items-center justify-center font-bold text-xs">
                                                                {request.first_name[0]}{request.last_name[0]}
                                                            </div>
                                                            <div>
                                                                <div>{request.first_name} {request.last_name}</div>
                                                                <div className="text-xs text-gray-500 font-normal">{request.company_name || 'Individual'}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                                                        {formatService(request.service_requested)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                        {new Date(request.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {request.scheduled_date ? (
                                                            <div className="whitespace-nowrap text-xs bg-purple-50 px-2.5 py-1.5 flex items-center gap-1.5 w-max rounded-md text-purple-700 border border-purple-200 shadow-sm font-medium">
                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                                {new Date(request.scheduled_date).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}
                                                            </div>
                                                        ) : request.status === 'scheduled' ? (
                                                            <span className="whitespace-nowrap text-xs bg-purple-50 px-2.5 py-1.5 flex items-center gap-1.5 w-max rounded-md text-purple-700 border border-purple-200 shadow-sm font-medium">
                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                                Calendly Confirmed
                                                            </span>
                                                        ) : (
                                                            <span className="text-gray-400 italic text-xs flex items-center gap-1">
                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                                Awaiting Schedule
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border uppercase tracking-wider shadow-sm ${getStatusColor(request.status)}`}>
                                                            {request.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

            </div>

            <AdminBookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                booking={selectedBooking}
                onSave={fetchRequests}
            />

        </div>
    );
}

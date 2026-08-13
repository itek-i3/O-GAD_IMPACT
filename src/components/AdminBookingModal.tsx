import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { getStatusColor, formatService } from '@/lib/bookingUtils';

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

interface AdminBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking: BookingRequest | null;
    onSave: () => void; // Triggered when data updates to refresh table
}

export default function AdminBookingModal({ isOpen, onClose, booking, onSave }: AdminBookingModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Editable fields
    const [status, setStatus] = useState('');
    const [scheduledDate, setScheduledDate] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');
    const [adminNotes, setAdminNotes] = useState('');

    // Reset local state when a new booking is opened
    useEffect(() => {
        if (booking && isOpen) {
            setStatus(booking.status);
            setAdminNotes(booking.admin_notes || '');

            if (booking.scheduled_date) {
                const dateObj = new Date(booking.scheduled_date);
                // Format to YYYY-MM-DD for input type="date"
                setScheduledDate(dateObj.toISOString().split('T')[0]);
                // Format to HH:MM for input type="time"
                setScheduledTime(dateObj.toISOString().split('T')[1].substring(0, 5));
            } else {
                setScheduledDate('');
                setScheduledTime('');
            }
        }
    }, [booking, isOpen]);

    if (!isOpen || !booking) return null;

    const handleSave = async () => {
        setIsSubmitting(true);

        try {
            let finalDateStr = null;
            if (scheduledDate && scheduledTime) {
                // Combine date and time strings into a timestamp format for Supabase
                finalDateStr = new Date(`${scheduledDate}T${scheduledTime}:00Z`).toISOString();
            } else if (scheduledDate && !scheduledTime) {
                finalDateStr = new Date(`${scheduledDate}T12:00:00Z`).toISOString(); // Default noon
            }

            const { error } = await supabase
                .from('booking_requests')
                .update({
                    status: status,
                    admin_notes: adminNotes,
                    scheduled_date: finalDateStr
                })
                .eq('id', booking.id);

            if (error) throw error;

            onSave(); // Refresh parent table
            onClose(); // Close modal
        } catch (err) {
            console.error("Failed to update booking:", err);
            alert("Failed to save changes. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <>
            <div className="fixed inset-0 z-[100] bg-gray-900/50 backdrop-blur-sm transition-opacity" onClick={onClose} />

            <div className="fixed inset-y-0 right-0 z-[110] w-full max-w-xl bg-white shadow-2xl overflow-y-auto translate-x-0 transition-transform font-body">
                <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 font-heading">Consultation Details</h2>
                            <p className="text-gray-500 text-sm mt-1">Request ID: <span className="font-mono text-xs">{booking.id.split('-')[0]}...</span></p>
                        </div>
                        <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div className="space-y-8">
                        {/* Client Info Section */}
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3 border-b pb-2">Client Information</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="block text-gray-500 mb-1">Name</span>
                                    <span className="font-medium text-gray-900">{booking.first_name} {booking.last_name}</span>
                                </div>
                                <div>
                                    <span className="block text-gray-500 mb-1">Company</span>
                                    <span className="font-medium text-gray-900">{booking.company_name || 'N/A'}</span>
                                </div>
                                <div>
                                    <span className="block text-gray-500 mb-1">Email</span>
                                    <a href={`mailto:${booking.email}`} className="font-medium text-[#306CEC] hover:underline">{booking.email}</a>
                                </div>
                                <div>
                                    <span className="block text-gray-500 mb-1">Phone</span>
                                    <a href={`tel:${booking.phone}`} className="font-medium text-[#306CEC] hover:underline">{booking.phone || 'N/A'}</a>
                                </div>
                            </div>
                        </div>

                        {/* Project Details Section */}
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3 border-b pb-2">Project Request</h3>
                            <div className="space-y-4 text-sm">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="block text-gray-500 mb-1">Agency Needed</span>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                            {formatService(booking.service_requested)}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-500 mb-1">Budget</span>
                                        <span className="font-medium text-gray-900">{booking.budget_range || 'Unspecified'}</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="block text-gray-500 mb-2">Project Description</span>
                                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-gray-800 leading-relaxed">
                                        {booking.project_description}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Admin Controls Section */}
                        <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                            <h3 className="text-sm font-bold tracking-tight text-[#306CEC] mb-4 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                Management Controls
                            </h3>

                            <div className="space-y-5">
                                {/* Calendly-booked date banner */}
                                {booking.scheduled_date && booking.status === 'scheduled' && (
                                    <div className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-purple-700 uppercase tracking-wider">Booked via Calendly</p>
                                            <p className="text-sm font-bold text-purple-900">
                                                {new Date(booking.scheduled_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                                {' at '}
                                                {new Date(booking.scheduled_date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#306CEC] outline-none text-sm font-semibold capitalize ${getStatusColor(status)} border-transparent`}
                                    >
                                        <option value="pending">Pending Review</option>
                                        <option value="contacted">Contacted</option>
                                        <option value="scheduled">Scheduled</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                        <option value="resolved">Resolved / Completed</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Date</label>
                                        <input
                                            type="date"
                                            value={scheduledDate}
                                            onChange={(e) => setScheduledDate(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306CEC] outline-none text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Time (UTC)</label>
                                        <input
                                            type="time"
                                            value={scheduledTime}
                                            onChange={(e) => setScheduledTime(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306CEC] outline-none text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Internal Notes (Not visible to client)</label>
                                    <textarea
                                        value={adminNotes}
                                        onChange={(e) => setAdminNotes(e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306CEC] outline-none text-sm resize-none"
                                        placeholder="Add details about the review, next steps, or specific consultants assigned..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4 border-t border-gray-100">
                            <button
                                onClick={onClose}
                                className="flex-1 py-2.5 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSubmitting}
                                className="flex-1 py-2.5 px-4 bg-[#306CEC] rounded-lg text-white font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-70 flex justify-center items-center"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

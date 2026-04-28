export const CALENDLY_URL = 'https://calendly.com/o-maxwellgad';

export function getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
        case 'pending':   return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'contacted': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'scheduled': return 'bg-purple-100 text-purple-800 border-purple-200';
        case 'approved':  return 'bg-green-100 text-green-800 border-green-200';
        case 'rejected':  return 'bg-red-100 text-red-800 border-red-200';
        case 'resolved':  return 'bg-gray-100 text-gray-800 border-gray-200';
        default:          return 'bg-gray-100 text-gray-800 border-gray-200';
    }
}

export function formatService(service: string): string {
    return service.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

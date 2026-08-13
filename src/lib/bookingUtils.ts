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

// Known agency slugs get their proper brand casing; anything else
// (including legacy pre-restructure values like 'business-strategy')
// falls back to a generic title-cased split.
const SERVICE_LABELS: Record<string, string> = {
    'i3-plus-marketing': 'I3 Plus',
    'i-plus-marketing': 'I3 Plus', // legacy slug from before the I3+ rename — keep so old bookings still display correctly
    'i3x-events': 'I3X Africa',
    'i3-launchpad': 'I3 Launchpad',
    'itek': 'iTek',
    'i3-studios': 'I3 Studios',
    'impact360': 'Impact360',
    'impactfund': 'ImpactFund', // legacy slug — ImpactFund was replaced by Impact360 in the agency roster, keep so old bookings still display correctly
};

export function formatService(service: string): string {
    if (SERVICE_LABELS[service]) return SERVICE_LABELS[service];
    return service.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

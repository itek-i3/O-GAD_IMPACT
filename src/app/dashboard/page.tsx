import { redirect } from 'next/navigation';

// Customer accounts/login were removed in favor of guest bookings —
// there is no longer a personal "my bookings" dashboard.
export default function DashboardRedirect() {
  redirect('/');
}

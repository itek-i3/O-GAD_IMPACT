import { redirect } from 'next/navigation';

// Public signup is no longer offered — the site runs on guest bookings
// plus a single super-admin account managed directly in Supabase.
export default function SignupRedirect() {
  redirect('/auth/login');
}

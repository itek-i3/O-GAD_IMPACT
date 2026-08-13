import { redirect } from 'next/navigation';

// Scaling & Expansion Support is now covered by I3 Launchpad.
export default function ScalingRedirect() {
  redirect('/agencies/i3-launchpad');
}

import { redirect } from 'next/navigation';

// Business & Strategy Consultancy is now covered by I3 Launchpad.
export default function BusinessStrategyRedirect() {
  redirect('/agencies/i3-launchpad');
}

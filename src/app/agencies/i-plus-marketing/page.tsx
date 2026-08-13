import { redirect } from 'next/navigation';

// I+ Marketing was renamed to I3+ Marketing; send old links to the new slug.
export default function IPlusMarketingRedirect() {
  redirect('/agencies/i3-plus-marketing');
}

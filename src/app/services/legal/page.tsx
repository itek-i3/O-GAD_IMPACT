import { redirect } from 'next/navigation';

// Legal & Business Structuring is not part of TOIG's current agency
// structure (Impact360, I3+ Marketing, I3X Africa, I3 Launchpad, iTek,
// I3 Studios). Send old links to the agencies overview.
export default function LegalRedirect() {
  redirect('/agencies');
}

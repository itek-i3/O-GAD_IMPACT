import { redirect } from 'next/navigation';

// ImpactFund was replaced by Impact360 in the agency roster; send old links to the new slug.
export default function ImpactFundRedirect() {
  redirect('/agencies/impact360');
}

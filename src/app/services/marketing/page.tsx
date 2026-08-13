import { redirect } from 'next/navigation';

// Marketing, Sales & Growth Advisory is now covered by I3+ Marketing.
export default function MarketingRedirect() {
  redirect('/agencies/i3-plus-marketing');
}

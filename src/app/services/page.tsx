import { redirect } from 'next/navigation';

// TOIG restructured around Impact360 + six specialized agencies.
// This route is kept so old links/bookmarks still resolve.
export default function ServicesRedirect() {
  redirect('/agencies');
}

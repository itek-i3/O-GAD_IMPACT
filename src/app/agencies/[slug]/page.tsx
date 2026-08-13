import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { agencies, getAgency } from '@/data/agencies';
import AgencyDetail from '@/components/components/AgencyDetail';
import I3PlusMarketingDetail from '@/components/components/I3PlusMarketingDetail';
import I3StudiosDetail from '@/components/components/I3StudiosDetail';
import I3XDetail from '@/components/components/I3XDetail';
import I3LaunchpadDetail from '@/components/components/I3LaunchpadDetail';
import ITekDetail from '@/components/components/ITekDetail';

// Agencies with a bespoke, hand-designed page instead of the shared template.
const CUSTOM_DETAIL: Record<string, typeof AgencyDetail> = {
  'i3-plus-marketing': I3PlusMarketingDetail,
  'i3-studios': I3StudiosDetail,
  'i3x-events': I3XDetail,
  'i3-launchpad': I3LaunchpadDetail,
  'itek': ITekDetail,
};

export function generateStaticParams() {
  return agencies.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const agency = getAgency(slug);
  if (!agency) return {};
  return {
    title: `${agency.name} | The O'GAD Impact Group`,
    description: agency.description,
  };
}

export default async function AgencyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agency = getAgency(slug);
  if (!agency) notFound();
  const Detail = CUSTOM_DETAIL[slug] ?? AgencyDetail;
  return <Detail agency={agency} />;
}

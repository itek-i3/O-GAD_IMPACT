import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { members, getMember } from '@/data/members';
import MemberDetail from '@/components/components/MemberDetail';

export function generateStaticParams() {
  return members.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const member = getMember(slug);
  if (!member) return {};
  return {
    title: `${member.name} | The O'GAD Impact Group`,
    description: member.description,
  };
}

export default async function MemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = getMember(slug);
  if (!member) notFound();
  return <MemberDetail member={member} />;
}

import { notFound } from 'next/navigation';
import { findCase } from '@/content/cases';
import CaseRunner from '@/components/case/CaseRunner';

export default function CasePage({ params }: { params: { caseId: string } }) {
  const caseDef = findCase(params.caseId);
  if (!caseDef || caseDef.comingSoon) notFound();
  return <CaseRunner caseDef={caseDef} />;
}

export async function generateStaticParams() {
  return [
    { caseId: 'case-01-buzz' },
    { caseId: 'case-02-gacha' },
  ];
}

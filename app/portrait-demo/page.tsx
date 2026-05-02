import PixelPortrait, {
  CharacterId,
  Expression,
} from '@/components/characters/PixelPortrait';

const characters: { id: CharacterId; name: string }[] = [
  { id: 'yamada', name: '山田(ケース1依頼人)' },
  { id: 'sato', name: '佐藤(ケース2依頼人)' },
  { id: 'akari', name: '灯里(ケース3依頼人)' },
  { id: 'detective', name: 'データ探偵(あなた)' },
];

const expressions: Expression[] = [
  'neutral',
  'worried',
  'distraught',
  'shocked',
  'eureka',
  'hopeful',
  'angry',
  'tired',
  'thinking',
];

export default function PortraitDemoPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-4 sm:p-8">
      <h1 className="font-detective text-2xl sm:text-3xl text-amber-300 text-center mb-8">
        キャラクター × 表情マトリクス
      </h1>

      {characters.map((c) => (
        <section key={c.id} className="mb-12">
          <h2 className="font-detective text-xl text-slate-100 mb-3">{c.name}</h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
            {expressions.map((exp) => (
              <div key={exp} className="text-center">
                <div className="rounded-lg overflow-hidden border border-slate-800">
                  <PixelPortrait characterId={c.id} expression={exp} size={140} />
                </div>
                <div className="text-[10px] text-slate-400 mt-1">{exp}</div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

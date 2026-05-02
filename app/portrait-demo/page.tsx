import PixelPortrait from '@/components/characters/PixelPortrait';

export default function PortraitDemoPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center gap-8 p-4 sm:p-8">
      <h1 className="font-detective text-2xl sm:text-3xl text-amber-300 text-center">
        山田さん v3 — 120×150 px / 40色 / 立体ライティング + 顔の非対称 + 肌テクスチャ
      </h1>

      {/* 大画面 */}
      <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl shadow-amber-500/10">
        <PixelPortrait size={720} />
      </div>

      {/* サイズ違い比較 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-end">
        <div className="text-center">
          <PixelPortrait size={120} />
          <div className="text-xs text-slate-400 mt-1">120px</div>
        </div>
        <div className="text-center">
          <PixelPortrait size={240} />
          <div className="text-xs text-slate-400 mt-1">240px</div>
        </div>
        <div className="text-center">
          <PixelPortrait size={400} />
          <div className="text-xs text-slate-400 mt-1">400px</div>
        </div>
        <div className="text-center">
          <PixelPortrait size={600} />
          <div className="text-xs text-slate-400 mt-1">600px</div>
        </div>
      </div>

      <div className="max-w-2xl text-sm text-slate-400 leading-relaxed">
        <p className="mb-2"><b className="text-amber-accent">v3 で追加した実写要素:</b></p>
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1 list-disc list-inside text-xs">
          <li>解像度 120×150 = 18,000 ピクセル(従来比 2.25 倍)</li>
          <li>40色パレット(肌12段階、髪7段階)</li>
          <li>顔の左右非対称(片目高め、眉非対称)</li>
          <li>肌テクスチャノイズ(毛穴感)</li>
          <li>額の心配しわ(横線2本)</li>
          <li>カラスの足跡(目尻の小じわ)</li>
          <li>鼻翼溝(法令線の薄い影)</li>
          <li>5時のヒゲ(剃り残し)</li>
          <li>右耳(髪の隙間から覗く)</li>
          <li>唇のたて筋</li>
          <li>白目の充血(疲労)</li>
          <li>喉仏のはっきりした立体</li>
          <li>襟のしわ・斜めストライプのネクタイ柄</li>
        </ul>
      </div>
    </main>
  );
}

import PixelPortrait from '@/components/characters/PixelPortrait';

export default function PortraitDemoPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="font-detective text-2xl text-amber-300">山田さん — ピクセルポートレート試作</h1>
      <div className="grid grid-cols-3 gap-8 items-end">
        <div className="text-center">
          <PixelPortrait size={96} />
          <div className="text-xs text-slate-400 mt-2">96px</div>
        </div>
        <div className="text-center">
          <PixelPortrait size={192} />
          <div className="text-xs text-slate-400 mt-2">192px</div>
        </div>
        <div className="text-center">
          <PixelPortrait size={384} />
          <div className="text-xs text-slate-400 mt-2">384px</div>
        </div>
      </div>
      <p className="text-sm text-slate-400 max-w-md text-center">
        32×40 ピクセルグリッドに、形状演算 + 左上光源のライティングで肌を5段階に陰影付け。瞳のスパークル・額の汗・困り眉・緩いネクタイで「500万円が消えた直後」の表情に。
      </p>
    </main>
  );
}

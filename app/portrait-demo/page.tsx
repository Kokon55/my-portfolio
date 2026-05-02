import PixelPortrait from '@/components/characters/PixelPortrait';

export default function PortraitDemoPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-8 p-4 sm:p-12">
      <h1 className="font-detective text-2xl sm:text-3xl text-amber-300">
        山田さん — 高解像度ポートレート(80×100 px / 32色)
      </h1>

      {/* 等倍に近い大画面表示 */}
      <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
        <PixelPortrait size={640} />
      </div>

      {/* サイズ違い比較 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 items-end">
        <div className="text-center">
          <PixelPortrait size={80} />
          <div className="text-xs text-slate-400 mt-1">80px</div>
        </div>
        <div className="text-center">
          <PixelPortrait size={160} />
          <div className="text-xs text-slate-400 mt-1">160px</div>
        </div>
        <div className="text-center">
          <PixelPortrait size={320} />
          <div className="text-xs text-slate-400 mt-1">320px</div>
        </div>
        <div className="text-center">
          <PixelPortrait size={480} />
          <div className="text-xs text-slate-400 mt-1">480px</div>
        </div>
      </div>

      <div className="max-w-xl text-sm text-slate-400 leading-relaxed">
        <p className="mb-2"><b className="text-amber-accent">技術メモ:</b></p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>解像度 80×100 px(従来の 6 倍)。32色パレット</li>
          <li>顔は 3D 楕円体としてモデル化、表面法線から主光源(左上前方)+補助光(右上)+環境光で輝度計算</li>
          <li>肌は 8 段階に陰影付け。頬・鼻先には別途サブサーフェス散乱(赤み)を上乗せ</li>
          <li>髪は 6 段階(分け目ハイライト + 毛流れノイズ)</li>
          <li>目は白目影 / 虹彩外周・中・明部 / 瞳 / キャッチライト / 上下まつ毛 / 涙袋 / クマ の 9 層構造</li>
          <li>困り眉は内側上がり、口はキューピッドの弓 + ふくよかな下唇 + 口角の影</li>
          <li>ネクタイは結び目 + 縦の本体に skew(緩んだ角度)</li>
        </ul>
      </div>
    </main>
  );
}

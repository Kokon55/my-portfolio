# 音楽デザイン詳細指示

> このドキュメントは、データ探偵ゲームに使用する **全 BGM・効果音(SE)の仕様** を
> 定義したものです。実装は `lib/bgm.ts` および `lib/se.ts` にあり、
> ファイルが無い場合は Web Audio API による合成へ自動フォールバックします。

実装方針:

- `public/bgm/{trackId}.mp3` と `public/se/{seId}.mp3` のパス規約
- ファイルがあれば `<audio>` でループ再生、なければ既存 Web Audio 合成にフォールバック
- 音量調整スライダー(BGM・SE 別)とミュートボタンを実装済み
  (ゲーム内ヘッダー → 🔊/🔇 アイコン → サウンド設定パネル)

詳細仕様は `15_MUSIC_DESIGN.md` の元設計書を参照。
本リポジトリの該当実装:

- `lib/bgm.ts` — 19 トラックのフォールバック合成プロファイル + ケース別 TrackId 解決
- `lib/se.ts` — 21 種の SE フォールバック合成 + ファイル優先再生
- `lib/store.ts` — `bgmVolume` / `seVolume` の永続化
- `components/case/CaseRunner.tsx` — サウンド設定パネル + 幕遷移時の SE
- `components/interactions/ChoiceQuestion.tsx` — 正解/不正解 SE
- `components/interactions/SliderEstimate.tsx` — 正解/不正解 SE
- `components/case/CaseStep.tsx` — ヒント開示 SE

ファイルを差し替える場合は `public/bgm/README.md` および `public/se/README.md` を参照。

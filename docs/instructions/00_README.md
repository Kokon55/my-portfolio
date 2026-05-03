# データ探偵ゲーム 完全改修指示書

このフォルダには、`Kokon55/my-portfolio` リポジトリの `claude/data-detective-game-bYqyC` ブランチを大幅改修するための、Claude Code向け完全指示書一式が入っています。

## 📂 ファイル構成

| # | ファイル | 役割 |
|---|---|---|
| 01 | `01_PROJECT_OVERVIEW.md` | プロジェクト全体像とゴール |
| 02 | `02_TECHNICAL_SPEC.md` | 技術仕様・Phase分け・既存バグ修正 |
| 03 | `03_STORY_BIBLE.md` | 世界観・大きな謎・伏線設計 |
| 04-13 | `04_CASE_01_BUZZ.md` 〜 `13_CASE_10_FINAL.md` | 全10話の詳細シナリオ |
| 14 | `14_CHARACTER_PROMPTS.md` | Geminiキャラ画像生成プロンプト |
| 15 | `15_MUSIC_DESIGN.md` | 音楽デザイン詳細指示 |

## 🚀 Claude Code への渡し方

**一気に全部渡すと破綻します**。Phase順に分割して渡すのを強く推奨します。

### 推奨フロー

#### Step 1：全体把握させる
```
以下のドキュメント群を熟読してから、Phase 1だけを実装してください。

[01_PROJECT_OVERVIEW.md, 02_TECHNICAL_SPEC.md, 03_STORY_BIBLE.md の内容を貼る]

まずPhase 1のみを実装し、PRを作ってください。Phase 2以降は別途指示します。
```

#### Step 2：Phase 1完了後、Phase 2を渡す
```
Phase 1のPRをmergeしました。次にPhase 2を実装してください。

[02_TECHNICAL_SPEC.md の Phase 2 部分 + 04, 05, 06, 07, 08 のシナリオファイルを貼る]
```

以下同様に Phase 3, 4, 5 を順に渡す。

### Phaseと必要ファイルの対応

| Phase | 内容 | 渡すファイル |
|---|---|---|
| 1 | 正解ロック実装 + 段階ヒント + ケース1〜3のボス問題追加 | 01, 02 (Phase 1部分), 03, 04, 05, 06 |
| 2 | 統計数値表ビューア + 公式ノート + ケース4・5実装 | 02 (Phase 2部分), 07, 08 |
| 3 | ケース6・7・8実装 + ミニ演習モード + 電卓制約モード | 02 (Phase 3部分), 09, 10, 11 |
| 4 | ケース9・10実装 + 修了証PDF | 02 (Phase 4部分), 12, 13 |
| 5 | Geminiキャラ画像差し替え + 実音源BGM/SE導入 | 02 (Phase 5部分), 14, 15 |

## ⚠️ 注意事項

- **Phase 1だけでも完了すればゲームとして遊べる状態になります**。最優先はPhase 1。
- 各Phase完了時に `npm run build` 警告ゼロ・`npm test` 全パスを確認してください。
- 既存の型定義（`Case` / `Act` / `ActStep` / `InteractionConfig`）は互換性を保ちつつ拡張してください。

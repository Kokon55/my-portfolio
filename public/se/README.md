# SE(効果音)ファイル配置ガイド

このディレクトリに **`{seId}.mp3`** という名前で効果音ファイルを置くと、
ゲーム実行時に自動でファイルから再生します。

ファイルが**無い場合**は、Web Audio API で合成した即席 SE が代わりに鳴ります。
体験は劣化しますがゲームは動作します。

## ファイル名と用途(全 21 種)

### A. インタラクション系

| ファイル名 | 用途 | 推奨長 |
|---|---|---|
| `correct_chime.mp3` | 正解時 | 約 500ms 上行2音の鐘 |
| `wrong_buzz.mp3` | 不正解時 | 約 300ms 下行ブザー(優しい) |
| `hint_unlock.mp3` | ヒント開示時 | 約 400ms 柔らかい鐘 |
| `button_click.mp3` | ボタン押下 | 約 100ms クリック音 |
| `step_advance.mp3` | 「次へ」進む | 約 200ms ページめくり風 |

### B. ストーリー演出系

| ファイル名 | 用途 |
|---|---|
| `door_creak.mp3` | 来客の登場・ドア軋み |
| `omen_drone.mp3` | 「3つの目」発覚・伏線 |
| `reveal_strike.mp3` | 真相判明・決定的瞬間 |
| `emotional_strike.mp3` | 感情的クライマックス |
| `warm_chime.mp3` | 救済・絆の確認 |

### C. 章クリア系

| ファイル名 | 用途 |
|---|---|
| `chapter_clear.mp3` | 各幕終了 |
| `case_solved.mp3` | 事件解決 |
| `certificate_chime.mp3` | 修了証発行 |

### D. ボス・組織関連

| ファイル名 | 用途 |
|---|---|
| `villain_exit.mp3` | ボス幹部退場 |
| `subtle_chime.mp3` | 微妙な人間性が垣間見える |
| `final_omen.mp3` | 最終話への伏線 |
| `transform_omen.mp3` | 幽鬼丸の第2形態変身 |
| `victory_fanfare.mp3` | 最終決戦勝利時 |

### E. UI 系

| ファイル名 | 用途 |
|---|---|
| `modal_open.mp3` | モーダル開く |
| `modal_close.mp3` | モーダル閉じる |
| `toast_appear.mp3` | トースト通知 |

## 推奨無料音源サイト

- [効果音ラボ](https://soundeffect-lab.info/)(日本語、ゲーム向け)
- [OtoLogic](https://otologic.jp/)(業務利用OK・効果音特化)
- [Freesound](https://freesound.org/)(海外、CC ライセンス)

## 推奨フォーマット

- **形式**:MP3(128 kbps 以上)
- **音量**:インタラクション系 -10 LUFS、UI 系 -16 LUFS、演出系 -8 LUFS
- **チャンネル**:モノ or ステレオ

ファイルを置いたら `git add public/se/*.mp3` でコミットしてください。

# BGM ファイル配置ガイド

このディレクトリに **`{trackId}.mp3`** という名前で BGM ファイルを置くと、
ゲーム実行時に自動でファイルからループ再生します。

ファイルが**無い場合**は、Web Audio API で合成した即席 BGM が代わりに鳴ります。
体験は劣化しますがゲームは動作します。

## ファイル名と用途(全 19 トラック)

| ファイル名 | 用途 | 詳細仕様 |
|---|---|---|
| `commission_noir.mp3` | ケース1・2・4の依頼幕 | 70BPM ジャズノワール、雨の探偵事務所 |
| `commission_emotion.mp3` | ケース3・6・9の依頼幕 | 60BPM エモーショナル、涙の依頼 |
| `commission_political.mp3` | ケース5・7の依頼幕 | 90BPM 政治サスペンス |
| `commission_homely.mp3` | ケース8の依頼幕 | 100BPM ほのぼのアコースティック |
| `crime_scene_tense.mp3` | 第2幕(標準) | 110BPM テンションサスペンス |
| `crime_scene_light.mp3` | ケース4・8の第2幕 | 130BPM ピチカートポップ |
| `investigation_pulse.mp3` | 第3幕(標準) | 120BPM エレクトロニカ |
| `underworld.mp3` | ケース3の闇市場シーン | 90BPM ダークジャズ |
| `deduction_revelation.mp3` | 第4幕(標準) | 100BPM オーケストラサスペンス |
| `villain_theme.mp3` | ボス幹部登場時 | 100BPM ダーク・組織テーマ |
| `solution_calm.mp3` | 第5幕(標準) | 70BPM ピアノバラード |
| `solution_uplift.mp3` | 第5幕(希望系) | 110BPM アコースティックポップ |
| `omen_outro.mp3` | 伏線エンディング | 60BPM アンビエント、30〜45秒 |
| `final_call.mp3` | 最終話の第1幕 | 90BPM フルオーケストラ・エピック |
| `infiltration.mp3` | 最終話の第2-3幕 | 140BPM エレクトロロック・アクション |
| `final_battle_part1.mp3` | 最終話の対峙シーン | 110BPM 緊迫弦楽 |
| `final_battle_part2.mp3` | 最終話の決戦 | 140BPM エピック+電子 |
| `finale.mp3` | 最終話の解決 | 80BPM 感動オーケストラ |
| `credits_theme.mp3` | エンドロール | 70BPM バラード |

## 推奨無料音源サイト

- [甘茶の音楽工房](https://amachamusic.chagasi.com/)(商用無料・JRPG/アニメ風)
- [DOVA-SYNDROME](https://dova-s.jp/)(商用無料・ジャンル豊富)
- [魔王魂](https://maou.audio/)(商用無料・多様)

## 推奨フォーマット

- **形式**:MP3(128 kbps 以上)
- **長さ**:60〜120 秒(シームレスループ前提)
- **音量**:平均 -18 LUFS(ゲーム業界標準)
- **チャンネル**:ステレオ

ファイルを置いたら `git add public/bgm/*.mp3` でコミットしてください。

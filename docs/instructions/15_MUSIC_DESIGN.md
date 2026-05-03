# 15. 音楽デザイン詳細指示

このドキュメントは、データ探偵ゲームに使用する**全BGM・効果音（SE）の仕様**を定義したものです。

実装方針：
- `public/bgm/{trackId}.mp3` と `public/se/{seId}.mp3` のパス規約
- ファイルがあれば `<audio>` でループ再生、なければ既存Web Audio合成にフォールバック
- 音量調整スライダーとミュートボタンを必ず実装

---

## 🎼 BGMトラック一覧（全15曲）

### 1. `track_commission_noir`【依頼の幕・標準】
**用途**：ケース1, 2, 4の第1幕（依頼）
**シーン**：探偵事務所、依頼人の登場、雨の夜

| 項目 | 内容 |
|---|---|
| ジャンル | ジャズノワール、ピアノソロ |
| テンポ | 70 BPM（やや遅め） |
| 拍子 | 4/4 |
| キー | A minor または D minor |
| 楽器 | ジャズピアノ、ウッドベース、ブラッシュドラム、サブとしてサックス |
| 雰囲気 | 雨、煙草の煙、湿った空気、孤独な探偵 |
| 参考曲 | 『コクリコ坂から』のジャズ系BGM、Lupin the 3rd のジャズBGM |
| ループ仕様 | 90〜120秒のシームレスループ、頭とお尻が滑らかに繋がる |

**フリー音源候補**：
- 甘茶の音楽工房：「不夜城」「霧の街角」系
- DOVA-SYNDROME：「Midnight Detective」「Smoky Bar」系
- 効果音ラボ：該当なし

---

### 2. `track_commission_emotion`【依頼の幕・感情系】
**用途**：ケース3, 6, 9の第1幕（涙の依頼）
**シーン**：泣きながら駆け込んでくる依頼人

| 項目 | 内容 |
|---|---|
| ジャンル | ピアノ＋ストリングス、エモーショナル |
| テンポ | 60 BPM（遅め） |
| キー | D minor または F minor |
| 楽器 | ピアノ、ストリングスカルテット、控えめなチェロのソロ |
| 雰囲気 | 切ない、心の痛み、共感、寄り添い |
| 参考曲 | 『君の名は。』の静かなシーンのBGM、Yann Tiersen 系 |
| ループ仕様 | 60〜90秒、繰り返し再生に耐える |

**フリー音源候補**：
- 甘茶の音楽工房：「雨上がり」「忘れない」系
- DOVA-SYNDROME：「Tears」「Memory of Rain」系

---

### 3. `track_commission_political`【依頼の幕・緊迫系】
**用途**：ケース5, 7の第1幕
**シーン**：選挙、企業犯罪、シリアスな政治・ビジネス案件

| 項目 | 内容 |
|---|---|
| ジャンル | サスペンス、政治ドラマ |
| テンポ | 90 BPM（中速） |
| キー | C minor または G minor |
| 楽器 | 太鼓系の刻み（タムトムやティンパニ）、シンセ低音、控えめなブラス |
| 雰囲気 | 緊迫、迫り来る危機、政治的陰謀 |
| 参考曲 | 『House of Cards』『Ozark』のテーマ系 |
| ループ仕様 | 90秒前後 |

**フリー音源候補**：
- 甘茶の音楽工房：「謀略」「決意の刻」系

---

### 4. `track_commission_homely`【依頼の幕・日常系】
**用途**：ケース8の第1幕
**シーン**：主婦の日常的相談（和やかな雰囲気からのギャップ）

| 項目 | 内容 |
|---|---|
| ジャンル | アコースティック、ほのぼの |
| テンポ | 100 BPM |
| キー | C major または F major |
| 楽器 | ウクレレ、アコーディオン、軽快なグロッケン、優しいパーカッション |
| 雰囲気 | 暖かい家庭、お茶の時間、安心感 |
| 参考曲 | 『となりのトトロ』の昼下がりBGM、無印良品BGM系 |

---

### 5. `track_crime_scene_tense`【現場の幕・標準】
**用途**：ケース1, 2, 3, 5, 6, 7, 9の第2幕
**シーン**：データの解析、グラフを見て違和感に気づく

| 項目 | 内容 |
|---|---|
| ジャンル | テンションサスペンス、シンセ |
| テンポ | 110 BPM |
| キー | A minor |
| 楽器 | 低音シンセパッド（持続音）、刻むハイハット、シンセベース、薄いストリングス |
| 雰囲気 | 集中、観察、何かを見つけ出そうとする緊張 |
| 参考曲 | 『Mr. Robot』のシンセサスペンス系、Hans Zimmer系 |
| ループ仕様 | 60秒程度 |

---

### 6. `track_crime_scene_light`【現場の幕・軽快系】
**用途**：ケース4, 8の第2幕
**シーン**：明るめの分析パート、ややコミカル要素あり

| 項目 | 内容 |
|---|---|
| ジャンル | ピチカートポップ |
| テンポ | 130 BPM |
| キー | E minor または A minor |
| 楽器 | ピチカート弦、軽いマリンバ、ライトなパーカッション、フルート |
| 雰囲気 | 軽快、推理ゲーム、テンポ良く謎が解けていく |
| 参考曲 | 『逆転裁判』追求テーマ、Yoko Shimomura 系 |

---

### 7. `track_investigation_pulse`【捜査の幕・標準】
**用途**：全ケースの第3幕（捜査）
**シーン**：本格的に証拠を集め、計算に取り組む

| 項目 | 内容 |
|---|---|
| ジャンル | エレクトロニカ、ダウンテンポ |
| テンポ | 120 BPM |
| キー | F minor または C minor |
| 楽器 | シンセシーケンス、刻むキックドラム、シンセベース、アルペジオ、薄いパッド |
| 雰囲気 | 思考の深まり、データを追うリズム、知的好奇心 |
| 参考曲 | 『Sherlock』のテーマ系、Trent Reznor の映画音楽系 |
| ループ仕様 | 120秒、長くても飽きない設計 |

---

### 8. `track_underworld`【捜査の幕・闇市場系】
**用途**：ケース3の第3幕（闇業者突入）
**シーン**：地下街、不法行為の現場

| 項目 | 内容 |
|---|---|
| ジャンル | ダークジャズ、ヒップホップ要素 |
| テンポ | 90 BPM |
| キー | E minor |
| 楽器 | ベースギター（スラップ）、サックスのソロ、ローファイなドラム、ブラスのスタッカート |
| 雰囲気 | 地下街、危険、闇取引 |
| 参考曲 | 『Cowboy Bebop』のジャジーダーク系、Lalo Schifrin 系 |

---

### 9. `track_deduction_revelation`【推理の幕・標準】
**用途**：全ケースの第4幕（推理）
**シーン**：真相に到達、決定的な発見

| 項目 | 内容 |
|---|---|
| ジャンル | オーケストラサスペンス、ストリングス主体 |
| テンポ | 100 BPM、徐々に高揚 |
| キー | D minor → F major（解放） |
| 楽器 | フルストリングス（ヴァイオリン主旋律）、ティンパニ、ハープのアルペジオ、トランペット控えめ |
| 雰囲気 | 真相到達、緊迫から解放、真実の重み |
| 参考曲 | 『コナン』推理BGM、『相棒』クライマックステーマ |
| ループ仕様 | 90〜120秒 |

---

### 10. `track_villain_theme`【ボス登場・組織テーマ】
**用途**：ケース4以降、組織の幹部が登場する第4幕
**シーン**：氷室、雷童寺、鳴神、紫紋、金剛寺、ユキの登場

| 項目 | 内容 |
|---|---|
| ジャンル | オーケストラサスペンス、ダーク |
| テンポ | 100 BPM |
| キー | E minor または B minor |
| 楽器 | 低音弦楽器（チェロ、コントラバス）の刻み、ホルンの不協和音、ティンパニ、女声合唱（薄く） |
| 雰囲気 | 邪悪、知的な敵、冷たい支配者 |
| 参考曲 | 『Death Note』L vs キラ系のサスペンス、Hans Zimmer の Joker 系 |
| ループ仕様 | 60〜90秒 |

**バリエーション**：各ボスのキャラクターに合わせて微調整可能だが、基本トラックは同じで「組織のテーマ」を統一する

---

### 11. `track_solution_calm`【解決の幕・標準】
**用途**：全ケースの第5幕（解決）の前半
**シーン**：事件解決、教訓を伝える、依頼人との別れ

| 項目 | 内容 |
|---|---|
| ジャンル | ピアノバラード |
| テンポ | 70 BPM |
| キー | C major または G major |
| 楽器 | ピアノ、控えめなストリングス、たまにギターのアルペジオ |
| 雰囲気 | 余韻、静かな満足、夜明けの兆し |
| 参考曲 | 『Cowboy Bebop』The Real Folk Blues 系、Sakamoto Ryuichi 系 |

---

### 12. `track_solution_uplift`【解決の幕・希望系】
**用途**：ケース3, 5, 8, 9の第5幕後半
**シーン**：依頼人の前向きな決意、希望に満ちた未来

| 項目 | 内容 |
|---|---|
| ジャンル | アコースティックポップ、希望テーマ |
| テンポ | 110 BPM |
| キー | D major または A major |
| 楽器 | アコースティックギター、ピアノ、軽いストリングス、グロッケン |
| 雰囲気 | 前向き、希望、新しい朝 |
| 参考曲 | 『君の名は。』ED曲系、Joe Hisaishi の希望テーマ |

---

### 13. `track_omen_outro`【伏線エンディング】
**用途**：第5幕の最後、次回への伏線シーン
**シーン**：ホワイトボードに新しい名前、3つの目のロゴ、不穏な独白

| 項目 | 内容 |
|---|---|
| ジャンル | アンビエント、ダーク |
| テンポ | 60 BPM |
| 楽器 | シンセドローン、低音バスドラム、女声ハミング（控えめ） |
| 雰囲気 | 不穏、続編への引き、影の組織の存在感 |
| 長さ | 30〜45秒（短め、シーン専用） |

---

### 14〜16. ケース10（最終話）専用トラック

#### 14. `track_final_call`【最終話 第1幕】
**シーン**：依頼人全員集結、決戦への招集

| 項目 | 内容 |
|---|---|
| ジャンル | フルオーケストラ、エピックテーマ |
| テンポ | 90 BPM |
| キー | E minor → C major（転調） |
| 楽器 | フルオーケストラ、合唱、ティンパニ、ホルン、トランペットの主旋律 |
| 雰囲気 | 壮大、招集、運命の対決 |
| 参考曲 | 『Lord of the Rings』『進撃の巨人』のEpic Theme |
| 長さ | 120秒以上 |

#### 15. `track_infiltration`【最終話 第2-3幕】
**シーン**：本部突入、潜入アクション

| 項目 | 内容 |
|---|---|
| ジャンル | エレクトロロック、アクションサスペンス |
| テンポ | 140 BPM |
| 楽器 | エレキギター、シンセベース、ロックドラム、シンセリード |
| 雰囲気 | 緊迫アクション、駆け抜ける |
| 参考曲 | 『Mission: Impossible』系、Tom Holkenborg のアクション系 |

#### 16. `track_final_battle_part1` / `track_final_battle_part2`【最終決戦】
**シーン**：幽鬼丸との対峙（part1）→ 第2形態（part2）

**Part 1：対峙の前奏**
| 項目 | 内容 |
|---|---|
| ジャンル | ストリングス＋低音シンセ、緊迫 |
| テンポ | 110 BPM |
| 楽器 | ヴァイオリン群、低音シンセ、徐々に増えるパーカッション |
| 雰囲気 | 静かなる対峙、嵐の前 |

**Part 2：覚醒・決戦**
| 項目 | 内容 |
|---|---|
| ジャンル | エピックオーケストラ＋電子要素 |
| テンポ | 140 BPM |
| キー | B minor → D major（最後の最後で転調・勝利） |
| 楽器 | フルオーケストラ＋エレクトロ要素、男声合唱、女声合唱、シンセリード |
| 雰囲気 | 最終決戦、運命の対決、敵の覚醒 |
| 参考曲 | Two Steps from Hell のEpic、『鬼滅の刃』甘露寺戦のBGM、Yoko Shimomura のラスボス曲 |
| 長さ | 各150秒程度 |

#### 17. `track_finale`【最終話 第5幕】
**シーン**：解決、新たな未来、修了証

| 項目 | 内容 |
|---|---|
| ジャンル | オーケストラ＋ピアノ、感動 |
| テンポ | 80 BPM |
| キー | C major |
| 楽器 | ピアノソロ → フルオーケストラへの展開、コーラス、ストリングス |
| 雰囲気 | 達成感、希望の継承、新たな旅立ち |
| 参考曲 | 『進撃の巨人』Epilogue系、Joe Hisaishi の希望テーマ |

#### 18. `track_credits_theme`【エンドロール】
**シーン**：全クリ後のエンドロール

| 項目 | 内容 |
|---|---|
| ジャンル | バラード、ピアノ＋ボーカル（インストでも可） |
| テンポ | 70 BPM |
| キー | F major |
| 雰囲気 | 余韻、感謝、次の冒険への余白 |
| 長さ | 3〜4分 |

---

## 🔊 効果音（SE）一覧

### A. インタラクション系

| ID | 用途 | 音の特徴 |
|---|---|---|
| `se_correct_chime` | インタラクション正解時 | 明るい鐘の音、上行2音、500ms |
| `se_wrong_buzz` | インタラクション不正解時 | 控えめなブザー、下行音、300ms（不快にならない範囲で） |
| `se_hint_unlock` | ヒント開示時 | 柔らかい鐘音、1音、400ms |
| `se_button_click` | ボタン押下 | 短いクリック音、100ms |
| `se_step_advance` | 「次へ」進む時 | ページめくり風、200ms |

### B. ストーリー演出系

| ID | 用途 | 音の特徴 |
|---|---|---|
| `se_door_creak` | 来客の登場（ドアが開く） | 軋むドアの音、800ms |
| `se_omen_drone` | 「3つの目」発覚、不穏な伏線 | 低音ドローン、徐々にフェードイン、1500ms |
| `se_reveal_strike` | 真相判明、決定的瞬間 | 鋭い金属音＋低音ヒット、500ms |
| `se_emotional_strike` | 感情的なクライマックス | 重いピアノ和音＋ストリングス、1000ms |
| `se_warm_chime` | 救済、絆の確認 | 温かい鐘の和音、800ms |

### C. 章クリア系

| ID | 用途 | 音の特徴 |
|---|---|---|
| `se_chapter_clear` | 各幕終了 | ファンファーレ風、1500ms |
| `se_case_solved` | 事件解決 | 大きなファンファーレ、3000ms |
| `se_certificate_chime` | 修了証発行 | 厳かな鐘音＋オーケストラ、3000ms |

### D. ボス・組織関連

| ID | 用途 | 音の特徴 |
|---|---|---|
| `se_villain_exit` | ボス幹部退場時 | 高音ピアノの不気味な残響、1000ms |
| `se_subtle_chime` | 微妙な人間性が垣間見える瞬間（ユキの片目） | 一瞬の柔らかい鐘、300ms |
| `se_final_omen` | 最終話への伏線（「幽鬼丸」初出など） | 最大級のドローン＋低音、2000ms |
| `se_transform_omen` | 幽鬼丸の第2形態への変身 | 不穏な変化音、シンセ＋低音、2500ms |
| `se_victory_fanfare` | 最終決戦勝利時 | エピックなファンファーレ、3000ms |

### E. UI系（小音）

| ID | 用途 | 音の特徴 |
|---|---|---|
| `se_modal_open` | モーダル開く | 短いポップ音、150ms |
| `se_modal_close` | モーダル閉じる | 短いシュッ音、150ms |
| `se_toast_appear` | トースト通知出現 | 軽い鐘音、200ms |

---

## 🎚 音量バランスとミックス指針

| カテゴリ | 推奨音量 |
|---|---|
| BGM（ベース） | -18 LUFS（ゲーム業界標準） |
| BGM（クライマックス） | -12 LUFS |
| SE（インタラクション） | -10 LUFS（やや大きめ、明確に聞こえる） |
| SE（小UI音） | -16 LUFS（控えめ） |
| SE（演出系） | -8 LUFS（インパクト重視） |

**実装の注意**：
- BGMはマスターボリュームから-18dBで再生
- SEはマスターから-12dBで再生（SEが埋もれないように）
- ユーザー側でBGM音量とSE音量を別々に調整できるスライダーを実装

---

## 🛒 推奨フリー音源サイト

### BGM
| サイト | URL | 特徴 |
|---|---|---|
| 甘茶の音楽工房 | https://amachamusic.chagasi.com/ | 日本製、JRPG/アニメ風BGM多数、商用無料 |
| DOVA-SYNDROME | https://dova-s.jp/ | 日本最大級、ジャンル豊富、商用無料 |
| 魔王魂 | https://maou.audio/ | 多様なジャンル、商用無料 |
| HURT RECORD | https://www.hurtrecord.com/ | 高品質、商用無料 |
| Free Music Archive | https://freemusicarchive.org/ | 海外、CCライセンス |

### SE
| サイト | URL | 特徴 |
|---|---|---|
| 効果音ラボ | https://soundeffect-lab.info/ | 日本語、ゲーム向け効果音多数 |
| OtoLogic | https://otologic.jp/ | 業務利用OK、効果音特化 |
| ザ・マッチメイカァズ2nd | https://osabisi.sakura.ne.jp/m2/ | クラシック寄りの上品な音 |
| Freesound | https://freesound.org/ | 海外、CCライセンス |

---

## 🎵 各ケースのBGM切替表（早見表）

| ケース | 第1幕 | 第2幕 | 第3幕 | 第4幕 | 第5幕 |
|---|---|---|---|---|---|
| 1 | commission_noir | crime_scene_tense | investigation_pulse | deduction_revelation | solution_calm |
| 2 | commission_noir | crime_scene_tense | investigation_pulse | deduction_revelation | solution_calm + omen_outro |
| 3 | commission_emotion | crime_scene_tense | investigation_pulse → underworld | deduction_revelation | solution_uplift |
| 4 | commission_noir | crime_scene_tense | investigation_pulse | deduction_revelation → villain_theme | solution_calm |
| 5 | commission_political | crime_scene_tense | investigation_pulse | deduction_revelation → villain_theme | solution_uplift |
| 6 | commission_emotion | crime_scene_tense | investigation_pulse | deduction_revelation → villain_theme | solution_calm |
| 7 | commission_political | crime_scene_tense | investigation_pulse | deduction_revelation → villain_theme | solution_calm + omen_outro |
| 8 | commission_homely | crime_scene_light | investigation_pulse | deduction_revelation → villain_theme | solution_uplift |
| 9 | commission_emotion | crime_scene_tense | investigation_pulse | deduction_revelation → villain_theme | solution_uplift |
| 10 | final_call | infiltration | deeper（infiltrationの暗いバージョン） | final_battle_part1 → part2 | finale → credits_theme |

---

## 📦 実装上の指示（Claude Code向け）

```ts
// lib/bgm.ts の改修
// 以下の追加を行う：

export type TrackId =
  | 'commission_noir' | 'commission_emotion' | 'commission_political' | 'commission_homely'
  | 'crime_scene_tense' | 'crime_scene_light'
  | 'investigation_pulse' | 'underworld'
  | 'deduction_revelation' | 'villain_theme'
  | 'solution_calm' | 'solution_uplift' | 'omen_outro'
  | 'final_call' | 'infiltration' | 'deeper'
  | 'final_battle_part1' | 'final_battle_part2'
  | 'finale' | 'credits_theme';

export class BGMPlayer {
  // public/bgm/{trackId}.mp3 が存在すれば <audio> でループ再生
  // 存在しなければ既存のWeb Audio合成にフォールバック
  
  async playTrack(trackId: TrackId, options?: { fadeIn?: number, loop?: boolean }) {
    const audioPath = `/bgm/${trackId}.mp3`;
    try {
      // ファイル存在確認 → audio要素で再生
      const audio = new Audio(audioPath);
      audio.loop = options?.loop ?? true;
      audio.volume = 0;
      await audio.play();
      // フェードイン
      this.fadeIn(audio, options?.fadeIn ?? 1000);
      this.currentAudio = audio;
    } catch (e) {
      // フォールバック：既存のWeb Audio合成
      this.fallbackToWebAudio(trackId);
    }
  }
}
```

```ts
// lib/se.ts を新設
// 効果音の再生API

export type SEId =
  | 'correct_chime' | 'wrong_buzz' | 'hint_unlock' | 'button_click' | 'step_advance'
  | 'door_creak' | 'omen_drone' | 'reveal_strike' | 'emotional_strike' | 'warm_chime'
  | 'chapter_clear' | 'case_solved' | 'certificate_chime'
  | 'villain_exit' | 'subtle_chime' | 'final_omen' | 'transform_omen' | 'victory_fanfare'
  | 'modal_open' | 'modal_close' | 'toast_appear';

export function playSE(seId: SEId, volume: number = 1.0) {
  const audio = new Audio(`/se/${seId}.mp3`);
  audio.volume = volume * (useSoundStore.getState().seVolume);
  audio.play().catch(() => {/* ファイル無し時はサイレントフォールバック */});
}
```

---

## ✅ 音楽実装の優先順位

**Phase 5の中での順序**：
1. **必須BGM 5曲**：`commission_noir`, `crime_scene_tense`, `investigation_pulse`, `deduction_revelation`, `solution_calm`
2. **必須SE 5個**：`correct_chime`, `wrong_buzz`, `button_click`, `chapter_clear`, `case_solved`
3. **追加BGM 5曲**：villain_theme, omen_outro, solution_uplift, commission_emotion, commission_political
4. **追加SE 10個**：door_creak, omen_drone, reveal_strike, emotional_strike, warm_chime など
5. **最終話BGM**：final_call, infiltration, final_battle_part1/part2, finale, credits_theme
6. **最終話SE**：transform_omen, victory_fanfare, certificate_chime, final_omen

最初から全て揃えるのは大変なので、上記順で段階的に追加してください。
無くてもゲームは動きますが、音があると体験は格段に向上します。

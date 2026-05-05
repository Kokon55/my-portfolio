> **⚠️ 非推奨 (DEPRECATED)** — このファイル(高品質ビジュアルノベル版)は**使いません**。
> 採用版: [`docs/instructions/14b_CHARACTER_PROMPTS_PIXEL.md`](./instructions/14b_CHARACTER_PROMPTS_PIXEL.md) (ピクセルアート版)
> 両方を混在するとキャラスタイルがバラバラになります。新規生成は必ず 14b を使用してください。

---

# キャラクター画像生成プロンプト集(Gemini / Imagen 向け) — 旧版

このドキュメントは、本ゲームのキャラクター画像を Google Gemini(または Imagen)で
生成する際の指示書です。生成画像は `public/characters/{characterId}/{expression}.png` に配置。

---

## 🎨 全キャラ共通の画風指示(必ず先頭に貼る)

```
=== STYLE BLOCK (必ず守ること) ===
- Art style: 16-bit pixel art portrait, JRPG visual novel style, late SNES era feel
- Visual influence: Akira Toriyama's character design philosophy
  - exaggerated silhouettes that are recognizable from outline alone
  - bold features over realism, distinctive accessories that define the character
  - confident bold linework, strong contrast between simple shapes and intricate details
- Resolution: exactly 120×150 pixels, no anti-aliasing, sharp pixel edges
- Color palette: limited to 24 colors maximum, muted film-noir tones with one
  vibrant accent color per character
- Lighting: dramatic side lighting from upper-left, deep shadows on the right
- Background: solid dark color #0a0e1a (deep midnight blue), no gradient
- Framing: bust shot, head and shoulders visible, character facing slightly toward
  camera (3/4 view)
- Outline: 1-pixel dark outline around the silhouette
- No text, no watermark, no signature, no UI elements
- No realistic photo style, no anime cel-shading, strictly pixel art
- Transparent PNG output preferred, otherwise solid #0a0e1a background
=== END STYLE BLOCK ===
```

---

## 👥 メインキャラクター 4名(各9表情 = 36枚)

### 1. yamada(シズマ・ヤマダ / 27歳・新人マーケター)

**ベースプロンプト**

```
[STYLE BLOCK]

Subject: Shizuma Yamada, a 27-year-old Japanese male marketer.
- Build: 180cm tall but hunches forward severely, appearing only 165cm
- Hair: large messy afro hairstyle, very dark brown (#3a2a1e), bold and bushy
- Skin: medium-light Japanese tone (#f3d1b6)
- Face: oval, naive earnest expression, dark circles under eyes
- Eyes: round, expressive, dark brown
- Clothing: wrinkled navy blue (#1e3a8a) suit jacket, tie loose at 45-degree angle,
  white shirt with one button undone, mismatched socks (one red, one green)
- Distinctive prop: cracked tablet device tucked under left arm (the cracked screen
  symbolizes his career setbacks)
- Personality vibe: pure-hearted, hot-blooded, easily deceived but resilient
- Pose tendency: hands raised palm-up when speaking
- Expression: [EXPRESSION_LINE]
```

| ファイル名 | EXPRESSION_LINE |
|---|---|
| `neutral.png` | neutral and slightly tired, mouth in soft line, eyes forward |
| `worried.png` | worried, eyebrows angled into V-shape, mouth slightly downturned |
| `distraught.png` | extremely distressed, mouth open in small gasp, sweat bead on temple, watery eyes |
| `shocked.png` | shocked, mouth wide open, eyes very large with shrunken pupils, color drained |
| `eureka.png` | wide-eyed realization, mouth open in "ah!", eyes sparkling, looking up |
| `hopeful.png` | gentle hopeful smile, eyes softly lit, slight upward tilt |
| `angry.png` | angry, eyebrows pulled down, jaw clenched, mouth pressed flat |
| `tired.png` | extremely tired, heavy eye bags, half-lidded eyes |
| `thinking.png` | thoughtful, eyes looking down to side, mouth closed, hand near chin |

---

### 2. sato(クロウ・サトウ / 35歳・配信運営)

**ベースプロンプト**

```
[STYLE BLOCK]

Subject: Crow Sato, a 35-year-old Japanese male tech industry insider.
- Build: tall and very thin, almost gaunt, 188cm
- Hair: jet black slicked-back, tied in low ponytail behind
- Skin: pale Japanese tone (#e8c5a8)
- Face: oval, sharp cheekbones, faint stubble
- Eyes: narrow and sharp, suspicious gaze
- Distinctive accessory: vintage mechanical monocle over LEFT eye, attached to
  black leather cord around the neck
- Clothing: black long coat with deep crimson interior visible at collar,
  silver chains hanging from neck area
- Distinctive prop: rolling a steel pinball between fingers (symbolizing probability)
- Personality vibe: cynical intellectual, weary, articulate when discussing math
- Pose tendency: faces sideways, only eyes turn toward camera
- Expression: [EXPRESSION_LINE]
```

表情9枚は yamada と同じ EXPRESSION_LINE 表を使用。

---

### 3. akari(ヒナタ・アカリ / 22歳・新人女優)

**ベースプロンプト**

```
[STYLE BLOCK]

Subject: Hinata Akari, a 22-year-old Japanese female aspiring actress.
- Build: small, only 140cm tall, petite
- Hair: bright chestnut brown (#a87844) extremely long hair (reaching ankles in
  full body, but in bust shot shows long flowing strands), tied in two side twin-tails
- Hair accessory: large red ribbon on top of head
- Skin: light Japanese tone (#fae0c8)
- Face: round, youthful, very large round eyes occupying 1/3 of face area
- Eyes: huge, sparkling, expressive, dark brown with strong highlights
- Clothing: pastel pink (#f4c2c2) cardigan with frilled collar, white blouse
- Distinctive prop: heart-shaped phone holder selfie stick visible behind shoulder
- Personality vibe: earnest, emotionally expressive, intuitive
- Pose tendency: when surprised, hands fly to cheeks
- Expression: [EXPRESSION_LINE]
```

表情9枚は yamada と同じ EXPRESSION_LINE 表を使用。

---

### 4. detective(シェルロック・蛇道 / 主人公・年齢不詳)

**ベースプロンプト**

```
[STYLE BLOCK]

Subject: Sherlock Jadou, a mysterious detective of indeterminate age (appears 30s).
- Build: very tall (195cm), extremely lean, almost emaciated
- Hair: short black hair mostly hidden under hat
- Skin: pale, cool-toned (#d8b89c), with hollowed cheeks
- Face: angular, sharp jawline, faint smirk at mouth corner, slightly yellowed teeth
- Eyes: sharp and intelligent, ALWAYS partially shadowed by hat brim in every expression
- Hat: black wide-brim fedora tilted forward, deep shadow over upper face
- Clothing: floor-length black trench coat with collar popped up, vibrant deep
  crimson interior lining visible, black scarf
- Distinctive accessory: silver Sigma (Σ) symbol pendant on neck chain
- Distinctive prop: red leather notebook with mathematical equations in left hand
- Personality vibe: cool, stoic, sharp-eyed, film-noir protagonist with quiet intensity
- Pose tendency: holds notebook in front of face when thinking, only eyes visible
- Expression: [EXPRESSION_LINE — keep eyes partially shadowed by hat brim always]
```

表情9枚は yamada と同じ EXPRESSION_LINE 表を使用。**全表情で帽子の影は維持**。

---

## 🦹 ボスキャラクター 7名(各3表情:neutral / smug / defeated)

### 5. boss_review(女王・氷室レイア / 40代女性執行役員)

```
[STYLE BLOCK]

Subject: Reia Himuro, 40-year-old female corporate executive, mastermind of
fake review operations.
- Build: 170cm, slender, ice-cold beauty
- Hair: shoulder-length silver-white straight hair, perfect symmetry, sharp side bangs
- Skin: very pale (#e8d4c0), almost porcelain
- Face: angular, sharp cheekbones, cold beauty
- Distinctive feature: black crescent moon tattoo under LEFT eye
- Eyes: narrow, calculating, icy blue contact lenses
- Clothing: pure white power suit with black collar, gold star-shaped pin at throat,
  the inside of collar shows tiny embroidered "three eyes in triangle" logo
- Distinctive prop: red marker pen and oversized clipboard with rating sheets
- Personality vibe: ruthless executive, polite smile hiding malice
- Pose tendency: looks down on others, covers mouth with hand to hide smirk
- Expression: [EXPRESSION_LINE]
```

| ファイル名 | EXPRESSION_LINE |
|---|---|
| `neutral.png` | calm, neutral expression, eyes half-closed in cold composure |
| `smug.png` | confident smug smile, eyes half-closed, corner of mouth raised, hand near mouth |
| `defeated.png` | shocked defeat, wide eyes, mouth slightly open, makeup smeared |

---

### 6. boss_poll(首魁・雷童寺源蔵 / 50代政治家)

```
[STYLE BLOCK]

Subject: Genzou Raidouji, 50-year-old male politician with fake populist image.
- Build: 160cm, stocky and rotund
- Hair: bald on top with ring of frizzy white-grey hair around the sides
- Skin: tan and weathered (#c9a07a)
- Face: square jaw, faint smile lines, mouth often agape in oratory
- Eyes: small, shrewd, dark, bushy white eyebrows
- Clothing: flashy navy pinstripe suit, gold cufflinks, red socks visible
- Distinctive accessory: red bar-chart-patterned tie, lapel pin shaped like three
  vertical bars (which subtly form a triangle of three eyes when viewed closely)
- Personality vibe: charismatic showman on the surface, manipulative underneath
- Pose tendency: arms thrown wide in oratory, mouth in "O" shape
- Expression: [EXPRESSION_LINE]
```

各表情:
- `neutral.png`: calm politician composure, hands clasped in front
- `smug.png`: confident victorious grin, both arms raised
- `defeated.png`: collapsed in shock, sweat pouring, eyes wide with terror

---

### 7. boss_ai(設計者・鳴神コード / 30代男性CTO)

```
[STYLE BLOCK]

Subject: Code Narukami, 30-year-old male tech CTO, developer of fraudulent AI.
- Build: 185cm, fit, modern silhouette
- Hair: silver platinum two-block undercut, longer on top swept back
- Skin: pale (#e0cdb8)
- Face: oval, sharp jaw
- Distinctive feature: futuristic sunglasses with green glowing circuit patterns
  visible in the lenses, completely hiding eyes
- Clothing: black turtleneck under silver geometric-patterned long coat, the back
  of coat displays large holographic "three eyes triangle" embroidery
- Distinctive prop: glowing tablet in right hand, holographic green watch on left wrist
- Personality vibe: arrogant tech-bro who treats people as data points, secretly
  conflicted by guilt
- Pose tendency: arms crossed, finger pushes glasses up at the bridge
- Expression: [EXPRESSION_LINE — note the eyes are always hidden by sunglasses,
  emotion shown through mouth and brow]
```

各表情:
- `neutral.png`: stoic, mouth in flat line
- `smug.png`: confident smirk, slight head tilt
- `defeated.png`: mouth open in horror, sunglasses cracked showing one tearful eye

---

### 8. boss_pvalue(指南者・紫紋ヴィオラ / 40代女性コンサルタント)

```
[STYLE BLOCK]

Subject: Viola Shimon, 40-year-old female data consultant who teaches p-hacking.
- Build: 175cm, sleek
- Hair: razor-sharp short bob in deep purple (#3a1a4a) with silver streaks
- Skin: light (#ead0c0)
- Face: heart-shaped with sharp chin
- Eyes: piercing violet contact lenses
- Lips: dark purple lipstick
- Clothing: white long blazer, black turtleneck underneath, red high-heeled shoes
  visible if shown
- Distinctive prop: silver brooch shaped like a magnifying glass with tiny "three
  eyes" engraved inside the lens, holds red analysis report
- Personality vibe: smooth-talking academic fraud
- Pose tendency: peers through magnifying glass with one raised eyebrow
- Expression: [EXPRESSION_LINE]
```

各表情:
- `neutral.png`: composed academic, slight knowing smile
- `smug.png`: leans forward with raised eyebrow and devious grin
- `defeated.png`: brooch falls from hand, mouth tight, tears welling

---

### 9. boss_correlation(論文の悪魔・金剛寺亀蔵 / 60代教授)

```
[STYLE BLOCK]

Subject: Kamezo Kongouji, 60-year-old male professor running a paper mill.
- Build: 150cm, hunched like a turtle, very small
- Hair: thinning grey hair combed over (#7a7570)
- Distinctive feature: extremely long white beard reaching down to the floor
- Skin: weathered, deeply wrinkled (#bda088)
- Face: long and narrow, sunken eyes
- Eyes: tired but cunning, behind round wire-rim glasses
- Clothing: brown tweed jacket with leather elbow patches, beige vest, bow tie
- Distinctive prop: gold pocket watch with "three eyes" engraved on the cover,
  swung on a long chain; thick scroll of papers under his arm
- Personality vibe: arrogant academic dismissing all criticism
- Pose tendency: dangles pocket watch in pendulum motion, eyes narrowed in laugh
- Expression: [EXPRESSION_LINE]
```

各表情:
- `neutral.png`: composed scholar, half-lidded eyes
- `smug.png`: wide grin showing yellowed teeth, watch swinging
- `defeated.png`: glasses askew, beard disheveled, mouth open in shock

---

### 10. boss_chisq(算法の魔女・絶対零度ユキ / 28歳女性エンジニア)

```
[STYLE BLOCK]

Subject: Yuki Zettai-reido, 28-year-old female algorithm engineer.
- Build: 178cm, athletic and tall
- Hair: silver-white extremely long hair tied in high ponytail reaching past waist
- Skin: very pale (#f0e0d0)
- Face: youthful but cold, oval shape
- Distinctive feature: HETEROCHROMIA — left eye blue, right eye red
- Clothing: black tactical jacket with multiple zippers, black shorts, knee-high boots,
  black fingerless gloves on both hands
- Distinctive accessory: 3 red LED earrings on EACH ear (6 total), each set of 3
  forming a triangle (the "three eyes" symbol)
- Personality vibe: detached, sees humans as engagement metrics
- Pose tendency: index finger to lips, winks one eye
- Expression: [EXPRESSION_LINE]
```

各表情:
- `neutral.png`: cold composed look, slight head tilt
- `smug.png`: finger to lips, winks RIGHT (red) eye
- `defeated.png`: one earring falling, expression cracking with genuine emotion

---

### 11. boss_final(データの悪魔・幽鬼丸 / 最終ボス)

**第1形態(人間態)**

```
[STYLE BLOCK]

Subject: Yukimaru, 68-year-old final antagonist, "The Data Demon", former elite
government statistician turned criminal mastermind.
- Build: 190cm, tall imposing old man, surprisingly straight posture
- Hair: pure white slicked-back long hair (#f0f0f0)
- Skin: aged with deep wrinkles (#c8b8a8)
- Face: long, sharp, deeply lined, grey eyes with cold intelligence
- Clothing: pitch-black formal Japanese-Western fusion robe (combination of
  hakama and long Western coat), high collar, layered black fabric
- Distinctive accessory: large medallion at chest engraved with "three crimson eyes"
- Distinctive prop: ancient abacus with red and black beads (from his statistician days)
- Personality vibe: terrifying calm, philosophical evil, embodiment of weaponized statistics
- Expression: [EXPRESSION_LINE]
```

**第2形態(覚醒態 / `enraged.png`専用)**

```
[STYLE BLOCK]

Subject: Yukimaru in his awakened "Data Demon" form.
- Same physical base as form 1 but transformed
- The black robe is torn open, revealing geometric wings made of statistical
  charts (line graphs, bar charts, scatter plots) extending from his back
- Upper half of face has DISAPPEARED into shadow, replaced by THREE GLOWING
  CRIMSON EYES arranged in a triangle on his forehead
- Both hands emit floating red mathematical symbols (Σ, ∫, probability density
  functions) as if attacking
- Aura: crimson energy radiating from the three eyes, cyan binary code patterns
  glowing along the edges of his torn robe
- Expression: enraged, mouth twisted in fury, three eyes pulsating
```

各表情:
- `neutral.png`: calm imposing presence, eyes half-closed
- `smug.png`: thin cruel smile, abacus held aloft
- `enraged.png`: 第2形態(覚醒態の指示プロンプトを使う)
- `defeated.png`: kneeling in defeat, two of three eyes extinguished, only one
  flickering weakly

---

## 👤 モブNPC 8パターン(汎用 / `neutral.png`のみ)

### npc_salaryman_01(カバ系巨漢サラリーマン)

```
[STYLE BLOCK]

Subject: Anthropomorphic-hippo-like obese male office worker, age 45, 175cm
but extremely wide.
- Hair: thinning combed-over hair
- Face: round, perpetual sweat on forehead, exhausted expression
- Clothing: too-tight grey suit straining at buttons, loose blue tie
- Distinctive prop: massive stack of papers held in both arms, papers falling
- Expression: tired and overwhelmed, neutral
```

### npc_office_lady_01(怒り顔OL)

```
[STYLE BLOCK]

Subject: Sharp-edged 28-year-old female office worker.
- Hair: jet black with razor-sharp blunt bangs perfectly straight across forehead
- Face: triangular eyes (literally angular triangle shape), permanent angry frown
- Clothing: beige blazer, white blouse with high collar
- Distinctive prop: oversized coffee mug (twice normal size) held in both hands
- Expression: perpetually angry, neutral
```

### npc_student_01(スマホ依存高校生男子)

```
[STYLE BLOCK]

Subject: Smartphone-addicted 17-year-old male high school student.
- Hair: messy black hair covering eyes
- Posture: neck thrust forward, severe slouch, body C-shaped
- Face: dark circles under hollow eyes, mouth slightly open
- Clothing: black school uniform (gakuran), unbuttoned at top
- Distinctive prop: TWO smartphones, one in each hand, eyes fixed on them
- Expression: vacant zombie-like, neutral
```

### npc_student_02(読書家高校生女子)

```
[STYLE BLOCK]

Subject: Bookworm 16-year-old female high school student.
- Hair: long brown braids on both sides
- Face: large round glasses covering half her face
- Clothing: navy sailor uniform with red ribbon, oversized backpack visible
- Distinctive prop: thick book held open in front of face, walking while reading
- Expression: absorbed in book, peaceful neutral
```

### npc_elderly_man(仙人風老人)

```
[STYLE BLOCK]

Subject: Sage-like 80-year-old man with mystical appearance.
- Hair: wispy white hair on top
- Distinctive feature: extremely long white beard reaching mid-chest, bushy
  white eyebrows
- Skin: weathered with deep wrinkles
- Clothing: traditional grey kimono with subtle pattern
- Distinctive prop: tall wooden walking staff with tortoise shell carved on top
- Distinctive feature: tortoise tattoo visible on shoulder/back
- Expression: wise calm, neutral
```

### npc_elderly_woman(買い物老婦人)

```
[STYLE BLOCK]

Subject: Round 75-year-old woman returning from shopping.
- Build: small (145cm), round and stout
- Hair: white permed curly hair
- Distinctive accessory: massive woven straw hat tied under chin
- Clothing: floral print kimono jacket, long skirt
- Distinctive prop: 10 shopping bags hanging from both arms (5 per side), bags
  bulging with vegetables
- Expression: cheerful smile, neutral
```

### npc_influencer(派手系インフルエンサー)

```
[STYLE BLOCK]

Subject: 24-year-old female internet influencer, extremely flashy.
- Hair: bright platinum blonde corkscrew vertical curls (drill curls), very voluminous
- Distinctive accessory: oversized heart-shaped pink sunglasses covering half face
- Clothing: pink off-shoulder dress, multiple gold necklaces and chains hanging
  from neck
- Distinctive prop: pink selfie stick raised high
- Lips: glossy pink, duck-face pucker
- Expression: peace sign with both hands, posing for camera, neutral
```

### npc_journalist(カメラまみれの記者)

```
[STYLE BLOCK]

Subject: 45-year-old male journalist, gaunt and intense.
- Build: very thin, 180cm
- Hair: messy salt-and-pepper hair
- Face: hollow cheeks, intense focused eyes
- Clothing: rumpled brown trench coat over white shirt
- Distinctive prop: massive IC recorder bag on back, 4 cameras hanging from
  neck on different straps, notebook in hand
- Expression: focused investigative gaze, neutral
```

---

## 🎯 生成の進め方

1. Gemini の画像生成(または `gemini-2.5-flash-image` API、Imagen)を開く
2. **STYLE BLOCK + ベースプロンプト + 該当 EXPRESSION_LINE** を 1 つにまとめて入力
3. アスペクト比を **4:5** に指定
4. 画風がブレたら STYLE BLOCK を再強調して再生成
5. 採用画像を `public/characters/{characterId}/{expression}.png` に配置
6. `npm run dev` で `/portrait-demo` にアクセスして全表情を一覧確認

---

## ⚠️ 注意事項

- **顔の一貫性**:同じキャラの 9 表情で「同一人物」に見えるよう、髪型・服・骨格パラメータを毎回明示
- **アスペクト比のズレ**:生成後に **120×150 にニアレストネイバー法でリサイズ**
- **背景の透過**:透過 PNG が出ない場合、`#0a0e1a` の単色背景にしてから後処理(remove.bg 等)で透過化
- **NG パターン**:実在の有名人に似せない / 実在ブランドのロゴを入れない / グロテスクな表現は避ける
- **画風崩壊対策**:1表情ごとに個別生成 → 顔の同一性をチェック → ダメなら再生成

---

## 📝 ライセンス

Gemini / Imagen で生成した画像の利用可否は、生成時点の Google の利用規約に従ってください。
本ゲームは無料公開予定のため、**商用利用可・再配布可** の生成物のみ採用すること。
生成日と利用規約のスナップショットを `docs/IMAGE_GENERATION_LOG.md` に記録推奨。

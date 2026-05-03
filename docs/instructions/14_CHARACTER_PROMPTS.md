# 14. キャラクター画像生成プロンプト集（Gemini / Imagen向け）

このドキュメントは、本ゲームのキャラクター画像をGoogle Gemini（特に**Gemini 2.5 Pro / Imagen 4**推奨）で生成する際の高品質指示書です。

生成画像は `public/characters/{characterId}/{expression}.png` に配置します。

---

## 🎯 全キャラ共通の画風指示（必ず先頭に貼る）

### MASTER STYLE BLOCK

```
=== MASTER STYLE BLOCK (必ず厳守) ===

**Art Direction Reference**:
- Visual novel character portrait, mid-2010s Japanese RPG quality
- Influence: Akira Toriyama (Dragon Ball / Dr. Slump) for silhouette boldness
  and signature props
- Influence: Hirohiko Araki (JoJo's Bizarre Adventure) for distinctive poses
  and unique fashion
- Influence: Yoshitaka Amano (Final Fantasy) for muted color sophistication
  and elegant proportions
- NOT pixel art, NOT 8-bit, NOT chibi/cute style
- NOT photorealistic, NOT 3D render, NOT cel-shaded anime

**Technical Specifications**:
- Resolution: 768 × 960 pixels (4:5 aspect ratio, portrait orientation)
- Output format: PNG with transparent background OR solid #0a0e1a background
- Detail level: high — visible brushwork, hand-painted illustration feel
- Line quality: confident clean linework with subtle weight variation
- Color palette: limited to 12-18 colors maximum, dominated by muted dark tones
  (#0a0e1a midnight blue base) with one vibrant accent color per character
- Lighting: dramatic three-point lighting with strong key light from upper-left,
  rim light defining silhouette, deep shadows on the right side
- Atmosphere: noir film aesthetic with faint dust/smoke particles in background

**Composition**:
- Bust shot (head + shoulders + upper chest visible)
- Character facing 3/4 view toward camera
- Silhouette must be readable at small thumbnail size
- One iconic prop or accessory clearly visible

**Strict Prohibitions (絶対禁止)**:
- NO text, watermark, signature, logo
- NO UI elements, frames, borders, vignettes
- NO real celebrity likeness
- NO real branded products or logos
- NO inappropriate content (sexual, gore, etc.)
- NO multiple characters in one frame
- NO hands or weapons drawn poorly (omit if unsure)
- NO blurry, low-resolution, or low-effort output

**Quality Standards (品質基準)**:
- Eyes must be detailed and expressive (the soul of the character)
- Distinctive prop/accessory must be clearly rendered
- Outline must be 1-2 px clean pixel-perfect lines
- Shading should follow consistent direction across the image
- Character must be IMMEDIATELY recognizable from silhouette alone
- The illustration should feel like it could be a key visual for a published game

=== END MASTER STYLE BLOCK ===
```

---

## 🎯 生成の進め方（重要・必読）

### ステップ1：単一キャラ確定生成
1. 1キャラの`neutral.png`を最初に**3〜5バージョン**生成
2. 最も気に入った1枚を選定し、これを「**マスター画像**」とする
3. マスター画像を **常に参照画像として添付**して、他の表情を生成する

### ステップ2：表情バリエーション生成
- マスター画像を参照添付し、プロンプトに「**Reference the attached image. Keep the EXACT same character: same hair style, same facial features, same costume, same proportions. Only change the EXPRESSION to: [expression description]**」と明記
- 1表情ずつ生成、生成のたびにマスター画像と並べて顔の同一性をチェック

### ステップ3：品質チェックリスト
各画像を採用前に確認：
- [ ] マスター画像と「同じキャラ」に見えるか
- [ ] 表情が指定通りか
- [ ] 解像度・縦横比が指定通りか（768×960）
- [ ] 禁止事項に触れていないか
- [ ] 小さく縮小しても識別可能か（実際にゲーム内サイズ120×150に縮小して確認）

### ステップ4：配置
- `public/characters/{characterId}/{expression}.png` に配置
- アプリ側で動的に縮小表示される

---

## 👥 メインキャラクター 4名（各9表情 = 36枚）

### 1. detective（蛇道シェルロック / 主人公・年齢不詳）

**マスタープロンプト**

```
[MASTER STYLE BLOCK]

CHARACTER: Sherlock Jadou (蛇道シェルロック), the protagonist data detective.

PHYSICAL:
- Age: indeterminate, appears 30-35 years old
- Height impression: very tall (195cm), lean and gaunt
- Build: angular, almost emaciated, sharp jawline
- Skin: pale with cool undertone, faint hollow cheeks, slight unhealthy pallor
- Hair: short black, mostly hidden under hat
- Face: sharp angular features, slight smirk at left mouth corner,
  slightly yellowed teeth showing only when speaking

EYES (CRITICAL):
- Sharp, intelligent, predatory gaze
- ALWAYS partially shadowed by the hat brim — only the lower portion of
  the eyes is fully lit
- Iris color: deep slate grey

SIGNATURE ITEMS (must all be visible):
- Black wide-brim fedora hat tilted forward, wide brim casting deep shadow
  over the upper face, dark band around the hat
- Silver chain necklace with a stylized Sigma (Σ) pendant resting at chest
- Floor-length black trench coat with tall popped collar; the INTERIOR LINING
  visible at the collar reveals vibrant deep crimson red (#5c1a1a)
- Black silk scarf loosely wrapped around the neck
- Red leather notebook held in left hand at chest level (mathematical
  equations in red ink visible on the cover)
- Cigarette held in right hand with a thin trail of smoke

PERSONALITY VIBE:
- Cool, stoic, sharp-eyed
- Film noir protagonist with quiet intensity
- Faintly tragic, world-weary

POSE:
- 3/4 view, slightly turned to the right
- Notebook held vertically near chest
- Right hand with cigarette near mouth level

EXPRESSION: [EXPRESSION_LINE]

REMINDER: Hat brim shadow over upper eyes must be maintained in ALL expressions.
```

**表情バリエーション一覧**

| ファイル | EXPRESSION_LINE |
|---|---|
| `neutral.png` | mouth in soft flat line, eyes calmly observing forward, faint smirk just barely visible |
| `worried.png` | very subtle furrow between brows, mouth slightly tightened, eyes narrow slightly more |
| `distraught.png` | jaw clenched, single deep line between brows, eyes intense even through shadow |
| `shocked.png` | mouth slightly open in restrained surprise, brows raised slightly, eyes wider than usual |
| `eureka.png` | corner of mouth raised in a knowing smile, eyes glinting with realization, a touch of triumph |
| `hopeful.png` | gentle softening of features, mouth in slight smile, eyes warmer than usual (still partly shadowed) |
| `angry.png` | jaw extremely tense, mouth pressed flat with downturn, eyes sharp and cold like a predator's |
| `tired.png` | deeper shadows under eyes, mouth slack, slight droop of head, lit cigarette closer to face |
| `thinking.png` | notebook raised to cover lower face, only eyes visible above, eyes scanning sideways and slightly down |

---

### 2. yamada（シズマ・ヤマダ / 27歳・新人マーケター）

**マスタープロンプト**

```
[MASTER STYLE BLOCK]

CHARACTER: Shizuma Yamada (シズマ・ヤマダ), 27-year-old novice marketer who
gets scammed in case 1, recurring sidekick.

PHYSICAL:
- Age: 27, but looks slightly younger when nervous
- Height impression: 180cm but severe forward hunch makes him appear 165cm
- Build: average, slightly slumped shoulders
- Skin: medium-light Japanese tone, slightly flushed cheeks
- Hair: VOLUMINOUS messy afro hairstyle, very dark brown (#3a2a1e),
  bushy and bold like Akira Toriyama character hair
- Face: oval, earnest naive expression, faint dark circles under eyes from overwork

SIGNATURE ITEMS (must all be visible):
- Wrinkled navy blue (#1e3a8a) suit jacket, visibly creased and over-worn
- White dress shirt with one collar button undone
- Necktie loose and tilted at a 45-degree angle (red and navy striped)
- Cracked tablet device tucked under his left arm — the cracked screen is
  the visual symbol of his career setbacks (the crack pattern must be visible)
- Visible mismatched socks at trouser cuffs (one red, one green)
- Cheap analog wristwatch on left wrist

PERSONALITY VIBE:
- Pure-hearted, hot-blooded, easily deceived but resilient
- Earnest, slightly anxious, the kind of person you want to root for

POSE:
- 3/4 view, hands often raised palm-up when speaking
- Slightly forward-leaning, as if always asking for clarification

EXPRESSION: [EXPRESSION_LINE]
```

**表情バリエーション**

| ファイル | EXPRESSION_LINE |
|---|---|
| `neutral.png` | neutral with slight tiredness, mouth in soft line, eyes forward and slightly worried |
| `worried.png` | eyebrows angled into V-shape, mouth slightly downturned, looks at floor |
| `distraught.png` | extremely distressed, mouth open in small gasp, single sweat bead on temple, watery eyes, hands gripping his own knees |
| `shocked.png` | mouth wide open, eyes very large with shrunken pupils, color drained from face, head pulled back slightly |
| `eureka.png` | wide-eyed realization, mouth open in audible "ah!", eyes sparkling, one finger raised |
| `hopeful.png` | gentle hopeful smile breaking through tiredness, eyes softly lit, slight upward tilt of head |
| `angry.png` | uncharacteristic anger, eyebrows pulled down sharply, jaw clenched, fists slightly visible |
| `tired.png` | extremely tired, heavy bags under eyes, half-lidded, mouth in flat line, shoulders extra slumped |
| `thinking.png` | thoughtful, eyes looking down to side, mouth closed, finger near chin |

---

### 3. sato（クロウ・サトウ / 35歳・配信運営）

**マスタープロンプト**

```
[MASTER STYLE BLOCK]

CHARACTER: Crow Sato (クロウ・サトウ), 35-year-old jaded tech industry insider,
recurring informant.

PHYSICAL:
- Age: 35
- Height: 188cm, very tall and notably gaunt
- Build: slim almost emaciated, long limbs
- Skin: pale with sickly undertone
- Hair: jet black, slicked back with hair gel, ends gathered into a low
  ponytail behind his head, slightly unkempt strands at temples
- Face: oval with sharp cheekbones, faint stubble (3-day beard)

DISTINCTIVE EYE FEATURE (CRITICAL):
- Wears a vintage MECHANICAL MONOCLE over his LEFT eye only
- The monocle has visible brass mechanical detail (small gears, screws)
- Attached by a thin black leather cord that loops around his neck
- His RIGHT eye is uncovered and narrow, sharp, suspicious

SIGNATURE ITEMS (must all be visible):
- Long black coat with deep crimson interior visible at collar
- Multiple silver chains hanging from neck area (loose, not gaudy)
- Chunky silver ring on right hand thumb
- Pinball steel ball (small chrome sphere) being rolled between right
  hand fingers — symbolizes his obsession with probability
- Black gloves on both hands, fingerless

PERSONALITY VIBE:
- Cynical intellectual, weary of the industry
- Articulate when discussing math, otherwise speaks in fragments
- Carries himself like he's seen too much

POSE:
- Stands at slight angle, mostly profile, only eyes turn toward camera
- Right hand at chest level rolling the steel ball

EXPRESSION: [EXPRESSION_LINE]

REMINDER: Monocle is on LEFT eye in every expression.
```

**表情バリエーション** — yamadaと同じ9種類のEXPRESSION_LINEを使用

---

### 4. akari（ヒナタ・アカリ / 22歳・新人女優→助手）

**マスタープロンプト**

```
[MASTER STYLE BLOCK]

CHARACTER: Hinata Akari (ヒナタ・アカリ), 22-year-old aspiring actress turned
detective's assistant, sub-heroine.

PHYSICAL:
- Age: 22 (looks slightly younger)
- Height: small (140cm visual impression), petite
- Build: slim, delicate
- Skin: light Japanese tone, dewy and youthful
- Hair: bright chestnut brown (#a87844), EXTREMELY long (would reach
  ankles in full body), shown flowing past shoulders in bust shot
- Hair STYLED in two side twin-tails tied with hair ribbons at ear level
- Hair accessory: large red bow on top of head (signature item)
- Face: round, soft, with VERY LARGE round eyes that occupy
  approximately 1/3 of the face area (Akira Toriyama-style proportions)

EYES (CRITICAL):
- Huge, round, expressive
- Dark brown with strong specular highlights (multiple light reflections
  giving them sparkle and life)
- Long eyelashes

SIGNATURE ITEMS (must all be visible):
- Pastel pink (#f4c2c2) cardigan with frilly collar trim
- White blouse underneath with small ribbon at chest
- Pleated white miniskirt visible at hip line
- Heart-shaped phone holder selfie stick visible behind right shoulder
  (symbolizes her former actress life)
- Pink wristband on left wrist (lucky charm)

PERSONALITY VIBE:
- Earnest, emotionally expressive, intuitive
- Big-hearted, easily moved to tears or laughter
- Quick to read other people's emotions

POSE:
- 3/4 view, often with one hand near mouth or cheek
- Slight forward lean of curiosity

EXPRESSION: [EXPRESSION_LINE]
```

**表情バリエーション** — yamadaと同じ9種類

---

## 🆕 新規依頼人キャラクター（ケース別）

### 5. raidousha（雷神タケシ / ケース2依頼人・28歳）

```
[MASTER STYLE BLOCK]

CHARACTER: Raijin Takeshi (雷神タケシ), 28-year-old gacha addict and freelancer.

PHYSICAL:
- Age: 28, looks streetwise
- Height: 178cm
- Build: athletic, slightly intimidating
- Skin: tanned (#c9a07a)
- Hair: bleached platinum blonde, spiky and tall (Akira Toriyama style),
  with darker roots at the scalp
- Face: square jaw, sharp eyes, scar across right eyebrow

SIGNATURE ITEMS:
- Black bomber jacket with elaborate gold dragon embroidery on the back
  and sleeves (the dragon should be visible from the front around the collar)
- Several heavy gold chains around neck
- White t-shirt visible under jacket
- Multiple silver rings on both hands
- Smartphone tightly gripped in right hand (symbolic of gacha obsession)

PERSONALITY VIBE:
- Short-tempered but pure-hearted, genuine love for games
- Looks dangerous but is actually softhearted

POSE: Standing with one hand gripping phone aggressively, other on hip

EXPRESSION: [EXPRESSION_LINE]
```

### 6. kito（鬼頭テッペイ / ケース4依頼人・45歳）

```
[MASTER STYLE BLOCK]

CHARACTER: Teppei Kito (鬼頭テッペイ), 45-year-old veteran software engineer.

PHYSICAL:
- Age: 45, weathered family man
- Height: 175cm
- Build: solid stocky, broad shoulders, slight belly
- Skin: medium-tan with healthy color
- Hair: short black with grey streaks at temples, neatly cut
- Face: square jaw, very thick black eyebrows, hint of stubble

DISTINCTIVE FEATURES:
- Eyebrows are EXAGGERATEDLY THICK (signature feature)
- A vertical worry line between the brows even when relaxed
- Faint laugh lines around eyes from being a father

SIGNATURE ITEMS:
- Slightly faded grey polo shirt with company logo (logo should be a
  generic abstract design, NOT a real brand)
- Silver wedding ring on left hand
- Simple analog watch on right wrist
- Reading glasses hanging from polo collar
- Stylus pen tucked behind right ear

PERSONALITY VIBE:
- Old-school engineer, craftsman pride
- Hot-tempered when his work is insulted, but kind to younger people

POSE: Arms slightly crossed, looking serious

EXPRESSION: [EXPRESSION_LINE]
```

### 7. fukatsu（深津カオリ / ケース5依頼人・38歳）

```
[MASTER STYLE BLOCK]

CHARACTER: Kaori Fukatsu (深津カオリ), 38-year-old political campaign strategist.

PHYSICAL:
- Age: 38
- Height: 168cm, sharp posture
- Build: slim, professional bearing
- Skin: light, perfectly maintained
- Hair: jet black, pulled back into a tight low ponytail (no stray hairs)
- Face: angular, sharp cheekbones, very sharp eyes

SIGNATURE ITEMS:
- Black tailored pantsuit with subtle pinstripe
- White blouse buttoned to the top
- Silver pen clipped at chest pocket
- Tablet held in left hand at side
- Discreet silver earrings (small studs)
- No makeup beyond muted lipstick

PERSONALITY VIBE:
- Sharp-tongued strategist, ex-investigative journalist
- Hyper-competent, no-nonsense

POSE: Confident upright stance, slight head tilt of analysis

EXPRESSION: [EXPRESSION_LINE]
```

### 8. tsukuyomi（月詠きらら / ケース6依頼人・22歳）

```
[MASTER STYLE BLOCK]

CHARACTER: Kirara Tsukuyomi (月詠きらら), 22-year-old emerging illustrator.

PHYSICAL:
- Age: 22, fragile and sensitive looking
- Height: 158cm, slim
- Build: thin, slightly hunched (from drawing posture)
- Skin: pale (rarely goes outside)
- Hair: jet black short bob with sharp blunt bangs covering eyebrows
- Face: oval, large sad eyes, soft features

SIGNATURE ITEMS:
- Oversized cream-colored apron splattered with watercolor paint stains
  (multiple colors, especially blues and pinks)
- Black turtleneck under the apron
- A bundle of colored pencils tucked into apron breast pocket (visible)
- Silver chain with small crescent moon pendant
- Tablet stylus tucked behind right ear

PERSONALITY VIBE:
- Shy, introverted, but burning passion for art beneath the surface
- Tearful but resilient

POSE: Slightly hunched, hands clasped in front

EXPRESSION: [EXPRESSION_LINE]
```

### 9. shirase（白瀬ノエル / ケース7依頼人・24歳）

```
[MASTER STYLE BLOCK]

CHARACTER: Noel Shirase (白瀬ノエル), 24-year-old corporate marketer.

PHYSICAL:
- Age: 24
- Height: 165cm
- Build: lean, athletic
- Skin: light
- Hair: silver-grey short cut (a chic "pixie" cut), neat but stylish
- Face: oval with sharp chin, cool features

DISTINCTIVE FEATURES:
- Silver-rimmed rectangular glasses
- Permanent slight frown of concentration

SIGNATURE ITEMS:
- White dress shirt with rolled-up sleeves
- Black blazer worn open
- Slim black tie
- Silver smartwatch on left wrist
- Black slim notebook in right hand
- Mechanical pencil clipped to shirt pocket

PERSONALITY VIBE:
- Dry, sharp-tongued, results-oriented
- Anger before tears type
- Genuinely smart and ambitious

POSE: Standing arms crossed, glasses pushed up bridge

EXPRESSION: [EXPRESSION_LINE]
```

### 10. wakana（若菜ミレイ / ケース8依頼人・35歳）

```
[MASTER STYLE BLOCK]

CHARACTER: Mirei Wakana (若菜ミレイ), 35-year-old housewife with three children.

PHYSICAL:
- Age: 35, motherly
- Height: 160cm
- Build: pleasantly plump, motherly figure (signature feature)
- Skin: warm golden tone
- Hair: wavy brown, tied back loosely with a casual hair tie, a few stray
  strands at temples
- Face: round, warm, laugh lines around mouth and eyes

SIGNATURE ITEMS:
- Bright apron with cute flower pattern (pink and yellow flowers on white)
- Casual purple t-shirt under apron
- Wedding ring (gold) on left hand
- Multiple grocery bags hanging from RIGHT arm (3 bags, slightly bulging)
- Cheerful expression default

PERSONALITY VIBE:
- Warm, expressive, big-hearted
- Laughs at her own mistakes
- Surprisingly sharp under the housewife exterior

POSE: One hand on hip, the other holding shopping bags, slight tilted smile

EXPRESSION: [EXPRESSION_LINE]
```

### 11. pekosenji（閃光寺ペコ / ケース9依頼人・28歳）

```
[MASTER STYLE BLOCK]

CHARACTER: Peko Senkouji (閃光寺ペコ), 28-year-old VTuber, country origin.

PHYSICAL:
- Age: 28, but appears youthful
- Height: 162cm
- Build: average, slightly soft
- Skin: light, country-girl rosy cheeks
- Hair: medium-length brown with subtle wave, casual loose style (tucked
  behind ears)
- Face: round, soft, kind eyes

DISTINCTIVE FEATURES:
- Hood pulled up over head (gray hoodie), with stray hairs visible
- Off-camera vibe: she looks completely different from her flashy VTuber
  persona

SIGNATURE ITEMS:
- Plain gray oversized hoodie (her "off-screen" outfit)
- Visible necklace under hoodie collar (a small star pendant — symbolizes
  her stage name "閃光寺")
- Black leggings visible
- Small handbag with VTuber merchandise pin (her own character chibi)
- Worn sneakers

PERSONALITY VIBE:
- Humble, country girl, completely different from her on-stream personality
- Shy outside of streaming

POSE: Slightly hunched, hands in hoodie pocket

EXPRESSION: [EXPRESSION_LINE]
```

---

## 🦹 ボスキャラクター（七幹部 + 最終ボス）

各ボスは表情を3種類のみ：`neutral`, `smug`（余裕の笑み）, `defeated`（敗北）

### 12. boss_review（女王・氷室レイア / ケース4ボス）

```
[MASTER STYLE BLOCK]

CHARACTER: Reia Himuro (氷室レイア), 40-year-old female corporate executive,
mastermind of fake review operations. Codename: "QUEEN".

PHYSICAL:
- Age: 40, ice-cold beauty
- Height: 172cm, slender and tall
- Build: slim, sharp posture
- Skin: very pale (#e8d4c0), almost porcelain
- Hair: silver-white shoulder-length straight hair with razor-sharp side bangs,
  perfectly symmetrical, glossy
- Face: angular with sharp cheekbones, cold beauty

DISTINCTIVE FEATURES:
- Black crescent moon tattoo under the LEFT eye
- Eyes: narrow, calculating, icy blue contact lenses (unnatural color)

SIGNATURE ITEMS:
- Pure white power suit with high black collar
- Gold star-shaped pin at her throat (the visible symbol of fake 5-star reviews)
- HIDDEN DETAIL: the inside of her collar shows tiny embroidered "three eyes
  in triangle" logo when the collar tilts (only visible in defeated expression)
- Red lipstick (deep crimson)
- Red marker pen held in her right hand
- Oversized clipboard with rating sheets in her left hand

PERSONALITY VIBE:
- Ruthless executive, polite smile hiding malice
- Looks down on others as inferior

EXPRESSION variants:

[neutral]: composed cold expression, eyes half-closed in calm authority,
mouth in slight neutral curve

[smug]: confident smug smile, eyes half-closed, corner of mouth raised,
right hand near mouth (covering an amused giggle), three eyes logo just barely
peeking from collar

[defeated]: shocked defeat, makeup slightly smeared, hair slightly disheveled,
eyes wide and unbelieving, three eyes logo CLEARLY visible at collar
(shown as evidence of her organization affiliation)
```

### 13. boss_poll（首魁・雷童寺源蔵 / ケース5ボス）

```
[MASTER STYLE BLOCK]

CHARACTER: Genzou Raidouji (雷童寺源蔵), 57-year-old populist politician puppet.

PHYSICAL:
- Age: 57
- Height: 162cm, stocky and rotund
- Build: short and round (signature comedic silhouette)
- Skin: tan and weathered (#c9a07a)
- Hair: BALD on top with a ring of frizzy white-grey hair around the sides
  (Akira Toriyama-style "monk" silhouette, signature)
- Face: square jaw, faint laugh lines, mouth often open in mid-oration

SIGNATURE ITEMS:
- Flashy navy pinstripe suit with shiny lapels
- Bright red tie with subtle red bar-chart pattern
- Lapel pin: 3 vertical bars in red (which subtly form the "three eyes"
  triangle when looked at as overall composition)
- Gold cufflinks (visible on shirt cuffs)
- Red socks visible at trouser cuffs
- Large red carnation in lapel buttonhole

PERSONALITY VIBE:
- Charismatic showman on the surface
- Manipulative undertone, but secretly believes his own lies

EXPRESSION variants:

[neutral]: politician composure, hands clasped in front, slight smile

[smug]: confident victorious grin, both arms thrown wide as if to embrace
crowd, mouth open in "O" of oration

[defeated]: collapsed in shock, sweat pouring down forehead, eyes wide with
terror, both arms hanging limp, lapel pin's three eyes pattern revealed
clearly to be a triangle of three eyes
```

### 14. boss_ai（設計者・鳴神コード / ケース6ボス）

```
[MASTER STYLE BLOCK]

CHARACTER: Code Narukami (鳴神コード), 32-year-old male tech CTO with internal
conflict. Codename: "ARCHITECT".

PHYSICAL:
- Age: 32
- Height: 185cm, fit modern silhouette
- Build: slim athletic
- Skin: pale (#e0cdb8) — works late nights
- Hair: silver platinum two-block undercut, longer on top swept back to one side
- Face: oval with sharp jawline

DISTINCTIVE FEATURES:
- Wears futuristic sunglasses with green glowing circuit patterns visible
  in the reflective lenses, completely hiding his eyes (his emotional state
  shown through mouth and brow only — IMPORTANT for expressions)
- Single small earring in left ear

SIGNATURE ITEMS:
- Black turtleneck under silver geometric-patterned long blazer
- BACK of jacket displays large holographic "three eyes triangle" embroidery
  (when shown from the side, just barely visible)
- Glowing tablet held in right hand (cyan blue glow on his face)
- Holographic green smartwatch on left wrist
- High-tech earpiece visible in left ear

PERSONALITY VIBE:
- Arrogant tech-bro on the surface
- Secretly tortured by guilt (visible only in defeated expression)

EXPRESSION variants (eyes always hidden by glasses):

[neutral]: stoic, mouth in flat line, arms crossed casually

[smug]: confident smirk, slight head tilt, finger pushes glasses up at bridge

[defeated]: SUNGLASSES CRACKED revealing one tearful eye, mouth open in
horror, the other lens shows malfunctioning circuit pattern, expression of
genuine remorse
```

### 15. boss_pvalue（指南者・紫紋ヴィオラ / ケース7ボス）

```
[MASTER STYLE BLOCK]

CHARACTER: Viola Shimon (紫紋ヴィオラ), 42-year-old female data consultant
who corrupts companies. Codename: "ORACLE".

PHYSICAL:
- Age: 42
- Height: 175cm, sleek
- Build: slender
- Skin: light (#ead0c0)
- Hair: razor-sharp short bob in deep purple (#3a1a4a) with silver streaks,
  completely glossy and angular
- Face: heart-shaped with sharp chin

DISTINCTIVE FEATURES:
- Piercing violet contact lenses (matches hair)
- Dark purple lipstick

SIGNATURE ITEMS:
- White long blazer worn over black turtleneck
- Red high-heeled shoes visible at edge of frame
- Silver brooch shaped like a magnifying glass at left chest
  (CRITICAL: Inside the magnifying lens, "three eyes" pattern is engraved —
  must be visible in defeated expression)
- Holds a red analysis report folder in left hand
- Single thin silver chain at neck
- Small black analytical glasses sometimes held in right hand

PERSONALITY VIBE:
- Smooth-talking academic fraud
- Pretends to be a mentor while plotting destruction

EXPRESSION variants:

[neutral]: composed academic, slight knowing smile, holding report

[smug]: leans forward with raised eyebrow, devious grin, magnifying glass
brooch tilted toward viewer (revealing engraving)

[defeated]: brooch falling from her chest, mouth tight, tears welling but
not falling, the engraving inside the brooch CLEARLY shown
```

### 16. boss_correlation（論文の悪魔・金剛寺亀蔵 / ケース8ボス）

```
[MASTER STYLE BLOCK]

CHARACTER: Kamezo Kongouji (金剛寺亀蔵), 62-year-old paper-mill professor.
Codename: "FORGER".

PHYSICAL:
- Age: 62
- Height: 150cm, very small (signature small stature)
- Build: hunched like a turtle (visual reference: turtle posture)
- Skin: weathered, deeply wrinkled (#bda088)
- Hair: thinning grey hair combed over (#7a7570)
- DISTINCTIVE FEATURE: extremely long white beard reaching down to about
  his waist (in bust shot, visible flowing down past frame)
- Face: long and narrow, sunken eyes

SIGNATURE ITEMS:
- Brown tweed jacket with leather elbow patches (academic stereotype amplified)
- Beige vest underneath, white shirt
- Brown bow tie
- Round wire-rim glasses
- Gold pocket watch with chain (chain visible from vest pocket; watch face
  shows "three eyes" engraving — visible in defeated expression)
- Thick scroll/bundle of papers tucked under right arm
- Wooden cane with carved tortoise on top (just barely visible in frame)

PERSONALITY VIBE:
- Arrogant academic dismissing all criticism
- Performs senility, actually razor-sharp manipulator

EXPRESSION variants:

[neutral]: composed scholar, half-lidded eyes, hand stroking long beard

[smug]: WIDE GRIN showing yellowed teeth, pocket watch dangling from hand,
swinging like pendulum

[defeated]: glasses askew on face, beard disheveled, mouth open in shock,
papers spilling from arm, pocket watch open showing three eyes engraving
```

### 17. boss_chisq（算法の魔女・絶対零度ユキ / ケース9ボス）

```
[MASTER STYLE BLOCK]

CHARACTER: Yuki Zettai-reido (絶対零度ユキ), 28-year-old female algorithm
engineer. Codename: "WITCH".

PHYSICAL:
- Age: 28
- Height: 178cm, athletic and tall
- Build: lean, fit
- Skin: very pale (#f0e0d0), Goth aesthetic
- Hair: silver-white extremely long hair tied in HIGH PONYTAIL reaching past
  waist, perfectly straight
- Face: youthful but cold, oval shape

DISTINCTIVE FEATURES (critical):
- HETEROCHROMIA: LEFT eye is bright BLUE, RIGHT eye is bright RED
- Sharp eyeliner (winged)
- Pale lavender lipstick

SIGNATURE ITEMS (most distinctive):
- Black tactical jacket with multiple metallic zippers (4-5 zippers visible)
- Black crop top under jacket
- Black fingerless gloves on both hands
- THREE RED LED EARRINGS on EACH ear, total 6 LEDs (3 per ear arranged
  in a triangle pattern). The 3 LEDs per ear form the "three eyes" symbol;
  with both ears, it's the symbol shown DOUBLED — sign of organization's
  highest rank
- Silver chain choker
- Multiple thin silver bracelets on both wrists

PERSONALITY VIBE:
- Detached, sees humans as engagement metrics
- Gothic intellectual, secretly emotional

EXPRESSION variants:

[neutral]: cold composed look, slight head tilt, finger to lips in
gesture of contemplation

[smug]: index finger to lips in shushing gesture, winks RIGHT (red) eye,
ponytail flicked behind shoulder

[defeated]: ONE EARRING falling from right ear, expression cracking with
genuine emotion (mouth slightly open in surprise at her own emotional reaction),
both eyes wide and slightly tearful (especially the red one)
```

### 18. boss_final（データの悪魔・幽鬼丸 / 最終ボス・第1形態）

```
[MASTER STYLE BLOCK]

CHARACTER: Yukimaru (幽鬼丸), 68-year-old final antagonist, former government
chief statistician turned criminal mastermind. Codename: "DEMON".

THIS IS THE FINAL BOSS — visual quality must be highest.

PHYSICAL:
- Age: 68, but physically commanding
- Height: 190cm, tall and imposing
- Build: surprisingly straight posture for his age, lean
- Skin: aged with deep wrinkles (#c8b8a8)
- Hair: PURE WHITE, total snow-white, slicked-back long hair to past shoulders
- Face: long and sharp, deeply lined, cold grey eyes with intense intelligence
- Beard: short and well-trimmed white goatee

SIGNATURE ITEMS:
- Pitch-BLACK formal Japanese-Western fusion long robe (combination of
  hakama and Western long coat — unique design): high collar, layered
  black fabric, gold trim at edges
- Large medallion at chest engraved with "three crimson eyes" arranged
  in triangle (highly visible on dark robe)
- Ancient ABACUS held in his right hand (the abacus has red and black beads —
  symbol of his statistician past)
- White cotton inner garment visible at collar
- Single rope tie at waist with intricate knot

PERSONALITY VIBE:
- Terrifying calm
- Philosophical evil
- Embodiment of weaponized statistics

EXPRESSION variants:

[neutral]: calm imposing presence, eyes half-closed in meditation,
abacus held vertically at chest

[smug]: thin cruel smile, abacus held aloft slightly, eyes opened wider
showing intellectual contempt

[defeated]: kneeling down (visible at top of frame), one hand on the ground,
the medallion hanging loose, two of three medallion eyes have lost their crimson
glow (only one eye still faintly lit), expression of philosophical resignation
rather than anger
```

### 19. boss_final_awakened（幽鬼丸・第2形態 / 覚醒態）

これは `enraged` 表情として別途生成。

```
[MASTER STYLE BLOCK]

CHARACTER: Yukimaru in his AWAKENED "Data Demon" form — second phase of
final battle.

Same physical base as Yukimaru's first form, BUT:

TRANSFORMATION:
- The black robe is TORN OPEN at the back, revealing geometric WINGS made
  entirely of statistical charts (line graphs, bar charts, scatter plots)
  extending from his back like ethereal angel wings
- The wings are translucent geometric forms of pure data visualization,
  glowing in cyan blue (#00ddff)
- UPPER HALF OF FACE has DISAPPEARED INTO SHADOW, replaced by THREE GLOWING
  CRIMSON EYES (#ff1f3a) arranged in a triangle on his forehead, each
  pulsating with red light
- LOWER HALF OF FACE still visible: mouth twisted in fury, white goatee
  glowing slightly with embers
- Both hands emit floating red mathematical symbols (Σ, ∫, integrals,
  probability density functions) as if attacking — the symbols hover around
  his hands like floating spell components
- Aura: crimson energy radiating from the three eyes, cyan binary code
  patterns (0s and 1s) glowing along the edges of his torn robe

EXPRESSION:
- Enraged, mouth twisted in fury, three eyes pulsating with rage
- Final boss intensity, frightening but not gory

POSE:
- Arms outstretched as if commanding the data symbols
- Wings spread wide, frame partially filled by their geometry
- Slight aura/glow around entire silhouette

ATMOSPHERE:
- Background should imply a void of swirling data
- Particle effects of red and cyan
```

---

## 👤 モブNPC（汎用 / 各1枚 `neutral.png` のみ）

各NPCは`MASTER STYLE BLOCK`を冠して、以下の指示で生成：

```
NPC: [キャラ説明をここに]

ROLE: Background character used in multiple cases. Should be visually
distinctive but secondary in importance to main characters.

EXPRESSION: neutral, suitable for general dialogue scenes
```

| ID | キャラ説明 |
|---|---|
| `npc_salaryman_01` | Anthropomorphic-hippo-like obese 45yo male office worker, perpetual sweat on forehead, 175cm but extremely wide, thinning combed-over hair, too-tight grey suit straining at buttons, blue tie loose, holds massive stack of papers in both arms (papers slightly falling), exhausted overwhelmed expression |
| `npc_office_lady_01` | Sharp 28yo female office worker, jet black hair with razor-sharp blunt bangs perfectly straight across forehead, TRIANGULAR EYES (literally angular triangle shape — exaggerated), permanent angry frown, beige blazer over white blouse with high collar, oversized coffee mug (twice normal size) held in both hands |
| `npc_student_01` | Smartphone-addicted 17yo male high school student, messy black hair covering eyes, neck thrust forward in extreme slouch (body C-shaped), dark circles under hollow eyes, mouth slightly open vacantly, black school uniform (gakuran) unbuttoned, TWO smartphones one in each hand with eyes fixed on them, zombie-like vacant expression |
| `npc_student_02` | Bookworm 16yo female high school student, long brown braids on both sides, large round glasses covering half her face, navy sailor uniform with red ribbon, oversized backpack visible behind, thick book held open in front of face (walking while reading), peaceful absorbed expression |
| `npc_elderly_man` | Sage-like 80yo man with mystical appearance, wispy white hair on top, EXTREMELY LONG white beard reaching mid-chest with bushy white eyebrows, weathered skin with deep wrinkles, traditional grey kimono with subtle wave pattern, tall wooden walking staff with carved tortoise on top, tortoise tattoo visible on shoulder, wise calm expression |
| `npc_elderly_woman` | Round 75yo woman returning from shopping, small (145cm) and stout, white permed curly hair, MASSIVE woven straw hat tied under chin, floral print kimono jacket and long skirt, 10 SHOPPING BAGS hanging from both arms (5 per side, bulging with vegetables), cheerful warm smile |
| `npc_influencer` | 24yo female internet influencer extremely flashy, bright platinum blonde corkscrew vertical curls (drill curls) very voluminous, OVERSIZED heart-shaped pink sunglasses covering half face, pink off-shoulder dress, multiple gold necklaces and chains, pink selfie stick raised high, glossy pink lips in duck-face pucker, peace sign with both hands |
| `npc_journalist` | 45yo male journalist gaunt and intense, very thin (180cm), messy salt-and-pepper hair, hollow cheeks, intense focused eyes, rumpled brown trench coat over white shirt, MASSIVE IC recorder bag on back, 4 cameras hanging from neck on different straps (varying lengths), notebook and pen in hands, focused investigative gaze |
| `npc_makabe` | 30yo female young government official Maakabe Haruka (in case 10), short cropped black hair, sharp serious face, thin-rimmed glasses, navy government-style suit jacket with subtle stripes, white shirt buttoned to top, government ID lanyard around neck, holds thick document folder, determined expression of someone who's seen corruption |

---

## 🎯 実行手順（再掲）

1. **Geminiを開く**（推奨：Gemini 2.5 Pro / Imagen 4）
2. **MASTER STYLE BLOCK + キャラのマスタープロンプト + neutral表情** を入力して**3〜5枚**生成
3. 1枚を **マスター画像**として確定、他の表情はそれを参照添付して生成
4. 生成した画像を128×160サイズで縮小して、ゲーム内で識別可能か確認
5. `public/characters/{characterId}/{expression}.png` に配置

---

## ⚠️ よくある失敗と対策

| 問題 | 対策 |
|---|---|
| 同じキャラの表情間で顔が変わる | 必ずマスター画像を参照添付し、「Same character, only expression changes」と明記 |
| アスペクト比が違う | 生成後に手動で 768×960 または 4:5 にクロップ |
| 解像度が低すぎる | Gemini側で「high quality, detailed」を指定。それでも低ければImagenを使う |
| 禁止事項に触れる | プロンプトに「No real brands, no real celebrities」と明記 |
| 画風が崩れる | MASTER STYLE BLOCKを毎回先頭に置く。バリエーション生成時も省略しない |
| ボスの「3つの目」が出ない | プロンプト末尾に「The 'three eyes' triangle symbol must be CLEARLY visible」と追記 |

---

## 📝 ライセンスとログ

`docs/IMAGE_GENERATION_LOG.md` を別途作成し、以下を記録：
- 生成日付
- 使用モデル（Gemini 2.5 / Imagen 4 など）
- 利用規約のスナップショット
- 採用画像のファイル名と元のプロンプト

無料公開予定なので、**商用利用可・再配布可**の生成物のみ採用してください。

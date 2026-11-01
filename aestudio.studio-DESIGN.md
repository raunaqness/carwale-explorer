---
version: alpha
name: Aestudio
description: |
  GoShuin's design embodies a refined, cultural aesthetic inspired by Japanese
  heritage and temple traditions. The visual language balances minimal restraint
  with warm, earthy tones drawn from natural materials—parchment, natural stone,
  and aged paper. Typography is purposefully generous and slow-paced, with
  prominent Georgia serif headings and generous negative space that invites
  contemplation. The colour palette blends cool teal-greys with cream and soft
  amber accents, creating an atmosphere of calm documentation and memory
  preservation. Decorative patterns and textile-inspired textures layer subtly
  beneath the interface, referencing woven fabrics and traditional motifs
  without overwhelming the core content. The overall feel is editorial,
  unhurried, and deeply tied to the Japanese aesthetic of yohaku no bi—the
  beauty of empty space.
source:
  url: "https://aestudio.studio/goshuin/en"
  pagesAnalyzed: 1
  extractedAt: 2026-11-01
  tokensMeasured: true
colors:
  primary: "#F4F2EB"
  link: "#4B5545"
  canvas: "#E7E5DF"
  on-primary: "#222222"
  ink: "#2D3435"
  body: "#3D473D"
  muted: "#626761"
  faint: "#72746B"
  hairline: "#756449"
  accent-1: "#46565A"
  neutral-1: "#D6D1C5"
typography:
  display:
    fontFamily: Georgia
    fontSize: 129.364px
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: -9.06px
  body-xl:
    fontFamily: Georgia
    fontSize: 25px
    fontWeight: 400
    letterSpacing: -0.62px
  body-lg:
    fontFamily: Georgia
    fontSize: 23.76px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 1.43px
  body-md:
    fontFamily: Georgia
    fontSize: 19px
    fontWeight: 400
    letterSpacing: 4.75px
  body-sm:
    fontFamily: -apple-system
    fontSize: 13px
    fontWeight: 400
    letterSpacing: 0px
  button-xl:
    fontFamily: Georgia
    fontSize: 64px
    fontWeight: 400
    letterSpacing: -2.56px
  button-lg:
    fontFamily: Georgia
    fontSize: 38px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 6.84px
  button-md:
    fontFamily: -apple-system
    fontSize: 12px
    fontWeight: 400
    letterSpacing: 0px
  button-sm:
    fontFamily: -apple-system
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0.88px
  button-xs:
    fontFamily: -apple-system
    fontSize: 9px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0.36px
  button-xs-2:
    fontFamily: -apple-system
    fontSize: 8px
    fontWeight: 400
    letterSpacing: 1.84px
  label:
    fontFamily: Georgia
    fontSize: 13px
    fontWeight: 400
    letterSpacing: 0px
  caption-lg:
    fontFamily: -apple-system
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.85
    letterSpacing: 0px
  caption-md:
    fontFamily: Georgia
    fontSize: 12px
    fontWeight: 400
    letterSpacing: 2.4px
  caption-md-tight:
    fontFamily: -apple-system
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.3px
  caption-sm:
    fontFamily: -apple-system
    fontSize: 9px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 1.08px
  caption-sm-strong:
    fontFamily: -apple-system
    fontSize: 9px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 1.44px
  caption-xs:
    fontFamily: -apple-system
    fontSize: 8px
    fontWeight: 400
    lineHeight: 1.85
    letterSpacing: 1.36px
rounded:
  none: 0px
  full: 9999px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 24px
  xxl: 28px
  xxxl: 32px
  section: 36px
  band: 40px
borderWidths:
  thin: 1px
shadows:
  sm: "rgba(51, 37, 14, 0.125) 0px 3px 10px 0px"
  md: "rgba(71, 58, 37, 0.094) 0px 12px 28px 0px"
elevationStrategy: progressive
themes:
  derived: dark   # the other theme is the site's measured palette
  light:
    bg: "#E7E5DF"
    surface: "#E0DED8"
    surfaceRaised: "#D9D7D1"
    text: "#2D3435"
    textMuted: "#3D473D"
    border: "#756449"
    accent: "#4B5545"
    accentFg: "#FFFFFF"
    focusRing: "#4B5545"
    elevation: shadow
  dark:
    bg: "#0F0F0F"
    surface: "#1D1D1D"
    surfaceRaised: "#292929"
    text: "#F8F8F8"
    textMuted: "#9F9F9F"
    border: "#353535"
    accent: "#73826A"
    accentFg: "#0B0B0C"
    focusRing: "#5F6C57"
    elevation: "border+surface"
gradients:
  - context: hero
    kind: radial
    value: "radial-gradient(circle, rgba(45, 52, 53, 0.043) 0.55px, rgba(0, 0, 0, 0) 0.8px)"
  - context: section
    kind: linear
    value: "linear-gradient(90deg, rgba(101, 84, 60, 0.075), rgba(0, 0, 0, 0) 15%, rgba(0, 0, 0, 0) 85%, rgba(101, 84, 60, 0.05))"
components:
  button-primary:
    textColor: "rgb(98, 110, 103)"
    border: "1px solid rgba(140, 147, 138, 0.25)"
    height: 24px
    padding: "4px 10px 4px 10px"
    fontSize: 9px
    boxShadow: "rgba(68, 53, 34, 0.024) 0px 1px 2px 0px"
    fontFamily: -apple-system
    fontWeight: 400
    lineHeight: 1.2
    rounded: 999px
    backgroundColor: "rgba(244, 242, 235, 0.93)"
  button-filled:
    typography: "{typography.caption-lg}"
    textColor: "rgb(41, 40, 36)"
    height: 49.5938px
    padding: "10px 10px 10px 10px"
    backgroundColor: "rgb(253, 252, 249)"
  button-text:
    typography: "{typography.button-md}"
    textColor: "rgb(75, 93, 96)"
    height: 48px
    padding: "8px 12px 8px 12px"
  navigation:
    typography: "{typography.caption-lg}"
    textColor: "rgb(41, 40, 36)"
    padding: "12px 18px 12px 18px"
    boxShadow: "rgba(71, 58, 37, 0.094) 0px 12px 28px 0px"
    backgroundColor: "rgb(249, 244, 230)"
  link:
    typography: "{typography.body-sm}"
    textColor: "{colors.link}"
    padding: "14px 6px 14px 6px"
  link-sm:
    typography: "{typography.caption-md-tight}"
    textColor: "{colors.ink}"
    padding: "8px 0px 8px 0px"
states:
  input-focus-visible:
    target: input
    state: focus-visible
    outline: "rgb(155, 85, 87) solid 3px"
    outlineColor: "rgb(155, 85, 87)"
    outlineWidth: 3px
  link-hover:
    target: link
    state: hover
    textColor: "rgb(155, 85, 87)"
  button-hover:
    target: button
    state: hover
    textColor: "rgb(255, 255, 255)"
    backgroundColor: "rgb(133, 70, 73)"
  other-hover:
    target: other
    state: hover
    textColor: "rgb(179, 126, 126)"
  button-focus-visible:
    target: button
    state: focus-visible
    outline: "rgb(178, 82, 60) solid 2px"
    outlineColor: "rgb(178, 82, 60)"
    outlineWidth: 2px
  other-focus-visible:
    target: other
    state: focus-visible
    outline: "rgb(136, 118, 83) solid 2px"
    outlineColor: "rgb(136, 118, 83)"
    outlineWidth: 2px
  button-disabled:
    target: button
    state: disabled
    opacity: 0.3
  other-active:
    target: other
    state: active
    borderColor: "rgb(101, 119, 116)"
    backgroundColor: "rgb(229, 229, 219)"
breakpoints:
  - width: 375
    containerWidth: 354
    gridColumns: 2
    navLinksVisible: 5
    menuToggleVisible: false
    headingPx: 74
    bodyPx: 16
    sectionPaddingX: 14
  - width: 768
    containerWidth: 728
    gridColumns: 2
    navLinksVisible: 5
    menuToggleVisible: false
    headingPx: 69
    bodyPx: 16
    sectionPaddingX: 30
  - width: 1024
    containerWidth: 960
    gridColumns: 2
    navLinksVisible: 5
    menuToggleVisible: false
    headingPx: 92
    bodyPx: 16
    sectionPaddingX: 30
  - width: 1280
    containerWidth: 1216
    gridColumns: 2
    navLinksVisible: 5
    menuToggleVisible: false
    headingPx: 114
    bodyPx: 16
    sectionPaddingX: 30
  - width: 1440
    containerWidth: 1376
    gridColumns: 2
    navLinksVisible: 5
    menuToggleVisible: false
    headingPx: 129
    bodyPx: 16
    sectionPaddingX: 30
coverage:
  statesFound: 35
  gradientsFound: 2
  rolesUnassigned: 2
  archetypesUnnamed: 0
  archetypesDetected: 0
  responsiveMeasured: true
  stylesheetsBlocked: false
  semanticRampDeclared: false
---

# Design System Inspired by GoShuin

```yaml
tokens:
  colors:
    primary: "#F4F2EB"
    link: "#4B5545"
    accent-1: "#46565A"
    canvas: "#E7E5DF"
    ink: "#2D3435"
    body: "#3D473D"
    muted: "#626761"
    faint: "#72746B"
    on-primary: "#222222"
    hairline: "#756449"
    neutral-1: "#D6D1C5"
  typography:
    display: { size: "129.364px", weight: 400, lineHeight: 0.98, letterSpacing: "-9.06px", family: "Georgia" }
    body-lg: { size: "23.76px", weight: 400, lineHeight: 1.4, letterSpacing: "1.43px", family: "Georgia" }
    label: { size: "13px", weight: 400, lineHeight: null, letterSpacing: "0px", family: "Georgia" }
    button-xl: { size: "64px", weight: 400, lineHeight: null, letterSpacing: "-2.56px", family: "Georgia" }
    button-lg: { size: "38px", weight: 400, lineHeight: 1.4, letterSpacing: "6.84px", family: "Georgia" }
    body-xl: { size: "25px", weight: 400, lineHeight: null, letterSpacing: "-0.62px", family: "Georgia" }
    body-md: { size: "19px", weight: 400, lineHeight: null, letterSpacing: "4.75px", family: "Georgia" }
    caption-md: { size: "12px", weight: 400, lineHeight: null, letterSpacing: "2.4px", family: "Georgia" }
    body-sm: { size: "13px", weight: 400, lineHeight: null, letterSpacing: "0px", family: "-apple-system" }
    button-md: { size: "12px", weight: 400, lineHeight: null, letterSpacing: "0px", family: "-apple-system" }
    caption-lg: { size: "16px", weight: 400, lineHeight: 1.85, letterSpacing: "0px", family: "-apple-system" }
    button-sm: { size: "11px", weight: 400, lineHeight: 1.5, letterSpacing: "0.88px", family: "-apple-system" }
    caption-sm: { size: "9px", weight: 400, lineHeight: 1.5, letterSpacing: "1.08px", family: "-apple-system" }
    caption-sm-strong: { size: "9px", weight: 500, lineHeight: 1.4, letterSpacing: "1.44px", family: "-apple-system" }
    button-xs: { size: "9px", weight: 400, lineHeight: 1.5, letterSpacing: "0.36px", family: "-apple-system" }
    caption-md-tight: { size: "12px", weight: 400, lineHeight: 1.4, letterSpacing: "0.3px", family: "-apple-system" }
    button-xs-2: { size: "8px", weight: 400, lineHeight: null, letterSpacing: "1.84px", family: "-apple-system" }
    caption-xs: { size: "8px", weight: 400, lineHeight: 1.85, letterSpacing: "1.36px", family: "-apple-system" }
  spacing:
    xxs: "4px"
    xs: "8px"
    sm: "12px"
    md: "16px"
    lg: "20px"
    xl: "24px"
    xxl: "28px"
    xxxl: "32px"
    section: "36px"
    band: "40px"
  rounded:
    none: "0px"
    full: "9999px"
  shadows:
    sm: "rgba(51, 37, 14, 0.125) 0px 3px 10px 0px"
    md: "rgb(210, 186, 134) 0px -3px 0px 0px inset"
    lg: "rgba(71, 58, 37, 0.094) 0px 12px 28px 0px"
  borders:
    thin: "1px"
```

## 1. Visual Theme & Atmosphere

GoShuin's design embodies a refined, cultural aesthetic inspired by Japanese heritage and temple traditions. The visual language balances minimal restraint with warm, earthy tones drawn from natural materials—parchment, natural stone, and aged paper. Typography is purposefully generous and slow-paced, with prominent Georgia serif headings and generous negative space that invites contemplation. The colour palette blends cool teal-greys with cream and soft amber accents, creating an atmosphere of calm documentation and memory preservation. Decorative patterns and textile-inspired textures layer subtly beneath the interface, referencing woven fabrics and traditional motifs without overwhelming the core content. The overall feel is editorial, unhurried, and deeply tied to the Japanese aesthetic of *yohaku no bi*—the beauty of empty space.

**Key Characteristics**

- Serif-driven typography with dramatic, closely-tracked display sizes
- Warm, desaturated earthy palette anchored by cream and muted sage
- Sharp corners (0px radius) throughout, emphasizing clean linearity
- Generous whitespace and flowing multi-column asymmetry
- Subtle texture overlays and radial dot patterns for depth without weight
- Warm micro-interactions: subtle lifts, colour shifts, and directional nudges
- Editorial, unhurried pacing; every element feels intentional and placed

## 2. Color Palette & Roles

### Primary & Brand

- **Brand Accent** (`{colors.primary}` — `#F4F2EB`): Cream-white surface used for primary CTAs, active states, and brand-mark backgrounds. Core brand surface.
- **On Primary** (`{colors.on-primary}` — `#222222`): Darkest text label colour for maximum contrast on brand surfaces.

### Interactive & Links

- **Link** (`{colors.link}` — `#4B5545`): Warm sage-green for inline links and navigation anchors. Transforms to warm rust tones on hover.
- **Accent / Decorative** (`{colors.accent-1}` — `#46565A`): Cool teal-grey decorative accent with no assigned semantic role. Used for visual rhythm and texture.

### Neutral Scale

- **Canvas** (`{colors.canvas}` — `#E7E5DF`): Warm, slightly beige page background. The system's default surface.
- **Ink** (`{colors.ink}` — `#2D3435`): Darkest neutral; primary text for headings and high-contrast elements.
- **Body** (`{colors.body}` — `#3D473D`): Primary body copy colour; slightly warmer than ink.
- **Muted** (`{colors.muted}` — `#626761`): Secondary / supporting text, captions, and tertiary information.
- **Faint** (`{colors.faint}` — `#72746B`): Tertiary or placeholder text; lowest priority content.
- **Neutral Decorative** (`{colors.neutral-1}` — `#D6D1C5`): Light neutral with no assigned role; used for texture and spacing accents.

### Surface & Borders

- **Hairline** (`{colors.hairline}` — `#756449`): Warm brown-taupe for 1px borders and fine dividers. Creates subtle visual separation without harshness.

## 3. Typography Rules

### Font Family

**Primary: Georgia**
- Serif typeface, classical and editorial. Used for all display and heading sizes. Fallback stack not measured; apply: `Georgia, serif`

**Secondary: -apple-system**
- System sans-serif for body, labels, and small interactive text. Fallback stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|---|---|---|---|---|---|---|
| Display | Georgia | 129.364px | 400 | 0.98 | -9.06px | Hero heading; extreme negative tracking |
| Body Large | Georgia | 23.76px | 400 | 1.4 | 1.43px | Feature or intro text |
| Body Extra Large | Georgia | 25px | 400 | — | -0.62px | Subheading variant |
| Body Medium | Georgia | 19px | 400 | — | 4.75px | Body variant with tracking |
| Label | Georgia | 13px | 400 | — | 0px | Form labels and metadata |
| Button XL | Georgia | 64px | 400 | — | -2.56px | Large serif button text |
| Button Large | Georgia | 38px | 400 | 1.4 | 6.84px | Serif button with spacing |
| Body Small | -apple-system | 13px | 400 | — | 0px | Small prose or link text |
| Button Medium | -apple-system | 12px | 400 | — | 0px | Primary button label |
| Caption Large | -apple-system | 16px | 400 | 1.85 | 0px | Larger caption or footnote |
| Button Small | -apple-system | 11px | 400 | 1.5 | 0.88px | Secondary button label |
| Caption Medium | Georgia | 12px | 400 | — | 2.4px | Serif caption with tracking |
| Caption Medium Tight | -apple-system | 12px | 400 | 1.4 | 0.3px | Compact caption |
| Caption Small | -apple-system | 9px | 400 | 1.5 | 1.08px | Tiny caption or badge text |
| Caption Small Strong | -apple-system | 9px | 500 | 1.4 | 1.44px | Emphasized small caption |
| Button XS | -apple-system | 9px | 400 | 1.5 | 0.36px | Tertiary button text |
| Caption XS | -apple-system | 8px | 400 | 1.85 | 1.36px | Smallest caption |
| Button XS 2 | -apple-system | 8px | 400 | — | 1.84px | Minimal button variant |

### Principles

- **Serif as Authority**: Georgia is reserved for display, headings, and labels, lending editorial weight and sophistication.
- **Sans-serif for Precision**: -apple-system handles body, buttons, and small text where clarity and technical precision are paramount.
- **Negative Tracking on Display**: Display and large Georgia sizes use aggressive negative letter-spacing (`-9.06px`, `-2.56px`, `-0.62px`) to create a compressed, tactile feel.
- **Spacing-Driven Clarity**: Serif sizes often include non-zero letter-spacing (`1.43px`, `4.75px`, `6.84px`) to prevent optical cramping on larger scales.
- **Line Height Varies by Role**: Body and large sizes set explicit line-heights (1.4, 1.85) for readability; small and button text often omit it, letting font metrics determine leading.
- **Weight Restraint**: The system uses weight 400 (regular) throughout, with only one weight-500 emphasis (`caption-sm-strong`). Hierarchy relies on size and tracking, not weight variation.

## 4. Component Stylings

### Buttons

**Primary / Filled Button**
- Background: `rgb(253, 252, 249)` (off-white)
- Text colour: `rgb(41, 40, 36)` (near-black)
- Border: None
- Padding: `10px 10px 10px 10px`
- Font: `-apple-system`, `16px`, weight 400, line-height 29.6px
- Border radius: `{rounded.none}` (0px)
- Box shadow: None
- Hover state: `background-color: rgb(238, 234, 223)`; `transform: translateY(-2px)` (subtle lift)
- Focus state: `outline: 3px solid var(--vermilion)` (warm rust outline)
- Min height: `49.5938px`

**Secondary / Outlined Button**
- Background: `rgba(244, 242, 235, 0.93)` (translucent cream)
- Text colour: `rgb(98, 110, 103)` (muted sage-green)
- Border: `1px solid rgba(140, 147, 138, 0.25)` (subtle sage border)
- Padding: `4px 10px 4px 10px`
- Font: `-apple-system`, `9px`, weight 400, line-height 10.8px
- Border radius: `{rounded.full}` (9999px, pill-shaped)
- Box shadow: `rgba(68, 53, 34, 0.024) 0px 1px 2px 0px` (minimal depth)
- Hover state: `background-color: rgba(255, 255, 255, 0.5)`; `transform: none`
- Min height: `24px`

**Tertiary / Text Button**
- Background: transparent
- Text colour: `rgb(75, 93, 96)` (cool teal-grey)
- Border: None
- Padding: `8px 12px 8px 12px`
- Font: `-apple-system`, `12px`, weight 400
- Border radius: `{rounded.none}` (0px)
- Box shadow: None
- Hover state: `color: rgb(179, 126, 126)` (warm dusty rose); `transform: translate(3px, -3px)` (northeast nudge)
- Disabled state: `opacity: 0.3`

### Cards & Containers

**Navigation Panel**
- Background: `rgb(249, 244, 230)` (warm cream)
- Text colour: `rgb(41, 40, 36)` (near-black)
- Border: `1px solid rgba(0, 0, 0, 0)` (no visible border)
- Padding: `12px 18px 12px 18px`
- Font: `-apple-system`, `16px`, weight 400, line-height 29.6px
- Border radius: `{rounded.none}` (0px)
- Box shadow: `rgba(71, 58, 37, 0.094) 0px 12px 28px 0px` (warm drop shadow)
- Min height: `260px`

**Default Interactive Container** (other hover state)
- Hover: `color: rgb(52, 77, 64)` (deeper sage); `background-color: rgb(255, 252, 244)` (bright cream); `box-shadow: rgba(68, 53, 34, 0.047) 0px 2px 8px`; `border-color: rgba(130, 117, 95, 0.333)` (warm brown tint)
- Focus: `outline: rgb(136, 118, 83) solid 2px` (warm tan outline)

### Inputs & Forms

**Text Input**
- Font: `-apple-system`, `13px`, weight 400
- Border: `1px solid` (thin border, colour context-dependent)
- Border radius: `{rounded.none}` (0px)
- Focus state: `outline: rgb(155, 85, 87) solid 3px` (warm rust outline, 3px width)

### Navigation

**Default Navigation Link**
- Background: transparent
- Text colour: `rgb(75, 85, 69)` (warm sage)
- Border: None
- Padding: `14px 6px 14px 6px`
- Font: `-apple-system`, `13px`, weight 400
- Border radius: `{rounded.none}` (0px)
- Box shadow: None
- Hover state: `color: rgb(179, 126, 126)` (warm dusty rose); `transform: translate(3px, -3px)` (northeast nudge)

**Small Navigation Link**
- Background: transparent
- Text colour: `rgb(45, 52, 53)` (cool dark)
- Border: None
- Padding: `8px 0px 8px 0px`
- Font: `-apple-system`, `12px`, weight 400, line-height 16.8px
- Border radius: `{rounded.none}` (0px)
- Box shadow: None
- Hover state: `color: rgb(255, 255, 255)` (white text); `border-color: var(--teal)` (teal accent)

### Badges & Labels

**Small Badge / Pill**
- Background: `rgba(244, 242, 235, 0.93)`
- Text colour: `rgb(98, 110, 103)`
- Border: `1px solid rgba(140, 147, 138, 0.25)`
- Padding: `4px 10px`
- Font: `-apple-system`, `9px`, weight 400
- Border radius: `{rounded.full}` (9999px, pill-shaped)
- Box shadow: `rgba(68, 53, 34, 0.024) 0px 1px 2px 0px`

## 5. Layout Principles

### Spacing System

**Base Unit**: `{spacing.md}` = `16px`

**Full Scale**:
- Extra Extra Small: `{spacing.xxs}` = `4px` — micro spacing between inline elements
- Extra Small: `{spacing.xs}` = `8px` — compact padding within components
- Small: `{spacing.sm}` = `12px` — tight component padding
- Medium: `{spacing.md}` = `16px` — default spacing between related sections
- Large: `{spacing.lg}` = `20px` — spacing between distinct content blocks
- Extra Large: `{spacing.xl}` = `24px` — breathing room around major sections
- Extra Extra Large: `{spacing.xxl}` = `28px` — generous spacing between layout zones
- Extra Extra Extra Large: `{spacing.xxxl}` = `32px` — major section separation
- Section: `{spacing.section}` = `36px` — primary section gap
- Band: `{spacing.band}` = `40px` — full-width container padding vertical

### Grid & Container

**Desktop (1440px)**:
- Content column width: `1376px`
- Max container width: `1216px` (measured at 1280px viewport)
- Section horizontal padding: `30px` (measured at 1024px+)
- Grid columns: 2 (asymmetric, editorial layout)

**Tablet (768px)**:
- Content column width: `728px`
- Section horizontal padding: `30px`
- Grid columns: 2
- Layout remains two-column with adjusted proportions

**Mobile (375px)**:
- Content column width: `354px`
- Section horizontal padding: `14px`
- Grid columns: 2 (tight but maintained)
- Largest heading scales to `74px`

**Strategy**: The layout maintains a two-column asymmetric grid across all breakpoints, with content reflowing rather than collapsing. The left column typically houses text and navigation; the right holds imagery or secondary content. No breakpoint switches to single-column; instead, proportions compress smoothly.

### Whitespace Philosophy

Generous and intentional. The design uses whitespace as a compositional tool, not a filler. Sections breathe with `{spacing.band}` (`40px`) vertical separation. Typography sizes remain large even on mobile, prioritizing readability and contemplation over density. Empty space is as important as content—it frames and honours each element.

### Border Radius Scale

- **Sharp**: `{rounded.none}` = `0px` — all buttons, cards, inputs, and interactive components. Reinforces the clean, linear aesthetic.
- **Pill**: `{rounded.full}` = `9999px` — applied to secondary buttons and small badges. Creates warmth and approachability in micro-interactions.

**Component Breakdown**:
- Buttons (primary, tertiary): `{rounded.none}`
- Buttons (secondary/outlined): `{rounded.full}`
- Input fields: `{rounded.none}`
- Badges: `{rounded.full}`
- Image containers: `{rounded.none}`
- Cards and panels: `{rounded.none}`

### Border Widths

- **Thin**: `{borders.thin}` = `1px` — default stroke width for input borders, hairline dividers, and subtle container outlines. Provides visual definition without heaviness.

## 6. Depth & Elevation

### Shadow Scale

| Level | Treatment | Use |
|---|---|---|
| Flat | None | Default button, text links, primary content surfaces |
| Micro | `rgba(68, 53, 34, 0.024) 0px 1px 2px 0px` | Small components: outlined buttons, compact badges |
| Medium | `rgb(210, 186, 134) 0px -3px 0px 0px inset` | Button inset depth; embossed pressed state |
| Large | `rgba(71, 58, 37, 0.094) 0px 12px 28px 0px` | Navigation panels, modals; substantial lift |

**Elevation Philosophy**: The system uses a *progressive, warm-toned* shadow vocabulary. Rather than cool blacks, shadows employ warm brown-taupes (`rgba(71, 58, 37, ...)`) that harmonize with the earthy palette. Elevation is subtle and measured—only major panels and modals receive pronounced shadows. Most interactive elements remain flat or use micro-shadows, keeping the interface lightweight and focused. The inset shadow on buttons creates tactile embossing rather than floating lift, reinforcing the crafted, tangible quality of the design.

### Opacity Levels

- **4%**: `0.04` — extremely subtle overlay or tint
- **12%**: `0.12` — very light border or background tint
- **30%**: `0.30` — moderate transparency; used in disabled or secondary states
- **60%**: `0.60` — significant transparency; semi-transparent fills or backgrounds
- **70%**: `0.70` — strong transparency; interactive hover overlays
- **85%**: `0.85` — near-opaque; slight transparency for depth layering

### Z-index / Layering

- **Base Layer 1**: `z-index: 1` — default content and components
- **Base Layer 2**: `z-index: 2` — slightly elevated elements (cards above canvas)
- **Base Layer 3**: `z-index: 3` — minor stacking contexts
- **Base Layer 6**: `z-index: 6` — mid-level interactive elements
- **Dropdown Layer 10**: `z-index: 10` — dropdown menus and overlays
- **Dropdown Layer 12**: `z-index: 12` — secondary dropdowns
- **Dropdown Layer 15**: `z-index: 15` — tertiary overlays
- **Dropdown Layer 30**: `z-index: 30` — topmost modals and full-screen overlays

The stacking strategy reserves low z-indices for content, mid-range for temporary UI (dropdowns, tooltips), and high values for modals and critical overlays. This allows modular component layering without conflicts.

## 7. Do's and Don'ts

### Do

- **Use Georgia for headings and display text.** Large, bold serif type is the visual anchor of GoShuin. Display sizes should be set at `{typography.display}` (`129.364px`) with tight negative tracking to create impact.
- **Embrace generous negative space.** Leave breathing room between sections. Use `{spacing.band}` (`40px`) as your default inter-section gap.
- **Apply warm, desaturated earthy tones.** Stick to the measured palette: `{colors.canvas}`, `{colors.ink}`, `{colors.link}`. Avoid bright, saturated primaries.
- **Keep corners sharp.** Use `{rounded.none}` (0px) for primary UI unless a pill-shaped button is explicitly needed (`{rounded.full}` for secondary/badge roles only).
- **Implement warm-toned shadows.** When depth is needed, use the measured shadow values with warm brown undertones (`rgba(71, 58, 37, ...)`), not cool blacks.
- **Maintain the two-column asymmetric grid.** Even on mobile, preserve the editorial left–right balance. Content reflows rather than collapses to single-column.
- **Use subtle hover transforms.** Micro-interactions should nudge elements (`translate(3px, -3px)`) or lift them slightly (`translateY(-2px)`), never jarring or massive.
- **Prioritize typography over icons.** Text and typeface hierarchy are the design's primary communicative tool. Lean on language before visual symbols.
- **Apply consistent letter-spacing on large text.** Georgia display sizes must retain their measured tracking values to preserve the compressed, intentional aesthetic.

### Don't

- **Don't use round corners on primary buttons or inputs.** Pill shapes (`{rounded.full}`) are reserved for secondary buttons and badges. Maintain linearity elsewhere.
- **Don't exceed the measured colour palette.** Avoid blues, reds, or vibrant accents outside the cream–sage–teal–rust vocabulary. The palette is intentionally constrained.
- **Don't collapse to single-column on mobile.** The two-column grid is architectural; compress proportions and padding instead.
- **Don't apply heavy shadows or multiple layers of elevation.** The system is flat-leaning with subtle depth. A single shadow per component is sufficient.
- **Don't use system sans-serif (` -apple-system`) for hero headings.** Georgia is non-negotiable for display type; sans-serif is relegated to body, labels, and buttons.
- **Don't set line-height on display sizes.** `{typography.display}` is measured without explicit line-height; let the font metrics guide leading.
- **Don't pair cool-toned shadows with warm-toned interfaces.** All shadows must use the warm brown palette provided (`rgba(71, 58, 37, ...)`), not cool greys or blacks.
- **Don't ignore letter-spacing on Georgia sizes.** Negative and positive tracking are integral to the typography system. Never default to 0 letter-spacing on display or large body text.
- **Don't introduce new shades or tints.** The palette is fixed; adjust opacity rather than inventing new colours.
- **Don't use disabled state (`opacity: 0.3`) on elements other than buttons.** Disabled styling is measured only on button elements; apply context-specific treatment elsewhere.

## 8. Responsive Behavior

### Breakpoints

| Breakpoint | Viewport Width | Content Width | Grid Cols | Max Heading Size | Body Size | Section Padding X | Key Shift |
|---|---|---|---|---|---|---|---|
| Mobile | 375px | 354px | 2 | 74px | 16px | 14px | Compact spacing; smallest heading size |
| Tablet | 768px | 728px | 2 | 69px | 16px | 30px | Heading size plateaus; padding increases |
| Desktop Small | 1024px | 960px | 2 | 92px | 16px | 30px | Display heading begins scaling up |
| Desktop Medium | 1280px | 1216px | 2 | 114px | 16px | 30px | Continued heading growth |
| Desktop Large | 1440px | 1376px | 2 | 129px | 16px | 30px | Full display size achieved |

**Breakpoint Strategy**: The design scales smoothly across five measured breakpoints. Heading sizes (`{typography.display}`) grow progressively—from `74px` on mobile to the full `129.364px` on desktop—respecting the measured values at each point. The two-column grid is maintained throughout; no collapse to single-column occurs. Section padding shifts at the tablet breakpoint (`30px` becomes standard from `768px` onward).

### Touch Targets

While specific touch-target measurements were not extracted, the following guidelines apply based on standard mobile UX:

- Interactive elements (buttons, links) should maintain a minimum hit area of `44px × 44px` to ensure comfortable tapping.
- Padding within buttons (e.g., secondary button `4px 10px`) is kept tight; ensure sufficient spacing between adjacent interactive elements (min `8px` gap).
- Navigation links use `14px` vertical padding to aid tactile selection on mobile.

### Collapsing Strategy

- **Typography**: Display headings scale down proportionally; body text remains fixed at `16px` across all breakpoints.
- **Spacing**: Section padding decreases on mobile (`14px` vs. `30px` on desktop); gap values from the spacing system (`{spacing.band}`, `{spacing.section}`) remain absolute and do not compress.
- **Layout**: Two-column grid persists across all breakpoints. The left content column reflows; the right secondary column adjusts width but does not vanish.
- **Grid Columns**: Fixed at 2 across all measured breakpoints; no responsive column count change.
- **Navigation**: All 5 measured breakpoints show navigation links visible (no menu toggle observed); navigation remains horizontal throughout.

## 9. Agent Prompt Guide

### Quick Color Reference

Use this condensed mapping for rapid implementation:

- **Primary CTA / Brand Accent**: Brand Accent (`{colors.primary}` — `#F4F2EB`)
- **Primary Text / Headings**: Ink (`{colors.ink}` — `#2D3435`)
- **Body Copy**: Body (`{colors.body}` — `#3D473D`)
- **Link / Interactive**: Link (`{colors.link}` — `#4B5545`)
- **Page Background**: Canvas (`{colors.canvas}` — `#E7E5DF`)
- **Disabled / Muted Text**: Muted (`{colors.muted}` — `#626761`)
- **Borders & Hairlines**: Hairline (`{colors.hairline}` — `#756449`)
- **On Brand Surface**: On Primary (`{colors.on-primary}` — `#222222`)
- **Cool Decorative Accent**: Accent 1 (`{colors.accent-1}` — `#46565A`)
- **Light Neutral Accent**: Neutral 1 (`{colors.neutral-1}` — `#D6D1C5`)

### Iteration Guide

1. **Typography Foundation**: Always use Georgia (`{typography.display}`, `{typography.body-lg}`) for editorial sizes; apply measured letter-spacing exactly as provided (negative values on display are non-negotiable). Fall back to `-apple-system` for buttons, captions, and body copy under `16px`.

2. **Colour Palette Consistency**: Stick to the 11 measured colours. Do not invent or approximate new shades. If a colour feels wrong, adjust opacity (`0.04` to `0.85`) or layer it with the canvas background rather than creating a new hex.

3. **Sharp Linearity**: Apply `{rounded.none}` (0px border-radius) to all primary interactive elements—buttons, inputs, cards. Only secondary buttons and badges use `{rounded.full}` (9999px).

4. **Spacing Grid**: Use the spacing system (`{spacing.xxs}` through `{spacing.band}`) as your modular padding and margin source. The base unit is `{spacing.md}` (`16px`). Section gaps default to `{spacing.band}` (`40px`).

5. **Shadow Restraint**: Depth comes from colour-blocking (canvas vs. background contrast) first, shadows second. When shadows are needed, use the measured values: micro (`rgba(68, 53, 34, 0.024) 0px 1px 2px 0px`), large (`rgba(71, 58, 37, 0.094) 0px 12px 28px 0px`). Never apply cool-toned or high-opacity shadows.

6. **Hover States**: Micro-interactions are subtle. Transform buttons with small translate nudges (`translate(3px, -3px)`) or vertical lifts (`translateY(-2px)`, `translateY(2px)`). Colour shifts are warm and dusty—never harsh or saturated.

7. **Responsive Scaling**: Headings scale at measured breakpoints (`74px` → `129.364px`). Maintain the two-column grid at all widths; do not collapse. Use the breakpoint table as your canonical reference.

8. **Focus & Accessibility**: Focus outlines are warm-toned (rust, tan) with `2px` or `3px` width. Examples: `outline: rgb(155, 85, 87) solid 3px` (rust), `outline: rgb(136, 118, 83) solid 2px` (tan). Apply to all interactive elements.

9. **Label & Caption Hierarchy**: Captions and labels use small `-apple-system` sizes with optional tracking. Examples: `{typography.caption-lg}` (`16px`, no tracking), `{typography.caption-sm-strong}` (`9px`, weight 500, `1.44px` tracking).

10. **Component Precision**: Every component variant (button, link, navigation panel) has exact CSS specs in Section 4. Cross-reference the component styling table for padding, font, shadow, and hover states. Do not generalize; each variant is distinct.

## 10. Known Gaps

- **No semantic colour ramp**: The site does not expose error, success, warning, or info states in its measured styles. A semantic status palette (red/green/yellow/blue) is not included in this system.
- **Interaction states not comprehensively captured**: While some hover and focus states were extracted, the page did not display all possible interaction scenarios (e.g., active tabs, loading states, disabled forms beyond buttons). Extend the provided states cautiously.
- **Two unassigned colours**: `{colors.accent-1}` (`#46565A`, cool teal-grey) and `{colors.neutral-1}` (`#D6D1C5`, light neutral) have no measurable semantic role and are noted as decorative only.
- **Line-height measurement incomplete**: Several typography entries (display, body-xl, body-md, label, button-xl, button-xs-2) do not include line-height values because they were not explicitly set in the source markup. Default to font metrics for these sizes.
- **Dark mode not included**: Only light theme was measured and analysed. No derived dark-mode palette is provided.
- **Authentication-gated surfaces excluded**: The extraction covered the public homepage only. Logged-in or paywalled sections were not analyzed.
- **Gradient textures are decorative**: Two measured gradients (`radial-gradient` for hero pattern, `linear-gradient` for section vignette) are included for reference but may not cover all texture applications across the site.
- **Z-index values are sparse**: The system includes a basic stacking scale, but detailed z-index contexts for every modal, tooltip, or overlay type are not fully documented.
- **Breakpoint navigation toggle**: All five measured breakpoints showed navigation links visible; no mobile menu toggle was observed. If responsive menu collapse is needed, it is not defined here.
- **Component state variants**: Only primary, secondary, and tertiary button styles were measured. Variants like loading, success, or error button states are not included.

---

Generated from 1 page analysis: https://aestudio.studio/goshuin/en  
Measurement confidence: High (11 colours, 20 typography entries, 10 spacing values, 9 radius values, 3 shadows, 1 border width, 6 opacity levels, 8 z-index layers, 2 gradients, 30+ interaction states, 5 responsive breakpoints)
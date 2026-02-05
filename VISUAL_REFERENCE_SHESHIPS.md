# Visual Style Reference: SheShips

**Source**: https://she-ships.crafter.run/
**Analyzed**: 2026-02-04

---

## 1. Core Aesthetic

**Modern Tech Femininity** — Bold sans-serif meets elegant serif in a dark, grid-structured environment with vibrant pink accents.

### Design Philosophy
Empowerment through contrast: combine technical precision (grid, monospace badges) with warm, expressive typography (italic serif tagline).

### Key Influences
- **Tech/Developer Tools** — Dark mode, subtle grid, monospace labels
- **Fashion/Editorial** — Italic serif tagline, elegant hierarchy
- **Startup/Launch Pages** — Clear CTA, event-driven messaging

---

## 2. Color Palette

### Primary Colors
| Color Name | Hex | Usage |
|------------|-----|-------|
| **Hot Pink** | `#EF5A82` (approx) | Primary CTA button, brand accent, emphasized text ("Ship It") |
| **Charcoal Black** | `#1A1A1A` | Background, cards |
| **Pure White** | `#FFFFFF` | Headline text ("Just"), primary content |
| **Neutral Gray** | `#9CA3AF` | Body text, secondary navigation |

### Accent/Badge Colors
| Color Name | Hex | Usage |
|------------|-----|-------|
| **Badge Pink** | `#DC2F55` | Label backgrounds (MARCH 8) |
| **Badge Gray** | `#3F3F46` | Secondary badge backgrounds |

**Total Colors**: 6 (minimal, high-contrast palette)

---

## 3. Typography System

### Headline (Hero Title)
- **Family**: **Inter** or similar geometric sans-serif
- **Weight**: 800 (Extra Bold)
- **Scale**: ~80-100px desktop
- **Treatment**:
  - "Just" in white
  - "Ship It." in hot pink (`#EF5A82`)
  - Period included for emphasis

### Tagline (Subheadline)
- **Family**: **Playfair Display** (serif, italic)
- **Weight**: 400-500 (Regular/Medium Italic)
- **Scale**: ~24-28px
- **Color**: Hot pink (`#EF5A82`)
- **Text**: "Where women build and ship"

### Body Text
- **Family**: Inter (sans-serif)
- **Weight**: 400 (Regular)
- **Scale**: 16-18px
- **Color**: Light gray (`#D1D5DB`)
- **Line Height**: 1.6

### Labels/Badges
- **Family**: Monospace (likely **JetBrains Mono** or **Courier**)
- **Weight**: 500-600
- **Case**: UPPERCASE
- **Treatment**:
  - Background: Semi-transparent dark
  - Border: 1px solid accent
  - Padding: Small, compact
  - Examples: "MARCH 8", "AI-NATIVE", "NO CODE"

### Hierarchy Structure
1. **Hero Title** (Inter 800, 80-100px, white + pink split)
2. **Tagline** (Playfair Display Italic, 24-28px, pink)
3. **Body** (Inter 400, 16-18px, gray)
4. **Labels** (Monospace 500, 12px, uppercase)
5. **Navigation** (Inter 400, 14px, gray)

---

## 4. Key Design Elements

### Grid System
- **Background**: Subtle grid pattern overlay
- **Color**: Very dark gray lines (`#252525`)
- **Size**: ~60-80px squares
- **Purpose**: Technical/developer aesthetic, structure without noise

### Badge/Label Design
```
┌─────────────┐
│  MARCH 8    │  ← Monospace, uppercase
└─────────────┘  ← 1px border, minimal padding
```
- **Style**: Outlined rectangles
- **Colors**: Pink or gray backgrounds
- **Purpose**: Event info, feature highlights, urgency markers

### Layout Structure
- **Container**: Max-width centered (~1200-1400px)
- **Spacing**: Generous vertical rhythm (60-80px between sections)
- **Alignment**: Center-aligned hero, left-aligned sections below

### Button Design
- **Primary CTA**:
  - Background: Hot pink (`#EF5A82`)
  - Text: White, bold
  - Padding: 16px 32px
  - Border-radius: 8px
  - No shadow initially, subtle hover lift

- **Secondary CTA**:
  - Background: Transparent
  - Border: 1px solid gray
  - Text: White
  - Hover: Gray background

### Unique Stylistic Choices
1. **Split-color headline** — "Just" (white) + "Ship It." (pink) for brand recall
2. **Italic serif tagline** — Adds warmth to otherwise tech-heavy aesthetic
3. **Monospace badges** — Developer-focused, event urgency
4. **Grid overlay** — Subtle depth, references code editors/design tools
5. **Period in headline** — "Ship It**.**" — Finality, command, action

---

## 5. Visual Concept

### Design Bridge
This design bridges **technical empowerment** (dark mode, grid, monospace) with **emotional warmth** (pink, italic serif, inclusive messaging). It says: "Powerful tools, human community."

### Element Relationships
- **Grid ↔ Typography**: Grid provides structure; typography provides personality
- **Pink ↔ Black**: High contrast for clarity and energy
- **Serif ↔ Sans**: Editorial elegance meets startup speed
- **Badges ↔ Hero**: Technical details frame the emotional call-to-action

### Ideal Use Cases
- **Developer-focused events** targeting underrepresented groups
- **Product launches** with community emphasis
- **Landing pages** for tools/platforms with inclusive missions
- **Campaign pages** requiring urgency + warmth

### Distinctive Qualities
1. **Typography Mix**: Bold sans + italic serif creates unique tension
2. **Monospace Accents**: Not decorative—functional, informative
3. **Minimal Color Palette**: Just pink + neutrals = memorable, focused
4. **Grid as Texture**: Not just decoration—reinforces "building" metaphor

---

## Implementation Notes

### Font Stack
```css
/* Headlines */
font-family: 'Inter', system-ui, -apple-system, sans-serif;

/* Tagline */
font-family: 'Playfair Display', Georgia, serif;
font-style: italic;

/* Labels */
font-family: 'JetBrains Mono', 'Courier New', monospace;
```

### Key CSS Variables
```css
:root {
  --color-hot-pink: #EF5A82;
  --color-charcoal: #1A1A1A;
  --color-white: #FFFFFF;
  --color-gray-300: #D1D5DB;
  --color-gray-600: #4B5563;
  --color-gray-800: #1F2937;

  --font-display: 'Inter', sans-serif;
  --font-serif: 'Playfair Display', serif;
  --font-mono: 'JetBrains Mono', monospace;

  --border-radius: 8px;
  --spacing-unit: 8px;
}
```

---

## Adaptation for Valentine 2026

### What to Borrow
1. **Typography Hierarchy**: Inter bold headlines + Playfair italic taglines
2. **Split-color Headlines**: Apply to "Valentine" or key phrases
3. **Monospace Labels**: "SIDE A", "SIDE B", dates, badges
4. **Pink Accent Strategy**: Use hot pink (`#EF5A82`) for CTAs and emphasis
5. **Grid Texture**: Subtle grid overlay on dark sections

### What to Adapt
- Keep cassette metaphor (SIDE A/B) but use SheShips' monospace treatment
- Use hot pink instead of current funky-pink for higher contrast
- Add italic serif for romantic taglines ("Where love stories begin")
- Maintain dark mode primary, light mode for contrast

### Font Implementation Priority
1. Replace current serif with **Playfair Display** (already in use, just ensure italic variant)
2. Ensure **Inter** or similar geometric sans for headlines
3. Keep **JetBrains Mono** for cassette labels and technical details

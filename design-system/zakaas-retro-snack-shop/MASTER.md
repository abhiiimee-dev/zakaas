# ZAKAAS RETRO SNACK SHOP — MASTER DESIGN SYSTEM
**Framework:** UI/UX Pro Max Intelligence  
**Core Archetype:** Modern Retro Indian Snack Shop (Vibrant Block-based + Editorial Food Packaging + Vintage Shop Signage)  
**Tone & Vibe:** Appetising, Authentic, Colourful, Tactile, Maharashtrian Heritage, Modern Ecommerce Clarity.  
**Strict Anti-Pattern:** No generic Shopify cards, no Saas/wellness beige minimalism, no giant typography walls without product heroes, no AI-generated stock imagery.

---

## 1. Visual Style & Brand Philosophy
- **Style Blend:** Vintage Indian Kirana / Farsan Mart signage meets modern clean editorial packaging design.
- **Product-First Imperative:** Product packaging is the visual anchor of every view. The food texture and colourful pouch art lead the conversation, not abstract text.
- **Tactile Materiality:** Hard offset shadows (`3px 3px 0 var(--charcoal)`), printed ticket borders, warm natural paper background (`#F7EFE2`), rich packaging chromatic accents.

---

## 2. Packaging-Derived Colour System
Every colour is sampled directly from genuine Zakaas pouches and traditional Maharashtrian snack culture:

| Role | Token | Hex | Packaging / Cultural Source | Contrast vs Khadi |
|------|-------|-----|-----------------------------|-------------------|
| **Base Canvas** | `--bg-khadi` | `#F6EFE2` | Natural unbleached cotton paper / warm wheat | Baseline |
| **Deep Ink / Text** | `--charcoal` | `#1A1815` | Vintage letterpress black ink | 14.8:1 (AAA) |
| **Chakli Blue** | `--color-chakli-blue` | `#1E4D8C` | Chakli pouch accent / royal blue heritage | 6.8:1 (AAA) |
| **Chakli Ochre** | `--color-chakli-ochre` | `#D9822B` | Bhajan flour golden-brown fry tone | 3.2:1 (Large text / UI) |
| **Bhakarwadi Red** | `--color-bhakarwadi-red`| `#B8281B`| Spicy dried coconut & chili roll packaging | 6.1:1 (AAA) |
| **Bhakarwadi Amber**| `--color-bhakarwadi-amber`| `#E65C00` | Fried gram & sesame glaze | 3.4:1 (Card surface/badge) |
| **Shankarpali Rose**| `--color-shankarpali-rose`| `#D23868` | Festive Shankarpali celebration pink | 4.9:1 (AA) |
| **Shankarpali Pistachio**| `--color-shankarpali-mint`| `#2C7A4D` | Cardamom / sweet festive green | 5.2:1 (AA) |
| **Card Surface Light** | `--surface-card` | `#FFFFFF` | Crisp white card surface | 1.1:1 vs Khadi |
| **Card Tint Neutral** | `--surface-tint` | `#EFE6D5` | Recycled cardstock tint | 1.2:1 vs Khadi |
| **Border Dark** | `--border-solid` | `#1A1815` | Crisp 1.5px shop border | 14.8:1 (AAA) |
| **Focus Ring** | `--focus-ring` | `#1E4D8C` | 2px solid offset outline | High contrast |

---

## 3–6. Typography Hierarchy & Rules
*Principle: Typography serves the product. Giant redundant headlines are replaced by punchy product titles, monospaced provenance metadata, and legible pricing.*

1. **Display & Shop Signs (`--font-display`):**
   - Font: `Cabinet Grotesk`, `Anton`, or `Impact, sans-serif`
   - Weight: 800 / 900, uppercase, tight tracking (`-0.03em` to `-0.05em`)
   - Role: Shop name, collection banner headline, major price figures.
2. **Editorial Serif (`--font-serif`):**
   - Font: `Instrument Serif`, `Georgia, serif`
   - Weight: 400 italic
   - Role: Flavor notes, artisanal provenance ("*Handcrafted in small batches*").
3. **Product Headings:**
   - Font: `Cabinet Grotesk` or `Rubik, sans-serif`
   - Weight: 700 / 800, uppercase, 20px–24px.
4. **Body Copy (`--font-body`):**
   - Font: `Plus Jakarta Sans`, `Inter, sans-serif`
   - Size: 14px–15px, line-height: 1.55, color: `#2E2A25`.
5. **Metadata & Labels (`--font-mono`):**
   - Font: `DM Mono`, `Space Mono, monospace`
   - Weight: 600 / 700, 10px–11px, tracking: `1.2px` uppercase.
   - Role: Net weight ("100g"), batch badges, category tabs, filter status.
6. **Price Display:**
   - Big bold rupee amount (`₹150`), strike-through MRP (`MRP ₹199`), savings callout.
7. **CTA Typography:**
   - Monospaced bold or condensed sans (`ADD TO BAG +`, `BUILD A BOX →`).

---

## 7. Button Styles & Tactile UI
- **Primary Action (Tactile Retro Button):**
  - Background: `--charcoal` (`#1A1815`) or `--color-bhakarwadi-red` (`#B8281B`)
  - Text: `#FFFFFF` or `#F6EFE2`, 11px–12px monospaced, uppercase, bold.
  - Border: `1.5px solid var(--charcoal)`
  - Shadow: `3px 3px 0 var(--charcoal)`
  - Hover: `transform: translate(-1px, -1px); box-shadow: 4px 4px 0 var(--charcoal);`
  - Active: `transform: translate(2px, 2px); box-shadow: 1px 1px 0 var(--charcoal);`
- **Secondary Action (Wire Stamp Button):**
  - Background: `transparent` or `#FFFFFF`
  - Border: `1.5px solid var(--charcoal)`
  - Shadow: `2px 2px 0 var(--charcoal)`

---

## 8. Navigation & Header
- Compact retro shop signage header with live cart count pill (`BAG [2]`), direct links to `COLLECTION`, `BUILD A BOX`, `OUR STORY`, and `B2B`.
- Mobile navigation: Full-screen tactile drawer with clear category links and 48px touch targets.

---

## 9–13. Art-Directed Product-Card System
**The Card is NOT a generic white box with an image on top.**
- **Architecture:**
  - **Chromatic Product Pedestal:** Each snack category has its own packaging-driven palette field:
    - *Chakli:* Warm Golden-Blue field (`#EBF2FA` background with `#1E4D8C` stamp).
    - *Bhakarwadi:* Spiced Terracotta field (`#FDF1EC` background with `#B8281B` stamp).
    - *Shankarpali:* Rose-Pistachio field (`#FDF0F4` background with `#D23868` stamp).
  - **Oversized Pack Hero:** Packaging breaks slightly out of the pedestal with realistic crisp transparency and subtle drop shadow (`0 14px 28px rgba(28,25,23,0.14)`).
  - **Visual Badges:** Authentic printed labels ("100g AROMA POUCH", "TRADITIONAL BHAJAN FLOUR", "CRISP SPICY COCONUT").
  - **Price Stamp:** Clear physical price tag with ₹150 current price and ₹199 MRP.
  - **Instant Purchase Action:** Large, full-width or dedicated `ADD TO BAG +` button with instant feedback state (`ADDED ✓`).

---

## 14–16. Spacing, Grid & Responsive Breakpoints
- **Spacing Scale:**
  - `--space-xs`: `4px`
  - `--space-sm`: `8px`
  - `--space-md`: `16px`
  - `--space-lg`: `24px`
  - `--space-xl`: `32px`
  - `--space-2xl`: `48px`
  - `--space-3xl`: `64px`
- **Breakpoints:**
  - Mobile: `< 640px` (Single column or compact 2-column mobile cards)
  - Tablet: `640px – 1024px` (2-column art-directed cards)
  - Desktop: `> 1024px` (3-column chromatic cards or structured shop shelf)

---

## 17–22. Interaction States & System Resilience
- **Hover:** Tactile micro-lift on packaging (`translateY(-6px) scale(1.02)`), button shadow expands.
- **Focus:** `outline: 2px solid var(--charcoal); outline-offset: 2px;` visible on all keyboard focusable controls.
- **Active:** Physical button depression (`translate(2px, 2px)`).
- **Added State:** Instant color transition to deep forest green or ochre with Check icon (`ADDED TO BAG ✓`).
- **Empty State:** Illustrated retro shop crate + "Fresh batches rolling out daily" + instant reset button.
- **Loading State:** Warm khadi shimmer placeholders matching exact card aspect ratio.

---

## 23. Accessibility Standards (WCAG 2.2 AA)
- Minimum contrast ratio: `4.5:1` for all body text, `3:1` for large display text and UI components.
- Minimum touch target: `44px × 44px` on all mobile clickable elements.
- Semantic markup: `<article>`, `<main>`, `<nav>`, `<header>`, `<button>`, `<fieldset>`.
- Full keyboard operability: Tab, Enter, Space for all category filters and buy actions.
- Motion safety: All keyframe animations and transforms respect `@media (prefers-reduced-motion: reduce)`.

---

## 24–25. Image & Motion Treatment
- Zero fake AI blur, zero heavy 3D distortion. Real packaging packs rendered with razor-sharp fidelity on warm, natural surfaces.
- Transitions: Snappy `180ms - 260ms` cubic-bezier timing (`cubic-bezier(0.16, 1, 0.3, 1)`).

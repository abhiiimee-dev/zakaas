# PAGE DESIGN SYSTEM OVERRIDE: COLLECTIONS STOREFRONT
**Page:** `/collections` (Snack Collection Storefront)  
**Parent:** `design-system/zakaas-retro-snack-shop/MASTER.md`  
**Goal:** Deliver a rich, tactile, retro-modern Indian Snack Shop experience where browsing feels like stepping into a vibrant Bombay/Pune farsan shop, with real product pouches front and center.

---

## 1. Collection Hero Architecture
**Avoid:** Huge empty cream background + giant headline + tiny paragraph.  
**Implement:** A compact, high-energy Shop Frontispiece:
- **Shop Signboard Banner:**
  - Archival top label: `FRESH FROM MAHARASHTRA • HAND-PACKED BATCHES`
  - Headline: `THE ZAKAAS SNACK COUNTER` with italic subtitle `Crisp, Savoury & Sweet Classics`
  - **Live Counter Metric Tag:** `3 SIGNATURE RECIPES • 100g AROMA POUCHES • EXPRESS DISPATCH`
- **Visual Texture Anchor:**
  - Compact horizontal preview of the 3 hero packs (Chakli, Bhakarwadi, Shankarpali) acting as a miniature counter display or visual badge directly inside the header, so the user sees real food products before reading a word.

---

## 2. Category & Filter Bar (Retro Snack Counter Tabs)
- **Tabs:**
  - `ALL SNACKS` (Show all 3 signature recipes)
  - `CHAKLI` (Spirals & Bhajan flour)
  - `BHAKARWADI` (Spiced coconut rolls)
  - `SHANKARPADA` (Sweet diamond crisps)
  - `GIFT BOXES` (Direct link or filter for 3-pack & 5-pack custom boxes)
- **Active State:**
  - High-contrast filled pill: background `var(--charcoal)`, text `#FFFFFF`, hard shadow `2px 2px 0 var(--charcoal)`.
- **Inactive State:**
  - Clean printed border: `1.5px solid var(--charcoal)`, background `#FFFFFF`, text `var(--charcoal)`.
- **Count Indicator:**
  - Monospaced badge e.g. `(3)` next to tab label.
- **Sort Selector:**
  - Styled native dropdown with clean 1.5px border and custom arrow.

---

## 3. Art-Directed Product-Card System
Each product card has deliberate packaging-derived colour coordination:

### A. CHAKLI Card
- **Primary Hue:** Deep Cobalt Blue (`#1E4D8C`) + Golden Ochre (`#D9822B`)
- **Card Background:** Soft cream pedestal with pale blue inset field (`#F2F6FB`)
- **Badge:** `TRADITIONAL BHAJAN FLOUR`
- **Product Headline:** `CHAKLI`
- **Flavor Subtext:** `Crisp spiral crunch with roasted cumin & ajwain`
- **Price Tag:** `₹150` (strike-through `₹199`)

### B. BHAKARWADI Card
- **Primary Hue:** Rich Terracotta Red (`#B8281B`) + Spiced Amber (`#E65C00`)
- **Card Background:** Soft cream pedestal with pale amber inset field (`#FDF5F0`)
- **Badge:** `SPICED COCONUT SPIRAL`
- **Product Headline:** `BHAKARWADI`
- **Flavor Subtext:** `Sweet, spicy, tangy roll with dried coconut & sesame`
- **Price Tag:** `₹150` (strike-through `₹199`)

### C. SHANKARPALI Card
- **Primary Hue:** Festive Rose Pink (`#D23868`) + Pistachio Mint (`#2C7A4D`)
- **Card Background:** Soft cream pedestal with pale rose inset field (`#FDF2F5`)
- **Badge:** `GOLDEN MELT-IN-MOUTH`
- **Product Headline:** `SHANKARPALI`
- **Flavor Subtext:** `Sweet diamond crunch rolled in slow milk & ghee dough`
- **Price Tag:** `₹150` (strike-through `₹199`)

### Card Component Layout
1. **Header Stamp:** Category pill + net weight (`100g`)
2. **Hero Image Stage:** Oversized product pack image (`aspect-ratio: 4/5` or `1/1`), elevated on the tinted color pedestal, subtle shadow, 1.04x zoom on hover.
3. **Card Body:**
   - Snack name (bold, uppercase, punchy)
   - One-sentence appetizing flavor description
   - Weight & Pack selector (if multiple variants available)
4. **Bottom Bar:**
   - Bold price display (`₹150` / `₹199`)
   - `ADD TO BAG +` tactile button with immediate feedback.
   - Quick PDP link arrow (`→`).

---

## 4. Custom Box Upsell Card (Embedded in Grid)
To encourage discovery and AOV:
- An art-directed 4th card in the grid: **`BUILD YOUR OWN BOX`**
- Showcases the 3 packs grouped together with a dashed vintage ticket border (`border: 2px dashed var(--charcoal)`).
- Copy: *"Can't pick just one? Build a custom 3-pack or 5-pack gift box."*
- CTA: `LAUNCH BOX BUILDER →` linking to `/builder`.

---

## 5. Mobile & Responsive Specs
- **Desktop (1024px+):** 3-column or 4-column balanced grid with generous card widths.
- **Tablet (640px - 1023px):** 2-column grid, full image fidelity maintained.
- **Mobile (< 640px):**
  - Single column or clean vertical stack.
  - Full-width touch-friendly `ADD TO BAG` buttons (min height 46px).
  - Horizontal scrollable filter pill bar with snap indicators and no awkward truncation.
  - Image size maintained at minimum 220px height so the product art is never tiny.

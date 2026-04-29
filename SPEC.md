# Reordify Onboarding + Profile Setup — SPEC

## Design System (Extracted from Reordify Codebase)

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-accent` | `#07D568` | Primary CTA, success states, accent elements |
| `--color-accent-dark` | `#062912` | Text on accent backgrounds (white text on accent use this) |
| `--color-accent-soft` | `rgba(7,213,104,0.10)` | Accent backgrounds, subtle fills |
| `--color-text` | `#12151f` | Primary text, headings |
| `--color-muted` | `#5f6678` | Secondary text, captions, placeholders |
| `--color-line` | `rgba(18,21,31,0.08)` | Borders, dividers |
| `--color-alert` | `#e5484d` | Warnings, at-risk indicators |
| `--color-alert-soft` | `rgba(229,72,77,0.12)` | Alert backgrounds |
| `--color-purple-soft` | `rgba(140,102,255,0.12)` | Purple accent backgrounds |

### Typography
| Role | Font | Weights | Sizes |
|------|------|---------|-------|
| Display/Headlines | `Poppins` | 600, 700, 800 | 5.25rem → 2.2rem responsive |
| Body | `DM Sans` | 400, 500, 700 | 0.875rem → 1.125rem |

**Font Stack:**
```css
--font-display: 'Poppins', sans-serif;
--font-body: 'DM Sans', sans-serif;
```

### Spacing & Radius
| Token | Value | Usage |
|-------|-------|-------|
| `--radius-base` | `18px` | Inputs, chips, buttons |
| `--radius-lg` | `28px` | Cards, modals |
| `--shadow-soft` | `0 20px 60px rgba(23,28,45,0.08)` | Default card elevation |
| `--shadow-lift` | `0 26px 70px rgba(23,28,45,0.12)` | Hover/elevated state |
| `--ease-out` | `cubic-bezier(.22,1,.36,1)` | All transitions |

### Shadows (Component-Level)
```css
/* Primary button */
shadow-[0_14px_30px_rgba(7,213,104,0.28)]

/* Card default */
shadow-sm /* → shadow-soft on hover-lift */

/* Hero float card */
shadow-[0_40px_100px_rgba(23,28,45,0.10)]
```

---

## Flow Architecture

```
[Entry] ──→ [Connecting] ──→ [Analyzing] ──→ [Dashboard]
                                       ↓
                              [Profile Setup]
                              (inline, contextual)
```

---

## Screen 1: Entry

### Layout
- Centered, single-column (max-width: 420px)
- Vertical center on viewport
- Padding: 24px horizontal

### Copy
- **Headline**: "Connect your store. / We'll handle the rest."
- **Subtext**: "See what's running out, how much money is at risk, and what to do next."

### Component Mapping
| Element | Tailwind/Inline Style |
|---------|----------------------|
| Logo | `<img src="/logo.jpeg">` h-10 w-auto object-contain |
| Headline | `font-display text-2xl/800 leading-tight tracking-[-0.05em] text-[var(--color-text)]` |
| "We'll handle" text | `style={{ color: T.accent }}` where T.accent = `#07D568` |
| Subtext | `text-base text-[var(--color-muted)]` |
| Primary CTA | `BtnPrimary` + Shopify icon SVG, `fullWidth` |
| Secondary CTA | `BtnGhost` + Google icon SVG, `fullWidth` |
| Footer note | `text-xs text-[var(--color-muted)]` |

### Button Styles (from codebase)
```jsx
// Primary
<button className="hover-lift focus-ring rounded-full bg-[var(--color-accent)] px-6 py-4 text-base font-semibold text-[#062912] shadow-[0_14px_30px_rgba(7,213,104,0.28)] transition-all duration-200 active:scale-[0.98]"

// Ghost
<button className="hover-lift focus-ring rounded-full border border-[var(--color-line)] bg-white px-6 py-4 text-base font-semibold text-[var(--color-text)] transition-all duration-200 active:scale-[0.98]"
```

### States
| State | Visual |
|-------|--------|
| Default | Both buttons visible |
| Shopify loading | BtnPrimary shows spinner + "Connecting…" |
| Google loading | BtnGhost shows spinner + "Connecting…" |

---

## Screen 2: Connection State

### Layout
- Same container as Entry (max-width: 420px)
- Replaces CTAs with connection progress

### Copy
- **Headline**: "Connecting to {StoreName}…" (or just "Connecting…" if no store yet)
- **Step label**: "Step {n} of 3: {stepLabel}"

### Steps
1. Authenticating
2. Fetching store data
3. Syncing inventory

### Component Mapping
| Element | Style |
|---------|-------|
| Store icon | 80×80px, `rounded-full`, `bg-[rgba(7,213,104,0.10)]`, pulse ring animation |
| Progress bar | 6px height, `rounded-full`, gradient fill from accent to lighter accent |
| Step indicators | 3-column grid, `rounded-xl px-3 py-2 text-xs font-medium` |

### Animation
- Progress: 0→100% over ~3s (CSS transition, 30ms intervals)
- Pulse ring: `animation: pulseAlert 2s ease-in-out infinite` on icon ring
- Step color transitions on completion

---

## Screen 3: AI Loading State

### Layout
- Stack of 3 cards (max-width: 480px)
- Cards reveal sequentially: 0ms, 600ms, 1200ms

### Cards (from codebase)
```jsx
// Card wrapper
<div className="rounded-[24px] border p-6 shadow-sm" />

// Icon container
<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)]">
  {icon}
</div>

// Active card (current step)
style={{
  borderColor: i === visibleCards - 1 ? T.accent : T.line,
  background: i === visibleCards - 1 ? T.accentSoft : T.white,
  boxShadow: i === visibleCards - 1 ? '0 0 0 1px rgba(7,213,104,0.20)' : T.shadowSoft,
}}

// Done card (completed steps)
<div className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: T.accent }}>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
</div>

// Active card spinner
<svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2.5">
  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
</svg>
```

### Card Content
| Card | Title | Subtitle |
|------|-------|----------|
| 1 | Fetching last 10 orders | Reading your Shopify data |
| 2 | Analyzing product performance | Calculating sell-through rates |
| 3 | Calculating inventory health | Identifying reorder points |

### Animation Timing
- Card 1: appears at 0ms, stays active until 600ms
- Card 2: appears at 600ms, becomes active, stays until 1200ms
- Card 3: appears at 1200ms, becomes active, completes at 3200ms
- Entrance: `opacity: 0→1, transform: translateY(16px)→0` over 500ms

---

## Screen 4: Instant Value Dashboard

### Layout
- Full-width container (max-width: 720px)
- Centered with `px-6 py-10` padding

### Header Row
```jsx
<div className="mb-8 flex items-center justify-between">
  <div>
    <div className="text-sm text-[var(--color-muted)]">Your dashboard</div>
    <h2 className="font-display text-2xl font-[700] tracking-[-0.04em] text-[var(--color-text)]">
      Welcome back, {storeName}
    </h2>
  </div>
  <div className="rounded-full px-3 py-1.5 text-xs font-semibold" style={{ background: T.accentSoft, color: T.accent }}>
    Live
  </div>
</div>
```

### Stats Row (3 cards)
```jsx
// Card wrapper
<div className="rounded-[22px] border border-[var(--color-line)] bg-white p-4 shadow-sm" />

// Number (from codebase)
<div className="font-display text-3xl font-[700] tracking-[-0.05em]" style={{ fontFamily: T.fontDisplay }}>
  {value}
</div>
```

| Card | Value Style | Label Style |
|------|-------------|------------|
| Total SKUs | `color: T.text` (#12151f) | `text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]` |
| Healthy Stock | `color: T.accent` (#07D568) | same |
| At Risk | `color: T.alert` (#e5484d) | same |

### Reorder Suggestions
```jsx
// Item wrapper
<div className="flex items-center justify-between rounded-[20px] border border-[var(--color-line)] bg-white p-4 shadow-sm hover-lift" />

// Alert badge
<div className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold" style={{ background: T.alertSoft, color: T.alert }}>
  ⚠️
</div>

// Reorder qty (accent, prominent)
<div className="font-display text-lg font-[700] tracking-[-0.04em]" style={{ fontFamily: T.fontDisplay, color: T.accent }}>
  Order {item.reorderQty}
</div>
```

### Top Products Grid
```jsx
<div className="grid gap-3 sm:grid-cols-2">
  // Each product card uses same border/padding/shadow as reorder items
</div>
```

### Profile Setup Banner
```jsx
<div className="mt-8 rounded-[24px] border border-[rgba(7,213,104,0.20)] p-5" style={{ background: T.accentSoft }}>
  <div className="flex items-center justify-between gap-4">
    <div>
      <div className="font-semibold text-[var(--color-text)]">Tell us about your store</div>
      <div className="mt-1 text-sm text-[var(--color-muted)]">Set your currency, timezone, and goal</div>
    </div>
    <button className="hover-lift focus-ring shrink-0 rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-[#062912]">
      Setup
    </button>
  </div>
</div>
```

---

## Screen 5: Profile Setup (Inline)

### Layout
- Centered, max-width: 600px
- Two Card sections

### Auto-filled Fields
```jsx
// Input wrapper
<input type="text" className="focus-ring w-full rounded-[18px] border border-[var(--color-line)] bg-white px-4 py-3 text-base text-[var(--color-text)] outline-none transition-all" />

// Select wrapper
<select className="focus-ring w-full appearance-none rounded-[18px] border border-[var(--color-line)] bg-white px-4 py-3 text-base text-[var(--color-text)] outline-none transition-all">
```

### Field Labels
```jsx
<label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
  {label}
</label>
```

### Goal Selection Chips
```jsx
// Chip button
<button className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-150 focus-ring ${
  form.goal === g.key
    ? 'bg-[var(--color-accent)] text-[#062912]'
    : 'border border-[var(--color-line)] bg-white text-[var(--color-text)] hover:border-[var(--color-accent)]'
}`}>
  {form.goal === g.key && (
    <span className="mr-1.5 inline-flex items-center">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  )}
  {g.label}
</button>
```

### Goal Options
1. Avoid stockouts
2. Improve forecasting
3. Scale operations

### Auto-save UI States
```jsx
// Saving
<span className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
  Saving…
</span>

// Saved
<span className="flex items-center gap-2 text-sm" style={{ color: T.accent }}>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
  Saved
</span>
```

### Skip Link
```jsx
<button className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]">
  Skip for now
</button>
```

---

## Shared Component API

### BtnPrimary
```jsx
function BtnPrimary({ children, loading, onClick, disabled, fullWidth }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="hover-lift focus-ring rounded-full bg-[var(--color-accent)] px-6 py-4 text-base font-semibold text-[#062912] shadow-[0_14px_30px_rgba(7,213,104,0.28)] transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      style={fullWidth ? { width: '100%' } : {}}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          {children}
        </span>
      ) : children}
    </button>
  );
}
```

### BtnGhost
```jsx
// Same signature as BtnPrimary, different className
className="hover-lift focus-ring rounded-full border border-[var(--color-line)] bg-white px-6 py-4 text-base font-semibold text-[var(--color-text)] transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
```

### Card
```jsx
function Card({ children, style, className = '', elevated }) {
  return (
    <div
      className={`rounded-[28px] border border-[var(--color-line)] bg-white p-6 shadow-sm ${className}`}
      style={elevated ? { boxShadow: T.shadowLift, borderColor: 'rgba(7,213,104,0.16)' } : {}}
    >
      {children}
    </div>
  );
}
```

---

## All CSS Animations (from codebase)

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes viewIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes shimmer {
  0% { background-position: 120% 0; }
  100% { background-position: -120% 0; }
}

@keyframes pulseAlert {
  0%, 100% { box-shadow: 0 0 0 0 rgba(229,72,77,0.10); }
  50% { box-shadow: 0 0 0 12px rgba(229,72,77,0); }
}

@keyframes floatCard {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

/* Shimmer for skeletons */
.shimmer {
  background: linear-gradient(90deg, rgba(18,21,31,0.04) 20%, rgba(7,213,104,0.12) 50%, rgba(18,21,31,0.04) 80%);
  background-size: 220% 100%;
  animation: shimmer 2.2s linear infinite;
}
```

---

## hover-lift (from codebase)
```css
.hover-lift {
  transition: transform 120ms var(--ease-out), background-color 120ms, box-shadow 160ms;
}
.hover-lift:hover { transform: translateY(-2px); box-shadow: var(--shadow-lift); }
.hover-lift:active { transform: scale(0.97); }
```

## focus-ring (from codebase)
```css
.focus-ring:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgba(7,213,104,0.18), 0 0 0 5px rgba(7,213,104,0.34);
}
```

---

## Easing
```css
--ease-out: cubic-bezier(.22,1,.36,1)
```
All transitions use this easing (not the standard ease-out).

---

## Output Files
- [Onboarding.jsx](src/Onboarding.jsx) — Complete React component with all 5 screens
- [SPEC.md](SPEC.md) — This document (updated with exact design tokens)

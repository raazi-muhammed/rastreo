# Design Tokens

Copy the relevant sections into a new project's global CSS (and font setup) to match this
project's look. Built on Tailwind v4 (`@theme inline`) + shadcn.

## Fonts

- **Sans / body / heading**: [Inter](https://fonts.google.com/specimen/Inter) (Google Font)
- **Mono / display**: [Fira Code](https://fonts.google.com/specimen/Fira+Code) (Google Font)

Next.js setup (`app/layout.tsx`):

```tsx
import { Fira_Code, Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Fira_Code({ subsets: ["latin"], variable: "--font-mono" })

// on <html>: className={cn(fontMono.variable, "font-sans", inter.variable)}
```

Theme mapping (`globals.css`):

```css
@theme inline {
    --font-heading: var(--font-sans);
    --font-sans: var(--font-sans);
    --font-display: var(--font-mono);
    --font-mono: var(--font-mono);
}

@layer base {
  html {
    @apply font-sans;
  }
}
```

Plain `<link>` alternative (no Next.js):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&family=Fira+Code:wght@400..700&display=swap" rel="stylesheet">
```

```css
:root {
  --font-sans: "Inter", sans-serif;
  --font-mono: "Fira Code", monospace;
}
```

## Border Radius

Base radius is `1rem`, with every other size derived from it as a multiple:

```css
:root {
  --radius: 1rem;
}

@theme inline {
    --radius-sm: calc(var(--radius) * 0.6);   /* 0.6rem */
    --radius-md: calc(var(--radius) * 0.8);   /* 0.8rem */
    --radius-lg: var(--radius);               /* 1rem   */
    --radius-xl: calc(var(--radius) * 1.4);   /* 1.4rem */
    --radius-2xl: calc(var(--radius) * 1.8);  /* 1.8rem */
    --radius-3xl: calc(var(--radius) * 2.2);  /* 2.2rem */
    --radius-4xl: calc(var(--radius) * 2.6);  /* 2.6rem */
}
```

To make everything rounder/squarer, change only `--radius`.

## Text Size

No custom type scale — uses Tailwind's default `text-*` utilities
(`text-xs` … `text-9xl`) as-is.

## Colors

Light theme (`:root`):

```css
:root {
    --background: #e8e8ee;
    --foreground: oklch(0.145 0 0);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.145 0 0);
    --popover: oklch(1 0 0);
    --popover-foreground: oklch(0.145 0 0);
    --primary: #6466f1;
    --primary-foreground: oklch(0.985 0 0);
    --secondary: oklch(0.97 0 0);
    --secondary-foreground: oklch(0.205 0 0);
    --muted: oklch(0.97 0 0);
    --muted-foreground: oklch(0.556 0 0);
    --accent: oklch(0.97 0 0);
    --accent-foreground: oklch(0.205 0 0);
    --destructive: oklch(0.577 0.245 27.325);
    --border: oklch(0.922 0 0);
    --input: oklch(0.922 0 0);
    --ring: oklch(0.708 0 0);
    --chart-1: hsl(244, 49%, 90%);
    --chart-2: hsl(227, 49%, 90%);
    --chart-3: hsl(263, 69%, 89%);
    --chart-4: oklch(0.371 0 0);
    --chart-5: oklch(0.269 0 0);
    --sidebar: oklch(0.985 0 0);
    --sidebar-foreground: oklch(0.145 0 0);
    --sidebar-primary: oklch(0.205 0 0);
    --sidebar-primary-foreground: oklch(0.985 0 0);
    --sidebar-accent: oklch(0.97 0 0);
    --sidebar-accent-foreground: oklch(0.205 0 0);
    --sidebar-border: oklch(0.922 0 0);
    --sidebar-ring: oklch(0.708 0 0);
}
```

Dark theme (`.dark`):

```css
.dark {
    --background: hsl(240, 4%, 5%);
    --foreground: oklch(0.985 0 0);
    --card: hsl(240, 9%, 9%);
    --card-foreground: oklch(0.985 0 0);
    --popover: #151519;
    --popover-foreground: oklch(0.985 0 0);
    --primary: #6466f1;
    --primary-foreground: oklch(0.985 0 0);
    --secondary: oklch(0.269 0 0);
    --secondary-foreground: oklch(0.985 0 0);
    --muted: oklch(0.269 0 0);
    --muted-foreground: oklch(0.708 0 0);
    --accent: oklch(0.269 0 0);
    --accent-foreground: oklch(0.985 0 0);
    --destructive: oklch(0.704 0.191 22.216);
    --border: oklch(1 0 0 / 10%);
    --input: oklch(1 0 0 / 15%);
    --ring: oklch(0.556 0 0);
    --chart-1: hsl(244, 39%, 10%);
    --chart-2: hsl(227, 49%, 10%);
    --chart-3: hsl(263, 69%, 11%);
    --chart-4: oklch(0.371 0 0);
    --chart-5: oklch(0.269 0 0);
    --sidebar: hsl(240, 9%, 9%);
    --sidebar-foreground: oklch(0.985 0 0);
    --sidebar-primary: oklch(0.488 0.243 264.376);
    --sidebar-primary-foreground: oklch(0.985 0 0);
    --sidebar-accent: oklch(0.269 0 0);
    --sidebar-accent-foreground: oklch(0.985 0 0);
    --sidebar-border: oklch(1 0 0 / 10%);
    --sidebar-ring: oklch(0.556 0 0);
}
```

Tailwind `@theme inline` bindings (maps the raw vars above to `bg-*`/`text-*`/`border-*`
utilities — needed for Tailwind v4 + shadcn setups):

```css
@theme inline {
    --color-sidebar-ring: var(--sidebar-ring);
    --color-sidebar-border: var(--sidebar-border);
    --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
    --color-sidebar-accent: var(--sidebar-accent);
    --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
    --color-sidebar-primary: var(--sidebar-primary);
    --color-sidebar-foreground: var(--sidebar-foreground);
    --color-sidebar: var(--sidebar);
    --color-chart-5: var(--chart-5);
    --color-chart-4: var(--chart-4);
    --color-chart-3: var(--chart-3);
    --color-chart-2: var(--chart-2);
    --color-chart-1: var(--chart-1);
    --color-ring: var(--ring);
    --color-input: var(--input);
    --color-border: var(--border);
    --color-destructive: var(--destructive);
    --color-accent-foreground: var(--accent-foreground);
    --color-accent: var(--accent);
    --color-muted-foreground: var(--muted-foreground);
    --color-muted: var(--muted);
    --color-secondary-foreground: var(--secondary-foreground);
    --color-secondary: var(--secondary);
    --color-primary-foreground: var(--primary-foreground);
    --color-primary: var(--primary);
    --color-popover-foreground: var(--popover-foreground);
    --color-popover: var(--popover);
    --color-card-foreground: var(--card-foreground);
    --color-card: var(--card);
    --color-foreground: var(--foreground);
    --color-background: var(--background);
}
```

## Quick color reference

| Token | Light | Dark |
|---|---|---|
| Background | `#e8e8ee` | `hsl(240, 4%, 5%)` |
| Foreground | `oklch(0.145 0 0)` (near-black) | `oklch(0.985 0 0)` (near-white) |
| Primary | `#6466f1` (indigo) | `#6466f1` (indigo) |
| Card | `oklch(1 0 0)` (white) | `hsl(240, 9%, 9%)` |
| Border | `oklch(0.922 0 0)` | `oklch(1 0 0 / 10%)` |
| Destructive | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` |

Source: [app/globals.css](app/globals.css), [app/layout.tsx](app/layout.tsx)

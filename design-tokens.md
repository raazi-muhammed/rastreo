# Design Tokens

Copy the relevant sections into a new project's global CSS (and font setup) to match this
project's look. Built on Tailwind v3 (JS config, `hsl(var(--x))` color values) + shadcn.

## Fonts

- **Sans / body / heading**: [Inter](https://fonts.google.com/specimen/Inter) (Google Font)
- **Mono**: [Fira Code](https://fonts.google.com/specimen/Fira+Code) (Google Font)
- **Display**: [Mona Sans](https://fonts.google.com/specimen/Mona+Sans) (Google Font), width 125 (Expanded) via the `wdth` axis

Load them however the project's build tool supports Google Fonts — a `next/font/google`
import, a framework's font plugin, or plain `<link>` tags in the HTML head:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&family=Fira+Code:wght@400..700&family=Mona+Sans:wdth,wght@125,200..900&display=swap"
    rel="stylesheet" />
```

`tailwind.config.js`:

```js
const defaultTheme = require("tailwindcss/defaultTheme");

theme: {
    extend: {
        fontFamily: {
            sans: ["Inter", ...defaultTheme.fontFamily.sans],
            mono: ["Fira Code", ...defaultTheme.fontFamily.mono],
            display: ["Mona Sans", ...defaultTheme.fontFamily.sans],
        },
    },
}
```

Global CSS — pin the display font to its Expanded width (use `font-variation-settings`,
not `font-stretch`):

```css
@layer utilities {
    .font-display {
        font-variation-settings: "wdth" 125;
    }
}
```

## Border Radius

Base radius is `1rem`, with every other size derived from it as a multiple:

```css
:root {
    --radius: 1rem;
}
```

```js
borderRadius: {
    DEFAULT: "var(--radius)",
    xs: "calc(var(--radius) * 0.4)",   /* 0.4rem */
    sm: "calc(var(--radius) * 0.6)",   /* 0.6rem */
    md: "calc(var(--radius) * 0.8)",   /* 0.8rem */
    lg: "var(--radius)",               /* 1rem   */
    xl: "calc(var(--radius) * 1.4)",   /* 1.4rem */
    "2xl": "calc(var(--radius) * 1.8)", /* 1.8rem */
    "3xl": "calc(var(--radius) * 2.2)", /* 2.2rem */
    "4xl": "calc(var(--radius) * 2.6)", /* 2.6rem */
}
```

To make everything rounder/squarer, change only `--radius`.

## Text Size

No custom type scale — uses Tailwind's default `text-*` utilities
(`text-xs` … `text-9xl`) as-is.

## Colors

Values are stored as bare HSL component triplets (`H S% L%`, no `hsl()` wrapper) and
consumed via `hsl(var(--x))` in `tailwind.config.js`.

**Rule: never duplicate a color value.** If a token's value is an exact match for another
token, define it as `var(--other-token)` instead of repeating the literal — e.g.
`--popover: var(--card);` rather than copying `--card`'s value into `--popover`. This keeps
the palette as one source of truth: changing `--card` automatically updates everything that
was defined in terms of it, instead of silently drifting out of sync. Below, `--card-foreground`,
`--popover`, `--popover-foreground`, `--secondary-foreground`, `--destructive-foreground`,
and `--input` are all defined this way.

Light theme (`:root`):

```css
:root {
    --background: 240 15% 92%;
    --foreground: 0 0% 4%;
    --card: 0 0% 100%;
    --card-foreground: var(--foreground);
    --popover: var(--card);
    --popover-foreground: var(--card-foreground);
    --primary: 239 83% 67%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 15% 94%;
    --secondary-foreground: var(--foreground);
    --muted: 0 0% 96%;
    --muted-foreground: 0 0% 45%;
    --accent: 239 58% 85%;
    --accent-foreground: 0 0% 9%;
    --destructive: 357 100% 45%;
    --destructive-foreground: var(--primary-foreground);
    --border: 0 0% 90%;
    --input: var(--border);
    --ring: 0 0% 63%;
    --chart-1: 244 49% 90%;
    --chart-2: 227 49% 90%;
    --chart-3: 263 69% 89%;
    --chart-4: 0 0% 25%;
    --chart-5: 0 0% 15%;
    --radius: 1rem;
}
```

Dark theme (`.dark`):

```css
.dark {
    --background: 240 4% 5%;
    --foreground: 0 0% 98%;
    --card: 240 9% 9%;
    --card-foreground: var(--foreground);
    --popover: var(--card);
    --popover-foreground: var(--card-foreground);
    --primary: 239 83% 67%;
    --primary-foreground: var(--foreground);
    --secondary: 240 6% 6%;
    --secondary-foreground: var(--foreground);
    --muted: 0 0% 15%;
    --muted-foreground: 0 0% 63%;
    --accent: 239 35% 24%;
    --accent-foreground: var(--foreground);
    --destructive: 359 100% 70%;
    --destructive-foreground: var(--foreground);
    --border: 240 1% 15%;
    --input: 240 1% 19%;
    --ring: 0 0% 45%;
    --chart-1: 244 39% 10%;
    --chart-2: 227 49% 10%;
    --chart-3: 263 69% 11%;
    --chart-4: 0 0% 25%;
    --chart-5: 0 0% 15%;
    --radius: 1rem;
}
```

`primary`, `secondary`, and `accent` all share the same ~239° indigo hue — `secondary` and
`accent` are blends of `primary`/`background`/`card` rather than unrelated neutrals, so the
palette reads as one family instead of a gray UI with an indigo primary bolted on.

Tailwind color bindings (`tailwind.config.js`, `theme.extend.colors` — maps the raw vars
above to `bg-*`/`text-*`/`border-*` utilities for Tailwind v3 + shadcn):

```js
colors: {
    border: "hsl(var(--border))",
    input: "hsl(var(--input))",
    ring: "hsl(var(--ring))",
    background: "hsl(var(--background))",
    foreground: "hsl(var(--foreground))",
    primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
    },
    secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
    },
    destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
    },
    muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
    },
    accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
    },
    popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
    },
    card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
    },
    chart: {
        1: "hsl(var(--chart-1))",
        2: "hsl(var(--chart-2))",
        3: "hsl(var(--chart-3))",
        4: "hsl(var(--chart-4))",
        5: "hsl(var(--chart-5))",
    },
}
```

## Quick color reference

| Token | Light | Dark |
|---|---|---|
| Background | `240 15% 92%` | `240 4% 5%` |
| Foreground | `0 0% 4%` (near-black) | `0 0% 98%` (near-white) |
| Primary | `239 83% 67%` (indigo) | `239 83% 67%` (indigo) |
| Card | `0 0% 100%` (white) | `240 9% 9%` |
| Secondary | `240 15% 94%` | `240 6% 6%` |
| Accent | `239 58% 85%` (indigo tint) | `239 35% 24%` (indigo tint) |
| Border | `0 0% 90%` | `240 1% 15%` |
| Destructive | `357 100% 45%` | `359 100% 70%` |

Source: [src/index.css](src/index.css), [tailwind.config.js](tailwind.config.js)

## Preview page

This project has a `/design-tokens` route ([src/pages/design-tokens/index.tsx](src/pages/design-tokens/index.tsx))
that renders every color group, both fonts, the full radius scale, and a "Surface Layering"
section showing how `background`/`card`/`secondary` look nested against each other — plus a
light/dark toggle. When applying this token system to a new project, create the same kind
of page so the whole palette can be checked at a glance instead of guessing from CSS alone.

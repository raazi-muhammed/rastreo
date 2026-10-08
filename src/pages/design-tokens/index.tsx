import { ReactNode } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    MoonIcon,
    Sun01Icon,
    UserRoundPlusIcon as AddPersonIcon,
} from "@hugeicons/core-free-icons";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useTheme } from "@/components/theme/theme-provider";
import { ThemeOptions } from "@/store/features/settingsSlice";

type ColorSwatch = {
    label: string;
    varName: string;
    bg: string;
    fg?: string;
};

const COLOR_GROUPS: { title: string; swatches: ColorSwatch[] }[] = [
    {
        title: "Base",
        swatches: [
            { label: "background", varName: "--background", bg: "bg-background", fg: "text-foreground" },
            { label: "foreground", varName: "--foreground", bg: "bg-foreground", fg: "text-background" },
        ],
    },
    {
        title: "Card",
        swatches: [
            { label: "card", varName: "--card", bg: "bg-card", fg: "text-card-foreground" },
            { label: "card-foreground", varName: "--card-foreground", bg: "bg-card-foreground", fg: "text-card" },
        ],
    },
    {
        title: "Popover",
        swatches: [
            { label: "popover", varName: "--popover", bg: "bg-popover", fg: "text-popover-foreground" },
            { label: "popover-foreground", varName: "--popover-foreground", bg: "bg-popover-foreground", fg: "text-popover" },
        ],
    },
    {
        title: "Primary",
        swatches: [
            { label: "primary", varName: "--primary", bg: "bg-primary", fg: "text-primary-foreground" },
            { label: "primary-foreground", varName: "--primary-foreground", bg: "bg-primary-foreground", fg: "text-primary" },
        ],
    },
    {
        title: "Secondary",
        swatches: [
            { label: "secondary", varName: "--secondary", bg: "bg-secondary", fg: "text-secondary-foreground" },
            { label: "secondary-foreground", varName: "--secondary-foreground", bg: "bg-secondary-foreground", fg: "text-secondary" },
        ],
    },
    {
        title: "Muted",
        swatches: [
            { label: "muted", varName: "--muted", bg: "bg-muted", fg: "text-muted-foreground" },
            { label: "muted-foreground", varName: "--muted-foreground", bg: "bg-muted-foreground", fg: "text-muted" },
        ],
    },
    {
        title: "Accent",
        swatches: [
            { label: "accent", varName: "--accent", bg: "bg-accent", fg: "text-accent-foreground" },
            { label: "accent-foreground", varName: "--accent-foreground", bg: "bg-accent-foreground", fg: "text-accent" },
        ],
    },
    {
        title: "Destructive",
        swatches: [
            { label: "destructive", varName: "--destructive", bg: "bg-destructive", fg: "text-destructive-foreground" },
            { label: "destructive-foreground", varName: "--destructive-foreground", bg: "bg-destructive-foreground", fg: "text-destructive" },
        ],
    },
    {
        title: "Chart",
        swatches: [
            { label: "chart-1", varName: "--chart-1", bg: "bg-chart-1" },
            { label: "chart-2", varName: "--chart-2", bg: "bg-chart-2" },
            { label: "chart-3", varName: "--chart-3", bg: "bg-chart-3" },
            { label: "chart-4", varName: "--chart-4", bg: "bg-chart-4" },
            { label: "chart-5", varName: "--chart-5", bg: "bg-chart-5" },
        ],
    },
];

const LINE_SWATCHES: ColorSwatch[] = [
    { label: "border", varName: "--border", bg: "bg-border" },
    { label: "input", varName: "--input", bg: "bg-input" },
    { label: "ring", varName: "--ring", bg: "bg-ring" },
];

const LAYER_EXAMPLES: {
    label: string;
    outerName: string;
    outerBg: string;
    outerFg: string;
    innerName: string;
    innerBg: string;
    innerFg: string;
}[] = [
    {
        label: "background + card",
        outerName: "background",
        outerBg: "bg-background",
        outerFg: "text-foreground",
        innerName: "card",
        innerBg: "bg-card",
        innerFg: "text-card-foreground",
    },
    {
        label: "background + secondary",
        outerName: "background",
        outerBg: "bg-background",
        outerFg: "text-foreground",
        innerName: "secondary",
        innerBg: "bg-secondary",
        innerFg: "text-secondary-foreground",
    },
    {
        label: "secondary + card",
        outerName: "secondary",
        outerBg: "bg-secondary",
        outerFg: "text-secondary-foreground",
        innerName: "card",
        innerBg: "bg-card",
        innerFg: "text-card-foreground",
    },
];

const BUTTON_VARIANTS: {
    label: string;
    variant: NonNullable<ButtonProps["variant"]>;
}[] = [
    { label: "default", variant: "default" },
    { label: "secondary", variant: "secondary" },
    { label: "card", variant: "card" },
    { label: "outline", variant: "outline" },
    { label: "ghost", variant: "ghost" },
    { label: "destructive", variant: "destructive" },
    { label: "link", variant: "link" },
];

const BUTTON_SIZES: {
    label: string;
    size: NonNullable<ButtonProps["size"]>;
}[] = [
    { label: "xs", size: "xs" },
    { label: "sm", size: "sm" },
    { label: "default", size: "default" },
    { label: "lg", size: "lg" },
];

const ICON_BUTTON_SIZES: {
    label: string;
    size: NonNullable<ButtonProps["size"]>;
}[] = [
    { label: "icon-xs", size: "icon-xs" },
    { label: "icon-sm", size: "icon-sm" },
    { label: "icon", size: "icon" },
    { label: "icon-lg", size: "icon-lg" },
];

const RADIUS_SWATCHES = [
    { label: "xs", className: "rounded-xs" },
    { label: "sm", className: "rounded-sm" },
    { label: "md", className: "rounded-md" },
    { label: "lg", className: "rounded-lg" },
    { label: "xl", className: "rounded-xl" },
    { label: "2xl", className: "rounded-2xl" },
    { label: "3xl", className: "rounded-3xl" },
    { label: "4xl", className: "rounded-4xl" },
];

function Swatch({ label, varName, bg, fg }: ColorSwatch) {
    return (
        <div className="flex flex-col gap-2">
            <div
                className={`flex h-16 items-center justify-center rounded-md ${bg}`}>
                {fg ? <span className={`text-xs ${fg}`}>Aa</span> : null}
            </div>
            <div className="text-xs">
                <p className="font-medium text-foreground">{label}</p>
                <p className="font-mono text-muted-foreground">{varName}</p>
            </div>
        </div>
    );
}

function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const isDark =
        theme === ThemeOptions.DARK ||
        (theme === ThemeOptions.SYSTEM &&
            window.matchMedia("(prefers-color-scheme: dark)").matches);

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() =>
                setTheme(isDark ? ThemeOptions.LIGHT : ThemeOptions.DARK)
            }>
            {isDark ? (
                <HugeiconsIcon icon={Sun01Icon} className="h-4 w-4" />
            ) : (
                <HugeiconsIcon icon={MoonIcon} className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}

function Section({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            {children}
        </section>
    );
}

export default function DesignTokensPage() {
    return (
        <div className="min-h-screen w-full overflow-auto bg-background p-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-12">
                <header className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            Design Tokens
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            Colors, typography, and radius scale currently in use.
                        </p>
                    </div>
                    <ThemeToggle />
                </header>

                <Section title="Colors">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
                        {COLOR_GROUPS.map((group) => (
                            <div key={group.title} className="flex flex-col gap-3">
                                <h3 className="text-sm font-medium text-muted-foreground">
                                    {group.title}
                                </h3>
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                    {group.swatches.map((swatch) => (
                                        <Swatch key={swatch.label} {...swatch} />
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-sm font-medium text-muted-foreground">
                                Lines
                            </h3>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                {LINE_SWATCHES.map((swatch) => (
                                    <Swatch key={swatch.label} {...swatch} />
                                ))}
                            </div>
                        </div>
                    </div>
                </Section>

                <Section title="Typography">
                    <div className="flex flex-col gap-6">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                font-sans — Inter
                            </p>
                            <p className="font-sans text-3xl font-bold text-foreground">
                                The quick brown fox
                            </p>
                            <p className="font-sans text-base text-foreground">
                                The quick brown fox jumps over the lazy dog. 0123456789
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">
                                font-mono — Fira Code
                            </p>
                            <p className="font-mono text-3xl font-bold text-foreground">
                                The quick brown fox
                            </p>
                            <p className="font-mono text-base tabular-nums text-foreground">
                                The quick brown fox jumps over the lazy dog. 0123456789
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">
                                font-display — Mona Sans (wdth 125, Expanded)
                            </p>
                            <p className="font-display text-3xl font-bold text-foreground">
                                The quick brown fox
                            </p>
                            <p className="font-display text-base text-foreground">
                                The quick brown fox jumps over the lazy dog. 0123456789
                            </p>
                        </div>
                    </div>
                </Section>

                <Section title="Surface Layering">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {LAYER_EXAMPLES.map((layer) => (
                            <div key={layer.label} className="flex flex-col gap-2">
                                <div
                                    className={`flex h-32 flex-col items-center justify-center gap-2 rounded-lg p-4 ${layer.outerBg} ${layer.outerFg}`}>
                                    <span className="text-xs">{layer.outerName}</span>
                                    <div
                                        className={`flex h-16 w-full items-center justify-center rounded-md ${layer.innerBg} ${layer.innerFg}`}>
                                        <span className="text-xs">{layer.innerName}</span>
                                    </div>
                                </div>
                                <p className="text-xs font-medium text-foreground">
                                    {layer.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </Section>

                <Section title="Buttons">
                    <div className="flex flex-col gap-8">
                        <div>
                            <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                                Variants
                            </h3>
                            <div className="flex flex-wrap items-center gap-3">
                                {BUTTON_VARIANTS.map(({ label, variant }) => (
                                    <div
                                        key={label}
                                        className="flex flex-col items-center gap-2">
                                        <Button variant={variant}>
                                            {label}
                                        </Button>
                                        <span className="font-mono text-xs text-muted-foreground">
                                            variant="{label}"
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                                Sizes
                            </h3>
                            <div className="flex flex-wrap items-end gap-3">
                                {BUTTON_SIZES.map(({ label, size }) => (
                                    <div
                                        key={label}
                                        className="flex flex-col items-center gap-2">
                                        <Button size={size}>Button</Button>
                                        <span className="font-mono text-xs text-muted-foreground">
                                            size="{label}"
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                                Icon sizes
                            </h3>
                            <div className="flex flex-wrap items-end gap-3">
                                {ICON_BUTTON_SIZES.map(({ label, size }) => (
                                    <div
                                        key={label}
                                        className="flex flex-col items-center gap-2">
                                        <Button
                                            variant="secondary"
                                            size={size}
                                            aria-label={label}>
                                            <HugeiconsIcon
                                                icon={Sun01Icon}
                                                className="h-4 w-4"
                                            />
                                        </Button>
                                        <span className="font-mono text-xs text-muted-foreground">
                                            size="{label}"
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                                Disabled
                            </h3>
                            <div className="flex flex-wrap items-center gap-3">
                                {BUTTON_VARIANTS.map(({ label, variant }) => (
                                    <Button key={label} variant={variant} disabled>
                                        {label}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                                Large CTA (pill)
                            </h3>
                            <p className="mb-3 text-xs text-muted-foreground">
                                One-off pattern for prominent calls to action
                                — see{" "}
                                <code className="font-mono">
                                    AddPlayer.tsx
                                </code>
                                . Not a built-in size; composed with a
                                className override.
                            </p>
                            <Button className="flex h-14 w-full max-w-xs items-center justify-center gap-2 rounded-full px-6 text-base font-semibold shadow-md">
                                <HugeiconsIcon
                                    icon={AddPersonIcon}
                                    size="1.25em"
                                />
                                Add player
                            </Button>
                        </div>
                    </div>
                </Section>

                <Section title="Border Radius">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {RADIUS_SWATCHES.map((r) => (
                            <div key={r.label} className="flex flex-col gap-2">
                                <div
                                    className={`h-16 border bg-card ${r.className}`}
                                />
                                <p className="text-xs font-medium text-foreground">
                                    {r.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </Section>
            </div>
        </div>
    );
}

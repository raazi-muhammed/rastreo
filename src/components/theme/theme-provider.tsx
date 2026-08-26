import { ThemeOptions } from "@/store/features/settingsSlice";
import { createContext, useContext, useEffect, useState } from "react";

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme: ThemeOptions;
    storageKey?: string;
};

type ThemeProviderState = {
    theme: ThemeOptions;
    setTheme: (theme: ThemeOptions) => void;
};

const initialState: ThemeProviderState = {
    theme: ThemeOptions.SYSTEM,
    setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
    children,
    defaultTheme = ThemeOptions.SYSTEM,
    storageKey = "vite-ui-theme",
    ...props
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<ThemeOptions>(
        () => (localStorage.getItem(storageKey) as ThemeOptions) || defaultTheme
    );

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove("light", "dark");

        const resolvedTheme =
            theme === ThemeOptions.SYSTEM
                ? window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? ThemeOptions.DARK
                    : ThemeOptions.LIGHT
                : theme;

        root.classList.add(resolvedTheme);

        document
            .querySelector('meta[name="theme-color"]')
            ?.setAttribute(
                "content",
                resolvedTheme === ThemeOptions.DARK ? "#0c0c0d" : "#e8e8ee"
            );
    }, [theme]);

    const value = {
        theme,
        setTheme: (theme: ThemeOptions) => {
            localStorage.setItem(storageKey, theme);
            setTheme(theme);
        },
    };

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");

    return context;
};

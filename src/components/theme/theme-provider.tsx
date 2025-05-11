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

        if (theme === ThemeOptions.SYSTEM) {
            const systemTheme = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
                ? ThemeOptions.DARK
                : ThemeOptions.LIGHT;

            root.classList.add(systemTheme);
            return;
        }

        root.classList.add(theme);
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

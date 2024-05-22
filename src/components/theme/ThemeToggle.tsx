import { useTheme } from "@/components/theme/theme-provider";
import { Switch } from "../ui/switch";

export function ThemeToggle() {
    const { setTheme, theme } = useTheme();

    return (
        <section className="flex justify-between gap-4 rounded bg-secondary p-3">
            <p>System theme</p>
            <Switch
                defaultChecked={theme == "system"}
                onCheckedChange={(data) => {
                    if (!data) {
                        setTheme("light");
                    } else {
                        setTheme("system");
                    }
                }}
            />
        </section>
    );
}

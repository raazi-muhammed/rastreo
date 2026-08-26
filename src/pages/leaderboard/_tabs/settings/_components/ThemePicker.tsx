import { useTheme } from "@/components/theme/theme-provider";
import { ThemeOptions } from "@/store/features/settingsSlice";
import OptionCard from "./OptionCard";

const AaPill = ({
    background,
    color,
    border,
}: {
    background: string;
    color: string;
    border?: string;
}) => (
    <span
        className="flex h-6 w-10 items-center justify-center rounded-full text-[10px] font-semibold"
        style={{
            background,
            color,
            border: border ? `1px solid ${border}` : undefined,
        }}>
        Aa
    </span>
);

const ThemePicker = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="grid grid-cols-3 gap-3">
            <OptionCard
                label="System"
                selected={theme === ThemeOptions.SYSTEM}
                onClick={() => setTheme(ThemeOptions.SYSTEM)}>
                <span className="flex h-full w-full">
                    <span
                        className="flex h-full w-1/2 items-center justify-center"
                        style={{ background: "#0a0a0a" }}>
                        <AaPill
                            background="#0a0a0a"
                            color="#fafafa"
                            border="#3f3f46"
                        />
                    </span>
                    <span
                        className="flex h-full w-1/2 items-center justify-center"
                        style={{ background: "#e4e4e7" }}>
                        <AaPill
                            background="#ffffff"
                            color="#18181b"
                            border="#d4d4d8"
                        />
                    </span>
                </span>
            </OptionCard>
            <OptionCard
                label="Light"
                selected={theme === ThemeOptions.LIGHT}
                onClick={() => setTheme(ThemeOptions.LIGHT)}>
                <span
                    className="flex h-full w-full items-center justify-center"
                    style={{ background: "#e4e4e7" }}>
                    <AaPill
                        background="#ffffff"
                        color="#18181b"
                        border="#d4d4d8"
                    />
                </span>
            </OptionCard>
            <OptionCard
                label="Dark"
                selected={theme === ThemeOptions.DARK}
                onClick={() => setTheme(ThemeOptions.DARK)}>
                <span
                    className="flex h-full w-full items-center justify-center"
                    style={{ background: "#0a0a0a" }}>
                    <AaPill
                        background="#0a0a0a"
                        color="#fafafa"
                        border="#3f3f46"
                    />
                </span>
            </OptionCard>
        </div>
    );
};

export default ThemePicker;

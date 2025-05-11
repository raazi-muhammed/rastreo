import { Separator } from "@/components/ui/separator";
import { ReactNode } from "react";

function SectionWrapper({
    title,
    settings = [],
}: {
    title: string;
    settings?: ReactNode[];
}) {
    return (
        <div className="flex flex-col gap-2">
            <p className="ms-2 text-sm text-muted-foreground">{title}</p>
            <div className="bg-muted rounded px-1">
                {settings.map((setting, index) => (
                    <>
                        {setting}
                        {index !== settings.length - 1 && (
                            <Separator className="bg-muted-foreground/20 w-[95%] mx-auto my-1" />
                        )}
                    </>
                ))}
            </div>
        </div>
    );
}

export default SectionWrapper;

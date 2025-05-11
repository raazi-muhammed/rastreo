import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const MessageTemplate = ({
    title,
    className,
    description,
    children,
}: {
    title: string;
    className?: string;
    description?: string;
    children?: ReactNode;
}) => {
    return (
        <div className={cn("grid place-content-center gap-4 pt-2", className)}>
            {children}
            <div>
                <p className="text-center text-muted-foreground">{title}</p>
                {description && (
                    <p className="text-center text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default MessageTemplate;

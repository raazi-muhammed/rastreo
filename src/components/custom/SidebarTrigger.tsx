import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/hooks/redux";
import { toggleShowLeaderBoard } from "@/store/features/settingsSlice";
import { HugeiconsIcon } from "@hugeicons/react";
import { PanelLeftIcon } from "@hugeicons/core-free-icons";

export default function SidebarTrigger({
    className,
}: {
    className?: string;
}) {
    const dispatch = useAppDispatch();

    return (
        <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", className)}
            onClick={() => dispatch(toggleShowLeaderBoard())}>
            <HugeiconsIcon icon={PanelLeftIcon} size="1.4em" />
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
    );
}

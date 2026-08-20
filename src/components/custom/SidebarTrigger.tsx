import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/hooks/redux";
import { toggleShowLeaderBoard } from "@/store/features/settingsSlice";
import { PanelLeft } from "lucide-react";

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
            className={cn("h-7 w-7", className)}
            onClick={() => dispatch(toggleShowLeaderBoard())}>
            <PanelLeft />
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
    );
}

import { useEffect, useRef } from "react";
import { PanelImperativeHandle, PanelSize } from "react-resizable-panels";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import ReactGa from "react-ga";
import LeaderboardPage from "./pages/leaderboard";
import ScoresPage from "./pages/scores";
import useWakeLock from "./hooks/useWakeLock";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "./components/ui/resizable";
import {
    setSidebarWidth,
    SIDEBAR_MAX_WIDTH,
    SIDEBAR_MIN_WIDTH,
} from "./store/features/settingsSlice";

export default function App() {
    const dispatch = useAppDispatch();
    const showLeaderBoard = useAppSelector(
        (state) => state.settings.showLeaderBoard
    );
    const sidebarWidth = useAppSelector(
        (state) => state.settings.sidebarWidth
    );
    const sidebarPanelRef = useRef<PanelImperativeHandle>(null);
    // Tracks the latest width without retriggering the effect below on every
    // drag update (that would fight the in-progress drag via resize() calls).
    const sidebarWidthRef = useRef(sidebarWidth);
    sidebarWidthRef.current = sidebarWidth;
    ReactGa.pageview("/");
    useWakeLock();

    useEffect(() => {
        // Use resize() rather than expand() here: expand() is a no-op
        // unless the panel's internal collapsed flag is set, which isn't
        // guaranteed to be true just because it mounted at 0 width.
        if (showLeaderBoard) {
            sidebarPanelRef.current?.resize(sidebarWidthRef.current);
        } else {
            sidebarPanelRef.current?.collapse();
        }
    }, [showLeaderBoard]);

    function handleSidebarResize(panelSize: PanelSize) {
        // Collapsing reports a size of 0; ignore it so the persisted width
        // still reflects the last size the user actually dragged to.
        if (panelSize.inPixels > 0) {
            dispatch(setSidebarWidth(Math.round(panelSize.inPixels)));
        }
    }

    return (
        <ResizablePanelGroup
            orientation="horizontal"
            className="min-h-screen w-screen overflow-hidden bg-secondary">
            <ResizablePanel
                panelRef={sidebarPanelRef}
                defaultSize={showLeaderBoard ? sidebarWidth : 0}
                minSize={SIDEBAR_MIN_WIDTH}
                maxSize={SIDEBAR_MAX_WIDTH}
                collapsible
                collapsedSize={0}
                groupResizeBehavior="preserve-pixel-size"
                onResize={handleSidebarResize}>
                <LeaderboardPage />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel>
                <ScoresPage />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}

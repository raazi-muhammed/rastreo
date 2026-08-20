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
    setShowLeaderBoard,
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
    // The library sets flex-grow/flex-basis directly on this element; a
    // transition is applied here (and only here) so toggling animates
    // without also animating manual drag-resizes.
    const sidebarElementRef = useRef<HTMLDivElement>(null);
    // Tracks the latest width without retriggering the effect below on every
    // drag update (that would fight the in-progress drag via resize() calls).
    const sidebarWidthRef = useRef(sidebarWidth);
    sidebarWidthRef.current = sidebarWidth;
    const isFirstRender = useRef(true);
    // react-resizable-panels fires onResize from a ResizeObserver watching
    // the panel's live DOM box, so animating it via CSS floods onResize with
    // in-progress sizes (including a transient 0 right as an open transition
    // starts). Suppress handleSidebarResize while our own toggle-driven
    // transition is running so that noise is ignored; only a genuine user
    // drag should update state from onResize.
    const isProgrammaticResize = useRef(false);
    ReactGa.pageview("/");
    useWakeLock();

    useEffect(() => {
        // Use resize() rather than expand() here: expand() is a no-op
        // unless the panel's internal collapsed flag is set, which isn't
        // guaranteed to be true just because it mounted at 0 width.
        if (isFirstRender.current) {
            isFirstRender.current = false;
            if (showLeaderBoard) {
                sidebarPanelRef.current?.resize(sidebarWidthRef.current);
            } else {
                sidebarPanelRef.current?.collapse();
            }
            return;
        }

        const el = sidebarElementRef.current;
        if (el) {
            el.style.transition =
                "flex-grow 300ms cubic-bezier(0.4, 0, 0.2, 1), flex-basis 300ms cubic-bezier(0.4, 0, 0.2, 1)";
        }

        isProgrammaticResize.current = true;
        if (showLeaderBoard) {
            sidebarPanelRef.current?.resize(sidebarWidthRef.current);
        } else {
            sidebarPanelRef.current?.collapse();
        }

        const timeout = setTimeout(() => {
            if (el) el.style.transition = "";
            isProgrammaticResize.current = false;
        }, 300);
        return () => clearTimeout(timeout);
    }, [showLeaderBoard]);

    function handleSidebarResize(panelSize: PanelSize) {
        if (isProgrammaticResize.current) return;

        if (panelSize.inPixels > 0) {
            // Collapsing reports a size of 0; ignore it so the persisted
            // width still reflects the last size the user actually dragged
            // to.
            dispatch(setSidebarWidth(Math.round(panelSize.inPixels)));
            // Dragging the handle back out of a collapsed panel bypasses
            // the toggle button the same way collapsing it does (see
            // below); keep showLeaderBoard in sync in this direction too.
            if (!showLeaderBoard) {
                dispatch(setShowLeaderBoard(true));
            }
        } else if (showLeaderBoard) {
            // Dragging the handle past the snap threshold collapses the
            // panel directly, bypassing the toggle button. Without this,
            // showLeaderBoard stays true while the panel sits at 0px, so
            // the next toggle click calls collapse() on an already-
            // collapsed panel (a no-op) and appears to do nothing.
            dispatch(setShowLeaderBoard(false));
        }
    }

    return (
        <ResizablePanelGroup
            orientation="horizontal"
            className="min-h-screen w-screen overflow-hidden bg-card">
            <ResizablePanel
                panelRef={sidebarPanelRef}
                elementRef={sidebarElementRef}
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

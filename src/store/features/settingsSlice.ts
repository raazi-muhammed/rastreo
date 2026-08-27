import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { isDesktop } from "react-device-detect";

export enum SortOptions {
    TO_LOW = "TO_LOW",
    TO_HIGH = "TO_HIGH",
}
export enum ThemeOptions {
    SYSTEM = "system",
    LIGHT = "light",
    DARK = "dark",
}

export const SIDEBAR_MIN_WIDTH = 200;
export const SIDEBAR_MAX_WIDTH = 480;

type Settings = {
    isTouchModeOn: boolean;
    isFitEveryoneOn: boolean;
    isLocked: boolean;
    showLeaderBoard: boolean;
    sortOption: SortOptions;
    showNextDealer: boolean;
    isMobileModeOn: boolean;
    theme: ThemeOptions;
    keepScreenOn: boolean;
    showDragHandle: boolean;
    sidebarWidth: number;
    isCompactViewOn: boolean;
    showLeaderboardBadges: boolean;
    showPerGameBadges: boolean;
};

const initialState: Settings = {
    isTouchModeOn: !isDesktop,
    isFitEveryoneOn: true,
    isLocked: false,
    showLeaderBoard: isDesktop,
    sortOption: SortOptions.TO_LOW,
    showNextDealer: true,
    isMobileModeOn: false,
    theme: ThemeOptions.SYSTEM,
    keepScreenOn: false,
    showDragHandle: false,
    sidebarWidth: 320,
    isCompactViewOn: false,
    showLeaderboardBadges: true,
    showPerGameBadges: true,
};

export const counterSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        changeSortOption: (state, action: PayloadAction<SortOptions>) => {
            const option = action.payload;
            state.sortOption = option;
            return state;
        },
        toggleTouchMode: (state) => {
            state.isTouchModeOn = !state.isTouchModeOn;
            return state;
        },
        toggleFitEveryone: (state) => {
            state.isFitEveryoneOn = !state.isFitEveryoneOn;
            return state;
        },
        toggleLock: (state) => {
            state.isLocked = !state.isLocked;
            return state;
        },
        setShowLeaderBoard: (state, action: PayloadAction<boolean>) => {
            const showStatus = action.payload;
            state.showLeaderBoard = showStatus;
            return state;
        },
        toggleShowLeaderBoard: (state) => {
            state.showLeaderBoard = !state.showLeaderBoard;
            return state;
        },
        setShowNextDealer: (state, action: PayloadAction<boolean>) => {
            const showStatus = action.payload;
            state.showNextDealer = showStatus;
            return state;
        },
        setMobileMode: (state, action: PayloadAction<boolean>) => {
            const mobileMode = action.payload;
            state.isMobileModeOn = mobileMode;
            return state;
        },
        setKeepScreenOn: (state, action: PayloadAction<boolean>) => {
            state.keepScreenOn = action.payload;
            return state;
        },
        setShowDragHandle: (state, action: PayloadAction<boolean>) => {
            state.showDragHandle = action.payload;
            return state;
        },
        setSidebarWidth: (state, action: PayloadAction<number>) => {
            state.sidebarWidth = Math.min(
                Math.max(action.payload, SIDEBAR_MIN_WIDTH),
                SIDEBAR_MAX_WIDTH
            );
            return state;
        },
        toggleCompactView: (state) => {
            state.isCompactViewOn = !state.isCompactViewOn;
            return state;
        },
        toggleShowLeaderboardBadges: (state) => {
            state.showLeaderboardBadges = !state.showLeaderboardBadges;
            return state;
        },
        toggleShowPerGameBadges: (state) => {
            state.showPerGameBadges = !state.showPerGameBadges;
            return state;
        },
    },
});

export const {
    changeSortOption,
    toggleTouchMode,
    setShowLeaderBoard,
    toggleShowLeaderBoard,
    toggleFitEveryone,
    toggleLock,
    setShowNextDealer,
    setMobileMode,
    setKeepScreenOn,
    setShowDragHandle,
    setSidebarWidth,
    toggleCompactView,
    toggleShowLeaderboardBadges,
    toggleShowPerGameBadges,
} = counterSlice.actions;

export default counterSlice.reducer;

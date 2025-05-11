import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { isDesktop } from "react-device-detect";

export enum SortOptions {
    TO_LOW = "TO_LOW",
    TO_HIGH = "TO_HIGH",
}

type Settings = {
    isTouchModeOn: boolean;
    isFitEveryoneOn: boolean;
    isLocked: boolean;
    showLeaderBoard: boolean;
    sortOption: SortOptions;
    showNextDealer: boolean;
};

const initialState: Settings = {
    isTouchModeOn: !isDesktop,
    isFitEveryoneOn: false,
    isLocked: false,
    showLeaderBoard: isDesktop,
    sortOption: SortOptions.TO_LOW,
    showNextDealer: true,
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
        setShowNextDealer: (state, action: PayloadAction<boolean>) => {
            const showStatus = action.payload;
            state.showNextDealer = showStatus;
            return state;
        },
    },
});

export const {
    changeSortOption,
    toggleTouchMode,
    setShowLeaderBoard,
    toggleFitEveryone,
    toggleLock,
    setShowNextDealer,
} = counterSlice.actions;

export default counterSlice.reducer;

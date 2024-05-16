import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { isDesktop } from "react-device-detect";

export enum SortOptions {
    TO_LOW = "TO_LOW",
    TO_HIGH = "TO_HIGH",
}

type Settings = {
    isTouchModeOn: boolean;
    showLeaderBoard: boolean;
    sortOption: SortOptions;
};

const initialState: Settings = {
    isTouchModeOn: !isDesktop,
    showLeaderBoard: isDesktop,
    sortOption: SortOptions.TO_LOW,
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
        setShowLeaderBoard: (state, action: PayloadAction<boolean>) => {
            const showStatus = action.payload;
            state.showLeaderBoard = showStatus;
            return state;
        },
    },
});

export const { changeSortOption, toggleTouchMode, setShowLeaderBoard } =
    counterSlice.actions;

export default counterSlice.reducer;

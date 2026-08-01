import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type PlayersMeta = {
    lastPlayersChangedAt?: number;
};

const initialState: PlayersMeta = {
    lastPlayersChangedAt: undefined,
};

export const playersMetaSlice = createSlice({
    name: "playersMeta",
    initialState,
    reducers: {
        touchPlayersChanged: {
            reducer: (state, action: PayloadAction<number>) => {
                state.lastPlayersChangedAt = action.payload;
            },
            prepare: () => ({ payload: Date.now() }),
        },
    },
});

export const { touchPlayersChanged } = playersMetaSlice.actions;

export default playersMetaSlice.reducer;

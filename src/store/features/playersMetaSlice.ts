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

// Only bump lastPlayersChangedAt while game 1 hasn't started yet. It's used
// as game 1's start time in duration calculations, so once scores exist, a
// later players-list edit (rename, reorder) must not push it past those
// already-recorded entries.
export const touchPlayersChangedIfNotStarted =
    () =>
    (
        dispatch: (action: PayloadAction<number>) => void,
        getState: () => { scores: { scores: unknown[] }[] }
    ) => {
        const hasStarted = getState().scores.some(
            (player) => player.scores.length > 0
        );
        if (!hasStarted) {
            dispatch(touchPlayersChanged());
        }
    };

export default playersMetaSlice.reducer;

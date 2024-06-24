import { swapItems } from "@/lib/utils";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ScoreTracker = {
    id: string;
    name: string;
}[];

const initialState: ScoreTracker = [];

export const counterSlice = createSlice({
    name: "players",
    initialState,
    reducers: {
        addPerson: (
            state,
            action: PayloadAction<{ id: string; name: string }>
        ) => {
            const data = action.payload;
            state.push(data);
        },
        editPerson: (
            state,
            action: PayloadAction<{ id: string; name: string }>
        ) => {
            const { id, name } = action.payload;
            state = state.map((p) => {
                if (p.id == id) p.name = name;
                return p;
            });
        },
        deletePerson: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state = state.filter((p) => p.id !== id);
            return state;
        },
        movePersonLeft: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state.map((p, i) => {
                if (p.id === id) {
                    if (i - 1 < 0) return;
                    return swapItems(state, i, i - 1);
                }
            });
            return state;
        },
        movePersonRight: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === id) {
                    if (i + 1 > state.length - 1) return;
                    return swapItems(state, i, i + 1);
                }
            }
            return state;
        },
    },
});

export const {
    addPerson,
    editPerson,
    deletePerson,
    movePersonLeft,
    movePersonRight,
} = counterSlice.actions;

export default counterSlice.reducer;

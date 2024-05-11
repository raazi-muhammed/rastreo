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
    },
});

export const { addPerson, editPerson, deletePerson } = counterSlice.actions;

export default counterSlice.reducer;

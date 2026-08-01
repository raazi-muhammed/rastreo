import { arrayMove } from "@/lib/utils";
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
        reorderPersons: (
            state,
            action: PayloadAction<{ oldIndex: number; newIndex: number }>
        ) => {
            const { oldIndex, newIndex } = action.payload;
            return arrayMove(state, oldIndex, newIndex);
        },
    },
});

export const { addPerson, editPerson, deletePerson, reorderPersons } =
    counterSlice.actions;

export default counterSlice.reducer;

import { arrayMove } from "@/lib/utils";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

type ScoreTracker = {
    id: string;
    scores: { id: string; val: number; createdAt?: number }[];
}[];

const initialState: ScoreTracker = [];

export const counterSlice = createSlice({
    name: "scores",
    initialState,
    reducers: {
        addScore: (
            state,
            action: PayloadAction<{ userId: string; newScore: number }>
        ) => {
            const { userId, newScore } = action.payload;
            state = state.map((e) => {
                if (e.id === userId)
                    e.scores.push({
                        id: uuidv4(),
                        val: newScore,
                        createdAt: Date.now(),
                    });
                return e;
            });
        },
        initializePerson: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state.push({ id, scores: [] });
        },
        initializePersons: (state, action: PayloadAction<string[]>) => {
            action.payload.forEach((id) => state.push({ id, scores: [] }));
        },
        deletePersonScores: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state = state.filter((s) => s.id !== id);
            return state;
        },
        deleteScore: (
            state,
            action: PayloadAction<{ userId: string; index: number }>
        ) => {
            const { userId, index } = action.payload;
            state = state.filter((s) => {
                if (s.id === userId) s.scores.splice(index, 1);
                return s;
            });
        },
        reorderPersonScores: (
            state,
            action: PayloadAction<{ oldIndex: number; newIndex: number }>
        ) => {
            const { oldIndex, newIndex } = action.payload;
            return arrayMove(state, oldIndex, newIndex);
        },
        editScore: (
            state,
            action: PayloadAction<{
                userId: string;
                index: number;
                newScore: number;
            }>
        ) => {
            const { userId, index, newScore } = action.payload;
            state = state.map((s) => {
                if (s.id === userId) s.scores[index].val = newScore;
                return s;
            });
        },
        deleteAllScores: (state) => {
            state = state.map((s) => ({ id: s.id, scores: [] }));
            return state;
        },
    },
});

export const {
    addScore,
    initializePerson,
    initializePersons,
    deleteScore,
    editScore,
    deletePersonScores,
    deleteAllScores,
    reorderPersonScores,
} = counterSlice.actions;

export default counterSlice.reducer;

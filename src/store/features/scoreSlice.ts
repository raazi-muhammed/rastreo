import { swapItems } from "@/lib/utils";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

type ScoreTracker = {
    id: string;
    scores: { id: string; val: number }[];
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
                    e.scores.push({ id: uuidv4(), val: newScore });
                return e;
            });
        },
        initializePerson: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state.push({ id, scores: [] });
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
        movePersonScoresLeft: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state.map((p, i) => {
                if (p.id === id) {
                    if (i - 1 < 0) return;
                    swapItems(state, i, i - 1);
                }
            });
            return state;
        },
        movePersonScoresRight: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === id) {
                    if (i + 1 > state.length - 1) return;
                    return swapItems(state, i, i + 1);
                }
            }
            return state;
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
    deleteScore,
    editScore,
    deletePersonScores,
    deleteAllScores,
    movePersonScoresLeft,
    movePersonScoresRight,
} = counterSlice.actions;

export default counterSlice.reducer;

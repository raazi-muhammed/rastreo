import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from "./features/scoreSlice";
import playerReducer from "./features/playerSlice";

export const store = configureStore({
    reducer: {
        scores: scoreReducer,
        players: playerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import scoreReducer from "./features/scoreSlice";
import playerReducer from "./features/playerSlice";
import settingsReducer from "./features/settingsSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const reducer = combineReducers({
    scores: scoreReducer,
    players: playerReducer,
    settings: settingsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

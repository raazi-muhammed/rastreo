import { configureStore, combineReducers } from "@reduxjs/toolkit";
import scoreReducer from "./features/scoreSlice";
import playerReducer from "./features/playerSlice";
import settingsReducer from "./features/settingsSlice";
import playersMetaReducer from "./features/playersMetaSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { REDUX_PERSIST_KEY } from "@/lib/storage-keys";

const persistConfig = {
    key: REDUX_PERSIST_KEY,
    version: 1,
    storage,
};

const reducer = combineReducers({
    scores: scoreReducer,
    players: playerReducer,
    settings: settingsReducer,
    playersMeta: playersMetaReducer,
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

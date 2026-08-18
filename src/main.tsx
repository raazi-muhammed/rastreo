import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@/components/theme/theme-provider.tsx";
import { Toaster } from "@/components/ui/toaster";
import { ThemeOptions } from "@/store/features/settingsSlice";
import ErrorBoundary from "@/components/error-boundary.tsx";
import { THEME_STORAGE_KEY } from "@/lib/storage-keys";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ErrorBoundary>
            <Provider store={store}>
                <PersistGate loading={<p>Loading</p>} persistor={persistor}>
                    <ThemeProvider
                        defaultTheme={ThemeOptions.SYSTEM}
                        storageKey={THEME_STORAGE_KEY}>
                        <App />
                        <Toaster />
                    </ThemeProvider>
                </PersistGate>
            </Provider>
        </ErrorBoundary>
    </React.StrictMode>
);

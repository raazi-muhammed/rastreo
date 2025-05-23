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

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={<p>Loading</p>} persistor={persistor}>
                <ThemeProvider
                    defaultTheme={ThemeOptions.SYSTEM}
                    storageKey="rastreo-ui-theme">
                    <App />
                    <Toaster />
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);

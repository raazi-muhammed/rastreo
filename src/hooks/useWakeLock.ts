import { useEffect } from "react";
import NoSleep from "nosleep.js";
import { useAppSelector } from "./redux";

// Falls back to a looping silent video on browsers without the native
// Wake Lock API (e.g. Safari/iOS), and re-acquires the native lock on
// visibility change - both handled internally by the library.
const noSleep = new NoSleep();

export default function useWakeLock() {
    const keepScreenOn = useAppSelector(
        (state) => state.settings.keepScreenOn
    );

    useEffect(() => {
        if (!keepScreenOn) return;

        noSleep.enable().catch(() => {
            // Wake lock can be denied (e.g. requires a user gesture on
            // some browsers, low battery, browser policy) - ignore.
        });

        return () => {
            noSleep.disable();
        };
    }, [keepScreenOn]);
}

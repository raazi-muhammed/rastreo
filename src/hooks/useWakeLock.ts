import { useEffect, useRef } from "react";
import { useAppSelector } from "./redux";

export default function useWakeLock() {
    const keepScreenOn = useAppSelector(
        (state) => state.settings.keepScreenOn
    );
    const wakeLockRef = useRef<WakeLockSentinel | null>(null);

    useEffect(() => {
        if (!keepScreenOn || !("wakeLock" in navigator)) return;

        let isCancelled = false;

        async function requestWakeLock() {
            try {
                const sentinel = await navigator.wakeLock.request("screen");
                if (isCancelled) {
                    sentinel.release();
                    return;
                }
                wakeLockRef.current = sentinel;
            } catch {
                // Wake lock can be denied (e.g. low battery, browser policy) - ignore.
            }
        }

        requestWakeLock();

        function handleVisibilityChange() {
            if (document.visibilityState === "visible") requestWakeLock();
        }

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            isCancelled = true;
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
            wakeLockRef.current?.release();
            wakeLockRef.current = null;
        };
    }, [keepScreenOn]);
}

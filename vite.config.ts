import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugIn = {
    registerType: "prompt",
    includeAssests: ["icons/favicon.ico", "icons/apple-touch-icon.png"],
    manifest: {
        name: "Rastreo",
        short_name: "Rastreo",
        description: "Game tracker",
        icons: [
            {
                src: "/icons/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "favicon",
            },
            {
                src: "/icons/android-chrome-144x144.png",
                sizes: "144x144",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "/icons/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "favicon",
            },
            {
                src: "/icons/apple-touch-icon.png",
                sizes: "180x180",
                type: "image/png",
                purpose: "apple touch icon",
            },
            {
                src: "/icons/maskable_icon.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any maskable",
            },
        ],
        theme_color: "#ECEBFF",
        background_color: "#ECEBFF",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
    },
};

export default defineConfig({
    // @ts-ignore
    plugins: [react(), VitePWA(manifestForPlugIn)],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        host: true,
        port: 8000,
        watch: {
            usePolling: true,
        },
    },
});

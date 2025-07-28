/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom", // Pour tester des composants React
        setupFiles: "./src/setupTests.js",
    },
    server: {
        port: 3000,
        host: true, // pour rendre accessible depuis l’extérieur du conteneur
        proxy: {
            "/api": {
                target: "http://localhost:3010", // ton serveur
                changeOrigin: true,
            },
        },
    },
});

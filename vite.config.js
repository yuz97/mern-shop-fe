import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // target: "http://localhost:3000",
        target: "https://mern-shop-alpha.vercel.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === "production" ? "/Birthday-Hub/" : "/",
  build: {
    assetsDir: "assets",
    cssCodeSplit: false, // Yeh line add karo
  },
  server: {
    host: true,
    port: 5173,
  },
});

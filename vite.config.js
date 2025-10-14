import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // Yeh change karo
  build: {
    outDir: "dist",
  },
});

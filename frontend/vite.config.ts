import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0", // Ensure the server binds to 0.0.0.0
    port: parseInt(process.env.PORT ?? "3000"), // Ensure this port is specified if required
  },
  base: "./", // Ensure relative paths are used in the built files
  build: {
    outDir: "dist", // Default output folder
    assetsDir: "assets", // Subfolder for assets in the dist directory
  },
});

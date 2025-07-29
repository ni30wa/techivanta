import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: "https://techivantaserver.onrender.com",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      outDir: "dist",       
      base: "./",          
      chunkSizeWarningLimit: 1000,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
});

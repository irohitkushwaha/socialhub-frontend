import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Increase the chunk size limit for larger assets
    chunkSizeWarningLimit: 2000,
  },
  optimizeDeps: {
    include: ['react-player'],
  },
  server: {
    // Configure server to properly serve large assets
    fs: {
      strict: false,
    },
  },
});

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/se_project_react/",
  plugins: [react()],
  server: {
    port: 3000,
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: `${root}index.html`,
        about: `${root}about/index.html`,
        writing: `${root}writing/index.html`,
        projects: `${root}projects/index.html`,
      },
    },
  },
});

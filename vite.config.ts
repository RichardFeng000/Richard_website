import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "/",
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        information: "information/index.html",
        resume: "resume/index.html",
        vfx: "vfx/index.html",
      },
    },
  },
});

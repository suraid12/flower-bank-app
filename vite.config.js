import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        news: resolve(__dirname, "history.html"),
        news: resolve(__dirname, "add.html"),
        news: resolve(__dirname, "withdraw.html"),
      },
    },
  },
});
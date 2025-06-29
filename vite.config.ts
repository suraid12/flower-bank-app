import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
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
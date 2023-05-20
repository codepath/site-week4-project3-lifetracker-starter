import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig((envConfig) => ({
  plugins: [
    react({
      include: ["./src/index.jsx"],
    }),
  ],
  server: {
    port: 3000,
    open: true,
    host: true,
  },
}))
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "node:path"

export default defineConfig((envConfig) => ({
  plugins: [react()],
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
      // allows us to convert relative imports to absolute imports
      // ex. import App from "../../../components/App/App" -> import App from "components/App/App"
      components: path.resolve(__dirname, "src/components"),
    },
  },
  server: {
    open: true,
    host: true,
  },
}))

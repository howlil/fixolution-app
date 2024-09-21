import * as path from "path";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __dirname = path.dirname(fileURLToPath(new URL(import.meta.url)));

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "date-fns/_lib/format/longFormatters":
        "date-fns/esm/_lib/format/longFormatters/index.js",
    },
  },
});

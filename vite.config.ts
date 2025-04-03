import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		tailwindcss(),
	],
	resolve: {
		alias: {
			"@root":   fileURLToPath(new URL("./src", import.meta.url)),
			"@app":    fileURLToPath(new URL("./src/app", import.meta.url)),
			"@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
		},
	},
	build: {
		target: "esnext",
	},
	esbuild: {
		jsxFactory: "preact.h",
		jsxInject: "import * as preact from \"preact\""
	},
});
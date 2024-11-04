import { fileURLToPath } from "url";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [],
	test:    {
		environment: "jsdom",
		setupFiles:  ["./src/tests/setup/setup.ts"],
	},
	resolve: {
		alias: {
			"@root":   fileURLToPath(new URL("./src", import.meta.url)),
			"@app":    fileURLToPath(new URL("./src/app", import.meta.url)),
			"@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
		},
	},
});
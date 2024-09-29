import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [],
	resolve: {
		alias: {
			"@root": fileURLToPath(new URL("./src", import.meta.url)),
			"@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
			"@aspects": fileURLToPath(new URL("./src/aspects", import.meta.url)),
		},
	},
});
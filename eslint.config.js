import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import globals from "globals"

export default tseslint.config(
	{
		...eslint.configs.recommended,
		ignores: ["**/*.workerBase.js"],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			}
		},
	},
	...tseslint.configs.recommended.map(config => {
		return {
			...config,
			files:   ["**/*.ts"],
		}
	}),
	{
		plugins: {
			"@stylistic/ts": stylisticTs, 
		},
		ignores: ["dist"],
		files:   ["**/*.ts"],
		rules:   {
			"indent":                            ["error", "tab"],
			"semi":                              ["error", "always"],
			"quotes":                            ["error", "double"],
			"comma-dangle":                      ["error", "always-multiline"],
			"prefer-const":                      "error",
			"object-curly-spacing":              ["error", "always"],
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					"args":                      "all",
					"argsIgnorePattern":         "^_",
					"varsIgnorePattern":         "^_",
					"caughtErrorsIgnorePattern": "^_",
				},
			],
			"@stylistic/ts/key-spacing": [
				"error", {
					"beforeColon": false,
					"afterColon":  true,
					"align":       "value",
				},
			],
		},
	},
);
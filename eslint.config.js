import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		ignores: ["dist"],
		files: ["**/*.ts"],
		rules: {
			"indent": ["error", "tab"],
			"semi": ["error", "always"],
			"quotes": ["error", "double"],
			"comma-dangle": ["error", "always-multiline"],
			"prefer-const": "error",
			"object-property-newline": ["error"],
			"object-curly-newline": ["error", {
				"ObjectExpression": {
					"multiline": true,
					"minProperties": 1,
				},
				"ObjectPattern": { "multiline": true },
				"ImportDeclaration": "never",
				"ExportDeclaration": { "multiline": true }
			}],
			"object-curly-spacing": ["error", "always"],
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					"args": "all",
					"argsIgnorePattern": "^_",
					"varsIgnorePattern": "^_",
					"caughtErrorsIgnorePattern": "^_"
				}
			],
			"key-spacing": [
				"error", {
					"beforeColon": false,
					"afterColon": true,
					"align": "value",
				}
			],
		},
	},
);
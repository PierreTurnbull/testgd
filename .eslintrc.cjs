module.exports = {
	env: {
		node: true
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended"
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 9,
		project: "./tsconfig.json",
		tsconfigRootDir: __dirname
	},
	plugins: [
		"@typescript-eslint"
	],
	rules: {
		"semi": ["error", "never"],
		"quotes": ["error", "double"],
		"indent": ["error", "tab"],
		"no-var": "error",
		"prefer-const": "error",
		"@typescript-eslint/no-unused-vars": "warn"
	},
	ignorePatterns: [
		".eslintrc.cjs",
	]
}
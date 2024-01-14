import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
	plugins: [
		// ... other plugins
		eslintPlugin({
		// ESLint options (optional)
		cache: false, // default
		include: ['src/**/*.js', 'src/**/*.ts', 'src/**/*.jsx', 'src/**/*.tsx', 'src/**/*.vue'],
		}),
	],
});
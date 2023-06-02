import { AliasOptions, defineConfig } from 'vite';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import pluginVue from '@vitejs/plugin-vue';
import path from 'path';
import process from 'process';

const env = dotenv.config();
dotenvExpand.expand(env);

const PROXY_HOST = process.env.VITE_PROXY_HOST ?? 'localhost';
const PROXY_PORT = process.env.VITE_PROXY_PORT ?? 30000;

/**
 * A list of aliases to be applied only in production.
 */
let releaseOnlyAliases: AliasOptions = [];

let devOnlyAliases: AliasOptions = [];

if (process.env.NODE_ENV === 'production') {
	releaseOnlyAliases = [];
} else {
	devOnlyAliases = [];
}

// https://vitejs.dev/config/
export default defineConfig({
	// Proxy w/Foundry. See https://foundryvtt.wiki/en/development/guides/vite
	base: '/systems/infinity',
	define: {
		'process.env': {
			NODE_ENV: process.env.NODE_ENV,
		},
	},
	server: {
		port: 30001,
		open: false,
		proxy: {
			'^/assets': `http://${PROXY_HOST}:${PROXY_PORT}/systems/infinity/`,
			'^(?!/systems/infinity)': `http://${PROXY_HOST}:${PROXY_PORT}/`,
			'/socket.io': {
				target: `ws://${PROXY_HOST}:${PROXY_PORT}`,
				ws: true,
			},
		},
	},
	publicDir: 'public',
	build: {
		outDir: 'dist',
		emptyOutDir: true,
		sourcemap: true,
		// Avoiding minification is important, because we don't want names of globals/etc. to be mangled.
		minify: false,
		lib: {
			name: 'Infinity',
			entry: 'src/Infinity.ts',
			formats: ['es'], // ES Modules
			fileName: 'Infinity',
		},
		rollupOptions: {
			output: {
				assetFileNames: 'Infinity.[ext]',
			},
		},
	},
	plugins: [pluginVue()],
	resolve: {
		alias: [
			{
				find: '@',
				replacement: path.resolve(__dirname, 'src'),
			},
			{
				find: '@scss',
				replacement: path.resolve(__dirname, 'src/scss'),
			},
			...devOnlyAliases,
			...releaseOnlyAliases,
		],
	},
});

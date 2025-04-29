import { copyFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath, URL } from 'node:url';

import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import dts from 'vite-plugin-dts';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type PluginOption } from 'vite';

/* System Config */
const SYSTEM_NAME = 'infinity';

/* Foundry Proxy Target */
const env = dotenv.config();
dotenvExpand.expand(env);

const PROXY_HOST = process.env.VITE_PROXY_HOST ?? 'localhost';
const PROXY_PORT = +process.env.VITE_PROXY_PORT! || 30000;
const VITE_HOST = +process.env.VITE_SERVER_PORT! || 30001;

/* BUILD SETTINGS */
const OUT_DIR = 'dist';
const IS_PRODUCTION = process.env.NODE_ENVIRONMENT === 'production';

/**
 * HMR Helper borrowed from the Pathfinder 2E folks.
 *
 * See licenses/pf2e-apache.md
 */
function HMRHelper(): PluginOption {
	return {
		name: 'hmr-handler',
		apply: 'serve',
		async handleHotUpdate(context) {
			if (context.file.startsWith(OUT_DIR)) return;

			if (context.file.endsWith('en.json')) {
				const basePath = context.file.slice(context.file.indexOf('languages/'));
				console.log(`Updating lang file at ${basePath}`);
				const outFile = `${OUT_DIR}/${basePath}`;
				await mkdir(dirname(outFile), { recursive: true });
				await copyFile(context.file, outFile);
			} else if (context.file.endsWith('.hbs')) {
				const basePath = context.file.slice(context.file.indexOf('templates/'));
				console.log(`Updating template file at ${basePath}`);
				const outFile = `${OUT_DIR}/${basePath}`;
				await mkdir(dirname(outFile), { recursive: true });
				await copyFile(context.file, outFile);
			}
		},
	};
}

/**
 * Vite Config
 */
export default defineConfig({
	base: `/systems/${SYSTEM_NAME}`,
	build: {
		outDir: OUT_DIR,
		emptyOutDir: true,
		sourcemap: true,
		minify: false, // Avoiding minification is important, because we don't want names of globals/etc. to be mangled.
		lib: {
			name: 'Main',
			entry: 'src/main.ts',
			formats: ['es'],
			fileName: 'main',
		},
		rollupOptions: {
			output: {
				manualChunks(_id: string) {
					// Library Chunking TBD.
				},
			},
		},
	},
	plugins: [
		visualizer(),
		HMRHelper(),
		...(IS_PRODUCTION
			? [
					// Production-Only Plugins
					dts(),
				]
			: [
					// Dev-Only Plugins
				]),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'@styles': fileURLToPath(new URL('./styles', import.meta.url)),
		},
	},
	server: {
		port: VITE_HOST ?? 30001,
		open: false,
		proxy: {
			'^/assets': `http://${PROXY_HOST}:${PROXY_PORT}/systems/${SYSTEM_NAME}/`,
			[`^(?!/systems/${SYSTEM_NAME})`]: `http://${PROXY_HOST}:${PROXY_PORT}/`,
			'/socket.io': {
				target: `ws://${PROXY_HOST}:${PROXY_PORT}`,
				ws: true,
			},
		},
	},
});

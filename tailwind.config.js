/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{js,ts,vue}',
	],
	corePlugins: {
		preflight: false,
	},
	important: true,
	theme: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/container-queries'),
		require('@tailwindcss/custom-forms'),
	],
}

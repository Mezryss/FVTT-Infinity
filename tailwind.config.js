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
		extend: {
			backgroundImage: {
				'light-hexes': "url('assets/images/SheetBG.svg')",
				'dark-hexes': "url('assets/images/DarkBG.svg')",
			},
			backgroundSize: {
				'4k': '3840px 2160px',
				'4kp': '2160px 3840px',
			},
			borderWidth: {
				'1': '1px',
			},
			fontFamily: {
				'orbitron': ['Orbitron', 'sans-serif'],
				'infinity-icon': ['Infinity-Icons', 'Roboto Flex', 'sans-serif'],
				'roboto-flex': ['Roboto Flex', 'sans-serif']
			},
		},
	},
	plugins: [
		require('@tailwindcss/container-queries'),
		require('@tailwindcss/custom-forms'),
	],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['templates/**/*.hbs', 'module/**/*.{js,mjs}'],
	theme: {
		extend: {
			backgroundImage: {
				'light-hexes': 'url("images/SheetBG.svg")',
				'dark-hexes': 'url("images/DarkBG.svg")',
			},
			backgroundSize: {
				'4k': '3840px 2160px',
				'4kp': '2160px 3840px',
			},
			borderWidth: {
				1: '1px',
			},
			fontFamily: {
				orbitron: ['Orbitron', 'sans-serif'],
				'infinity-icon': ['Infinity-Icons', 'sans-serif'],
				'roboto-flex': '"Roboto Flex", sans-serif',
			},
			minHeight: {
				10: '10rem',
				15: '15rem',
				20: '20rem',
			},
			gridRow: {
				'span-7': 'span 7 / span 7',
			},
		},
		fontFamily: {
			body: ['Roboto Flex', 'sans-serif'],
			sans: ['Roboto Flex', 'sans-serif'],
		},
	},
	plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/custom-forms'), require('@tailwindcss/typography')],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
		fontFamily: {
			montserrat: ['Montserrat', 'sans-serif'],
			robotomono: ['Roboto Mono', 'monospace'],
			ssp: ['Source Sans Pro', 'sans-serif'],
			ssc: ['Spectral SC', 'serif']
		}
	},
	plugins: []
};

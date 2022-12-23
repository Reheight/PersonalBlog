/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
		fontFamily: {
			montserrat: ['Montserrat', 'sans-serif'],
			robotomono: ['Roboto Mono', 'monospace'],
			ssp: ['Source Sans Pro', 'sans-serif'],
			ssc: ['Spectral SC', 'serif'],
			poppins: ['Poppins', 'sans-serif'],
			tw: ['Titillium Web', 'sans-serif'],
			ad: ['Anek Devanogari', 'sans-serif']
		}
	},
	plugins: []
};

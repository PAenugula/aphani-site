import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				digi: ['"Press Start 2P"', 'system-ui'],
				typewrite: ['"Courier Prime"', 'monospace'],
			}
		}
	},

	plugins: [typography, forms, containerQueries]
};

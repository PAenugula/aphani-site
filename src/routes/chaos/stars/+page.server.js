import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
	const apiKey = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
	const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

	const response = await fetch(url);

	if (!response.ok) {
		error(response.status, 'Could not load NASA Picture of the Day');
	}

	/** @type {{ title: string; explanation: string; url: string; hdurl?: string; media_type: string; date: string; copyright?: string }} */
	const apod = await response.json();

	return { apod };
}

import { error } from '@sveltejs/kit';

/**
 * @typedef {Object} Apod
 * @property {string} title
 * @property {string} explanation
 * @property {string} url
 * @property {string} [hdurl]
 * @property {'image' | 'video' | string} media_type
 * @property {string} date
 * @property {string} [copyright]
 * @property {string} [link]
 */

/**
 * @param {string} value
 */
function decodeEntities(value) {
	return value
		.replace(/&#8211;/g, '–')
		.replace(/&#8212;/g, '—')
		.replace(/&#8220;/g, '“')
		.replace(/&#8221;/g, '”')
		.replace(/&#8217;/g, '’')
		.replace(/&#8230;/g, '…')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&nbsp;/g, ' ')
		.replace(/&hellip;/g, '…');
}

/**
 * @param {string} html
 */
function stripHtml(html) {
	return decodeEntities(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

/**
 * @param {typeof fetch} fetchFn
 * @returns {Promise<Apod | null>}
 */
async function loadFromNasaApi(fetchFn) {
	const apiKey = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 4000);

	try {
		const response = await fetchFn(
			`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`,
			{ signal: controller.signal }
		);

		if (!response.ok) return null;

		/** @type {Apod} */
		const apod = await response.json();
		return {
			...apod,
			title: decodeEntities(apod.title || 'Astronomy Picture of the Day'),
			explanation: decodeEntities(apod.explanation || '')
		};
	} catch {
		return null;
	} finally {
		clearTimeout(timeout);
	}
}

/**
 * Fallback via NASA Science WordPress API (official APOD host).
 * @param {typeof fetch} fetchFn
 * @returns {Promise<Apod | null>}
 */
async function loadFromNasaScience(fetchFn) {
	const response = await fetchFn(
		'https://science.nasa.gov/wp-json/wp/v2/image-article?categories=22766&per_page=1&_embed=1'
	);

	if (!response.ok) return null;

	/** @type {any[]} */
	const posts = await response.json();
	const post = posts?.[0];
	if (!post) return null;

	const media = post._embedded?.['wp:featuredmedia']?.[0];
	const caption = media?.caption?.rendered ? stripHtml(media.caption.rendered) : '';
	const content = post.content?.rendered ? stripHtml(post.content.rendered) : '';
	const explanation =
		caption ||
		content.replace(/^.*?Explanation:\s*/i, '').slice(0, 1200) ||
		'NASA Astronomy Picture of the Day';

	const title = decodeEntities(post.title?.rendered || 'Astronomy Picture of the Day').replace(
		/^APOD:\s*/i,
		''
	);

	return {
		title,
		explanation,
		url: media?.source_url || '',
		media_type: media?.source_url ? 'image' : 'other',
		date: (post.date || '').slice(0, 10),
		link: post.link
	};
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
	const apod = (await loadFromNasaApi(fetch)) || (await loadFromNasaScience(fetch));

	if (!apod?.url && apod?.media_type !== 'video') {
		error(502, 'Could not load NASA Picture of the Day');
	}

	return { apod };
}

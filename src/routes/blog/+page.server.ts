import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    // Import all .svx files from src/posts
    const paths = import.meta.glob('/src/posts/*.svx', { eager: true });

    const posts = Object.entries(paths).map(([path, file]) => {
        const slug = path.split('/').pop()?.replace('.svx', '');
        return {
            slug,
            ...(file as any).metadata
        };
    }).sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return {
        posts
    };
};

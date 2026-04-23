import { getCourse } from '$lib/data/courses.js';
import { error } from '@sveltejs/kit';

export function load({ params }) {
    const course = getCourse(params.slug);
    if (!course) error(404, 'Kurz nenalezen');
    return { course };
}

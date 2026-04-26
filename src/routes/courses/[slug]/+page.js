import { getCourse } from '$lib/data/courses.js';
import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';

export function load({ params }) {
    let course = getCourse(params.slug);

    // Na klientovi zkus i admin-přidané kurzy z localStorage
    if (!course && browser) {
        try {
            const stored = JSON.parse(localStorage.getItem('admin_courses') ?? 'null');
            course = stored?.find(c => c.slug === params.slug) ?? null;
        } catch { /* ignore */ }
    }

    if (!course) error(404, 'Kurz nenalezen');
    return { course };
}

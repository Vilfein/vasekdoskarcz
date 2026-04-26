import { browser } from '$app/environment';
import { courses as staticCourses } from '$lib/data/courses.js';

const KEY = 'admin_courses';

function load() {
    if (!browser) return null;
    try { return JSON.parse(localStorage.getItem(KEY) ?? 'null'); } catch { return null; }
}

let _list = $state(load() ?? structuredClone(staticCourses));

function persist() {
    if (browser) localStorage.setItem(KEY, JSON.stringify(_list));
}

export const coursesStore = {
    get list() { return _list; },
    get(slug) { return _list.find(c => c.slug === slug) ?? null; },
    add(course) { _list = [..._list, course]; persist(); },
    update(slug, changes) { _list = _list.map(c => c.slug === slug ? { ...c, ...changes } : c); persist(); },
    remove(slug) { _list = _list.filter(c => c.slug !== slug); persist(); }
};

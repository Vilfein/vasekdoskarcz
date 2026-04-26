import { browser } from '$app/environment';

const KEY = 'user_enrollments';

function load() {
    if (!browser) return [];
    try { return JSON.parse(localStorage.getItem(KEY) ?? '[]'); } catch { return []; }
}

let _ids = $state(load());

function persist() {
    if (browser) localStorage.setItem(KEY, JSON.stringify(_ids));
}

export const enrollments = {
    get ids() { return _ids; },
    isEnrolled(id) { return _ids.includes(id); },
    enroll(id) {
        if (!_ids.includes(id)) { _ids = [..._ids, id]; persist(); }
    },
    cancel(id) {
        _ids = _ids.filter(i => i !== id); persist();
    }
};

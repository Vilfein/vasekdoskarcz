import { browser } from '$app/environment';
import { events as staticEvents } from '$lib/data/events.js';

const KEY = 'admin_events';

const staticWithIds = staticEvents.map((e, i) => ({ ...e, id: i + 1 }));

function load() {
    if (!browser) return null;
    try { return JSON.parse(localStorage.getItem(KEY) ?? 'null'); } catch { return null; }
}

const initial = load() ?? structuredClone(staticWithIds);
let _list = $state(initial);
let _nextId = $state(initial.reduce((m, e) => Math.max(m, e.id ?? 0), 0) + 1);

function persist() {
    if (browser) localStorage.setItem(KEY, JSON.stringify(_list));
}

export const eventsStore = {
    get list() { return _list; },
    add(event) { _list = [..._list, { ...event, id: _nextId++ }]; persist(); },
    update(id, changes) { _list = _list.map(e => e.id === id ? { ...e, ...changes } : e); persist(); },
    remove(id) { _list = _list.filter(e => e.id !== id); persist(); }
};

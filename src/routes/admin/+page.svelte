<script>
    import { goto } from '$app/navigation';
    import { auth } from '$lib/stores/auth.svelte.js';
    import { coursesStore } from '$lib/stores/courses.svelte.js';
    import { eventsStore } from '$lib/stores/events.svelte.js';

    $effect(() => {
        if (!auth.user || auth.user.role !== 'admin') goto('/');
    });

    let tab = $state('courses');

    // ─── COURSES ──────────────────────────────────────────────
    let courseFormOpen = $state(false);
    let editingSlug    = $state(null);

    const freshCF = () => ({
        icon: '📚', title: '', slug: '',
        description: '', longDescription: '',
        level: 'Začátečník', duration: '', price: '',
        topics: '', prerequisites: '',
        projectTitle: '', projectDescription: ''
    });

    let cf = $state(freshCF());

    function openAddCourse() {
        editingSlug = null;
        cf = freshCF();
        courseFormOpen = true;
    }

    function openEditCourse(course) {
        editingSlug = course.slug;
        cf = {
            icon: course.icon,
            title: course.title,
            slug: course.slug,
            description: course.description,
            longDescription: course.longDescription ?? '',
            level: course.level,
            duration: course.duration,
            price: course.price,
            topics: (course.topics ?? []).join('\n'),
            prerequisites: (course.prerequisites ?? []).join('\n'),
            projectTitle: course.project?.title ?? '',
            projectDescription: course.project?.description ?? ''
        };
        courseFormOpen = true;
    }

    function closeCourseForm() { courseFormOpen = false; editingSlug = null; }

    function autoSlug() {
        if (editingSlug) return;
        cf.slug = cf.title
            .toLowerCase()
            .normalize('NFD').replace(/[̀-ͯ]/g, '')
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }

    function saveCourse() {
        if (!cf.title.trim() || !cf.slug.trim()) return;
        const course = {
            slug: cf.slug.trim(),
            icon: cf.icon.trim() || '📚',
            title: cf.title.trim(),
            description: cf.description.trim(),
            longDescription: cf.longDescription.trim(),
            level: cf.level,
            duration: cf.duration.trim(),
            price: cf.price.trim(),
            topics: cf.topics.split('\n').map(t => t.trim()).filter(Boolean),
            prerequisites: cf.prerequisites.split('\n').map(t => t.trim()).filter(Boolean),
            project: { title: cf.projectTitle.trim(), description: cf.projectDescription.trim() },
            curriculum: editingSlug ? (coursesStore.get(editingSlug)?.curriculum ?? []) : []
        };

        if (editingSlug) {
            coursesStore.update(editingSlug, course);
        } else {
            if (coursesStore.get(course.slug)) {
                alert(`Kurz se slugem "${course.slug}" už existuje.`);
                return;
            }
            coursesStore.add(course);
        }
        closeCourseForm();
    }

    function deleteCourse(slug) {
        if (!confirm('Opravdu smazat tento kurz? Smažou se i všechny jeho termíny.')) return;
        coursesStore.remove(slug);
        eventsStore.list.filter(e => e.slug === slug).forEach(e => eventsStore.remove(e.id));
    }

    // ─── EVENTS ───────────────────────────────────────────────
    let eventFormOpen  = $state(false);
    let editingEventId = $state(null);

    const freshEF = () => ({ date: '', slug: '', time: '10:00–12:00', capacity: 15, enrolled: 0 });
    let ef = $state(freshEF());

    function openAddEvent() { editingEventId = null; ef = freshEF(); eventFormOpen = true; }

    function openEditEvent(ev) {
        editingEventId = ev.id;
        ef = { date: ev.date, slug: ev.slug, time: ev.time, capacity: ev.capacity, enrolled: ev.enrolled };
        eventFormOpen = true;
    }

    function closeEventForm() { eventFormOpen = false; editingEventId = null; }

    function saveEvent() {
        if (!ef.date || !ef.slug) return;
        const course = coursesStore.get(ef.slug);
        if (!course) return;
        const evt = {
            date: ef.date, course: course.title, icon: course.icon, slug: ef.slug,
            time: ef.time, capacity: Number(ef.capacity), enrolled: Number(ef.enrolled)
        };
        if (editingEventId !== null) eventsStore.update(editingEventId, evt);
        else eventsStore.add(evt);
        closeEventForm();
    }

    function deleteEvent(id) {
        if (!confirm('Smazat tento termín?')) return;
        eventsStore.remove(id);
    }

    let sortedEvents = $derived([...eventsStore.list].sort((a, b) => a.date.localeCompare(b.date)));

    function fmtDate(s) {
        return new Date(s).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'short', year: 'numeric' });
    }
</script>

<svelte:head><title>Admin panel</title></svelte:head>

<div class="admin">

    <header class="adm-header">
        <div class="adm-header-inner">
            <span class="adm-logo">⚙ Admin panel</span>
            <a href="/" class="adm-back">← zpět na web</a>
        </div>
    </header>

    <div class="adm-body">

        <div class="tabs">
            <button class="tab" class:active={tab === 'courses'} onclick={() => tab = 'courses'}>
                Kurzy <span class="badge-num">{coursesStore.list.length}</span>
            </button>
            <button class="tab" class:active={tab === 'events'} onclick={() => tab = 'events'}>
                Termíny <span class="badge-num">{eventsStore.list.length}</span>
            </button>
        </div>

        <!-- ═══════════════ KURZY ═══════════════ -->
        {#if tab === 'courses'}
        <section class="panel">
            <div class="panel-bar">
                <h2>Správa kurzů</h2>
                {#if !courseFormOpen}
                    <button class="btn-primary" onclick={openAddCourse}>+ Přidat kurz</button>
                {/if}
            </div>

            {#if courseFormOpen}
            <div class="form-card">
                <h3 class="form-title">{editingSlug ? 'Upravit kurz' : 'Nový kurz'}</h3>
                <div class="fg">
                    <label class="f f-icon">
                        <span>Ikona</span>
                        <input type="text" bind:value={cf.icon} maxlength="4" />
                    </label>
                    <label class="f f-title">
                        <span>Název *</span>
                        <input type="text" bind:value={cf.title} oninput={autoSlug} placeholder="C# Základy" />
                    </label>
                    <label class="f f-slug">
                        <span>Slug (URL) *</span>
                        <input type="text" bind:value={cf.slug} readonly={!!editingSlug}
                               class:readonly={!!editingSlug} placeholder="csharp-zaklady" />
                    </label>
                    <label class="f f-level">
                        <span>Úroveň</span>
                        <select bind:value={cf.level}>
                            <option>Začátečník</option>
                            <option>Mírně pokročilý</option>
                            <option>Pokročilý</option>
                        </select>
                    </label>
                    <label class="f f-dur">
                        <span>Délka</span>
                        <input type="text" bind:value={cf.duration} placeholder="20 hodin" />
                    </label>
                    <label class="f f-price">
                        <span>Cena</span>
                        <input type="text" bind:value={cf.price} placeholder="2 900 Kč" />
                    </label>
                    <label class="f f-desc">
                        <span>Krátký popis</span>
                        <input type="text" bind:value={cf.description} placeholder="Stručný popis kurzu…" />
                    </label>
                    <label class="f f-longdesc">
                        <span>Dlouhý popis</span>
                        <textarea bind:value={cf.longDescription} rows="3" placeholder="Detailní popis kurzu…"></textarea>
                    </label>
                    <label class="f f-topics">
                        <span>Témata <small>(každé na nový řádek)</small></span>
                        <textarea bind:value={cf.topics} rows="5" placeholder="Proměnné & datové typy&#10;Podmínky & smyčky&#10;…"></textarea>
                    </label>
                    <label class="f f-prereqs">
                        <span>Předpoklady <small>(každý na nový řádek)</small></span>
                        <textarea bind:value={cf.prerequisites} rows="3" placeholder="Žádné předchozí znalosti nejsou potřeba"></textarea>
                    </label>
                    <label class="f f-ptitle">
                        <span>Závěrečný projekt – název</span>
                        <input type="text" bind:value={cf.projectTitle} placeholder="Závěrečný projekt: správce úkolů" />
                    </label>
                    <label class="f f-pdesc">
                        <span>Závěrečný projekt – popis</span>
                        <textarea bind:value={cf.projectDescription} rows="2" placeholder="Popis závěrečného projektu…"></textarea>
                    </label>
                </div>
                <div class="form-actions">
                    <button class="btn-ghost" onclick={closeCourseForm}>Zrušit</button>
                    <button class="btn-primary" onclick={saveCourse}>
                        {editingSlug ? 'Uložit změny' : 'Přidat kurz'}
                    </button>
                </div>
            </div>
            {/if}

            <div class="item-list">
                {#each coursesStore.list as c (c.slug)}
                <div class="item-row">
                    <span class="item-ico">{c.icon}</span>
                    <div class="item-info">
                        <strong>{c.title}</strong>
                        <span class="item-meta">{c.level} · {c.duration} · {c.price}</span>
                    </div>
                    <div class="item-acts">
                        <button class="btn-edit" onclick={() => openEditCourse(c)}>Upravit</button>
                        <button class="btn-del"  onclick={() => deleteCourse(c.slug)}>Smazat</button>
                    </div>
                </div>
                {/each}
            </div>
        </section>
        {/if}

        <!-- ═══════════════ TERMÍNY ═══════════════ -->
        {#if tab === 'events'}
        <section class="panel">
            <div class="panel-bar">
                <h2>Správa termínů</h2>
                {#if !eventFormOpen}
                    <button class="btn-primary" onclick={openAddEvent}>+ Přidat termín</button>
                {/if}
            </div>

            {#if eventFormOpen}
            <div class="form-card">
                <h3 class="form-title">{editingEventId !== null ? 'Upravit termín' : 'Nový termín'}</h3>
                <div class="fg fg-event">
                    <label class="f">
                        <span>Datum *</span>
                        <input type="date" bind:value={ef.date} />
                    </label>
                    <label class="f">
                        <span>Kurz *</span>
                        <select bind:value={ef.slug}>
                            <option value="">— vyber kurz —</option>
                            {#each coursesStore.list as c}
                                <option value={c.slug}>{c.icon} {c.title}</option>
                            {/each}
                        </select>
                    </label>
                    <label class="f">
                        <span>Čas</span>
                        <input type="text" bind:value={ef.time} placeholder="10:00–12:00" />
                    </label>
                    <label class="f">
                        <span>Kapacita</span>
                        <input type="number" bind:value={ef.capacity} min="1" max="99" />
                    </label>
                    <label class="f">
                        <span>Přihlášeno</span>
                        <input type="number" bind:value={ef.enrolled} min="0" />
                    </label>
                </div>
                <div class="form-actions">
                    <button class="btn-ghost" onclick={closeEventForm}>Zrušit</button>
                    <button class="btn-primary" onclick={saveEvent}>
                        {editingEventId !== null ? 'Uložit změny' : 'Přidat termín'}
                    </button>
                </div>
            </div>
            {/if}

            <div class="tbl-wrap">
                <table class="tbl">
                    <thead>
                        <tr>
                            <th>Datum</th>
                            <th>Kurz</th>
                            <th>Čas</th>
                            <th>Obsazenost</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each sortedEvents as ev (ev.id)}
                        <tr>
                            <td class="td-date">{fmtDate(ev.date)}</td>
                            <td>{ev.icon} {ev.course}</td>
                            <td>{ev.time}</td>
                            <td>
                                <span class="occ"
                                    class:occ-full={ev.enrolled >= ev.capacity}
                                    class:occ-warn={ev.enrolled >= ev.capacity * 0.8 && ev.enrolled < ev.capacity}>
                                    {ev.enrolled}/{ev.capacity}
                                </span>
                            </td>
                            <td class="td-acts">
                                <button class="btn-edit" onclick={() => openEditEvent(ev)}>Upravit</button>
                                <button class="btn-del"  onclick={() => deleteEvent(ev.id)}>Smazat</button>
                            </td>
                        </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </section>
        {/if}

    </div>
</div>

<style>
    :global(body) { background: #f3eeff; }

    .admin { min-height: 100vh; font-family: 'Segoe UI', system-ui, sans-serif; }

    /* Header */
    .adm-header {
        background: linear-gradient(135deg, #9b2ec8 0%, #76179c 100%);
        padding: 0 1.5rem;
        height: 56px;
        display: flex;
        align-items: center;
    }
    .adm-header-inner {
        max-width: 1100px;
        width: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .adm-logo { color: #fff; font-weight: 700; font-size: 1rem; letter-spacing: 0.04em; }
    .adm-back  { color: rgba(255,255,255,.8); text-decoration: none; font-size: .85rem; transition: color .2s; }
    .adm-back:hover { color: #fff; }

    /* Body */
    .adm-body { max-width: 1100px; margin: 0 auto; padding: 2rem 1.5rem 4rem; }

    /* Tabs */
    .tabs { display: flex; gap: .5rem; margin-bottom: 1.75rem; }
    .tab {
        padding: .5rem 1.25rem;
        border-radius: 100px;
        border: 1.5px solid #d8c8f0;
        background: #fff;
        font-size: .88rem;
        font-weight: 600;
        color: #76179c;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: .4rem;
        transition: background .18s, color .18s, border-color .18s;
    }
    .tab.active { background: #9b2ec8; color: #fff; border-color: #9b2ec8; }
    .badge-num {
        background: rgba(255,255,255,.25);
        border-radius: 100px;
        padding: .05rem .45rem;
        font-size: .75rem;
    }
    .tab:not(.active) .badge-num { background: #ede5f8; color: #76179c; }

    /* Panel */
    .panel { background: #fff; border-radius: 14px; box-shadow: 0 2px 16px rgba(120,50,180,.08); overflow: hidden; }
    .panel-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.25rem 1.5rem;
        border-bottom: 1px solid #f0eaf8;
    }
    .panel-bar h2 { margin: 0; font-size: 1.1rem; font-weight: 700; color: #2d0042; }

    /* Buttons */
    .btn-primary {
        padding: .45rem 1.1rem;
        background: linear-gradient(135deg, #9b2ec8 0%, #76179c 100%);
        color: #fff;
        border: none;
        border-radius: 8px;
        font-size: .88rem;
        font-weight: 600;
        cursor: pointer;
        transition: opacity .2s, box-shadow .2s;
        box-shadow: 0 2px 8px rgba(155,46,200,.3);
    }
    .btn-primary:hover { opacity: .88; box-shadow: 0 4px 14px rgba(155,46,200,.4); }

    .btn-ghost {
        padding: .45rem 1.1rem;
        background: none;
        border: 1.5px solid #d0c0e8;
        border-radius: 8px;
        font-size: .88rem;
        font-weight: 600;
        color: #666;
        cursor: pointer;
        transition: border-color .2s, color .2s;
    }
    .btn-ghost:hover { border-color: #9b2ec8; color: #9b2ec8; }

    .btn-edit {
        padding: .3rem .75rem;
        font-size: .8rem;
        font-weight: 600;
        background: #f0eaff;
        color: #76179c;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background .15s;
    }
    .btn-edit:hover { background: #e0d0ff; }

    .btn-del {
        padding: .3rem .75rem;
        font-size: .8rem;
        font-weight: 600;
        background: #fff0f0;
        color: #c92a2a;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background .15s;
    }
    .btn-del:hover { background: #ffc9c9; }

    /* Form card */
    .form-card {
        margin: 0;
        padding: 1.5rem;
        border-bottom: 1px solid #f0eaf8;
        background: #faf7ff;
    }
    .form-title { margin: 0 0 1.25rem; font-size: 1rem; font-weight: 700; color: #2d0042; }

    /* Form grid */
    .fg { display: grid; gap: .9rem; grid-template-columns: repeat(12, 1fr); }

    .f { display: flex; flex-direction: column; gap: .35rem; }
    .f span { font-size: .8rem; font-weight: 600; color: #555; }
    .f small { font-weight: 400; color: #999; }

    .f input, .f select, .f textarea {
        padding: .55rem .8rem;
        border: 1.5px solid #ddd;
        border-radius: 8px;
        font-family: inherit;
        font-size: .88rem;
        color: #222;
        background: #fff;
        outline: none;
        transition: border-color .2s, box-shadow .2s;
    }
    .f input:focus, .f select:focus, .f textarea:focus {
        border-color: #9b2ec8;
        box-shadow: 0 0 0 3px rgba(155,46,200,.1);
    }
    .f .readonly { background: #f5f0fb; color: #888; cursor: not-allowed; }
    .f textarea { resize: vertical; }

    /* Grid column spans */
    .f-icon    { grid-column: span 1; }
    .f-title   { grid-column: span 5; }
    .f-slug    { grid-column: span 4; }
    .f-level   { grid-column: span 2; }
    .f-dur     { grid-column: span 2; }
    .f-price   { grid-column: span 2; }
    .f-desc    { grid-column: span 8; }
    .f-longdesc{ grid-column: span 12; }
    .f-topics  { grid-column: span 6; }
    .f-prereqs { grid-column: span 6; }
    .f-ptitle  { grid-column: span 6; }
    .f-pdesc   { grid-column: span 6; }

    .fg-event { grid-template-columns: repeat(5, 1fr); }
    .fg-event .f { grid-column: span 1; }

    .form-actions { display: flex; justify-content: flex-end; gap: .75rem; margin-top: 1.25rem; }

    /* Item list (courses) */
    .item-list { padding: .5rem 0; }
    .item-row {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: .85rem 1.5rem;
        border-bottom: 1px solid #f5f0fb;
        transition: background .12s;
    }
    .item-row:last-child { border-bottom: none; }
    .item-row:hover { background: #faf7ff; }

    .item-ico  { font-size: 1.5rem; flex-shrink: 0; }
    .item-info { flex: 1; min-width: 0; }
    .item-info strong { display: block; font-size: .95rem; color: #1a0030; }
    .item-meta { font-size: .78rem; color: #888; margin-top: .1rem; }
    .item-acts { display: flex; gap: .4rem; flex-shrink: 0; }

    /* Events table */
    .tbl-wrap { overflow-x: auto; }
    .tbl { width: 100%; border-collapse: collapse; font-size: .88rem; }
    .tbl thead th {
        text-align: left;
        padding: .75rem 1rem;
        font-size: .78rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: .04em;
        color: #888;
        border-bottom: 2px solid #f0eaf8;
        background: #faf7ff;
    }
    .tbl tbody tr { border-bottom: 1px solid #f5f0fb; transition: background .12s; }
    .tbl tbody tr:last-child { border-bottom: none; }
    .tbl tbody tr:hover { background: #faf7ff; }
    .tbl td { padding: .75rem 1rem; color: #333; }
    .td-date { color: #555; white-space: nowrap; }
    .td-acts { display: flex; gap: .4rem; justify-content: flex-end; }

    .occ { font-weight: 700; font-size: .82rem; padding: .15rem .5rem; border-radius: 100px; background: #e8f5e9; color: #2e7d32; }
    .occ-warn { background: #fff8e1; color: #f57f17; }
    .occ-full { background: #fce4ec; color: #c62828; }

    @media (max-width: 768px) {
        .fg { grid-template-columns: 1fr 1fr; }
        .f-icon, .f-title, .f-slug, .f-level, .f-dur, .f-price,
        .f-desc, .f-longdesc, .f-topics, .f-prereqs, .f-ptitle, .f-pdesc
        { grid-column: span 2; }
        .f-icon { grid-column: span 1; }
        .f-level, .f-dur, .f-price { grid-column: span 1; }

        .fg-event { grid-template-columns: 1fr 1fr; }
        .fg-event .f { grid-column: span 1; }

        .item-meta { display: none; }
    }
</style>

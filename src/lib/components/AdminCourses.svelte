<script>
    import { coursesStore } from '$lib/stores/courses.svelte.js';
    import { eventsStore } from '$lib/stores/events.svelte.js';

    let formOpen    = $state(false);
    let editingSlug = $state(null);

    const freshCF = () => ({
        icon: '📚', title: '', slug: '',
        description: '', longDescription: '',
        level: 'Začátečník', duration: '', price: '',
        topics: '', prerequisites: '',
        projectTitle: '', projectDescription: ''
    });
    let cf = $state(freshCF());

    function openAdd() { editingSlug = null; cf = freshCF(); formOpen = true; }

    function openEdit(course) {
        editingSlug = course.slug;
        cf = {
            icon: course.icon, title: course.title, slug: course.slug,
            description: course.description, longDescription: course.longDescription ?? '',
            level: course.level, duration: course.duration, price: course.price,
            topics: (course.topics ?? []).join('\n'),
            prerequisites: (course.prerequisites ?? []).join('\n'),
            projectTitle: course.project?.title ?? '',
            projectDescription: course.project?.description ?? ''
        };
        formOpen = true;
    }

    function closeForm() { formOpen = false; editingSlug = null; }

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

    function save() {
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
            if (coursesStore.get(course.slug)) { alert(`Slug "${course.slug}" již existuje.`); return; }
            coursesStore.add(course);
        }
        closeForm();
    }

    function remove(slug) {
        if (!confirm('Opravdu smazat tento kurz? Smažou se i všechny jeho termíny.')) return;
        coursesStore.remove(slug);
        eventsStore.list.filter(e => e.slug === slug).forEach(e => eventsStore.remove(e.id));
    }
</script>

<section class="panel">
    <div class="panel-bar">
        <h2>Správa kurzů</h2>
        {#if !formOpen}
            <button class="btn-primary" onclick={openAdd}>+ Přidat kurz</button>
        {/if}
    </div>

    {#if formOpen}
    <div class="form-card">
        <h3 class="form-title">{editingSlug ? 'Upravit kurz' : 'Nový kurz'}</h3>
        <div class="fg">
            <label class="f f-icon"><span>Ikona</span>
                <input type="text" bind:value={cf.icon} maxlength="4" />
            </label>
            <label class="f f-title"><span>Název *</span>
                <input type="text" bind:value={cf.title} oninput={autoSlug} placeholder="C# Základy" />
            </label>
            <label class="f f-slug"><span>Slug (URL) *</span>
                <input type="text" bind:value={cf.slug} readonly={!!editingSlug} class:readonly={!!editingSlug} placeholder="csharp-zaklady" />
            </label>
            <label class="f f-level"><span>Úroveň</span>
                <select bind:value={cf.level}>
                    <option>Začátečník</option>
                    <option>Mírně pokročilý</option>
                    <option>Pokročilý</option>
                </select>
            </label>
            <label class="f f-dur"><span>Délka</span>
                <input type="text" bind:value={cf.duration} placeholder="20 hodin" />
            </label>
            <label class="f f-price"><span>Cena</span>
                <input type="text" bind:value={cf.price} placeholder="2 900 Kč" />
            </label>
            <label class="f f-desc"><span>Krátký popis</span>
                <input type="text" bind:value={cf.description} placeholder="Stručný popis kurzu…" />
            </label>
            <label class="f f-longdesc"><span>Dlouhý popis</span>
                <textarea bind:value={cf.longDescription} rows="3" placeholder="Detailní popis kurzu…"></textarea>
            </label>
            <label class="f f-topics"><span>Témata <small>(každé na nový řádek)</small></span>
                <textarea bind:value={cf.topics} rows="5" placeholder="Proměnné & datové typy&#10;Podmínky & smyčky&#10;…"></textarea>
            </label>
            <label class="f f-prereqs"><span>Předpoklady <small>(každý na nový řádek)</small></span>
                <textarea bind:value={cf.prerequisites} rows="3" placeholder="Žádné předchozí znalosti nejsou potřeba"></textarea>
            </label>
            <label class="f f-ptitle"><span>Závěrečný projekt – název</span>
                <input type="text" bind:value={cf.projectTitle} placeholder="Závěrečný projekt: správce úkolů" />
            </label>
            <label class="f f-pdesc"><span>Závěrečný projekt – popis</span>
                <textarea bind:value={cf.projectDescription} rows="2" placeholder="Popis závěrečného projektu…"></textarea>
            </label>
        </div>
        <div class="form-actions">
            <button class="btn-ghost" onclick={closeForm}>Zrušit</button>
            <button class="btn-primary" onclick={save}>{editingSlug ? 'Uložit změny' : 'Přidat kurz'}</button>
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
                <button class="btn-edit" onclick={() => openEdit(c)}>Upravit</button>
                <button class="btn-del"  onclick={() => remove(c.slug)}>Smazat</button>
            </div>
        </div>
        {/each}
    </div>
</section>

<style>
    .panel { background: #fff; border-radius: 14px; box-shadow: 0 2px 16px rgba(120,50,180,.08); overflow: hidden; }
    .panel-bar { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 1.5rem; border-bottom: 1px solid #f0eaf8; }
    .panel-bar h2 { margin: 0; font-size: 1.1rem; font-weight: 700; color: #2d0042; }

    .btn-primary { padding: .45rem 1.1rem; background: linear-gradient(135deg, #9b2ec8 0%, #76179c 100%); color: #fff; border: none; border-radius: 8px; font-size: .88rem; font-weight: 600; cursor: pointer; transition: opacity .2s, box-shadow .2s; box-shadow: 0 2px 8px rgba(155,46,200,.3); }
    .btn-primary:hover { opacity: .88; box-shadow: 0 4px 14px rgba(155,46,200,.4); }
    .btn-ghost { padding: .45rem 1.1rem; background: none; border: 1.5px solid #d0c0e8; border-radius: 8px; font-size: .88rem; font-weight: 600; color: #666; cursor: pointer; transition: border-color .2s, color .2s; }
    .btn-ghost:hover { border-color: #9b2ec8; color: #9b2ec8; }
    .btn-edit { padding: .3rem .75rem; font-size: .8rem; font-weight: 600; background: #f0eaff; color: #76179c; border: none; border-radius: 6px; cursor: pointer; transition: background .15s; }
    .btn-edit:hover { background: #e0d0ff; }
    .btn-del  { padding: .3rem .75rem; font-size: .8rem; font-weight: 600; background: #fff0f0; color: #c92a2a; border: none; border-radius: 6px; cursor: pointer; transition: background .15s; }
    .btn-del:hover { background: #ffc9c9; }

    .form-card { padding: 1.5rem; border-bottom: 1px solid #f0eaf8; background: #faf7ff; }
    .form-title { margin: 0 0 1.25rem; font-size: 1rem; font-weight: 700; color: #2d0042; }
    .form-actions { display: flex; justify-content: flex-end; gap: .75rem; margin-top: 1.25rem; }

    .fg { display: grid; gap: .9rem; grid-template-columns: repeat(12, 1fr); }
    .f { display: flex; flex-direction: column; gap: .35rem; }
    .f span { font-size: .8rem; font-weight: 600; color: #555; }
    .f small { font-weight: 400; color: #999; }
    .f input, .f select, .f textarea { padding: .55rem .8rem; border: 1.5px solid #ddd; border-radius: 8px; font-family: inherit; font-size: .88rem; color: #222; background: #fff; outline: none; transition: border-color .2s, box-shadow .2s; }
    .f input:focus, .f select:focus, .f textarea:focus { border-color: #9b2ec8; box-shadow: 0 0 0 3px rgba(155,46,200,.1); }
    .f .readonly { background: #f5f0fb; color: #888; cursor: not-allowed; }
    .f textarea { resize: vertical; }

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

    .item-list { padding: .5rem 0; }
    .item-row { display: flex; align-items: center; gap: 1rem; padding: .85rem 1.5rem; border-bottom: 1px solid #f5f0fb; transition: background .12s; }
    .item-row:last-child { border-bottom: none; }
    .item-row:hover { background: #faf7ff; }
    .item-ico  { font-size: 1.5rem; flex-shrink: 0; }
    .item-info { flex: 1; min-width: 0; }
    .item-info strong { display: block; font-size: .95rem; color: #1a0030; }
    .item-meta { font-size: .78rem; color: #888; margin-top: .1rem; }
    .item-acts { display: flex; gap: .4rem; flex-shrink: 0; }

    @media (max-width: 768px) {
        .fg { grid-template-columns: 1fr 1fr; }
        .f-icon, .f-title, .f-slug, .f-level, .f-dur, .f-price,
        .f-desc, .f-longdesc, .f-topics, .f-prereqs, .f-ptitle, .f-pdesc { grid-column: span 2; }
        .f-icon { grid-column: span 1; }
        .f-level, .f-dur, .f-price { grid-column: span 1; }
        .item-meta { display: none; }
    }
</style>

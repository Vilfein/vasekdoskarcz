<script>
    import { coursesStore } from '$lib/stores/courses.svelte.js';
    import { eventsStore } from '$lib/stores/events.svelte.js';

    let formOpen       = $state(false);
    let editingEventId = $state(null);

    const freshEF = () => ({ date: '', slug: '', time: '10:00–12:00', capacity: 15, enrolled: 0 });
    let ef = $state(freshEF());

    function openAdd() { editingEventId = null; ef = freshEF(); formOpen = true; }

    function openEdit(ev) {
        editingEventId = ev.id;
        ef = { date: ev.date, slug: ev.slug, time: ev.time, capacity: ev.capacity, enrolled: ev.enrolled };
        formOpen = true;
    }

    function closeForm() { formOpen = false; editingEventId = null; }

    function save() {
        if (!ef.date || !ef.slug) return;
        const course = coursesStore.get(ef.slug);
        if (!course) return;
        const evt = {
            date: ef.date, course: course.title, icon: course.icon, slug: ef.slug,
            time: ef.time, capacity: Number(ef.capacity), enrolled: Number(ef.enrolled)
        };
        if (editingEventId !== null) eventsStore.update(editingEventId, evt);
        else eventsStore.add(evt);
        closeForm();
    }

    function remove(id) {
        if (!confirm('Smazat tento termín?')) return;
        eventsStore.remove(id);
    }

    const sortedEvents = $derived([...eventsStore.list].sort((a, b) => a.date.localeCompare(b.date)));

    const todayStr = new Date().toISOString().split('T')[0];

    function fmtDate(s) {
        return new Date(s).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'short', year: 'numeric' });
    }
</script>

<section class="panel">
    <div class="panel-bar">
        <h2>Správa termínů</h2>
        {#if !formOpen}
            <button class="btn-primary" onclick={openAdd}>+ Přidat termín</button>
        {/if}
    </div>

    {#if formOpen}
    <div class="form-card">
        <h3 class="form-title">{editingEventId !== null ? 'Upravit termín' : 'Nový termín'}</h3>
        <div class="fg">
            <label class="f"><span>Datum *</span>
                <input type="date" bind:value={ef.date} />
            </label>
            <label class="f"><span>Kurz *</span>
                <select bind:value={ef.slug}>
                    <option value="">— vyber kurz —</option>
                    {#each coursesStore.list as c}
                        <option value={c.slug}>{c.icon} {c.title}</option>
                    {/each}
                </select>
            </label>
            <label class="f"><span>Čas</span>
                <input type="text" bind:value={ef.time} placeholder="10:00–12:00" />
            </label>
            <label class="f"><span>Kapacita</span>
                <input type="number" bind:value={ef.capacity} min="1" max="99" />
            </label>
            <label class="f"><span>Přihlášeno</span>
                <input type="number" bind:value={ef.enrolled} min="0" />
            </label>
        </div>
        <div class="form-actions">
            <button class="btn-ghost" onclick={closeForm}>Zrušit</button>
            <button class="btn-primary" onclick={save}>{editingEventId !== null ? 'Uložit změny' : 'Přidat termín'}</button>
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
                <tr class:past={ev.date < todayStr}>
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
                        <button class="btn-edit" onclick={() => openEdit(ev)}>Upravit</button>
                        <button class="btn-del"  onclick={() => remove(ev.id)}>Smazat</button>
                    </td>
                </tr>
                {/each}
            </tbody>
        </table>
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

    .fg { display: grid; gap: .9rem; grid-template-columns: repeat(5, 1fr); }
    .f { display: flex; flex-direction: column; gap: .35rem; }
    .f span { font-size: .8rem; font-weight: 600; color: #555; }
    .f input, .f select { padding: .55rem .8rem; border: 1.5px solid #ddd; border-radius: 8px; font-family: inherit; font-size: .88rem; color: #222; background: #fff; outline: none; transition: border-color .2s, box-shadow .2s; }
    .f input:focus, .f select:focus { border-color: #9b2ec8; box-shadow: 0 0 0 3px rgba(155,46,200,.1); }

    .tbl-wrap { overflow-x: auto; }
    .tbl { width: 100%; border-collapse: collapse; font-size: .88rem; }
    .tbl thead th { text-align: left; padding: .75rem 1rem; font-size: .78rem; font-weight: 700; text-transform: uppercase; letter-spacing: .04em; color: #888; border-bottom: 2px solid #f0eaf8; background: #faf7ff; }
    .tbl tbody tr { border-bottom: 1px solid #f5f0fb; transition: background .12s; }
    .tbl tbody tr:last-child { border-bottom: none; }
    .tbl tbody tr:hover { background: #faf7ff; }
    .tbl tbody tr.past td { color: #bbb; }
    .tbl td { padding: .75rem 1rem; color: #333; }
    .td-date { white-space: nowrap; }
    .td-acts { display: flex; gap: .4rem; justify-content: flex-end; }

    .occ { font-weight: 700; font-size: .82rem; padding: .15rem .5rem; border-radius: 100px; background: #e8f5e9; color: #2e7d32; }
    .occ-warn { background: #fff8e1; color: #f57f17; }
    .occ-full { background: #fce4ec; color: #c62828; }

    @media (max-width: 768px) {
        .fg { grid-template-columns: 1fr 1fr; }
    }
</style>

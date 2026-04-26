<script>
    import { goto } from '$app/navigation';
    import { auth } from '$lib/stores/auth.svelte.js';
    import { coursesStore } from '$lib/stores/courses.svelte.js';
    import { eventsStore } from '$lib/stores/events.svelte.js';
    import AdminCourses from '$lib/components/AdminCourses.svelte';
    import AdminEvents from '$lib/components/AdminEvents.svelte';

    $effect(() => {
        if (!auth.user || auth.user.role !== 'admin') goto('/');
    });

    let tab = $state('courses');
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

        {#if tab === 'courses'}<AdminCourses />{/if}
        {#if tab === 'events'}<AdminEvents />{/if}
    </div>
</div>

<style>
    :global(body) { background: #f3eeff; }

    .admin { min-height: 100vh; font-family: 'Segoe UI', system-ui, sans-serif; }

    .adm-header { background: linear-gradient(135deg, #9b2ec8 0%, #76179c 100%); padding: 0 1.5rem; height: 56px; display: flex; align-items: center; }
    .adm-header-inner { max-width: 1100px; width: 100%; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
    .adm-logo { color: #fff; font-weight: 700; font-size: 1rem; letter-spacing: .04em; }
    .adm-back  { color: rgba(255,255,255,.8); text-decoration: none; font-size: .85rem; transition: color .2s; }
    .adm-back:hover { color: #fff; }

    .adm-body { max-width: 1100px; margin: 0 auto; padding: 2rem 1.5rem 4rem; }

    .tabs { display: flex; gap: .5rem; margin-bottom: 1.75rem; }
    .tab { padding: .5rem 1.25rem; border-radius: 100px; border: 1.5px solid #d8c8f0; background: #fff; font-size: .88rem; font-weight: 600; color: #76179c; cursor: pointer; display: flex; align-items: center; gap: .4rem; transition: background .18s, color .18s, border-color .18s; }
    .tab.active { background: #9b2ec8; color: #fff; border-color: #9b2ec8; }
    .badge-num { background: rgba(255,255,255,.25); border-radius: 100px; padding: .05rem .45rem; font-size: .75rem; }
    .tab:not(.active) .badge-num { background: #ede5f8; color: #76179c; }
</style>

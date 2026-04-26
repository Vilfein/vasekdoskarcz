<script>
    import { goto } from '$app/navigation';
    import { auth } from '$lib/stores/auth.svelte.js';
    import { eventsStore } from '$lib/stores/events.svelte.js';
    import { enrollments } from '$lib/stores/enrollments.svelte.js';

    $effect(() => {
        if (!auth.user) goto('/login');
    });

    function getInitials(user) {
        if (!user) return '?';
        const parts = (user.name ?? '').trim().split(/\s+/);
        if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        if (parts[0]?.length > 0) return parts[0][0].toUpperCase();
        return (user.email?.[0] ?? '?').toUpperCase();
    }

    const today = new Date().toISOString().split('T')[0];

    const enrolledEvents = $derived(
        eventsStore.list
            .filter(e => enrollments.ids.includes(e.id))
            .sort((a, b) => a.date.localeCompare(b.date))
    );

    const upcoming = $derived(enrolledEvents.filter(e => e.date >= today));
    const past     = $derived(enrolledEvents.filter(e => e.date < today));

    function fmtDate(s) {
        return new Date(s).toLocaleDateString('cs-CZ', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    }

    function cancelEnrollment(ev) {
        enrollments.cancel(ev.id);
        eventsStore.update(ev.id, { enrolled: Math.max(0, ev.enrolled - 1) });
    }

    function spotsLeft(ev) {
        const left = ev.capacity - ev.enrolled;
        if (left <= 0) return 'Plné';
        if (left === 1) return '1 místo';
        if (left < 5)  return `${left} místa`;
        return `${left} míst`;
    }
</script>

<svelte:head><title>Můj profil</title></svelte:head>

<div class="profile-page">

    <!-- ── HERO ── -->
    <div class="hero">
        <div class="hero-inner">
            <div class="avatar">{auth.user ? getInitials(auth.user) : ''}</div>
            <div class="hero-info">
                <h1>{auth.user?.name ?? ''}</h1>
                <p class="email">{auth.user?.email ?? ''}</p>
                {#if auth.user?.role === 'admin'}
                    <span class="role-badge">⚙ Administrátor</span>
                {:else}
                    <span class="role-badge role-user">👤 Uživatel</span>
                {/if}
            </div>
        </div>
    </div>

    <div class="content">

        <!-- ── NADCHÁZEJÍCÍ TERMÍNY ── -->
        <section class="section">
            <h2 class="section-title">
                Nadcházející přihlášení
                {#if upcoming.length > 0}<span class="count">{upcoming.length}</span>{/if}
            </h2>

            {#if upcoming.length === 0}
                <div class="empty">
                    <div class="empty-icon">📅</div>
                    <p>Nejste přihlášeni na žádný nadcházející termín.</p>
                    <a href="/courses" class="btn-browse">Prohlédnout kurzy →</a>
                </div>
            {:else}
                <div class="event-cards">
                    {#each upcoming as ev (ev.id)}
                        <div class="event-card">
                            <div class="ec-icon">{ev.icon}</div>
                            <div class="ec-body">
                                <a href="/courses/{ev.slug}" class="ec-course">{ev.course}</a>
                                <div class="ec-date">{fmtDate(ev.date)}</div>
                                <div class="ec-meta">
                                    <span class="ec-time">🕐 {ev.time}</span>
                                    <span class="ec-spots">{spotsLeft(ev)}</span>
                                </div>
                            </div>
                            <button class="btn-cancel" onclick={() => cancelEnrollment(ev)}
                                    title="Odhlásit se z termínu">
                                ✕
                            </button>
                        </div>
                    {/each}
                </div>
            {/if}
        </section>

        <!-- ── MINULÉ TERMÍNY ── -->
        {#if past.length > 0}
            <section class="section">
                <h2 class="section-title section-title-muted">
                    Absolvované termíny
                    <span class="count count-muted">{past.length}</span>
                </h2>
                <div class="event-cards event-cards-past">
                    {#each [...past].reverse() as ev (ev.id)}
                        <div class="event-card event-card-past">
                            <div class="ec-icon">{ev.icon}</div>
                            <div class="ec-body">
                                <a href="/courses/{ev.slug}" class="ec-course">{ev.course}</a>
                                <div class="ec-date">{fmtDate(ev.date)}</div>
                                <div class="ec-meta">
                                    <span class="ec-time">🕐 {ev.time}</span>
                                    <span class="ec-badge-past">Proběhlo</span>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </section>
        {/if}

    </div>
</div>

<style>
    .profile-page {
        min-height: 100vh;
        background: #f3eeff;
        font-family: 'Segoe UI', system-ui, sans-serif;
    }

    /* Hero */
    .hero {
        background: linear-gradient(135deg, #2d0042 0%, #5a0080 100%);
        padding: 3rem 1.5rem 2.5rem;
    }
    .hero-inner {
        max-width: 760px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        gap: 2rem;
    }
    .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: rgba(255,255,255,.18);
        border: 3px solid rgba(255,255,255,.5);
        color: #fff;
        font-size: 2rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        letter-spacing: .03em;
    }
    .hero-info h1 {
        margin: 0 0 .3rem;
        font-size: 1.6rem;
        font-weight: 700;
        color: #fff;
    }
    .email {
        margin: 0 0 .6rem;
        font-size: .9rem;
        color: rgba(255,255,255,.7);
    }
    .role-badge {
        display: inline-block;
        padding: .2rem .75rem;
        border-radius: 100px;
        background: rgba(255,255,255,.18);
        color: rgba(255,255,255,.9);
        font-size: .78rem;
        font-weight: 600;
        letter-spacing: .03em;
    }
    .role-user { background: rgba(255,255,255,.12); }

    /* Content */
    .content {
        max-width: 760px;
        margin: 0 auto;
        padding: 2rem 1.5rem 4rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    /* Sections */
    .section { background: #fff; border-radius: 14px; box-shadow: 0 2px 16px rgba(120,50,180,.07); overflow: hidden; }

    .section-title {
        display: flex;
        align-items: center;
        gap: .6rem;
        padding: 1.25rem 1.5rem;
        margin: 0;
        font-size: 1rem;
        font-weight: 700;
        color: #2d0042;
        border-bottom: 1px solid #f0eaf8;
    }
    .section-title-muted { color: #888; }

    .count {
        background: #9b2ec8;
        color: #fff;
        font-size: .72rem;
        font-weight: 700;
        padding: .1rem .5rem;
        border-radius: 100px;
    }
    .count-muted { background: #ccc; }

    /* Empty state */
    .empty {
        padding: 3rem 1.5rem;
        text-align: center;
        color: #888;
    }
    .empty-icon { font-size: 2.5rem; margin-bottom: .75rem; }
    .empty p { margin: 0 0 1.25rem; font-size: .95rem; }
    .btn-browse {
        display: inline-block;
        padding: .55rem 1.4rem;
        background: linear-gradient(135deg, #9b2ec8 0%, #76179c 100%);
        color: #fff;
        text-decoration: none;
        border-radius: 8px;
        font-size: .88rem;
        font-weight: 600;
        transition: opacity .2s;
    }
    .btn-browse:hover { opacity: .88; }

    /* Event cards */
    .event-cards { padding: .5rem 0; }

    .event-card {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid #f5f0fb;
        transition: background .12s;
    }
    .event-card:last-child { border-bottom: none; }
    .event-card:hover { background: #faf7ff; }
    .event-card-past { opacity: .65; }

    .ec-icon { font-size: 1.75rem; flex-shrink: 0; }
    .ec-body { flex: 1; min-width: 0; }

    .ec-course {
        display: block;
        font-weight: 700;
        font-size: .95rem;
        color: #1a0030;
        text-decoration: none;
        margin-bottom: .2rem;
    }
    .ec-course:hover { color: #9b2ec8; }

    .ec-date { font-size: .82rem; color: #555; margin-bottom: .25rem; }

    .ec-meta { display: flex; align-items: center; gap: .75rem; flex-wrap: wrap; }
    .ec-time  { font-size: .78rem; color: #777; }
    .ec-spots { font-size: .75rem; font-weight: 600; color: #2e7d32; }

    .ec-badge-past {
        font-size: .72rem;
        font-weight: 600;
        padding: .15rem .5rem;
        background: #e8e8e8;
        color: #666;
        border-radius: 100px;
    }

    .btn-cancel {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: none;
        background: #fff0f0;
        color: #c92a2a;
        font-size: .8rem;
        cursor: pointer;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background .15s;
    }
    .btn-cancel:hover { background: #ffc9c9; }

    @media (max-width: 600px) {
        .hero-inner { flex-direction: column; align-items: flex-start; gap: 1rem; }
        .avatar { width: 64px; height: 64px; font-size: 1.5rem; }
        .hero-info h1 { font-size: 1.3rem; }
    }
</style>

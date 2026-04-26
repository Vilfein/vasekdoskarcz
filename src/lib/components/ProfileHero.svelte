<script>
    let { user } = $props();

    function getInitials(u) {
        if (!u) return '?';
        const parts = (u.name ?? '').trim().split(/\s+/);
        if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        if (parts[0]?.length > 0) return parts[0][0].toUpperCase();
        return (u.email?.[0] ?? '?').toUpperCase();
    }
</script>

<div class="hero">
    <div class="hero-inner">
        <div class="avatar">{getInitials(user)}</div>
        <div class="hero-info">
            <h1>{user?.name ?? ''}</h1>
            <p class="email">{user?.email ?? ''}</p>
            {#if user?.role === 'admin'}
                <span class="role-badge">⚙ Administrátor</span>
            {:else}
                <span class="role-badge role-user">👤 Uživatel</span>
            {/if}
        </div>
    </div>
</div>

<style>
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
    .hero-info h1 { margin: 0 0 .3rem; font-size: 1.6rem; font-weight: 700; color: #fff; }
    .email { margin: 0 0 .6rem; font-size: .9rem; color: rgba(255,255,255,.7); }
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

    @media (max-width: 600px) {
        .hero-inner { flex-direction: column; align-items: flex-start; gap: 1rem; }
        .avatar { width: 64px; height: 64px; font-size: 1.5rem; }
        .hero-info h1 { font-size: 1.3rem; }
    }
</style>

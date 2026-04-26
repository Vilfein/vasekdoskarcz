<script>
    import NavButton from "./NavButton.svelte";
    import { auth } from '$lib/stores/auth.svelte.js';

    const { children } = $props();

    let menuOpen = $state(false);
    let avatarOpen = $state(false);

    function closeMenu() {
        menuOpen = false;
    }

    function getInitials(user) {
        if (!user) return '?';
        const parts = (user.name ?? '').trim().split(/\s+/);
        if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        if (parts[0]?.length > 0) return parts[0][0].toUpperCase();
        return (user.email?.[0] ?? '?').toUpperCase();
    }

    function toggleAvatar(e) {
        e.stopPropagation();
        avatarOpen = !avatarOpen;
    }

    function handleLogout() {
        auth.logout();
        avatarOpen = false;
        closeMenu();
    }
</script>

<svelte:window onclick={() => { avatarOpen = false; }} />

<nav class="navbar">
    <div class="navbar-inner">
        <div class="nav-links" class:open={menuOpen}>
            <NavButton href="/" title="Domů" onclick={closeMenu}/>
            <NavButton href="/courses" title="Kurzy" onclick={closeMenu}/>
            <NavButton href="/#Tutoring" title="Doučování" onclick={closeMenu}/>
            <NavButton href="/#JumpForm" title="Kontakt" onclick={closeMenu}/>
            {#if auth.user?.role === 'admin'}
                <NavButton href="/admin" title="Admin" onclick={closeMenu}/>
            {/if}
            {#if auth.user}
                <button class="mobile-logout-btn" onclick={handleLogout}>Odhlásit se</button>
            {:else}
                <a href="/login" class="mobile-login-link" onclick={closeMenu}>Přihlásit se</a>
            {/if}
        </div>

        {#if auth.user}
            <div class="nav-avatar-wrap">
                <button class="nav-avatar" onclick={toggleAvatar} aria-label="Uživatelské menu" aria-expanded={avatarOpen}>
                    {getInitials(auth.user)}
                </button>
                {#if avatarOpen}
                    <div class="avatar-dropdown" onclick={(e) => e.stopPropagation()} role="none">
                        <div class="avatar-info">
                            <div class="avatar-big">{getInitials(auth.user)}</div>
                            <div class="avatar-name">{auth.user.name}</div>
                            <div class="avatar-email">{auth.user.email}</div>
                        </div>
                        <hr class="avatar-divider" />
                        <a href="/profile" class="avatar-profile-link" onclick={() => { avatarOpen = false; }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                            Můj profil
                        </a>
                        <hr class="avatar-divider" />
                        <button class="avatar-logout-btn" onclick={handleLogout}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                <polyline points="16 17 21 12 16 7"/>
                                <line x1="21" y1="12" x2="9" y2="12"/>
                            </svg>
                            Odhlásit se
                        </button>
                    </div>
                {/if}
            </div>
        {:else}
            <a href="/login" class="nav-login" onclick={closeMenu}>Přihlásit se</a>
        {/if}

        <button class="hamburger" onclick={() => menuOpen = !menuOpen} aria-label="Otevřít menu">
            <span class:rotated={menuOpen}></span>
            <span class:hidden={menuOpen}></span>
            <span class:rotated-reverse={menuOpen}></span>
        </button>
    </div>
</nav>

<div id="content">
    {@render children()}
</div>

<style>
    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 60px;
        background: linear-gradient(135deg, #9B2EC8 0%, #76179C 100%);
        z-index: 1000;
    }

    .navbar-inner {
        max-width: 1140px;
        margin: 0 auto;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 1.5rem;
        position: relative;
    }

    .nav-links {
        display: flex;
        gap: 2.5rem;
        align-items: center;
    }

    /* hamburger — skrytý na desktopu */
    .hamburger {
        display: none;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
        background: none;
        border: none;
        cursor: pointer;
        position: absolute;
        right: 1.5rem;
        padding: 0.4rem;
    }

    .hamburger span {
        display: block;
        width: 24px;
        height: 2px;
        background-color: #fff;
        transition: transform 0.3s ease, opacity 0.3s ease;
        transform-origin: center;
    }

    .hamburger span.rotated         { transform: translateY(7px) rotate(45deg); }
    .hamburger span.hidden          { opacity: 0; }
    .hamburger span.rotated-reverse { transform: translateY(-7px) rotate(-45deg); }

    /* Přihlásit se (nepřihlášený) */
    .nav-login {
        position: absolute;
        right: 1.5rem;
        color: #fff;
        text-decoration: none;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 600;
        font-size: 0.88rem;
        letter-spacing: 0.03em;
        padding: 0.35rem 1rem;
        border: 1.5px solid rgba(255, 255, 255, 0.6);
        border-radius: 100px;
        transition: background 0.2s ease, border-color 0.2s ease;
    }

    .nav-login:hover {
        background: rgba(255, 255, 255, 0.15);
        border-color: #fff;
    }

    /* Avatar (přihlášený) */
    .nav-avatar-wrap {
        position: absolute;
        right: 1.5rem;
    }

    .nav-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.18);
        border: 2px solid rgba(255, 255, 255, 0.65);
        color: #fff;
        font-family: 'Segoe UI', system-ui, sans-serif;
        font-size: 0.82rem;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s ease, border-color 0.2s ease;
        letter-spacing: 0.03em;
    }

    .nav-avatar:hover {
        background: rgba(255, 255, 255, 0.3);
        border-color: #fff;
    }

    /* Dropdown */
    .avatar-dropdown {
        position: absolute;
        top: calc(100% + 10px);
        right: 0;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
        min-width: 220px;
        z-index: 200;
        overflow: hidden;
        animation: dropdown-in 0.18s ease;
    }

    @keyframes dropdown-in {
        from { opacity: 0; transform: translateY(-6px); }
        to   { opacity: 1; transform: translateY(0); }
    }

    .avatar-info {
        padding: 1.25rem 1.25rem 1rem;
        text-align: center;
    }

    .avatar-big {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: linear-gradient(135deg, #9b2ec8 0%, #76179c 100%);
        color: #fff;
        font-family: 'Segoe UI', system-ui, sans-serif;
        font-size: 1.1rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 0.6rem;
    }

    .avatar-name {
        font-family: 'Segoe UI', system-ui, sans-serif;
        font-size: 0.92rem;
        font-weight: 600;
        color: #222;
    }

    .avatar-email {
        font-family: 'Segoe UI', system-ui, sans-serif;
        font-size: 0.78rem;
        color: #999;
        margin-top: 0.15rem;
    }

    .avatar-divider {
        border: none;
        border-top: 1px solid #eee;
        margin: 0;
    }

    .avatar-profile-link {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        font-family: 'Segoe UI', system-ui, sans-serif;
        font-size: 0.88rem;
        font-weight: 500;
        color: #333;
        text-decoration: none;
        transition: background 0.15s ease;
    }

    .avatar-profile-link:hover {
        background: #f5f0fb;
        color: #76179c;
    }

    .avatar-logout-btn {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        background: none;
        border: none;
        font-family: 'Segoe UI', system-ui, sans-serif;
        font-size: 0.88rem;
        font-weight: 500;
        color: #e03131;
        cursor: pointer;
        transition: background 0.15s ease;
    }

    .avatar-logout-btn:hover {
        background: #fff5f5;
    }

    /* Mobilní menu */
    .mobile-login-link,
    .mobile-logout-btn {
        display: none;
    }

    @media (max-width: 768px) {
        .hamburger {
            display: flex;
        }

        .nav-login,
        .nav-avatar-wrap {
            display: none;
        }

        .mobile-login-link {
            display: block;
            color: #fff;
            text-decoration: none;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-weight: 600;
            font-size: 0.95rem;
            letter-spacing: 0.03em;
            padding: 0.75rem 1.5rem;
            transition: color 0.2s ease;
        }

        .mobile-login-link:hover {
            color: #e879f9;
        }

        .mobile-logout-btn {
            display: block;
            background: none;
            border: none;
            color: #fff;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-weight: 600;
            font-size: 0.95rem;
            letter-spacing: 0.03em;
            padding: 0.75rem 1.5rem;
            cursor: pointer;
            text-align: left;
            transition: color 0.2s ease;
        }

        .mobile-logout-btn:hover {
            color: #e879f9;
        }

        .nav-links {
            display: none;
            position: absolute;
            top: 60px;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #9B2EC8 0%, #76179C 100%);
            flex-direction: column;
            gap: 0;
            padding: 0.5rem 0 1rem;
        }

        .nav-links.open {
            display: flex;
        }
    }

    #content {
        margin-top: 60px;
    }
</style>

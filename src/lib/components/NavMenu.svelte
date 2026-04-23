<script>
    import NavButton from "./NavButton.svelte";
    const { children } = $props();

    let menuOpen = $state(false);

    function closeMenu() {
        menuOpen = false;
    }
</script>

<nav class="navbar">
    <div class="navbar-inner">
        <div class="nav-links" class:open={menuOpen}>
            <NavButton href="/" title="Domů" onclick={closeMenu}/>
            <NavButton href="/courses" title="Kurzy" onclick={closeMenu}/>
            <NavButton href="/#Tutoring" title="Doučování" onclick={closeMenu}/>
            <NavButton href="/#JumpForm" title="Kontakt" onclick={closeMenu}/>
            <a href="/login" class="mobile-login-link" onclick={closeMenu}>Přihlásit se</a>
        </div>
        <a href="/login" class="nav-login" onclick={closeMenu}>Přihlásit se</a>
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

    .mobile-login-link {
        display: none;
    }

    /* mobilní menu */
    @media (max-width: 768px) {
        .hamburger {
            display: flex;
        }

        .nav-login {
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

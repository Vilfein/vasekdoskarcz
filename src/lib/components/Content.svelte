<script>
    import EmailForm from "./EmailForm.svelte";

    function reveal(node, { delay = 0 } = {}) {
        node.style.transitionDelay = `${delay}ms`;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    } else {
                        entry.target.classList.remove('visible');
                    }
                });
            },
            { threshold: 0.12 }
        );

        observer.observe(node);

        return {
            destroy() { observer.disconnect(); }
        };
    }
</script>

<!-- HERO -->
<section id="top" class="hero">
    <div class="hero-inner" use:reveal>
        <h1>Vaše jméno</h1>
        <p class="subtitle">Programátor · Lektor · Tvůrce</p>
        <a href="#Courses" class="btn">Prohlédnout kurzy</a>
    </div>
</section>

<!-- KURZY -->
<section id="Courses" class="section">
    <div class="container">
        <h2 use:reveal>Kurzy</h2>
        <div class="cards">
            <div class="card" use:reveal={{ delay: 0 }}>
                <div class="card-icon">💻</div>
                <h3>Webový vývoj</h3>
                <p>HTML, CSS, JavaScript a moderní frameworky od základů po pokročilé techniky.</p>
            </div>
            <div class="card" use:reveal={{ delay: 100 }}>
                <div class="card-icon">🐍</div>
                <h3>Python</h3>
                <p>Programování v Pythonu, datová analýza a automatizace každodenních úkolů.</p>
            </div>
            <div class="card" use:reveal={{ delay: 200 }}>
                <div class="card-icon">🗄️</div>
                <h3>Databáze</h3>
                <p>SQL, návrh databázových schémat a práce s reálnými daty.</p>
            </div>
        </div>
    </div>
</section>

<!-- DOUČOVÁNÍ -->
<section id="Tutoring" class="section alt">
    <div class="container">
        <h2 use:reveal>Doučování</h2>
        <div class="tutoring-grid">
            <div class="tutoring-text" use:reveal>
                <p>Nabízím individuální doučování přizpůsobené vašemu tempu a cílům. Ať už potřebujete pomoc se školním projektem, přípravou na pohovor, nebo se chcete naučit programovat od nuly.</p>
                <ul>
                    <li>Online i osobně</li>
                    <li>Flexibilní termíny</li>
                    <li>Materiály na míru</li>
                    <li>Zpětná vazba po každé hodině</li>
                </ul>
                <a href="#JumpForm" class="btn">Domluvit hodinu</a>
            </div>
            <div class="tutoring-image" use:reveal={{ delay: 150 }}>
                <div class="placeholder-img">🎓</div>
            </div>
        </div>
    </div>
</section>

<EmailForm />

<style>
    /* ── reveal animace ── */
    :global(.reveal-target) {
        opacity: 0;
        transform: translateY(36px);
        transition: opacity 0.7s ease, transform 0.7s ease;
    }
    :global(.reveal-target.visible) {
        opacity: 1;
        transform: translateY(0);
    }

    /* ── hero ── */
    .hero {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        background: linear-gradient(160deg, #1a001a 0%, #2d0042 100%);
        color: #fff;
        padding: 2rem;
    }

    .hero-inner {
        opacity: 0;
        transform: translateY(36px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }

    .hero-inner:global(.visible) {
        opacity: 1;
        transform: translateY(0);
    }

    .hero h1 {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: clamp(2.5rem, 6vw, 4.5rem);
        font-weight: 700;
        margin-bottom: 0.5rem;
        background: linear-gradient(135deg, #fff 0%, #e879f9 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .subtitle {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 1.15rem;
        color: rgba(255,255,255,0.7);
        margin-bottom: 2rem;
        letter-spacing: 0.08em;
    }

    /* ── sekce ── */
    .section {
        padding: 6rem 1.5rem;
    }

    .section.alt {
        background: #faf8ff;
    }

    .container {
        max-width: 1100px;
        margin: 0 auto;
    }

    h2 {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 2rem;
        font-weight: 700;
        color: #76179C;
        text-align: center;
        margin-bottom: 3rem;
        opacity: 0;
        transform: translateY(36px);
        transition: opacity 0.7s ease, transform 0.7s ease;
    }

    h2:global(.visible) {
        opacity: 1;
        transform: translateY(0);
    }

    /* ── karty ── */
    .cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 1.5rem;
    }

    .card {
        background: #fff;
        border: 1px solid #ede9f7;
        border-radius: 12px;
        padding: 2rem 1.5rem;
        text-align: center;
        box-shadow: 0 2px 12px rgba(118,23,156,0.07);
        opacity: 0;
        transform: translateY(36px);
        transition: opacity 0.7s ease, transform 0.7s ease, box-shadow 0.3s ease;
    }

    .card:global(.visible) {
        opacity: 1;
        transform: translateY(0);
    }

    .card:hover {
        box-shadow: 0 8px 28px rgba(118,23,156,0.15);
    }

    .card-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    .card h3 {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 1.15rem;
        font-weight: 600;
        color: #2d0042;
        margin-bottom: 0.75rem;
    }

    .card p {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: #555;
        line-height: 1.65;
        font-size: 0.95rem;
    }

    /* ── doučování ── */
    .tutoring-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        align-items: center;
    }

    .tutoring-text {
        opacity: 0;
        transform: translateY(36px);
        transition: opacity 0.7s ease, transform 0.7s ease;
    }

    .tutoring-text:global(.visible) {
        opacity: 1;
        transform: translateY(0);
    }

    .tutoring-text p {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: #333;
        line-height: 1.75;
        margin-bottom: 1.25rem;
    }

    .tutoring-text ul {
        list-style: none;
        padding: 0;
        margin: 0 0 1.75rem;
    }

    .tutoring-text li {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: #444;
        padding: 0.35rem 0;
        padding-left: 1.5rem;
        position: relative;
    }

    .tutoring-text li::before {
        content: '✦';
        position: absolute;
        left: 0;
        color: #9B2EC8;
        font-size: 0.7rem;
        top: 0.55rem;
    }

    .tutoring-image {
        opacity: 0;
        transform: translateY(36px);
        transition: opacity 0.7s ease, transform 0.7s ease;
    }

    .tutoring-image:global(.visible) {
        opacity: 1;
        transform: translateY(0);
    }

    .placeholder-img {
        background: linear-gradient(135deg, #9B2EC8 0%, #76179C 100%);
        border-radius: 16px;
        height: 320px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 6rem;
    }

    /* ── responzivita ── */
    @media (max-width: 768px) {
        .tutoring-grid {
            grid-template-columns: 1fr;
        }

        .section {
            padding: 4rem 1.25rem;
        }
    }
</style>

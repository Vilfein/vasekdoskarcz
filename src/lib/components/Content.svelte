<script>
    import EmailForm from "./EmailForm.svelte";
    import CourseCard from "./CourseCard.svelte";

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
        <h1>Vašek Doškář</h1>
        <p class="subtitle">Programátor · Lektor · Tvůrce</p>
        <a href="#Courses" class="btn">Prohlédnout kurzy</a>
    </div>
</section>

<!-- KURZY -->
<section id="Courses" class="section">
    <div class="container">
        <h2 use:reveal>Kurzy</h2>
        <div class="cards">
            <CourseCard
                icon="💠"
                title="C# Základy"
                description="Solidní základ v jazyce C# – od syntaxe po práci se soubory a výjimkami."
                href="/courses/csharp-zaklady"
                delay={0}
            />
            <CourseCard
                icon="🔷"
                title="C# OOP"
                description="Třídy, dědičnost, rozhraní, LINQ a async/await – OOP v C# do hloubky."
                href="/courses/csharp-oop"
                delay={100}
            />
            <CourseCard
                icon="⚡"
                title="Vlákna, Tasky & Async"
                description="Thread, Task, async/await, paralelismus a synchronizační primitiva v C#."
                href="/courses/async-programovani"
                delay={200}
            />
            <CourseCard
                icon="🌐"
                title="ASP.NET Core"
                description="Webové aplikace a REST API s ASP.NET Core, Entity Framework a autentizací."
                href="/courses/aspnet-core"
                delay={300}
            />
            <CourseCard
                icon="🚀"
                title="Fullstack: ASP.NET Core & React"
                description="Kompletní fullstack aplikace – .NET backend, React frontend, Docker a CI/CD."
                href="/courses/fullstack"
                delay={400}
            />
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

    /* ── tlačítko ── */
    .btn {
        display: inline-block;
        padding: 0.75rem 2rem;
        background: linear-gradient(135deg, #9B2EC8 0%, #e879f9 100%);
        color: #fff;
        font-family: 'Segoe UI', system-ui, sans-serif;
        font-size: 0.95rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        border-radius: 100px;
        text-decoration: none;
        transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
        box-shadow: 0 4px 18px rgba(155, 46, 200, 0.35);
    }

    .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 28px rgba(155, 46, 200, 0.55);
        filter: brightness(1.1);
    }

    .btn:active {
        transform: translateY(0);
        box-shadow: 0 3px 10px rgba(155, 46, 200, 0.3);
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

<script>
    import CourseCalendar from '$lib/components/CourseCalendar.svelte';
    import { events } from '$lib/data/events.js';

    let { data } = $props();
    const { course } = data;

    const courseEvents = events.filter(e => e.slug === course.slug);

    const levelColors = {
        'Začátečník':      { bg: '#e8f5e9', text: '#2e7d32' },
        'Mírně pokročilý': { bg: '#fff8e1', text: '#f57f17' },
        'Pokročilý':       { bg: '#fce4ec', text: '#c62828' }
    };
    const badge = levelColors[course.level] ?? { bg: '#ede9f7', text: '#76179C' };
</script>

<svelte:head>
    <title>{course.title}</title>
</svelte:head>

<div class="page">
    <div class="container">
        <a href="/courses" class="back">← Všechny kurzy</a>

        <!-- HEADER -->
        <header class="course-header">
            <span class="icon">{course.icon}</span>
            <div class="meta">
                <span class="badge" style="background:{badge.bg}; color:{badge.text}">{course.level}</span>
                <span class="meta-item">⏱ {course.duration}</span>
                <span class="meta-item price">💰 {course.price}</span>
            </div>
            <h1>{course.title}</h1>
            <p class="lead">{course.longDescription}</p>
        </header>

        <!-- CO SE NAUČÍŠ -->
        <section class="card-section">
            <h2 class="section-label">Co se naučíš</h2>
            <ul class="topics-grid">
                {#each course.topics as topic}
                    <li>{topic}</li>
                {/each}
            </ul>
        </section>

        <!-- PREREKVIZITY -->
        {#if course.prerequisites}
            <section class="card-section">
                <h2 class="section-label">Prerekvizity</h2>
                <ul class="simple-list">
                    {#each course.prerequisites as item}
                        <li>{item}</li>
                    {/each}
                </ul>
            </section>
        {/if}

        <!-- OSNOVA -->
        {#if course.curriculum}
            <section class="card-section curriculum">
                <h2 class="section-label">Osnova kurzu</h2>
                {#each course.curriculum as block, i}
                    <details open={i === 0}>
                        <summary>
                            <span class="section-num">{i + 1}</span>
                            {block.section}
                            <span class="lesson-count">{block.lessons.length} lekce</span>
                        </summary>
                        <ol>
                            {#each block.lessons as lesson}
                                <li>{lesson}</li>
                            {/each}
                        </ol>
                    </details>
                {/each}
            </section>
        {/if}

        <!-- ZÁVĚREČNÝ PROJEKT -->
        {#if course.project}
            <section class="project-box">
                <div class="project-icon">🏗️</div>
                <div>
                    <h2>{course.project.title}</h2>
                    <p>{course.project.description}</p>
                </div>
            </section>
        {/if}

        <!-- TERMÍNY -->
        {#if courseEvents.length > 0}
            <section class="card-section">
                <h2 class="section-label">Termíny a obsazenost</h2>
                <CourseCalendar events={courseEvents} />
            </section>
        {/if}

        <!-- CTA -->
        <div class="cta">
            <a href="/#JumpForm" class="btn">Mám zájem o kurz</a>
        </div>
    </div>
</div>

<style>
    .page {
        padding: 5rem 1.5rem 6rem;
        min-height: 100vh;
        background: #faf8ff;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .container {
        max-width: 780px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 1.75rem;
    }

    .back {
        color: #9B2EC8;
        font-size: 0.9rem;
        font-weight: 600;
        text-decoration: none;
        align-self: flex-start;
    }

    .back:hover { text-decoration: underline; }

    /* ── header ── */
    .course-header { display: flex; flex-direction: column; gap: 0.75rem; }

    .icon { font-size: 3.5rem; line-height: 1; }

    .meta {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
    }

    .badge {
        font-size: 0.75rem;
        font-weight: 700;
        padding: 0.25rem 0.7rem;
        border-radius: 999px;
        text-transform: uppercase;
        letter-spacing: 0.04em;
    }

    .meta-item { font-size: 0.9rem; color: #555; }
    .price { font-weight: 700; color: #76179C; }

    h1 {
        font-size: clamp(1.8rem, 4vw, 2.6rem);
        font-weight: 700;
        color: #2d0042;
        margin: 0;
        line-height: 1.2;
    }

    .lead {
        font-size: 1.05rem;
        color: #444;
        line-height: 1.75;
        margin: 0;
    }

    /* ── karty sekcí ── */
    .card-section {
        background: #fff;
        border: 1px solid #ede9f7;
        border-radius: 14px;
        padding: 1.75rem 2rem;
        box-shadow: 0 2px 12px rgba(118, 23, 156, 0.06);
    }

    .section-label {
        font-size: 0.78rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.09em;
        color: #9B2EC8;
        margin: 0 0 1.25rem;
    }

    /* topics */
    .topics-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 0.55rem 1.5rem;
    }

    .topics-grid li,
    .simple-list li {
        font-size: 0.95rem;
        color: #333;
        padding-left: 1.3rem;
        position: relative;
        line-height: 1.5;
    }

    .topics-grid li::before,
    .simple-list li::before {
        content: '✦';
        position: absolute;
        left: 0;
        color: #9B2EC8;
        font-size: 0.6rem;
        top: 0.45rem;
    }

    /* prerekvizity */
    .simple-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }

    /* osnova */
    .curriculum { padding: 1.75rem 2rem; }

    details {
        border-top: 1px solid #f0eaf8;
        padding: 0.85rem 0;
    }

    details:first-of-type { border-top: none; padding-top: 0; }
    details:last-of-type  { padding-bottom: 0; }

    summary {
        display: flex;
        align-items: center;
        gap: 0.65rem;
        cursor: pointer;
        font-weight: 600;
        font-size: 0.95rem;
        color: #2d0042;
        list-style: none;
        user-select: none;
    }

    summary::-webkit-details-marker { display: none; }

    summary::after {
        content: '›';
        margin-left: auto;
        font-size: 1.1rem;
        color: #9B2EC8;
        transition: transform 0.2s;
    }

    details[open] summary::after { transform: rotate(90deg); }

    .section-num {
        background: linear-gradient(135deg, #9B2EC8, #76179C);
        color: #fff;
        font-size: 0.7rem;
        font-weight: 700;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .lesson-count {
        margin-left: auto;
        font-size: 0.78rem;
        font-weight: 400;
        color: #888;
        margin-right: 0.5rem;
    }

    details ol {
        margin: 0.85rem 0 0.25rem 2.15rem;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }

    details ol li {
        font-size: 0.9rem;
        color: #555;
        line-height: 1.5;
    }

    /* projekt */
    .project-box {
        background: linear-gradient(135deg, #2d0042 0%, #4a0070 100%);
        border-radius: 14px;
        padding: 1.75rem 2rem;
        display: flex;
        gap: 1.25rem;
        align-items: flex-start;
        color: #fff;
    }

    .project-icon { font-size: 2.25rem; flex-shrink: 0; line-height: 1; }

    .project-box h2 {
        font-size: 1rem;
        font-weight: 700;
        margin: 0 0 0.5rem;
        color: #e879f9;
    }

    .project-box p {
        font-size: 0.95rem;
        line-height: 1.65;
        margin: 0;
        color: rgba(255,255,255,0.85);
    }

    /* CTA */
    .cta { padding-top: 0.5rem; }

    .btn {
        display: inline-block;
        padding: 0.85rem 2.25rem;
        background: linear-gradient(135deg, #9B2EC8 0%, #76179C 100%);
        color: #fff;
        border-radius: 8px;
        font-weight: 600;
        font-size: 0.95rem;
        text-decoration: none;
        transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .btn:hover {
        opacity: 0.88;
        transform: translateY(-2px);
    }

    @media (max-width: 600px) {
        .page { padding: 3.5rem 1.25rem 5rem; }
        .card-section, .curriculum { padding: 1.5rem; }
        .project-box { flex-direction: column; gap: 0.75rem; }
    }
</style>

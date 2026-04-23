<script>
    let {
        icon = '📚',
        title = 'Název kurzu',
        level = 'Začátečník',
        duration = '8 hodin',
        price = 'Zdarma',
        description = '',
        topics = [],
        ctaLabel = 'Mám zájem',
        ctaHref = '#JumpForm'
    } = $props();

    const levelColors = {
        'Začátečník':   { bg: '#e8f5e9', text: '#2e7d32' },
        'Mírně pokročilý': { bg: '#fff8e1', text: '#f57f17' },
        'Pokročilý':    { bg: '#fce4ec', text: '#c62828' }
    };
    const badge = levelColors[level] ?? { bg: '#ede9f7', text: '#76179C' };

    function reveal(node, { delay = 0 } = {}) {
        node.style.transitionDelay = `${delay}ms`;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                    else entry.target.classList.remove('visible');
                });
            },
            { threshold: 0.1 }
        );
        observer.observe(node);
        return { destroy() { observer.disconnect(); } };
    }
</script>

<article class="course-card" use:reveal>
    <div class="course-header">
        <span class="course-icon">{icon}</span>
        <div class="course-meta">
            <span class="badge" style="background:{badge.bg}; color:{badge.text}">{level}</span>
            <span class="meta-item">⏱ {duration}</span>
            <span class="meta-item price">💰 {price}</span>
        </div>
    </div>

    <h3 class="course-title">{title}</h3>

    {#if description}
        <p class="course-description">{description}</p>
    {/if}

    {#if topics.length > 0}
        <div class="topics">
            <h4>Co se naučíte</h4>
            <ul>
                {#each topics as topic}
                    <li>{topic}</li>
                {/each}
            </ul>
        </div>
    {/if}

    <a href={ctaHref} class="course-btn">{ctaLabel}</a>
</article>

<style>
    .course-card {
        background: #fff;
        border: 1px solid #ede9f7;
        border-radius: 16px;
        padding: 2rem 1.75rem;
        box-shadow: 0 2px 16px rgba(118, 23, 156, 0.07);
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        opacity: 0;
        transform: translateY(36px);
        transition: opacity 0.7s ease, transform 0.7s ease, box-shadow 0.3s ease;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .course-card:global(.visible) {
        opacity: 1;
        transform: translateY(0);
    }

    .course-card:hover {
        box-shadow: 0 10px 32px rgba(118, 23, 156, 0.16);
    }

    /* ── header ── */
    .course-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .course-icon {
        font-size: 2.8rem;
        line-height: 1;
        flex-shrink: 0;
    }

    .course-meta {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        flex-wrap: wrap;
    }

    .badge {
        font-size: 0.75rem;
        font-weight: 600;
        padding: 0.25rem 0.65rem;
        border-radius: 999px;
        letter-spacing: 0.03em;
        text-transform: uppercase;
    }

    .meta-item {
        font-size: 0.85rem;
        color: #666;
    }

    .price {
        font-weight: 600;
        color: #76179C;
    }

    /* ── title ── */
    .course-title {
        font-size: 1.35rem;
        font-weight: 700;
        color: #2d0042;
        margin: 0;
        line-height: 1.3;
    }

    /* ── description ── */
    .course-description {
        color: #555;
        line-height: 1.7;
        margin: 0;
        font-size: 0.95rem;
    }

    /* ── topics ── */
    .topics h4 {
        font-size: 0.8rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.07em;
        color: #9B2EC8;
        margin: 0 0 0.6rem;
    }

    .topics ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 0.4rem 1rem;
    }

    .topics li {
        font-size: 0.9rem;
        color: #444;
        padding-left: 1.25rem;
        position: relative;
        line-height: 1.5;
    }

    .topics li::before {
        content: '✦';
        position: absolute;
        left: 0;
        color: #9B2EC8;
        font-size: 0.6rem;
        top: 0.45rem;
    }

    /* ── CTA ── */
    .course-btn {
        display: inline-block;
        margin-top: auto;
        align-self: flex-start;
        padding: 0.65rem 1.6rem;
        background: linear-gradient(135deg, #9B2EC8 0%, #76179C 100%);
        color: #fff;
        border-radius: 8px;
        font-weight: 600;
        font-size: 0.9rem;
        text-decoration: none;
        letter-spacing: 0.02em;
        transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .course-btn:hover {
        opacity: 0.88;
        transform: translateY(-2px);
    }
</style>

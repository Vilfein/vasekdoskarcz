<script>
    let { icon = '📚', title = 'Kurz', description = '', delay = 0, href = '' } = $props();

    function reveal(node, { delay = 0 } = {}) {
        node.style.transitionDelay = `${delay}ms`;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                    else entry.target.classList.remove('visible');
                });
            },
            { threshold: 0.12 }
        );
        observer.observe(node);
        return { destroy() { observer.disconnect(); } };
    }
</script>

<svelte:element this={href ? 'a' : 'div'} {href} class="card" use:reveal={{ delay }}>
    <div class="card-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
</svelte:element>

<style>
    .card {
        background: #fff;
        border: 1px solid #ede9f7;
        border-radius: 12px;
        padding: 2rem 1.5rem;
        text-align: center;
        box-shadow: 0 2px 12px rgba(118, 23, 156, 0.07);
        opacity: 0;
        transform: translateY(36px);
        transition: opacity 0.7s ease, transform 0.7s ease, box-shadow 0.3s ease;
    }

    .card:global(.visible) {
        opacity: 1;
        transform: translateY(0);
    }

    .card:hover {
        box-shadow: 0 8px 28px rgba(118, 23, 156, 0.15);
    }

    a.card {
        display: block;
        text-decoration: none;
        cursor: pointer;
    }

    a.card:hover {
        transform: translateY(-3px);
    }

    .card-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    h3 {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 1.15rem;
        font-weight: 600;
        color: #2d0042;
        margin-bottom: 0.75rem;
    }

    p {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: #555;
        line-height: 1.65;
        font-size: 0.95rem;
        margin: 0;
    }
</style>

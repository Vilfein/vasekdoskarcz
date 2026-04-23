<script>
    const { href, title, onclick } = $props();
</script>

<span class="nav-item">
    <a {href} {onclick}>{title}</a>
</span>

<style>
    .nav-item {
        display: inline-block;
        position: relative;
    }

    a {
        color: #fff;
        text-decoration: none;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 600;
        font-size: 0.95rem;
        letter-spacing: 0.03em;
        transition: color 0.6s ease;
    }

    a:hover {
        color: #e879f9;
    }

    /* animovaná fialová čára pod textem */
    .nav-item::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: -4px;
        left: 0;
        background-color: #e879f9;
        transform: scaleX(0);
        transform-origin: center;
        transition: transform 0.3s ease-out;
    }

    .nav-item:hover::after {
        transform: scaleX(1);
    }
</style>

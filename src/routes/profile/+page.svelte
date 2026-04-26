<script>
    import { goto } from '$app/navigation';
    import { auth } from '$lib/stores/auth.svelte.js';
    import ProfileHero from '$lib/components/ProfileHero.svelte';
    import EnrolledCourses from '$lib/components/EnrolledCourses.svelte';

    $effect(() => {
        if (!auth.user) goto('/login');
    });
</script>

<svelte:head><title>Můj profil</title></svelte:head>

<div class="profile-page">
    <ProfileHero user={auth.user} />
    <div class="content">
        <EnrolledCourses />
    </div>
</div>

<style>
    .profile-page {
        min-height: 100vh;
        background: #f3eeff;
        font-family: 'Segoe UI', system-ui, sans-serif;
    }
    .content {
        max-width: 760px;
        margin: 0 auto;
        padding: 2rem 1.5rem 4rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
</style>

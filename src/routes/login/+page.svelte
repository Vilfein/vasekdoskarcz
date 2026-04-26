<script>
    import { goto } from '$app/navigation';
    import LoginForm from '$lib/components/LoginForm.svelte';
    import { auth } from '$lib/stores/auth.svelte.js';

    async function handleLogin(email, password) {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.message ?? 'Nesprávné přihlašovací údaje');
        }

        const userData = await res.json();
        auth.login(userData);
        goto('/');
    }
</script>

<svelte:head>
    <title>Přihlášení</title>
</svelte:head>

<LoginForm onlogin={handleLogin} />

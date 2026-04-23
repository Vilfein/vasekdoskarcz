<script>
    import { goto } from '$app/navigation';
    import LoginForm from '$lib/components/LoginForm.svelte';

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

        goto('/');
    }
</script>

<svelte:head>
    <title>Přihlášení</title>
</svelte:head>

<LoginForm onlogin={handleLogin} />

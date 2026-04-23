<script>
    import { goto } from '$app/navigation';
    import RegisterForm from '$lib/components/RegisterForm.svelte';

    async function handleRegister(name, email, password) {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.message ?? 'Registrace se nezdařila');
        }

        goto('/login');
    }
</script>

<svelte:head>
    <title>Registrace</title>
</svelte:head>

<RegisterForm onregister={handleRegister} />

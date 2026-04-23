<script>
    /**
     * Props:
     *   onregister(name, email, password) – async callback volaný po validaci;
     *     pokud vyhodí chybu, zobrazí se její .message uživateli.
     */
    let { onregister } = $props();

    let name     = $state('');
    let email    = $state('');
    let password = $state('');
    let confirm  = $state('');
    let touched  = $state({ name: false, email: false, password: false, confirm: false });
    let status      = $state('idle');   // 'idle' | 'loading' | 'error'
    let serverError = $state('');

    function isValidEmail(val) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
    }

    const nameError = $derived(
        touched.name && !name.trim() ? 'Jméno je povinné' : ''
    );

    const emailError = $derived(
        touched.email
            ? !email.trim()
                ? 'E-mail je povinný'
                : !isValidEmail(email)
                  ? 'Zadejte platnou e-mailovou adresu'
                  : ''
            : ''
    );

    const passwordError = $derived(
        touched.password
            ? !password
                ? 'Heslo je povinné'
                : password.length < 8
                  ? 'Heslo musí mít alespoň 8 znaků'
                  : ''
            : ''
    );

    const confirmError = $derived(
        touched.confirm
            ? !confirm
                ? 'Zadejte heslo znovu'
                : confirm !== password
                  ? 'Hesla se neshodují'
                  : ''
            : ''
    );

    const canSubmit = $derived(
        name.trim() &&
        isValidEmail(email) &&
        password.length >= 8 &&
        confirm === password
    );

    async function handleSubmit(e) {
        e.preventDefault();
        touched.name = touched.email = touched.password = touched.confirm = true;
        if (!canSubmit) return;

        status = 'loading';
        serverError = '';

        try {
            await onregister?.(name.trim(), email.trim(), password);
            status = 'idle';
        } catch (err) {
            status = 'error';
            serverError = err?.message ?? 'Registrace se nezdařila. Zkuste to znovu.';
        }
    }
</script>

<div class="register-wrapper">
    <div class="register-card">
        <div class="card-header">
            <span class="icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     width="28" height="28">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <line x1="19" y1="8" x2="19" y2="14"/>
                    <line x1="22" y1="11" x2="16" y2="11"/>
                </svg>
            </span>
            <h2>Registrace</h2>
            <p class="subtitle">Vytvořte si nový účet</p>
        </div>

        <form onsubmit={handleSubmit} novalidate>
            <label class:has-error={nameError}>
                <span>Jméno</span>
                <input
                    type="text"
                    placeholder="Jan Novák"
                    autocomplete="name"
                    bind:value={name}
                    onblur={() => (touched.name = true)}
                    class:input-error={nameError}
                    disabled={status === 'loading'}
                />
                {#if nameError}
                    <span class="error-msg">{nameError}</span>
                {/if}
            </label>

            <label class:has-error={emailError}>
                <span>E-mail</span>
                <input
                    type="email"
                    placeholder="jan@example.cz"
                    autocomplete="email"
                    bind:value={email}
                    onblur={() => (touched.email = true)}
                    class:input-error={emailError}
                    disabled={status === 'loading'}
                />
                {#if emailError}
                    <span class="error-msg">{emailError}</span>
                {/if}
            </label>

            <label class:has-error={passwordError}>
                <span>Heslo</span>
                <input
                    type="password"
                    placeholder="Alespoň 8 znaků"
                    autocomplete="new-password"
                    bind:value={password}
                    onblur={() => (touched.password = true)}
                    class:input-error={passwordError}
                    disabled={status === 'loading'}
                />
                {#if passwordError}
                    <span class="error-msg">{passwordError}</span>
                {/if}
            </label>

            <label class:has-error={confirmError}>
                <span>Potvrdit heslo</span>
                <input
                    type="password"
                    placeholder="Zadejte heslo znovu"
                    autocomplete="new-password"
                    bind:value={confirm}
                    onblur={() => (touched.confirm = true)}
                    class:input-error={confirmError}
                    disabled={status === 'loading'}
                />
                {#if confirmError}
                    <span class="error-msg">{confirmError}</span>
                {/if}
            </label>

            {#if status === 'error'}
                <p class="server-error" role="alert">{serverError}</p>
            {/if}

            <button type="submit" class="btn" disabled={status === 'loading'}>
                {#if status === 'loading'}
                    <span class="spinner" aria-hidden="true"></span>
                    Registruji…
                {:else}
                    Vytvořit účet
                {/if}
            </button>

            <p class="login-hint">
                Již máte účet? <a href="/login">Přihlaste se</a>
            </p>
        </form>
    </div>
</div>

<style>
    .register-wrapper {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(160deg, #1a001a 0%, #2d0042 100%);
        padding: 1.5rem;
    }

    @keyframes card-in {
        from { opacity: 0; transform: translateY(32px); }
        to   { opacity: 1; transform: translateY(0); }
    }

    .register-card {
        width: 100%;
        max-width: 440px;
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 24px 64px rgba(0, 0, 0, 0.35);
        overflow: hidden;
        animation: card-in 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
    }

    /* Hlavička */
    .card-header {
        background: linear-gradient(135deg, #9b2ec8 0%, #76179c 100%);
        padding: 2rem 2rem 1.75rem;
        text-align: center;
        color: #fff;
    }

    .icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 3rem;
        height: 3rem;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 50%;
        margin-bottom: 0.75rem;
    }

    .card-header h2 {
        font-family: 'Segoe UI', system-ui, sans-serif;
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0 0 0.3rem;
        color: #fff;
    }

    .card-header .subtitle {
        font-family: 'Segoe UI', system-ui, sans-serif;
        font-size: 0.88rem;
        color: rgba(255, 255, 255, 0.75);
        margin: 0;
    }

    /* Formulář */
    form {
        display: flex;
        flex-direction: column;
        gap: 1.1rem;
        padding: 2rem;
    }

    label {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        font-family: 'Segoe UI', system-ui, sans-serif;
        font-size: 0.88rem;
        font-weight: 600;
        color: #444;
    }

    label span {
        user-select: none;
    }

    input {
        padding: 0.7rem 1rem;
        border: 1.5px solid #ddd;
        border-radius: 8px;
        font-family: 'Segoe UI', system-ui, sans-serif;
        font-size: 0.95rem;
        color: #222;
        outline: none;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
        background: #fafafa;
    }

    input:focus {
        border-color: #9b2ec8;
        box-shadow: 0 0 0 3px rgba(155, 46, 200, 0.12);
        background: #fff;
    }

    input:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .input-error {
        border-color: #e03131 !important;
    }

    .input-error:focus {
        box-shadow: 0 0 0 3px rgba(224, 49, 49, 0.12) !important;
    }

    .error-msg {
        font-size: 0.8rem;
        font-weight: 400;
        color: #e03131;
    }

    .server-error {
        background: #fff5f5;
        border: 1px solid #ffc9c9;
        color: #c92a2a;
        border-radius: 8px;
        padding: 0.7rem 1rem;
        font-family: 'Segoe UI', system-ui, sans-serif;
        font-size: 0.88rem;
        margin: 0;
    }

    .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.8rem;
        background: linear-gradient(135deg, #9b2ec8 0%, #76179c 100%);
        color: #fff;
        font-family: 'Segoe UI', system-ui, sans-serif;
        font-size: 0.95rem;
        font-weight: 600;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        box-shadow: 0 4px 14px rgba(155, 46, 200, 0.35);
        margin-top: 0.25rem;
    }

    .btn:hover:not(:disabled) {
        opacity: 0.9;
        transform: translateY(-1px);
        box-shadow: 0 6px 20px rgba(155, 46, 200, 0.45);
    }

    .btn:disabled {
        opacity: 0.65;
        cursor: not-allowed;
        transform: none;
    }

    .spinner {
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.35);
        border-top-color: #fff;
        border-radius: 50%;
        animation: spin 0.7s linear infinite;
        flex-shrink: 0;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .login-hint {
        text-align: center;
        font-family: 'Segoe UI', system-ui, sans-serif;
        font-size: 0.85rem;
        color: #888;
        margin: 0;
    }

    .login-hint a {
        color: #9b2ec8;
        font-weight: 600;
        text-decoration: none;
    }

    .login-hint a:hover {
        text-decoration: underline;
    }

    @media (max-width: 480px) {
        .register-card {
            border-radius: 12px;
        }

        .card-header {
            padding: 1.5rem 1.5rem 1.25rem;
        }

        form {
            padding: 1.5rem;
        }
    }
</style>

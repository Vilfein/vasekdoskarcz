<script>
    /**
     * Props:
     *   onlogin(email, password) – async callback volaný po validaci;
     *     pokud vyhodí chybu, zobrazí se její .message uživateli.
     */
    let { onlogin } = $props();

    let email    = $state('');
    let password = $state('');
    let touched  = $state({ email: false, password: false });
    let status   = $state('idle');   // 'idle' | 'loading' | 'error'
    let serverError = $state('');

    function isValidEmail(val) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
    }

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
                : password.length < 6
                  ? 'Heslo musí mít alespoň 6 znaků'
                  : ''
            : ''
    );

    const canSubmit = $derived(
        isValidEmail(email) && password.length >= 6
    );

    async function handleSubmit(e) {
        e.preventDefault();
        touched.email = touched.password = true;
        if (!canSubmit) return;

        status = 'loading';
        serverError = '';

        try {
            await onlogin?.(email.trim(), password);
            status = 'idle';
        } catch (err) {
            status = 'error';
            serverError = err?.message ?? 'Přihlášení se nezdařilo. Zkuste to znovu.';
        }
    }
</script>

<div class="login-wrapper">
    <div class="login-card">
        <div class="card-header">
            <span class="lock-icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     width="28" height="28">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
            </span>
            <h2>Přihlášení</h2>
            <p class="subtitle">Zadejte své přihlašovací údaje</p>
        </div>

        <form onsubmit={handleSubmit} novalidate>
            <label class:has-error={emailError}>
                <span>E-mail</span>
                <input
                    type="email"
                    placeholder="vas@example.cz"
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
                    placeholder="••••••••"
                    autocomplete="current-password"
                    bind:value={password}
                    onblur={() => (touched.password = true)}
                    class:input-error={passwordError}
                    disabled={status === 'loading'}
                />
                {#if passwordError}
                    <span class="error-msg">{passwordError}</span>
                {/if}
            </label>

            {#if status === 'error'}
                <p class="server-error" role="alert">{serverError}</p>
            {/if}

            <button type="submit" class="btn" disabled={status === 'loading'}>
                {#if status === 'loading'}
                    <span class="spinner" aria-hidden="true"></span>
                    Přihlašuji…
                {:else}
                    Přihlásit se
                {/if}
            </button>

            <p class="register-hint">
                Nemáte účet? <a href="/register">Zaregistrujte se</a>
            </p>
        </form>
    </div>
</div>

<style>
    .login-wrapper {
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

    .login-card {
        width: 100%;
        max-width: 420px;
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

    .lock-icon {
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

    /* Loading spinner */
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

    .register-hint {
        text-align: center;
        font-family: 'Segoe UI', system-ui, sans-serif;
        font-size: 0.85rem;
        color: #888;
        margin: 0;
    }

    .register-hint a {
        color: #9b2ec8;
        font-weight: 600;
        text-decoration: none;
    }

    .register-hint a:hover {
        text-decoration: underline;
    }

    @media (max-width: 480px) {
        .login-card {
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

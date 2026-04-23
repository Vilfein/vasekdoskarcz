<script>
    function reveal(node, { delay = 0 } = {}) {
        node.style.transitionDelay = `${delay}ms`;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    } else {
                        entry.target.classList.remove("visible");
                    }
                });
            },
            { threshold: 0.12 },
        );

        observer.observe(node);

        return {
            destroy() {
                observer.disconnect();
            },
        };
    }

    let name = $state("");
    let email = $state("");
    let message = $state("");
    let honeypot = $state(""); // bot trap – hidden from real users

    let touched = $state({ name: false, email: false, message: false });
    let formState = $state("idle"); // 'idle' | 'sending' | 'success' | 'error'
    const loadedAt = Date.now();

    function isValidEmail(val) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
    }

    const nameError = $derived(
        touched.name && !name.trim() ? "Jméno je povinné" : "",
    );
    const emailError = $derived(
        touched.email
            ? !email.trim()
                ? "E-mail je povinný"
                : !isValidEmail(email)
                  ? "Zadejte platnou e-mailovou adresu"
                  : ""
            : "",
    );
    const messageError = $derived(
        touched.message && !message.trim() ? "Zpráva je povinná" : "",
    );

    function isValid() {
        return name.trim() && isValidEmail(email) && message.trim();
    }

    async function handleSubmit(e) {
        e.preventDefault();
        touched.name = touched.email = touched.message = true;

        // Bot protection: honeypot must stay empty
        if (honeypot) return;

        // Bot protection: real users take more than 1.5 s to fill the form
        if (Date.now() - loadedAt < 1500) return;

        if (!isValid()) return;

        formState = "sending";
        try {
            // Replace the URL with your Formspree / Web3Forms endpoint
            const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, message }),
            });
            formState = res.ok ? "success" : "error";
        } catch {
            formState = "error";
        }
    }
</script>

<section id="JumpForm" class="section">
    <div class="container">
        <h2 use:reveal>Kontakt</h2>

        {#if formState === "success"}
            <p class="form-feedback success" use:reveal>
                Zpráva byla odeslána. Ozvu se co nejdříve!
            </p>
        {:else}
            <form
                class="contact-form"
                use:reveal
                onsubmit={handleSubmit}
                novalidate
            >
                <!-- Honeypot: hidden from users, bots fill it in -->
                <div class="hp-field" aria-hidden="true">
                    <label
                        >Nevyplňujte toto pole
                        <input
                            type="text"
                            name="_gotcha"
                            tabindex="-1"
                            autocomplete="off"
                            bind:value={honeypot}
                        />
                    </label>
                </div>

                <div class="form-row">
                    <label class:has-error={nameError}>
                        Jméno
                        <input
                            type="text"
                            placeholder="Jan Novák"
                            bind:value={name}
                            onblur={() => (touched.name = true)}
                            class:input-error={nameError}
                        />
                        {#if nameError}<span class="error-msg">{nameError}</span
                            >{/if}
                    </label>
                    <label class:has-error={emailError}>
                        E-mail
                        <input
                            type="email"
                            placeholder="jan@novak.cz"
                            bind:value={email}
                            onblur={() => (touched.email = true)}
                            class:input-error={emailError}
                        />
                        {#if emailError}<span class="error-msg"
                                >{emailError}</span
                            >{/if}
                    </label>
                </div>

                <label class:has-error={messageError}>
                    Zpráva
                    <textarea
                        rows="5"
                        placeholder="Napište mi..."
                        bind:value={message}
                        onblur={() => (touched.message = true)}
                        class:input-error={messageError}
                    ></textarea>
                    {#if messageError}<span class="error-msg"
                            >{messageError}</span
                        >{/if}
                </label>

                {#if formState === "error"}
                    <p class="form-feedback error">
                        Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.
                    </p>
                {/if}

                <button
                    type="submit"
                    class="btn"
                    disabled={formState === "sending"}
                >
                    {formState === "sending" ? "Odesílám…" : "Odeslat"}
                </button>
            </form>
        {/if}
    </div>
</section>

<style>
    .section {
        padding: 6rem 1.5rem;
    }

    .container {
        max-width: 1100px;
        margin: 0 auto;
    }

    h2 {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        font-size: 2rem;
        font-weight: 700;
        color: #76179c;
        text-align: center;
        margin-bottom: 3rem;
        opacity: 0;
        transform: translateY(36px);
        transition:
            opacity 0.7s ease,
            transform 0.7s ease;
    }

    h2:global(.visible) {
        opacity: 1;
        transform: translateY(0);
    }

    .contact-form {
        max-width: 680px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        opacity: 0;
        transform: translateY(36px);
        transition:
            opacity 0.7s ease,
            transform 0.7s ease;
    }

    .contact-form:global(.visible) {
        opacity: 1;
        transform: translateY(0);
    }

    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.25rem;
    }

    label {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        font-size: 0.9rem;
        font-weight: 600;
        color: #333;
    }

    input,
    textarea {
        padding: 0.7rem 1rem;
        border: 1.5px solid #ddd;
        border-radius: 8px;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        font-size: 0.95rem;
        color: #222;
        transition: border-color 0.25s ease;
        outline: none;
        resize: vertical;
    }

    input:focus,
    textarea:focus {
        border-color: #9b2ec8;
    }

    .btn {
        display: inline-block;
        background: linear-gradient(135deg, #9b2ec8 0%, #76179c 100%);
        color: #fff;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 600;
        font-size: 0.95rem;
        padding: 0.75rem 2rem;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        text-decoration: none;
        transition:
            opacity 0.25s ease,
            transform 0.25s ease;
        align-self: flex-start;
    }

    .btn:hover {
        opacity: 0.88;
        transform: translateY(-2px);
    }

    .btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }

    .input-error {
        border-color: #e03131 !important;
    }

    .error-msg {
        font-size: 0.8rem;
        font-weight: 400;
        color: #e03131;
    }

    .form-feedback {
        max-width: 680px;
        margin: 0 auto;
        padding: 1rem 1.25rem;
        border-radius: 8px;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        font-size: 0.95rem;
        text-align: center;
    }

    .form-feedback.success {
        background: #ebfbee;
        color: #2b8a3e;
        opacity: 0;
        transform: translateY(36px);
        transition:
            opacity 0.7s ease,
            transform 0.7s ease;
    }

    .form-feedback.success:global(.visible) {
        opacity: 1;
        transform: translateY(0);
    }

    .form-feedback.error {
        background: #fff5f5;
        color: #c92a2a;
    }

    /* Honeypot – visually hidden but accessible to bots */
    .hp-field {
        position: absolute;
        left: -9999px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    }

    @media (max-width: 768px) {
        .section {
            padding: 4rem 1.25rem;
        }

        .form-row {
            grid-template-columns: 1fr;
        }
    }
</style>

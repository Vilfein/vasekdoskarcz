<script>
	const year = new Date().getFullYear();

	const footerLinks = [
		{ label: 'Kurzy', url: '/kurzy' },
		{ label: 'O mně', url: '/o-mne' },
		{ label: 'Kontakt', url: '/kontakt' },
		{ label: 'Ochrana osobních údajů', url: '/gdpr' },
		{ label: 'Obchodní podmínky', url: '/podminky' }
	];
</script>

<footer>
	<div class="footer-inner">

		<!-- Sloupec 1: Identita -->
		<div class="footer-brand">
			<span class="brand-name">Václav Lektor</span>
			<p class="brand-tagline">Lektor C# a .NET technologií.<br />Školím od roku 2014.</p>
			<p class="brand-ico">IČO: 12345678</p>
		</div>

		<!-- Sloupec 2: Navigace -->
		<div class="footer-nav">
			<h4>Rychlé odkazy</h4>
			<ul>
				{#each footerLinks as link}
					<li><a href={link.url}>{link.label}</a></li>
				{/each}
			</ul>
		</div>

		<!-- Sloupec 3: Kontakt + sítě -->
		<div class="footer-contact">
			<h4>Kontakt</h4>
			<a href="mailto:vas@vaseklektor.cz" class="email-link">vas@vaseklektor.cz</a>

			<div class="social-row">
				<!-- LinkedIn -->
				<a href="https://linkedin.com/in/..." title="LinkedIn" class="social-icon" target="_blank" rel="noopener">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
						<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
					</svg>
				</a>
				<!-- GitHub -->
				<a href="https://github.com/..." title="GitHub" class="social-icon" target="_blank" rel="noopener">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
						<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
					</svg>
				</a>
			</div>
		</div>

	</div>

	<div class="footer-bottom">
		<p>&copy; {year} Václav Lektor · Všechna práva vyhrazena</p>
	</div>
</footer>

<style>
	/* Catppuccin Mocha */
	footer {
		background-color: #181825; /* mantle */
		color: #cdd6f4;            /* text */
		border-top: 1px solid #313244; /* surface0 */
		padding: 3rem 1.5rem 1.5rem;
		font-family: 'Segoe UI', system-ui, sans-serif;
	}

	.footer-inner {
		max-width: 1100px;
		margin: 0 auto 2.5rem;
		display: grid;
		grid-template-columns: 1.5fr 1fr 1fr;
		gap: 3rem;
	}

	/* Brand */
	.brand-name {
		display: block;
		font-size: 1.2rem;
		font-weight: 700;
		color: #b4befe; /* lavender */
		margin-bottom: 0.75rem;
		letter-spacing: 0.02em;
	}

	.brand-tagline {
		font-size: 0.88rem;
		color: #a6adc8; /* subtext0 */
		line-height: 1.6;
		margin: 0 0 0.75rem;
	}

	.brand-ico {
		font-size: 0.82rem;
		color: #585b70; /* overlay0 */
		margin: 0;
	}

	/* Nav */
	h4 {
		font-size: 0.78rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #585b70; /* overlay0 */
		margin: 0 0 1rem;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li { margin-bottom: 0.6rem; }

	a {
		color: #a6adc8;
		text-decoration: none;
		font-size: 0.9rem;
		transition: color 0.2s ease;
	}

	a:hover { color: #cdd6f4; }

	/* Contact */
	.email-link {
		display: inline-block;
		color: #89b4fa; /* blue */
		font-size: 0.9rem;
		margin-bottom: 1.25rem;
	}

	.email-link:hover { color: #b4befe; }

	.social-row {
		display: flex;
		gap: 0.75rem;
	}

	.social-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.2rem;
		height: 2.2rem;
		background: #313244; /* surface0 */
		border-radius: 8px;
		color: #a6adc8;
		transition: background 0.2s ease, color 0.2s ease;
	}

	.social-icon:hover {
		background: #45475a; /* surface1 */
		color: #cdd6f4;
	}

	/* Bottom bar */
	.footer-bottom {
		max-width: 1100px;
		margin: 0 auto;
		border-top: 1px solid #313244;
		padding-top: 1.25rem;
		text-align: center;
		font-size: 0.82rem;
		color: #585b70;
	}

	@media (max-width: 768px) {
		.footer-inner {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}
</style>
<script>
	// Můžete zde přidat datové properties
	const year = new Date().getFullYear();
	const socialLinks = [
		{ name: 'GitHub', url: '#', icon: '🐙' },
		{ name: 'Twitter', url: '#', icon: '𝕏' },
		{ name: 'LinkedIn', url: '#', icon: '💼' }
	];

	const footerLinks = [
		{ label: 'O webu', url: '/' },
		{ label: 'Kontakt', url: '/' },
		{ label: 'Soukromí', url: '/' },
		{ label: 'GDPR', url: '/gdpr' },
		{ label: 'Podmínky', url: '/' }
	];
</script>

<footer>
	<div class="footer-content">
		<div class="footer-section">
			<h3>Navigace</h3>
			<ul>
				{#each footerLinks as link}
					<li>
						<a href={link.url}>{link.label}</a>
					</li>
				{/each}
			</ul>
		</div>

		<div class="footer-section">
			<h3>Sociální sítě</h3>
			<div class="social-links">
				{#each socialLinks as social}
					<a href={social.url} title={social.name} class="social-link">
						{social.icon}
					</a>
				{/each}
			</div>
		</div>

		<div class="footer-section">
			<h3>Kontakty</h3>
			<p>
				<a href="mailto:info@example.com">info@example.com</a>
			</p>
		</div>
	</div>

	<div class="footer-bottom">
		<p>&copy; {year} Vasekdoskar.cz. Všechna práva vyhrazena.</p>
	</div>
</footer>

<style>
	footer {
		background: #111;
		color: white;
		padding: 3rem 1rem 1rem;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.footer-content {
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.footer-section h3 {
		font-size: 1.1rem;
		margin-bottom: 1rem;
		font-weight: 600;
	}

	.footer-section ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.footer-section li {
		margin-bottom: 0.7rem;
	}

	.footer-section a {
		color: rgba(255, 255, 255, 0.8);
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.footer-section a:hover {
		color: white;
	}

	.social-links {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		background-color: rgba(255, 255, 255, 0.2);
		border-radius: 50%;
		font-size: 1.2rem;
		transition: all 0.3s ease;
	}

	.social-link:hover {
		background-color: rgba(255, 255, 255, 0.3);
		transform: translateY(-2px);
	}

	.footer-bottom {
		border-top: 1px solid rgba(255, 255, 255, 0.2);
		padding-top: 1.5rem;
		text-align: center;
		color: rgba(255, 255, 255, 0.8);
		font-size: 0.9rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	@media (max-width: 768px) {
		footer {
			padding: 2rem 1rem 1rem;
		}

		.footer-content {
			gap: 1.5rem;
		}

		.footer-section h3 {
			font-size: 1rem;
		}
	}
</style>

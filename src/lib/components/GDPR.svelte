<script>
	const lastUpdated = '23. dubna 2026';
	const contactEmail = 'info@vasekdoskar.cz';
	const siteName = 'Vasekdoskar.cz';
</script>

<section class="gdpr">
	<div class="container">
		<h1>Zásady ochrany osobních údajů (GDPR)</h1>
		<p class="updated">Poslední aktualizace: {lastUpdated}</p>

		<div class="section">
			<h2>1. Správce osobních údajů</h2>
			<p>
				Správcem osobních údajů je provozovatel webu <strong>{siteName}</strong>. V případě
				dotazů ohledně zpracování osobních údajů nás kontaktujte na:
				<a href="mailto:{contactEmail}">{contactEmail}</a>.
			</p>
		</div>

		<div class="section">
			<h2>2. Jaké údaje zpracováváme</h2>
			<p>V závislosti na způsobu využívání webu můžeme zpracovávat následující údaje:</p>
			<ul>
				<li>Identifikační údaje (jméno, příjmení)</li>
				<li>Kontaktní údaje (e-mailová adresa)</li>
				<li>Technické údaje (IP adresa, typ prohlížeče, navštívené stránky)</li>
				<li>Údaje z kontaktního formuláře</li>
			</ul>
		</div>

		<div class="section">
			<h2>3. Účel a právní základ zpracování</h2>
			<p>Osobní údaje zpracováváme na základě:</p>
			<ul>
				<li><strong>Plnění smlouvy</strong> – pokud jste naším zákazníkem nebo klientem</li>
				<li><strong>Oprávněného zájmu</strong> – pro zajištění bezpečnosti a provozu webu</li>
				<li><strong>Souhlasu</strong> – např. pro zasílání newsletteru či marketingových sdělení</li>
				<li><strong>Právní povinnosti</strong> – pokud nám to ukládá zákon</li>
			</ul>
		</div>

		<div class="section">
			<h2>4. Soubory cookie</h2>
			<p>
				Tento web používá soubory cookie ke zlepšení uživatelského zážitku a analýze návštěvnosti.
				Rozlišujeme:
			</p>
			<ul>
				<li><strong>Nezbytné cookies</strong> – zajišťují základní funkce webu</li>
				<li><strong>Analytické cookies</strong> – pomáhají nám pochopit, jak návštěvníci web používají</li>
				<li><strong>Marketingové cookies</strong> – slouží k personalizaci reklam (pouze se souhlasem)</li>
			</ul>
			<p>Souhlas s použitím cookies můžete kdykoli odvolat v nastavení vašeho prohlížeče.</p>
		</div>

		<div class="section">
			<h2>5. Doba uchovávání údajů</h2>
			<p>
				Osobní údaje uchováváme pouze po dobu nezbytně nutnou pro splnění účelu zpracování, nebo po
				dobu stanovenou právními předpisy. Údaje z kontaktního formuláře uchováváme po dobu 2 let,
				pokud nevyplyne jiná zákonná povinnost.
			</p>
		</div>

		<div class="section">
			<h2>6. Příjemci osobních údajů</h2>
			<p>
				Vaše údaje neprodáváme třetím stranám. Mohou být sdíleny s poskytovateli technických služeb
				(hosting, analytika), kteří jsou vázáni smlouvou o zpracování osobních údajů.
			</p>
		</div>

		<div class="section">
			<h2>7. Vaše práva</h2>
			<p>Jako subjekt údajů máte právo:</p>
			<ul>
				<li><strong>Na přístup</strong> – požádat o kopii vašich osobních údajů</li>
				<li><strong>Na opravu</strong> – nechat opravit nepřesné údaje</li>
				<li><strong>Na výmaz</strong> – požádat o smazání vašich údajů („právo být zapomenut")</li>
				<li><strong>Na omezení zpracování</strong> – omezit způsob, jakým vaše data využíváme</li>
				<li><strong>Na přenositelnost</strong> – obdržet vaše data ve strojově čitelném formátu</li>
				<li><strong>Vznést námitku</strong> – proti zpracování na základě oprávněného zájmu</li>
				<li><strong>Odvolat souhlas</strong> – kdykoli bez uvedení důvodu</li>
			</ul>
			<p>
				Žádost lze zaslat na <a href="mailto:{contactEmail}">{contactEmail}</a>. Na vaši žádost
				odpovíme do 30 dnů.
			</p>
		</div>

		<div class="section">
			<h2>8. Stížnosti</h2>
			<p>
				Pokud se domníváte, že zpracování vašich osobních údajů porušuje právní předpisy, máte
				právo podat stížnost u dozorového úřadu – <strong
					>Úřadu pro ochranu osobních údajů (ÚOOÚ)</strong
				>, se sídlem Pplk. Sochora 27, 170 00 Praha 7,
				<a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer">www.uoou.cz</a>.
			</p>
		</div>

		<div class="section">
			<h2>9. Změny zásad</h2>
			<p>
				Vyhrazujeme si právo tyto zásady aktualizovat. O podstatných změnách vás budeme informovat
				prostřednictvím webu. Doporučujeme tuto stránku pravidelně navštěvovat.
			</p>
		</div>
	</div>
</section>

<style>
	.gdpr {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		color: #333;
		padding: 4rem 1rem;
		min-height: 60vh;
	}

	.container {
		max-width: 860px;
		margin: 0 auto;
	}

	h1 {
		font-size: 2rem;
		font-weight: 700;
		background: linear-gradient(135deg, #9B2EC8 0%, #76179C 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 0.5rem;
	}

	.updated {
		color: #888;
		font-size: 0.9rem;
		margin-bottom: 2.5rem;
	}

	.section {
		margin-bottom: 2rem;
		padding: 1.5rem;
		background: #f8f4fc;
		border-left: 4px solid #9B2EC8;
		border-radius: 0 8px 8px 0;
	}

	h2 {
		font-size: 1.15rem;
		font-weight: 600;
		color: #76179C;
		margin-bottom: 0.75rem;
	}

	p {
		line-height: 1.7;
		margin-bottom: 0.5rem;
	}

	ul {
		padding-left: 1.5rem;
		margin: 0.5rem 0;
	}

	li {
		line-height: 1.7;
		margin-bottom: 0.25rem;
	}

	a {
		color: #9B2EC8;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
		color: #76179C;
	}

	@media (max-width: 768px) {
		.gdpr {
			padding: 2rem 1rem;
		}

		h1 {
			font-size: 1.5rem;
		}

		.section {
			padding: 1rem;
		}
	}
</style>

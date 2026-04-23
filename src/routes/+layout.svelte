<script>
	import favicon from "$lib/assets/favicon.svg";
	import Footer from "$lib/components/Footer.svelte";
	import NavMenu from "$lib/components/NavMenu.svelte";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<NavMenu>
	<div class="layout">
		<main>{@render children()}</main>
		<Footer />
	</div>
</NavMenu>

<style>
	:global(html) {
		margin: 0;
		padding: 0;
		scrollbar-gutter: stable;
	}

	:global(body) {
		margin: 0;
		padding: 0;
	}

	.layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
	}
</style>

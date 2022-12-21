<script>
	import Navigation from '../components/Nav/Navigation.svelte';
	import Footer from '../components/Foot/Footer.svelte';
	import '../app.css';
	import Header from '../components/Header/Header.svelte';
</script>

<main class="h-full flex flex-col">
	<Header />
	<Navigation />
	<div class="flex-1 bg-orange-200 overflow-auto w-full">
		<div class="flex w-full" style="min-height: min-content;">
			<slot />
		</div>
	</div>
	<Footer />
</main>

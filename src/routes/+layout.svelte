<script lang="ts">
	import Navigation from '../components/Nav/Navigation.svelte';
	import Footer from '../components/Foot/Footer.svelte';
	import '../app.css';
	import Header from '../components/Header/Header.svelte';
</script>

<main class="h-full flex flex-col">
	<Header />
	<Navigation />
	<div class="flex-1 bg-orange-200 overflow-auto w-full">
		<div class="flex w-full h-full overflow-y-auto">
			<slot />
		</div>
	</div>
	<Footer />
</main>

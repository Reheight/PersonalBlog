<script lang="ts">
	import Navigation from "./components/navigation/Navigation.svelte";
    export let selectedPage: Number = 0;
</script>

<div class="w-full h-full flex flex-row bg-gray-300">
    <Navigation bind:selectedNavItem={selectedPage} />

    <div class="flex-1 h-full">
        <slot />
    </div>
</div>
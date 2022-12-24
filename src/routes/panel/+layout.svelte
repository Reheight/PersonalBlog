<script lang="ts">
	import Navigation from "./components/navigation/Navigation.svelte";
</script>

<div class="w-full h-full flex flex-col md:flex-row bg-gray-300">
    <Navigation />

    <div class="flex-1 h-full">
        <slot />
    </div>
</div>
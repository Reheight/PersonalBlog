<script lang="ts">
	import Navigation from "./components/navigation/Navigation.svelte";
</script>

<div class="w-full h-full flex flex-col md:flex-row">
    <Navigation />

    <div class="flex-1 h-full bg-gray-300 overflow-y-scroll pt-2">
        <slot />
    </div>
</div>
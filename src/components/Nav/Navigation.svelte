<script lang="ts">
	import { page } from '$app/stores';
	import NavigationItem from './NavigationItem.svelte';
</script>

{#if $page.data.member}
	<div class="w-full flex flex-row bg-gray-600 justify-between">
		<p class="text-white font-robotomono px-2 py-1 text-xs">
			Welcome back, {$page.data.member.name}
		</p>

		{#if $page.data.member.role === 'ADMINISTRATOR'}
			<div class="text-white font-robotomono px-2 py-1 text-xs">
				<a href="/create">Create</a>
				<span>|</span>
				<a href="/create">Panel</a>
			</div>
		{/if}
	</div>
{/if}
<div class="w-full flex flex-row justify-around bg-gray-800 shadow-lg">
	<NavigationItem path="/">Home</NavigationItem>
	<NavigationItem path="/about">About</NavigationItem>
	<NavigationItem path="/contact">Contact</NavigationItem>
</div>

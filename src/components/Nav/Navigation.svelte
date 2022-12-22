<script lang="ts">
	import { page } from '$app/stores';
	import NavigationItem from './NavigationItem.svelte';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
	import { enhance } from '$app/forms';

	let menuOpen: boolean = false;
</script>

<div class="w-full flex flex-row bg-gray-600 justify-between select-none shadow-sm">
	<div
		class="w-full text-white font-robotomono px-2 py-1 text-xs h-full flex items-center flex-row"
	>
		<p>
			Welcome{#if $page.data.member}, {$page.data.member.name}{:else}, Guest!{/if}
		</p>
	</div>

	{#if $page.data.member}
		<div class="flex flex-row text-xs text-white font-robotomono items-center justify-center mr-1">
			<div
				class="px-2 py-1 flex flex-row justify-center items-center hover:cursor-pointer"
				on:mousedown={() => (menuOpen = !menuOpen)}
			>
				<Fa
					class={`mr-1 ${
						menuOpen ? 'rotate-180' : 'rotate-0'
					} transform-gpu transition-all ease-in-out`}
					icon={faCaretDown}
				/>
				<p class="text-xs">Menu</p>
			</div>
			<span>|</span>
			<form action="/access?/logout" method="POST" class="ml-2" use:enhance>
				<button type="submit">Logout</button>
			</form>
		</div>
		<!-- <div class="text-white font-robotomono px-2 py-1 text-xs">
			<a href="/create">Create</a>
			<span>|</span>
			<a href="/create">Panel</a>
		</div> -->
	{:else}
		<div class="flex flex-row text-xs text-white font-robotomono items-center w-full justify-end">
			<div class="px-2 py-1 flex flex-row justify-center items-center hover:cursor-pointer mr-1">
				<a href="/access" class="text-xs">Login</a>
			</div>
		</div>
	{/if}
</div>
{#if $page.data.member}
	<div
		class={`${
			menuOpen ? 'h-6' : 'h-0'
		} w-full bg-gray-500 text-gray-300 ease-in-out transform-gpu transition-all text-xs overflow-hidden`}
	>
		<div class="flex flex-row h-full items-center px-2 py-1 font-ssp justify-between">
			<div class="flex flex-row">
				<a href="/account" class="px-1 hover:text-white ease-in-out transform-gpu transition-all"
					>Account</a
				>
				<a href="/me" class="px-1 hover:text-white ease-in-out transform-gpu transition-all"
					>Profile</a
				>
				<a href="/me/posts" class="px-1 hover:text-white ease-in-out transform-gpu transition-all"
					>Posts</a
				>
				<a
					href="/me/comments"
					class="px-1 hover:text-white ease-in-out transform-gpu transition-all">Comments</a
				>
				<a href="/me/likes" class="px-1 hover:text-white ease-in-out transform-gpu transition-all"
					>Likes</a
				>
			</div>
			{#if $page.data.member.role === 'AUTHOR' || $page.data.member.role === 'ADMINISTRATOR'}
				<div class="flex flex-row">
					<a
						href="/me/posts/create"
						class="px-1 hover:text-white ease-in-out transform-gpu transition-all">New Post</a
					>
					{#if $page.data.member.role === 'ADMINISTRATOR'}
						<a href="/panel" class="px-1 hover:text-white ease-in-out transform-gpu transition-all"
							>Panel</a
						>
					{/if}
				</div>
			{/if}
		</div>
	</div>
{/if}
<div class="w-full flex flex-row justify-around bg-gray-800 shadow-lg">
	<NavigationItem path="/">Home</NavigationItem>
	<NavigationItem path="/about">About</NavigationItem>
	<NavigationItem path="/contact">Contact</NavigationItem>
</div>

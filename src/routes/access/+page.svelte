<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { redirect } from '@sveltejs/kit';

	import LoginPrompt from '../../components/LoginPrompt/LoginPrompt.svelte';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<svelte:head>
	<title>Programmers Daily | Access</title>
	<meta name="robots" content="noindex nofollow" />
</svelte:head>

<div class="flex flex-col h-full w-full">
	<div class="bg-red-400 mt-2 mx-2 rounded-sm flex flex-row shadow">
		<h3 class="font-ssp text-gray-900 font-semibold p-3 border-r-2 my-1 mr-2 border-black">
			Warning
		</h3>
		<p class="text-gray-900 font-montserrat self-center p-0 m-0">
			This page is a protected resource, you must be provided an account by an administrator to
			access this section.
		</p>
	</div>

	<LoginPrompt />

	{#if form?.error}
		<div class="w-full flex justify-center item-center">
			<div class="bg-orange-300 w-3/6 p-2 rounded-md shadow">
				<div class="bg-red-400 rounded-sm overflow-hidden p-2">
					<h4>Woah!</h4>
					<p>{form?.data}</p>
				</div>
			</div>
		</div>
	{/if}
</div>

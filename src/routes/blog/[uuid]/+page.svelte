<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="w-full m-3 bg-orange-300 rounded-sm shadow-sm text-white">
	<div class="text-gray-800 flex flex-col justify-center m-2">
		<h1 class="font-montserrat flex-1 text-2xl uppercase font-extrabold">{data.subject}</h1>
		<div class="flex flex-row justify-between items-center text-gray-600">
			<span>By, {data.author.name} (@{data.author.username})</span>
			<span
				>{new Date(data.createdAt).toLocaleDateString(undefined, {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}</span
			>
		</div>
	</div>
	<div class="m-2 p-2 bg-orange-400 rounded-md relative overflow-hidden">
		{@html data.content}
	</div>
	<div
		class="m-2 bg-gray-500 rounded-sm overflow-hidden hover outline-2 outline-orange-400 text-gray-600"
	>
		<form action="?/comment" class="flex flex-row w-full overflow-hidden" method="post" use:enhance>
			<input
				type="text"
				name="comment"
				placeholder="Comments coming soon..."
				disabled
				id="comment"
				class="flex-1 h-full p-1"
			/>
			<button
				type="submit"
				class="rounded-tr-sm rounded-br-sm text-white px-2 ease-in-out transition-all transform-gpu hover:bg-gray-900"
				disabled>Send</button
			>
		</form>
	</div>
</div>

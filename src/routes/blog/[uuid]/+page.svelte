<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="w-full m-3 bg-orange-300 rounded-sm shadow-sm text-white">
	<div class="text-gray-800 flex flex-col justify-center m-2">
		<h1 class="font-montserrat flex-1 text-2xl uppercase font-extrabold">{data.subject}</h1>
		<div class="flex flex-row justify-between items-center text-gray-600">
			<span>By, <a href={`/profile/@${data.author.username}`}>{data.author.name} (@{data.author.username})</a></span>
			<span
				>{new Date(data.createdAt).toLocaleDateString(undefined, {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}</span
			>
		</div>
	</div>
	<div class="m-2 p-2 border-2 border-orange-200 bg-orange-400 rounded-md relative overflow-hidden">
		{@html data.content}
	</div>
	<hr class="border-orange-200" />
	{#if $page.data.member}
	<div
		class="m-2 bg-gray-500 rounded-sm overflow-hidden hover outline-2 outline-orange-400 text-gray-600"
	>
		<form action="?/comment" class="flex flex-row w-full overflow-hidden border-2 border-orange-200" method="post">
			<input
				type="text"
				name="comment"
				placeholder="Comment"
				id="comment"
				class="flex-1 outline-none h-full py-1 px-2 text-gray-100 placeholder-gray-100 bg-orange-400"
			/>
			<button
				type="submit"
				class="rounded-tr-sm rounded-br-sm text-white px-2 ease-in-out transition-all transform-gpu hover:bg-gray-800"
				>Send</button
			>
		</form>
	</div>
	{/if}
	<div class="m-2 bg-orange-200 rounded-sm p-1 text-gray-700">
		{#if data.comments}
		{#each data.comments as comment}
		<div class="flex flex-row p-1 bg-orange-300 m-1 rounded-sm items-center">
			<div class="py-1 px-2 rounded-sm bg-orange-200 mr-2">
				<a href={`/profile/@${comment.author.username}`} class="text-base">{comment.author.name}</a>
				<p class="text-sm">{new Date(comment.createdAt).toLocaleDateString(undefined, {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					hour: "numeric",
					minute: "numeric"
				})}</p>
			</div>
			<p>{comment.content}</p>
		</div>
		{/each}
		{:else}
		<p>It seems a bit lonely in here, send a comment!</p>
		{/if}
	</div>
</div>

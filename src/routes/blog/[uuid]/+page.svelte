<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { faTimes } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;

	import { Viewer } from 'bytemd';
	import gfm from '@bytemd/plugin-gfm';
	import fm from "@bytemd/plugin-frontmatter";
	import gm from "@bytemd/plugin-gemoji";
	import hl from "@bytemd/plugin-highlight";
	import mt from "@bytemd/plugin-math";
	import mz from "@bytemd/plugin-medium-zoom";
	import mm from "@bytemd/plugin-mermaid";

	const plugins = [
		gfm(),
		fm(),
		gm(),
		hl(),
		mt(),
		mz(),
		mm()
	]
</script>


<div class="w-full p-3">
	<div class="w-full p-1 bg-orange-300 rounded-sm shadow-sm text-white">
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
			<Viewer {plugins} value={data.content} />
		</div>
		{#if $page.data.member}
		<hr class="border-orange-200" />
		<div
			class="m-2 bg-gray-500 rounded-sm overflow-hidden hover outline-2 outline-orange-400 text-gray-600"
		>
			<form action="?/comment" class="flex flex-row w-full overflow-hidden border-2 border-orange-200" method="post" use:enhance on:submit={async (event) => {
				event.target?.reset();
			}}>
				<input
					type="text"
					name="comment"
					placeholder="Comment"
					id="comment"
					class="flex-1 outline-none h-full py-1 rounded-none px-2 text-gray-100 placeholder-gray-100 bg-orange-400"
				/>
				<button
					type="submit"
					class="rounded-tr-sm rounded-br-sm text-white px-2 ease-in-out transition-all transform-gpu hover:bg-gray-800"
				>Send</button>
			</form>
		</div>
		{/if}
	</div>
	
	<div class="w-full bg-orange-300 my-1 py-1 px-1 rounded-sm">
		<h1 class="mx-2 my-1 text-lg font-montserrat">Comments</h1>
		<div class="m-2 bg-orange-200 rounded-sm p-1 text-gray-700">
			{#if data.comments}
			{#each data.comments as comment, i}
			<div class="flex flex-row p-1 mt-3 bg-orange-100 shadow m-1 rounded-sm items-center relative" id={`${comment.id}`}>
				{#if comment.author.id === $page.data.member?.id || data.author.id === $page.data.member?.id || $page.data.member?.role === "ADMINISTRATOR" }
				<form action="?/deletecomment" method="post" id={`${i}`} use:enhance>
					<input type="hidden" name="comment" value={comment.id}>
					<button type="submit" title="Delete" class="absolute border-4 border-orange-200 -top-1.5 -right-1 text-white bg-red-300 p-1 text-sm rounded-xl px-1.5 eas-in-out transition-all transform-gpu hover:scale-110 hover:bg-red-500"><Fa icon={faTimes} /></button>
				</form>
				{/if}
				<div class="py-1 px-2 rounded-sm bg-orange-200 mr-2 w-[200px] sm:w-[300px] lg:w-[350px] m overflow-hidden">
					<div class="flex flex-row justify-between items-center font-montserrat text-gray-900">
						<a href={`/profile/@${comment.author.username}`} class=" text-base whitespace-nowrap truncate">{comment.author.name}</a>
						{#if comment.author.id === data.author.id}<span class="ml-2 px-1 py-[1.5px] text-xs flex justify-center items-center rounded-sm bg-gray-600 text-gray-100">OP</span>{/if}	
					</div>
		
					<p class="text-sm whitespace-nowrap truncate font-montserrat">{new Date(comment.createdAt).toLocaleDateString(undefined, {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
						hour: "numeric",
						minute: "numeric"
					})}</p>
				</div>
				<p class="flex flex-row self-start font-robotomono text-sm py-2 mr-3">{comment.content}</p>
			</div>
			{/each}
			{:else}
			<p>It seems a bit lonely in here, send a comment!</p>
			{/if}
		</div>
	</div>
</div>
<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const blog = data;

	import 'bytemd/dist/index.css';
	import { enhance } from '$app/forms';

	import { Editor } from 'bytemd';
	import gfm from '@bytemd/plugin-gfm';
	import fm from '@bytemd/plugin-frontmatter';
	import gm from '@bytemd/plugin-gemoji';
	import hl from '@bytemd/plugin-highlight';
	import mt from '@bytemd/plugin-math';
	import mz from '@bytemd/plugin-medium-zoom';
	import mm from '@bytemd/plugin-mermaid';

	let value = data.post.content;
	const plugins = [gfm(), fm(), gm(), hl(), mt(), mz(), mm()];

	function handleChange(e: { detail: { value: string; }; }) {
		value = e.detail.value;
	}

	async function handleImage(e: File[]) {
		const images: any[] = [];
		for (let i = 0; i < e.length; i++) {
			const file = e[i];
			const data = await file.text();

			images.push({
				title: file.name,
				alt: 'Some image',
				url: 'https://i.pinimg.com/550x/85/d4/ae/85d4ae742c390a77c4f8ae318e52c99b.jpg'
			});
		}

		return images;
	}

	import MultiSelect from '../../components/MultiSelect.svelte';
	let selectedTags: string[] = data.post.tags.map(p => p.tag.id);

	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<svelte:head>
	<title>Progammers Daily | Modify Post</title>
</svelte:head>

<div class="w-full flex justify-center items-center">
	<div class="w-3/4 bg-orange-300 p-2 m-2 rounded-md">
		<h1 class="m-1 p-1 font-robotomono uppercase font-bold">Modify Post</h1>
		<form
			action="?/modify"
			class="flex flex-col m-2 p-2 bg-orange-400 rounded-sm"
			method="post"
			use:enhance
		>
			<input type="hidden" name="id" value={data.post.id} />
			<input
				class="outline-none rounded-sm p-1 mb-1"
				type="text"
				name="subject"
				id="subject"
				placeholder="Title/Subject"
				value={data.post.subject}
			/>

			<input type="hidden" name="tags" bind:value={selectedTags} />

			<MultiSelect id="tagselect" placeholder="Select your tags..." bind:selectedValues={selectedTags} providedValues={data.tags.map(d => ({ name: d.name, value: d.id }))} />

			<input type="hidden" name="content" {value} />
			<select name="category" class="mb-1" value={data.post.category.id}>
				{#each data.categories as category}
					<option value={category.id}>
						{category.name}
					</option>
				{/each}
			</select>

			<textarea
				name="description"
				placeholder="Description shown on home page..."
				class="rounded-sm outline-none p-1 mb-1 resize-y"
				value={data.post.description}
			/>

			<Editor
				{value}
				{plugins}
				editorConfig={{
					dragDrop: true,
					indentWithTabs: true,
					autocapitalize: true,
					addModeClass: true
				}}
				uploadImages={handleImage}
				on:change={handleChange}
			/>

			<button
				type="submit"
				class="-z-[0] w-full rounded mt-1 p-2 font-robotomono uppercase font-bold bg-gray-500 text-white ease-in-out transform-gpu transition-all hover:bg-gray-400"
				>Save</button
			>
		</form>
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
</div>

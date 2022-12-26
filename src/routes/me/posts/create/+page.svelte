<script lang="ts">
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

	let value = '';
	const plugins = [gfm(), fm(), gm(), hl(), mt(), mz(), mm()];

	/**
	 * @param {{ detail: { value: any; }; }} e
	 */
	async function handleChange(e: { detail: { value: string } }) {
		value = e.detail.value;
	}

	/**
	 *
	 * @param {File[]} e
	 */
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

	import type { PageData } from './$types';
	import MultiSelect from '../components/MultiSelect.svelte';
	export let data: PageData;

	let selectedTags: string[] = [];
</script>

<svelte:head>
	<title>Progammers Daily | Create Post</title>
</svelte:head>

<div class="w-full flex justify-center items-center">
	<div class="w-3/4 bg-orange-300 p-2 m-2 rounded-md">
		<h1 class="m-1 p-1 font-robotomono uppercase font-bold">Create Post</h1>
		<form
			action="?/create"
			class="flex flex-col m-2 p-2 bg-orange-400 rounded-sm"
			method="post"
			use:enhance
		>
			<input
				class="outline-none rounded-sm p-1 mb-1"
				type="text"
				name="subject"
				id="subject"
				placeholder="Title/Subject"
			/>

			<input type="hidden" name="tags" bind:value={selectedTags} />

			<MultiSelect id="tagselect" placeholder="Select your tags..." bind:selectedValues={selectedTags} providedValues={data.data.tags.map(x => ({ name: x.name, value: x.id }))} />

			<input type="hidden" name="content" {value} />
			<select name="category" class="mb-1">
				{#each data.data.categories as category}
					<option value={category.id}>
						{category.name}
					</option>
				{/each}
			</select>

			<textarea
				name="description"
				placeholder="Description shown on home page..."
				class="rounded-sm outline-none p-1 mb-1 resize-y"
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
				>Create</button
			>
		</form>
	</div>
</div>

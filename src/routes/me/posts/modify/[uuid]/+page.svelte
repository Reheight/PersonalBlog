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

	let value = blog.content;
	const plugins = [gfm(), fm(), gm(), hl(), mt(), mz(), mm()];

	/**
	 * @param {{ detail: { value: any; }; }} e
	 */
	function handleChange(e) {
		value = e.detail.value;
	}
</script>

<div class="w-full flex justify-center items-center">
	<div class="w-3/4 bg-orange-300 p-2 m-2 rounded-md">
		<h1 class="m-1 p-1 font-robotomono uppercase font-bold">Modify Post</h1>
		<form
			action="?/modify"
			class="flex flex-col m-2 p-2 bg-orange-400 rounded-sm"
			method="post"
			use:enhance
		>
			<input type="hidden" name="id" value={blog.id} />
			<input
				class="outline-none rounded-sm p-1 mb-1"
				type="text"
				name="subject"
				id="subject"
				placeholder="Title/Subject"
				value={blog.subject}
			/>

			<input type="hidden" name="content" {value} />

			<textarea
				name="description"
				placeholder="Description shown on home page..."
				class="rounded-sm outline-none p-1 mb-1 resize-y"
				value={blog.description}
			/>

			<Editor {value} {plugins} on:change={handleChange} />

			<button
				type="submit"
				class="w-full rounded mt-1 p-2 font-robotomono uppercase font-bold bg-gray-500 text-white ease-in-out transform-gpu transition-all hover:bg-gray-400"
				>Save</button
			>
		</form>
	</div>
</div>

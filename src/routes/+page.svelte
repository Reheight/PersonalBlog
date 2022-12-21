<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';
	import type { ROLE } from '@prisma/client';

	async function fetchBlogs() {
		const res = await fetch('/blogs');

		const response = await res.json();

		let blogs: {
			id: string;
			author: {
				name: string;
				username: string;
				status: boolean;
				role: ROLE;
			};
			content: string;
			createdAt: Date;
			updatedAt: Date;
			status: boolean;
			subject: string;
		}[] = [];

		for (let i = 0; i < response.data.length; i++) {
			const blog: {
				id: string;
				author: {
					name: string;
					username: string;
					status: boolean;
					role: ROLE;
				};
				content: string;
				createdAt: Date;
				updatedAt: Date;
				status: boolean;
				subject: string;
			} = response.data[i];

			blogs.push(blog);
		}

		return blogs;
	}

	$: fetchAllBlogs = fetchBlogs();
</script>

<svelte:head>
	<title>Programmers Daily | Home</title>
	<meta name="robots" content="index follow" />
</svelte:head>

<div class="flex flex-col h-full w-full items-center">
	<div class="w-4/5 bg-orange-300 rounded-md shadow m-5 p-2 grid grid-cols-3 gap-4">
		{#await fetchAllBlogs}
			<p>Loading...</p>
		{:then blogs}
			{#each blogs as blog}
				<div
					class="w-full flex flex-col bg-orange-400 m-2 p-2 rounded-sm ease-in-out transition-all transform-gpu hover:shadow-md hover:cursor-pointer"
				>
					<div class="flex flex-row w-full">
						<h1>{blog.subject}</h1>
						<span>&nbsp;-&nbsp;</span>
						<p>
							{new Date(blog.createdAt).toLocaleDateString(undefined, {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</p>
					</div>
					<div class="flex flex-row items-center my-1">
						<p class="bg-gray-300 px-[5px] py-[1x] rounded-sm">@{blog.author.username}</p>
					</div>
				</div>
			{/each}
		{:catch err}
			<p>{err.message}</p>
		{/await}
	</div>
</div>

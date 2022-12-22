<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';
	import type { ROLE } from '@prisma/client';
	import { faBorderStyle, faPencil } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { page } from '$app/stores';

	async function fetchBlogs() {
		const res = await fetch('/blogs');

		const response = await res.json();

		let blogs: {
			id: string;
			author: {
				id: string;
				name: string;
				username: string;
				status: boolean;
				role: ROLE;
			};
			content: string;
			description: string;
			createdAt: Date;
			updatedAt: Date;
			status: boolean;
			subject: string;
		}[] = [];

		for (let i = 0; i < response.data.length; i++) {
			const blog: {
				id: string;
				author: {
					id: string;
					name: string;
					username: string;
					status: boolean;
					role: ROLE;
				};
				content: string;
				description: string;
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
	<div class="w-4/5 bg-orange-300 rounded-md shadow m-5 p-2 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3">
		{#await fetchAllBlogs}
			<p>Loading...</p>
		{:then blogs}
			{#if blogs.length === 0}
			It's a bit empty right now...
			{/if}
			{#each blogs as blog}
				<div
					class="flex flex-col bg-orange-400 h-64 m-2 p-2 rounded-sm ease-in-out transition-all transform-gpu hover:shadow-md relative"
				>
					{#if  $page.data.member && (blog.author.id === $page.data.member.id || $page.data.member.role === 'ADMINISTRATOR')}
					<div class="absolute -top-4 -right-4 border-orange-400 border-4 p-1.5 bg-orange-200 rounded-3xl scale-75 cursor-pointer hover:scale-90 transition-all transform-gpu ease-in-out hover:shadow-md" on:mousedown={() => {
						location.href = `/me/posts/modify/${blog.id}`;
					}}>
						<Fa icon={faPencil} />
					</div>
					{/if}
					<div class="flex flex-col w-full">
						<div class="flex flex-row justify-between">
							<h4 class="font-robotomono">{blog.subject}</h4>
							<h3 class="font-ssp text-gray-700">{new Date(blog.createdAt).toLocaleDateString(undefined, {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}</h3>
						</div>
					</div>
					<div class="w-full text-gray-700 text-sm truncate max-h-48">
						<div class="overflow-x-hidden overflow-y-auto rounded-sm shadow bg-gray-200 p-2 relative">
							<p class="whitespace-pre-wrap overflow-ellipsis">{blog.description}</p>
						</div>
					</div>
					<div class="flex flex-row items-center my-1 justify-between">
						<a href={`/profile/@${blog.author.username}`} class="bg-gray-300 px-[5px] py-[1x] rounded-sm">@{blog.author.username}</a>
						<a href={`/blog/${blog.id}`}>Read More</a>
					</div>
				</div>
			{/each}
		{:catch err}
			<p>{err.message}</p>
		{/await}
	</div>
</div>

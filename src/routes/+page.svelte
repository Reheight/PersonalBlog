<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';
	import type { ROLE } from '@prisma/client';
	import { faBorderStyle, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { enhance } from '$app/forms';

	async function fetchBlogs() {
		const res = await fetch('/api/blogs');

		const response = await res.json();

		

		return response.data;
	}

	$: fetchAllBlogs = fetchBlogs();

	let query: string = '';
</script>

<svelte:head>
	<title>Programmers Daily | Home</title>
	<meta name="robots" content="index follow" />
</svelte:head>

<div class="flex flex-col w-full h-full">
	<div class="w-full">
		<input type="text" bind:value={query} class="w-full h-full outline-none rounded-none font-poppins p-2 text-orange-300 shadow-lg" placeholder="Search Query..." />
	</div>
	<div class="flex flex-col h-full w-full items-center">
		<div class="w-4/5 bg-orange-300 rounded-md shadow m-5 p-3 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3">
			{#await fetchAllBlogs}
				<p>Loading...</p>
			{:then blogs}
				{#if blogs.length === 0}
				It's a bit empty right now...
				{/if}
				{#each query === '' ? blogs : blogs.filter((b) => b.category.name.toLowerCase().includes(query.toLowerCase()) || b.subject.toLowerCase().includes(query.toLowerCase()) || b.author.name.toLowerCase().includes(query.toLowerCase()) || b.author.role.toLowerCase().includes(query.toLowerCase()) || b.author.username.toLowerCase().includes(query.toLowerCase()) || b.content.toLowerCase().includes(query.toLowerCase()) || b.description.toLowerCase().includes(query.toLowerCase())) as blog}
					<div
						class="flex flex-col bg-orange-400 h-64 m-2 p-2 rounded-sm ease-in-out transition-all transform-gpu hover:shadow-md relative"
					>
						{#if  $page.data.member && (blog.author.id === $page.data.member.id || $page.data.member.role === 'ADMINISTRATOR')}
						<div class="absolute -top-4 -right-4 flex flex-row gap-1">
							<div class="border-orange-400 border-4 p-1.5 bg-orange-200 rounded-3xl scale-100  text-xs h-fit cursor-pointer hover:scale-110 transition-all transform-gpu ease-in-out hover:shadow-md" on:mousedown={() => {
								location.href = `/me/posts/modify/${blog.id}`;
							}}>
								<Fa icon={faPencil} />
							</div>
	
							<form action="?/remove" method="post">
								<input type="hidden" name="id" value={blog.id} />
								<button type="submit" class=" border-orange-400 border-4 p-1.5 bg-orange-200 rounded-3xl scale-100 text-xs h-fit cursor-pointer hover:scale-110 transition-all transform-gpu ease-in-out hover:shadow-md">
									<Fa icon={faTrashCan} />
								</button>
							</form>
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
						<div class="w-full flex-1 text-gray-700 text-sm truncate">
							<div class="h-full overflow-x-hidden overflow-y-auto rounded-sm shadow bg-gray-200 p-2 relative">
								<p class="whitespace-pre-wrap overflow-ellipsis">{blog.description}</p>
							</div>
						</div>
						
						{#if blog.tags.length > 0}
						<div class="flex flex-row gap-1 items-center justify-start my-1 bg-gray-400 rounded-sm p-1 overflow-x-auto">
							{#each blog.tags as tag}
							<div class="px-2 py-1 bg-gray-500 text-white rounded-sm">{tag.tag.name}</div>
							{/each}
						</div>
						{/if}
						<div class="flex flex-row items-center my-1 justify-between gap-4">
							<a href={`/profile/@${blog.author.username}`} class="bg-gray-300 px-[5px] py-[1x] rounded-sm">@{blog.author.username}</a>
							<span class="flex-1 bg-orange-300 h-100 rounded-md px-2 py-0 font-poppins">{blog.category.name}</span>
							<a href={`/blog/${blog.id}`} class="px-2 bg-gray-400 rounded-sm text-white font-poppins">View</a>
						</div>
					</div>
				{/each}
			{:catch err}
				<p>{err.message}</p>
			{/await}
		</div>
	</div>
</div>

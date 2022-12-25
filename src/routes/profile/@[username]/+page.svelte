<script lang="ts">
	import { page } from '$app/stores';
	import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let selectedTab: number = 0;
	let query: string = '';

	function getFilteredPosts() {
		const posts: any[] = data.posts;
		const filteredPosts = posts.filter(
			(x) =>
				x.category.name.toLowerCase().includes(query.toLowerCase()) ||
				x.content.toLowerCase().includes(query.toLowerCase()) ||
				x.description.toLowerCase().includes(query.toLowerCase()) ||
				x.subject.toLowerCase().includes(query.toLowerCase())
		);

		return filteredPosts;
	}

    function getFilteredComments() {
		const comments: any[] = data.comments;
		const filteredComments = comments.filter(
			(x) =>
				x.post.category.name.toLowerCase().includes(query.toLowerCase()) ||
				x.post.subject.toLowerCase().includes(query.toLowerCase()) ||
				x.content.toLowerCase().includes(query.toLowerCase())
		);

		return filteredComments;
	}
</script>

<div class="w-full flex flex-col md:flex-row p-2">
	<div class="mb-2 md:mb-0 md:w-3/12 md:mr-2 h-fit shadow bg-orange-300 rounded-md p-2">
		<div class="flex flex-row justify-between">
			<div class="flex flex-row items-center justify-between w-full">
				<h4 class="font-robotomono uppercase font-bold text-base text-gray-800">{data.name}</h4>
				<h3 class="font-robotomono uppercase font-bold text-xs text-gray-700">@{data.username}</h3>
			</div>
		</div>
	</div>

	<div class="mb-2 md:mb-0 md:w-6/12 md:mr-2 h-fit shadow bg-orange-300 rounded-md p-2">
		<div class="flex flex-row justify-between">
			<div class="flex flex-row items-center mb-1.5">
				<h4 class="font-robotomono uppercase font-bold text-base text-gray-800">Content</h4>
			</div>

			<div class="flex-1 my-1 mb-2 mx-2 flex flex-row w-full">
				<input
					type="text"
					bind:value={query}
					class="w-full h-full border-0 outline-none bg-white rounded-xl text-gray-700 font-poppins px-2"
					placeholder="Search Query..."
				/>
			</div>

			<div class="flex items-center justify-end flex-row-reverse gap-1">
				<p
					class={selectedTab === 0
						? `font-poppins uppercase font-medium p-2 bg-orange-400 rounded-tr-md rounded-tl-md text-white ease-in-out transform-gpu transition-all select-none`
						: `font-poppins uppercase font-medium p-2 bg-orange-200 rounded-tr-md rounded-tl-md text-gray-900 ease-in-out transform-gpu transition-all hover:bg-orange-400 hover:text-white hover:cursor-pointer`}
					on:mousedown={() => (selectedTab = 0)}
				>
					Posts
				</p>

				<p
					class={selectedTab === 1
						? `font-poppins uppercase font-medium p-2 bg-orange-400 rounded-tr-md rounded-tl-md text-white ease-in-out transform-gpu transition-all select-none`
						: `font-poppins uppercase font-medium p-2 bg-orange-200 rounded-tr-md rounded-tl-md text-gray-900 ease-in-out transform-gpu transition-all hover:bg-orange-400 hover:text-white hover:cursor-pointer`}
					on:mousedown={() => (selectedTab = 1)}
				>
					Comments
				</p>
			</div>
		</div>
		<div class="bg-orange-400 rounded-sm w-full p-2 text-white flex flex-col gap-2">
			{#if selectedTab === 0}
				{#if data.posts.length > 0}
					{#each query === '' ? data.posts : getFilteredPosts() as post}
						<div class="w-full">
							<div
								class="flex flex-col bg-orange-300 h-64 m-2 p-2 rounded-sm ease-in-out transition-all transform-gpu hover:shadow-md relative"
							>
								<div class="flex flex-col w-full">
									<div class="flex flex-row justify-between">
										<h4 class="font-robotomono">{post.subject}</h4>
										<h3 class="font-ssp text-gray-700">
											{new Date(post.createdAt).toLocaleDateString(undefined, {
												year: 'numeric',
												month: 'long',
												day: 'numeric'
											})}
										</h3>
									</div>
								</div>
								<div class="w-full flex-1 text-gray-700 text-sm truncate">
									<div
										class="h-full overflow-x-hidden overflow-y-auto rounded-sm shadow bg-gray-200 p-2 relative"
									>
										<p class="whitespace-pre-wrap overflow-ellipsis">{post.description}</p>
									</div>
								</div>

								{#if post.tags.length > 0}
									<div
										class="flex flex-row gap-1 items-center justify-start my-1 bg-gray-400 rounded-sm p-1 overflow-x-auto"
									>
										{#each post.tags as tag}
											<div class="px-2 py-1 bg-gray-500 text-white rounded-sm">{tag.tag.name}</div>
										{/each}
									</div>
								{/if}
								<div class="flex flex-row items-center my-1 justify-between gap-4">
									<span class="flex-1 bg-orange-300 h-100 rounded-md px-0 py-0 font-poppins"
										>{post.category.name}</span
									>
									<a
										href={`/blog/${post.id}`}
										class="px-2 bg-gray-400 rounded-sm text-white font-poppins">View</a
									>
								</div>
							</div>
						</div>
					{/each}
				{:else}
					<p class="font-poppins">It appears that this member has not made any posts yet...</p>
				{/if}
			{/if}

			{#if selectedTab === 1}
				{#if data.comments.length > 0}
                        {#each query === '' ? data.comments : getFilteredComments() as comment}
                        <div class="w-full">
							<div
								class="flex flex-col bg-orange-300 m-2 p-2 rounded-sm ease-in-out transition-all transform-gpu hover:shadow-md relative"
							>
								<div class="flex flex-col w-full">
									<div class="flex flex-row justify-between">
										<h4 class="font-robotomono">{comment.post.subject}</h4>
										<h3 class="font-ssp text-gray-700">
											{new Date(comment.createdAt).toLocaleDateString(undefined, {
												year: 'numeric',
												month: 'long',
												day: 'numeric'
											})}
										</h3>
									</div>
								</div>
								<div class="w-full flex-1 text-gray-700 text-sm truncate">
									<div
										class="h-full overflow-x-hidden overflow-y-auto rounded-sm shadow bg-gray-200 p-2 relative"
									>
										<p class="whitespace-pre-wrap overflow-ellipsis">{comment.content}</p>
									</div>
								</div>
								<div class="flex flex-row items-center my-1 justify-between gap-4">
									<span class="flex-1 bg-orange-300 h-100 rounded-md px-0 py-0 font-poppins"
										>{comment.post.category.name}</span
									>
									<a
										href={`/blog/${comment.post.id}`}
										class="px-2 bg-gray-400 rounded-sm text-white font-poppins">View</a
									>
								</div>
							</div>
						</div>
                        {/each}
                {:else}
					<p class="font-poppins">It appears that this member has not made any comments yet...</p>
				{/if}
			{/if}
		</div>
	</div>

	<div class="md:w-3/12 md:mr-2 h-fit shadow bg-orange-300 rounded-md p-2">
		<div class="flex flex-row justify-between mb-2">
			<div class="flex flex-row items-center justify-between w-full">
				<h4 class="font-robotomono uppercase font-bold text-base text-gray-800">Information</h4>
			</div>
		</div>
		<div class="bg-orange-400 rounded-sm w-full p-2 text-white font-robotomono">
			<div class="w-full mb-2 flex flex-row justify-between items-center">
				<h3 class="text-gray-100">Joined on</h3>
				<p class="text-gray-200 text-sm">
					{new Date(data.createdAt).toLocaleDateString(undefined, {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</p>
			</div>

			<div class="w-full mb-2 flex flex-row justify-between items-center">
				<h3 class="text-gray-100">Updated on</h3>
				<p class="text-gray-200 text-sm">
					{new Date(data.updatedAt).toLocaleDateString(undefined, {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</p>
			</div>

			<div class="w-full flex flex-row justify-between items-center">
				<h3 class="text-gray-100">Role</h3>
				<p class="text-gray-200 text-sm">{data.role}</p>
			</div>
		</div>
	</div>
</div>

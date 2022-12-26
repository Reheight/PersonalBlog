<script lang="ts">
	import { enhance } from '$app/forms';
	import { faLock, faPencil, faTrashCan, faUnlock } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

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
<h1 class="m-4 font-montserrat text-2xl font-bold">Members Panel</h1>
<div class="m-2 flex flex-col">
	{#each data.members as member}
		<div
			class="relative m-2 p-2 bg-gray-400 flex flex-row rounded-md hover:shadow border-2 border-gray-300 hover:border-gray-200 ease-in-out transform-gpu transition-all"
		>
			<div class="flex flex-col p-2 w-2/12 font-poppins">
				<h4 class="text-gray-500 my-[3px]">{member.name}</h4>
				<hr class="border-gray-600" />
				<p class="text-gray-600 my-[3px]">{member.role}</p>
			</div>
			<div class="flex flex-col w-2/12 p-2 font-poppins">
				<h4 class="text-gray-100 my-[3px]">Blog Posts</h4>
				<hr />
				<p class="text-gray-200 my-[3px]">{member.posts.length}</p>
			</div>
			<div class="flex flex-col w-2/12 p-2 font-poppins">
				<h4 class="text-gray-100 my-[3px]">Comments</h4>
				<hr />
				<p class="text-gray-200 my-[3px]">{member.comments.length}</p>
			</div>
			<div class="flex flex-col w-2/12 p-2 font-poppins">
				<h4 class="text-gray-100 my-[3px]">Sessions</h4>
				<hr />
				<p class="text-gray-200 my-[3px]">{member.sessions.length}</p>
			</div>

			<div class="absolute -top-2.5 -right-2.5 bg-orange-300 p-2 rounded-md">
				<div class="flex flex-row h-full w-full">
					<a
						href={`/panel/members/modify/${member.id}`}
						class="text-white bg-orange-400 ease-in-out transform-gpu transition-all hover:bg-orange-500 p-2 rounded-sm mr-1"
					>
						<Fa icon={faPencil} />
					</a>

					{#if member.status === false}
						<form action="?/unlock" method="post" use:enhance>
							<button
								type="submit"
								name="id"
								value={member.id}
								class="text-white bg-orange-400 ease-in-out transform-gpu transition-all hover:bg-orange-500 p-2 rounded-sm mr-1"
							>
								<Fa icon={faUnlock} />
							</button>
						</form>
					{:else}
						<form action="?/lock" method="post" use:enhance>
							<button
								type="submit"
								name="id"
								value={member.id}
								class="text-white bg-orange-400 ease-in-out transform-gpu transition-all hover:bg-orange-500 p-2 rounded-sm mr-1"
							>
								<Fa icon={faLock} />
							</button>
						</form>
					{/if}

					<a
						href={`/panel/members/delete/${member.id}`}
						class="text-white bg-orange-400 ease-in-out transform-gpu transition-all hover:bg-orange-500 p-2 rounded-sm mr-1"
					>
						<Fa icon={faTrashCan} />
					</a>
				</div>
			</div>
		</div>
	{/each}
</div>

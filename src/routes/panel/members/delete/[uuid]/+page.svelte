<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;
	export let form: ActionData;

    let enabled: boolean = false;

	const target = data;
</script>

<div class="w-full flex justify-center items-center">
	<div class="w-3/4 bg-orange-300 p-2 m-2 rounded-md">
		<h1 class="m-1 p-1 font-robotomono uppercase font-bold">Delete Member</h1>
		<form
			action="?/deletemember"
			method="post"
			class="flex flex-col m-2 p-2 bg-orange-400 rounded-sm"
			use:enhance
		>
			<input type="hidden" name="id" value={target.id} />

            <p class="font-robotomono text-gray-100">You are about to delete any and all data that is linked or correlated to '{target.name}' otherwise referred to as '@{target.username}'. This will erase sessions, posts, comments, etc. We recommend just locking the account and ensuring you're not going to lose critical or sensitive information.</p>

            <div class="flex flex-row items-center p-2 my-1 rounded-md bg-red-300 border-2 border-gray-600 text-white">
                <input type="checkbox" name="agree" id="agree" bind:checked={enabled} class="" />
                <label for="agree" class="ml-1 font-">I understand the potential harm, I wish to continue.</label>
            </div>

			<button
				type="submit"
                disabled={!enabled}
				class={`w-full rounded mt-1 p-2 font-robotomono uppercase font-bold bg-red-300 text-white ease-in-out transform-gpu transition-all hover:bg-red-600 ${!enabled && 'cursor-not-allowed'}`}
				>Delete Account</button
			>
		</form>
	</div>
</div>

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

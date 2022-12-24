<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;
	export let form: ActionData;
	const target = data;
</script>

<div class="w-full flex justify-center items-center">
	<div class="w-3/4 bg-orange-300 p-2 m-2 rounded-md">
		<h1 class="m-1 p-1 font-robotomono uppercase font-bold">Modify Member</h1>
		<form
			action="?/modify"
			class="flex flex-col m-2 p-2 bg-orange-400 rounded-sm"
			method="post"
			use:enhance
		>
			<input type="hidden" name="id" value={target.id} />
			<input
				class="outline-none rounded-sm p-1 mb-1"
				type="text"
				name="username"
				id="username"
				placeholder="Username"
				value={target.username}
			/>

			<input
				class="outline-none rounded-sm p-1 mb-1"
				type="text"
				name="name"
				id="name"
				placeholder="Name"
				value={target.name}
			/>

            <input
                class="outline-none rounded-sm p-1 mb-1"
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                value={target.emailAddress}
            />

            <select name="role" id="role" value={target.role} placeholder="Select Role">
                <option value="MEMBER">Member</option>
                <option value="AUTHOR">Author</option>
                <option value="MODERATOR">Moderator</option>
                <option value="ADMINISTRATOR">Administrator</option>
            </select>

			<button
				type="submit"
				class="w-full rounded mt-1 p-2 font-robotomono uppercase font-bold bg-gray-500 text-white ease-in-out transform-gpu transition-all hover:bg-gray-400"
				>Save</button
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

<script>
	import { enhance } from '$app/forms';
</script>

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

			<textarea
				class="outline-none rounded-sm p-1 mb-1 resize-x-none"
				name="content"
				id="content"
				placeholder="Content..."
			/>

			<button type="submit">Create</button>
		</form>
	</div>
</div>

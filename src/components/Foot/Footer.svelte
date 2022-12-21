<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
</script>

<div class="w-full h-8 bg-gray-800 font-ssp text-white flex justify-center items-center">
	&copy; Copyright {new Date().getFullYear()} | Dustin Palmatier
	{#if !$page.data.member} -&nbsp;<a href="/access">Access</a>{/if}
	{#if $page.data.member}-&nbsp;
		<form action="/access?/logout" method="POST" use:enhance>
			<button type="submit">Log Out</button>
		</form>
	{/if}
</div>

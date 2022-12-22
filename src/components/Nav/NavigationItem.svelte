<script lang="ts">
	import { page } from '$app/stores';

	export let path: string;
</script>

<a
	class={$page.route?.id === path
		? 'w-1/5 h-12 flex justify-center items-center text-white uppercase font-robotomono hover:text-orange-400 transform-gpu ease-in-out transition-all border-b-4 border-b-orange-400'
		: 'w-1/5 h-12 flex justify-center items-center text-white uppercase font-robotomono hover:text-orange-400 transform-gpu ease-in-out transition-all hover:border-b-4 hover:border-b-orange-400'}
	href={path}
>
	<slot />
</a>

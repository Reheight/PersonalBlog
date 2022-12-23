<script lang="ts">
	import { page } from "$app/stores";


    export let path: string;
    export let first: boolean = false;
</script>

<li
    on:mousedown={() => location.href = path}
    class={
        $page.route?.id === path ?
        `ease-in-out transform-gpu transition-all w-full p-2 font-robotomono bg-gray-300 text-sm cursor-pointer select-none ${ first !== true && 'mt-2' } rounded-tl-md rounded-bl-md` :
        `ease-in-out transform-gpu transition-all w-full p-2 font-robotomono bg-gray-400 text-sm cursor-pointer select-none ${ first !== true && 'mt-2' } rounded-tl-md rounded-bl-md hover:bg-gray-300`
    }
>
    <slot />
</li>
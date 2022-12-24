<script lang="ts">
	import { page } from "$app/stores";


    export let path: string;
    export let first: boolean = false;
</script>

<a
    href={path}
    class={
        $page.route?.id === path ?
        `${!first && 'ml-2 md:ml-0'} ease-in-out transform-gpu transition-all w-full p-2 font-robotomono bg-gray-300 text-sm cursor-pointer select-none ${ first !== true && 'md:mt-2' } rounded-tl-md rounded-tr-md md:rounded-tr-none md:rounded-bl-md` :
        `${!first && 'ml-2 md:ml-0'} ease-in-out transform-gpu transition-all w-full p-2 font-robotomono bg-gray-400 text-sm cursor-pointer select-none ${ first !== true && 'md:mt-2' } rounded-tl-md rounded-tr-md md:rounded-tr-none md:rounded-bl-md hover:bg-gray-300`
    }
>
    <slot />
</a>
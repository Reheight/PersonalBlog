<script lang="ts">
	import { enhance } from "$app/forms";
	import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
	import Fa from "svelte-fa/src/fa.svelte";
import type { ActionData, PageData } from "./$types";


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

<h1 class="m-4 font-montserrat text-2xl font-bold">Tags Panel</h1>
<div class="m-4 flex">
    <form
        action="?/create"
        method="post"
        use:enhance
        on:submit={async (event) => {
            event.target?.reset();
        }}
        class="w-full flex flex-row gap-2"
    >
        <input type="text" name="name" placeholder="Create Tag" autofocus autocomplete="fuckoff"
            class="w-full px-2 py-1 rounded-md border-2 outline-none font-poppins text-gray-500"
        >
        <button type="submit" class="px-2 py-1 bg-orange-300 border-2 border-orange-200 rounded-md hover:bg-orange-400 ease-in-out transform-gpu transition-all">CREATE</button>
    </form>
</div>
<div class="m-4 flex flex-row gap-4 font-robotomono flex-wrap">
    {#if data.tags.length === 0}
    <p>There are currently no tags available.</p>
    {:else}
    
    {#each data.tags as tag}
    <div class="px-2 py-1 bg-orange-300 rounded-lg relative group h-min ease-in-out transform-gpu transition-all hover:shadow-md">
        <form
            action="?/remove"
            method="post"
            use:enhance
        >
            <input type="hidden" name="id" value={tag.id} />
            <button type="submit" class="p-[5px] text-gray-200 hover:bg-red-600 hidden rounded-3xl group-hover:block absolute ease-in-out transform-gpu transition-all -top-3 -right-3 bg-red-300">
                <Fa icon={faTrashCan} />
            </button>
        </form>
        <p>{tag.name}</p>
    </div>
    {/each}

    {/if}
</div>
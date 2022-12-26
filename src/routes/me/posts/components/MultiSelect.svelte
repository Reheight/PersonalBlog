<script lang="ts">
	import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';

	export let providedValues: { name: string; value: any }[];
	export let selectedValues: string[];
	export let placeholder: string = 'Select a value...';
	export let id: string;

    let queryId: string = 'dropdown-search';
	let query: string = '';
	let dropdownOpen: boolean = true;

	function toggleDropdown() {
		dropdownOpen = !dropdownOpen;
	}
</script>

<div {id} class="mb-1 flex flex-col h-fit">
	<div
		class={`bg-white rounded-sm p-1 flex flex-row items-center justify-between w-full ease-in-out transform-gpu transition-all group hover:cursor-pointer ${ dropdownOpen && 'shadow' }`}
		on:mousedown={(e) => {
            if (document.activeElement?.id === queryId) return;

            toggleDropdown();
        }}
	>
		<div class="flex flex-col w-full sm:flex-row">
            <div class="flex flex-row h-full gap-1 flex-wrap">
                {#each providedValues.filter(x => selectedValues.includes(x.value)) as val}
                <div class="px-2 py-1 bg-orange-400 rounded-sm">{val.name}</div>
                {/each}
            </div>
            <div class="relative w-fit flex-1 flex flex-row">
                <div class="absolute top-0 left-0 flex-row flex w-full pointer-events-none">
                    {#if query.length === 0 && selectedValues.length === 0}
                    <p class="opacity-50 flex-1">
                        {placeholder}
                    </p>
                    {/if}
                </div>
                <input
                    id={queryId}
                    type="text"
                    class="w-full h-full outline-none"
                    on:focus={() => {
                        if (!dropdownOpen) dropdownOpen = true;
                    }}

                    on:keydown={(e) => {
                        if (e.key === "Backspace" && query.length === 0) {
                            const currVal = selectedValues;
                            const lastItem = currVal.pop();

                            if (!lastItem) return;
                            
                            selectedValues = selectedValues.filter(x => x !== lastItem)
                        }
                    }}       

                    bind:value={query}
                />
            </div>
        </div>
		<Fa
			icon={faChevronDown}
			class={`ease-in-out transform-gpu transition-all ${dropdownOpen && 'rotate-180'}`}
		/>
	</div>

    <div class={`bg-gray-200 gap-2 rounded-br-md rounded-bl-md self-center ease-in-out transform-gpu transition-all w-11/12 flex flex-col overflow-hidden ${ dropdownOpen ? 'h-32 overflow-y-auto' : 'h-0 overflow-y-hidden' }`}>
        {#each query.length === 0 && selectedValues.length === 0 ? providedValues : providedValues.filter((x) => x.name.toLowerCase().includes(query.toLocaleLowerCase())) as value}
        <button
            type="button"
            on:click={() => {
                query = '';

                if (selectedValues.filter((x) => x === value.value).length > 0) selectedValues = selectedValues.filter((x) => x !== value.value);
                else selectedValues = [...selectedValues, value.value];
            }}

            class="w-full py-1 px-2 flex flex-row items-center"
        >
            <div class={`p-2 mr-1 ${selectedValues.filter((y) => y === value.value).length === 1 ? 'bg-orange-400' : 'bg-white' }`}></div>
            <p class="font-poppins text-gray-600">{value.name}</p>
        </button>
        {/each}
    </div>
</div>

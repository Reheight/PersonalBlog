<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="w-full flex flex-col md:flex-row p-2">
    <div class="mb-2 md:mb-0 md:w-3/12 md:mr-2 h-fit shadow bg-orange-300 rounded-md p-2">
        <div class="flex flex-row justify-between">
            <div class="flex flex-row items-center justify-between w-full">
                <h4 class="font-robotomono uppercase font-bold text-base text-gray-800">{data.name}</h4>
                <h3 class="font-robotomono uppercase font-bold text-xs text-gray-700">@{data.username}</h3>
            </div>
        </div>
    </div>

    <div class="mb-2 md:mb-0 md:w-6/12 md:mr-2 h-fit shadow bg-orange-300 rounded-md p-2">
        <div class="flex flex-row justify-between mb-2">
            <div class="flex flex-row items-center w-full">
                <h4 class="font-robotomono uppercase font-bold text-base text-gray-800">Content</h4>
            </div>
        </div>
        <div class="bg-orange-400 rounded-sm w-full p-2 text-white">
            <p class="text-gray-200">
                We can't quite figure out what to put here yet...
            </p>
        </div>
    </div>

    <div class="md:w-3/12 md:mr-2 h-fit shadow bg-orange-300 rounded-md p-2">
        <div class="flex flex-row justify-between mb-2">
            <div class="flex flex-row items-center justify-between w-full">
                <h4 class="font-robotomono uppercase font-bold text-base text-gray-800">Information</h4>
            </div>
        </div>
        <div class="bg-orange-400 rounded-sm w-full p-2 text-white font-robotomono">
            <div class="w-full mb-2 flex flex-row justify-between items-center">
                <h3 class="text-gray-100">Joined on</h3>
                <p class="text-gray-200 text-sm">{new Date(data.createdAt).toLocaleDateString(undefined, {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}</p>
            </div>

            <div class="w-full mb-2 flex flex-row justify-between items-center">
                <h3 class="text-gray-100">Updated on</h3>
                <p class="text-gray-200 text-sm">{new Date(data.updatedAt).toLocaleDateString(undefined, {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}</p>
            </div>

            <div class="w-full flex flex-row justify-between items-center">
                <h3 class="text-gray-100">Role</h3>
                <p class="text-gray-200 text-sm">{data.role}</p>
            </div>
        </div>
    </div>
</div>
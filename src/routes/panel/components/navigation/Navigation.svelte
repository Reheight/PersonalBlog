<script lang="ts">
	import NavItem from "./NavItem.svelte";
</script>

<div class="ease-in-out transform-gpu transition-all px-2 md:p-0 w-full flex flex-row md:flex-col md:w-2/12 bg-gray-700">
    <h1 class="ease-in-out transform-gpu transition-all text-white font-bold text-xl font-poppins uppercase text-center md:my-2 mx-2 pr-2 md:mx-4 border-r-2 md:border-r-0 md:border-b-2 border-gray-600 justify-center items-center flex">BLOG CMS</h1>
    <div style="overflow: scroll;overflow:overlay;" class="ease-in-out transform-gpu transition-all pt-2 md:pt-0 md:my-4 md:ml-4 flex flex-row md:flex-col overflow-x-auto">
        <NavItem first={true} path="/panel/dashboard">
            Dashboard
        </NavItem>
        <NavItem path="/panel/members">
            Members
        </NavItem>
        <NavItem path="/panel/categories">
            Categories
        </NavItem>
        <NavItem path="/panel/tags">
            Tags
        </NavItem>
        <NavItem path="/panel/posts">
            Posts
        </NavItem>
    </div>
</div>
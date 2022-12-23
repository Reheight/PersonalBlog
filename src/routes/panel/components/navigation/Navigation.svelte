<script lang="ts">
	import NavItem from "./NavItem.svelte";
</script>
<div class="h-full w-2/12 bg-gray-700">
    <h1 class="text-white font-bold text-2xl font-poppins uppercase text-center my-2 mx-4 border-b-2 border-gray-600">BLOG CMS</h1>
    <ul class="my-4 ml-4 overflow-x-hidden overflow-y-auto">
        <NavItem path="/panel" first={true}>
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
    </ul>
</div>
<script lang="ts">
	import identityImage from '../../assets/images/image.jpeg';
	import svelteImage from '../../assets/images/svelte-logo.png';
	import mysqlImage from '../../assets/images/mysql-logo.png';
</script>

<svelte:head>
	<title>Programmers Daily | About</title>
	<meta name="robots" content="index follow" />
</svelte:head>

<div class="flex flex-col h-full w-full items-center">
	<h1
		class="w-2/3 font-bold font-ssc text-2xl text-center mt-2 border-4 rounded-md border-orange-300 bg-orange-400 text-white shadow-lg py-2"
	>
		ABOUT
	</h1>
	<div class="w-full flex flex-row p-5 overflow-hidden">
		<img src={identityImage} alt="Technology Image" class="w-2/5 rounded-md shadow" />
		<div class="self-center p-5 bg-orange-300 rounded-tr-md rounded-br-md shadow text-gray-800">
			<h1 class="font-bold text-lg uppercase mb-2 border-b-2 border-orange-400">Who am I?</h1>
			<p class="font-robotomono">
				I am Dustin Palmatier, a software engineer and fullstack developer from Upstate, NY. I am 20
				years old and I have been programming since I was 9-10 years old.
			</p>
		</div>
	</div>

	<div class="w-full flex flex-row p-5 overflow-hidden">
		<div class="self-center p-5 bg-orange-300 rounded-tl-md rounded-bl-md shadow text-gray-800">
			<h1 class="font-bold text-lg uppercase mb-2 border-b-2 border-orange-400">
				What software did I use?
			</h1>
			<p class="font-robotomono">
				This blog system is currently designed and fully developed in SvelteKit for the Front and
				Backend. This allows us to provide responsive, scalable, and efficient webpages that will
				provide various performance enhancements compared to frameworks like React, Vue, Angular,
				Ember, etc.
			</p>
		</div>
		<img src={svelteImage} alt="Creator Image" class="w-2/5 rounded-md shadow bg-gray-500" />
	</div>

	<div class="w-full flex flex-row p-5 overflow-hidden">
		<img src={mysqlImage} alt="Creator Image" class="w-2/5 rounded-md shadow bg-[#4479A1]" />
		<div class="self-center p-5 bg-orange-300 rounded-tr-md rounded-br-md shadow text-gray-800">
			<h1 class="font-bold text-lg uppercase mb-2 border-b-2 border-orange-400">
				Who software do we use to store data?
			</h1>
			<p class="font-robotomono">
				We use MySQL to provide a scalable API that will provide relational data. We use this in
				conjunction with Prisma.JS to improve production time.
			</p>
		</div>
	</div>
</div>

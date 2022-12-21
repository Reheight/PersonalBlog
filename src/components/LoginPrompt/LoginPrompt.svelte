<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from '../../routes/access/$types';

	export let currentValue: Number = 0;
</script>

<div class="m-2 w-ful flex justify-center items-center">
	<div class="bg-orange-300 rounded-lg overflow-hidden w-[500px]">
		<ul
			class="flex flex-row rounded overflow-hidden px-2 pt-2 items-end text-gray-800 font-montserrat uppercase"
		>
			<li
				class={currentValue === 0
					? 'hover:cursor-pointer bg-orange-400 text-white flex-1 rounded-t-lg text-center mr-1 ease-in-out transform-gpu transition-all py-2'
					: 'hover:cursor-pointer bg-orange-200 flex-1 rounded-t-lg text-center mr-1 ease-in-out transform-gpu transition-all py-1'}
				on:mousedown={() => (currentValue = 0)}
			>
				Login
			</li>
			<li
				class={currentValue === 1
					? 'hover:cursor-pointer bg-orange-400 text-white flex-1 rounded-t-lg text-center ml-1 ease-in-out transform-gpu transition-all py-2'
					: 'hover:cursor-pointer bg-orange-200 flex-1 rounded-t-lg text-center ml-1 ease-in-out transform-gpu transition-all py-1'}
				on:mousedown={() => (currentValue = 1)}
			>
				Register
			</li>
		</ul>
		<div class="h-full mx-2 mb-2 bg-orange-400 rounded-bl-md rounded-br-md text-white p-2">
			{#if currentValue === 0}
				<form class="mt-5" action="?/login" method="post" use:enhance>
					<div class="relative">
						<input
							id="username"
							name="username"
							type="text"
							placeholder=" "
							required
							class="w-full bg-orange-300 ease-in-out transition-all transform-gpu outline-none rounded-sm border-2 text-gray-800 border-orange-200 p-1 pt-2 px-3 text-sm font-robotomono peer placeholder-shown:px-1 placeholder-shown:pt-1 placeholder-shown:border-orange-300"
						/>
						<label
							for="username"
							class="absolute flex justify-center font-bold uppercase items-center mx-2 px-2 rounded-sm ease-in-out transition-all transform-gpu bg-orange-200 text-gray-800 -top-2.5 text-sm peer-placeholder-shown:rounded-none peer-placeholder-shown:px-1 peer-placeholder-shown:mx-0 peer-placeholder-shown:h-full peer-placeholder-shown:text-base peer-placeholder-shown:top-0 peer-placeholder-shown:left-0 peer-placeholder-shown:p-2 peer-placeholder-shown:bg-transparent"
							>Username</label
						>
					</div>

					<div class="relative mt-4">
						<input
							id="password"
							name="password"
							type="password"
							placeholder=" "
							required
							class="w-full bg-orange-300 ease-in-out transition-all transform-gpu outline-none rounded-sm border-2 text-gray-800 border-orange-200 p-1 pt-2 px-3 text-sm font-robotomono peer placeholder-shown:px-1 placeholder-shown:pt-1 placeholder-shown:border-orange-300"
						/>
						<label
							for="password"
							class="absolute flex justify-center font-bold uppercase items-center mx-2 px-2 rounded-sm ease-in-out transition-all transform-gpu bg-orange-200 text-gray-800 -top-2.5 text-sm peer-placeholder-shown:rounded-none peer-placeholder-shown:px-1 peer-placeholder-shown:mx-0 peer-placeholder-shown:h-full peer-placeholder-shown:text-base peer-placeholder-shown:top-0 peer-placeholder-shown:left-0 peer-placeholder-shown:p-2 peer-placeholder-shown:bg-transparent"
							>Password</label
						>
					</div>
					<button
						class="uppercase border-2 mt-3 w-full p-3 bg-orange-200 rounded-md text-gray-800 font-bold ease-in-out transform-gpu transition-all border-orange-200 hover:bg-orange-300"
						>Login</button
					>
				</form>
			{:else}
				<form class="mt-5" action="?/register" method="post" use:enhance>
					<div class="relative">
						<input
							id="username"
							name="username"
							type="text"
							placeholder=" "
							required
							class="w-full bg-orange-300 ease-in-out transition-all transform-gpu outline-none rounded-sm border-2 text-gray-800 border-orange-200 p-1 pt-2 px-3 text-sm font-robotomono peer placeholder-shown:px-1 placeholder-shown:pt-1 placeholder-shown:border-orange-300"
						/>
						<label
							for="username"
							class="absolute flex justify-center font-bold uppercase items-center mx-2 px-2 rounded-sm ease-in-out transition-all transform-gpu bg-orange-200 text-gray-800 -top-2.5 text-sm peer-placeholder-shown:rounded-none peer-placeholder-shown:px-1 peer-placeholder-shown:mx-0 peer-placeholder-shown:h-full peer-placeholder-shown:text-base peer-placeholder-shown:top-0 peer-placeholder-shown:left-0 peer-placeholder-shown:p-2 peer-placeholder-shown:bg-transparent"
							>Username</label
						>
					</div>

					<div class="relative mt-4">
						<input
							id="name"
							name="name"
							type="text"
							placeholder=" "
							required
							class="w-full bg-orange-300 ease-in-out transition-all transform-gpu outline-none rounded-sm border-2 text-gray-800 border-orange-200 p-1 pt-2 px-3 text-sm font-robotomono peer placeholder-shown:px-1 placeholder-shown:pt-1 placeholder-shown:border-orange-300"
						/>
						<label
							for="name"
							class="absolute flex justify-center font-bold uppercase items-center mx-2 px-2 rounded-sm ease-in-out transition-all transform-gpu bg-orange-200 text-gray-800 -top-2.5 text-sm peer-placeholder-shown:rounded-none peer-placeholder-shown:px-1 peer-placeholder-shown:mx-0 peer-placeholder-shown:h-full peer-placeholder-shown:text-base peer-placeholder-shown:top-0 peer-placeholder-shown:left-0 peer-placeholder-shown:p-2 peer-placeholder-shown:bg-transparent"
							>Name</label
						>
					</div>

					<div class="mt-4 flex flex-row">
						<div class="flex-1 relative mr-1.5">
							<input
								id="password"
								name="password"
								type="password"
								placeholder=" "
								required
								class="w-full bg-orange-300 ease-in-out transition-all transform-gpu outline-none rounded-sm border-2 text-gray-800 border-orange-200 p-1 pt-2 px-3 text-sm font-robotomono peer placeholder-shown:px-1 placeholder-shown:pt-1 placeholder-shown:border-orange-300"
							/>
							<label
								for="password"
								class="absolute flex justify-center font-bold uppercase items-center mx-2 px-2 rounded-sm ease-in-out transition-all transform-gpu bg-orange-200 text-gray-800 -top-2.5 text-sm peer-placeholder-shown:rounded-none peer-placeholder-shown:px-1 peer-placeholder-shown:mx-0 peer-placeholder-shown:h-full peer-placeholder-shown:text-base peer-placeholder-shown:top-0 peer-placeholder-shown:left-0 peer-placeholder-shown:p-2 peer-placeholder-shown:bg-transparent"
								>Password</label
							>
						</div>

						<div class="flex-1 relative ml-1.5">
							<input
								id="verifypassword"
								name="verifypassword"
								type="password"
								placeholder=" "
								required
								class="w-full bg-orange-300 ease-in-out transition-all transform-gpu outline-none rounded-sm border-2 text-gray-800 border-orange-200 p-1 pt-2 px-3 text-sm font-robotomono peer placeholder-shown:px-1 placeholder-shown:pt-1 placeholder-shown:border-orange-300"
							/>
							<label
								for="verifypassword"
								class="absolute flex justify-center font-bold uppercase items-center mx-2 px-2 rounded-sm ease-in-out transition-all transform-gpu bg-orange-200 text-gray-800 -top-2.5 text-sm peer-placeholder-shown:rounded-none peer-placeholder-shown:px-1 peer-placeholder-shown:mx-0 peer-placeholder-shown:h-full peer-placeholder-shown:text-base peer-placeholder-shown:top-0 peer-placeholder-shown:left-0 peer-placeholder-shown:p-2 peer-placeholder-shown:bg-transparent"
								>Password x2</label
							>
						</div>
					</div>

					<div class="mt-4 flex flex-row">
						<div class="flex-1 relative mr-1.5">
							<input
								id="email"
								name="email"
								type="email"
								placeholder=" "
								required
								class="w-full bg-orange-300 ease-in-out transition-all transform-gpu outline-none rounded-sm border-2 text-gray-800 border-orange-200 p-1 pt-2 px-3 text-sm font-robotomono peer placeholder-shown:px-1 placeholder-shown:pt-1 placeholder-shown:border-orange-300"
							/>
							<label
								for="email"
								class="absolute flex justify-center font-bold uppercase items-center mx-2 px-2 rounded-sm ease-in-out transition-all transform-gpu bg-orange-200 text-gray-800 -top-2.5 text-sm peer-placeholder-shown:rounded-none peer-placeholder-shown:px-1 peer-placeholder-shown:mx-0 peer-placeholder-shown:h-full peer-placeholder-shown:text-base peer-placeholder-shown:top-0 peer-placeholder-shown:left-0 peer-placeholder-shown:p-2 peer-placeholder-shown:bg-transparent"
								>Email Address</label
							>
						</div>

						<div class="flex-1 relative ml-1.5">
							<input
								id="verifyemail"
								name="verifyemail"
								type="email"
								placeholder=" "
								required
								class="w-full bg-orange-300 ease-in-out transition-all transform-gpu outline-none rounded-sm border-2 text-gray-800 border-orange-200 p-1 pt-2 px-3 text-sm font-robotomono peer placeholder-shown:px-1 placeholder-shown:pt-1 placeholder-shown:border-orange-300"
							/>
							<label
								for="verifyemail"
								class="absolute flex justify-center font-bold uppercase items-center mx-2 px-2 rounded-sm ease-in-out transition-all transform-gpu bg-orange-200 text-gray-800 -top-2.5 text-sm peer-placeholder-shown:rounded-none peer-placeholder-shown:px-1 peer-placeholder-shown:mx-0 peer-placeholder-shown:h-full peer-placeholder-shown:text-base peer-placeholder-shown:top-0 peer-placeholder-shown:left-0 peer-placeholder-shown:p-2 peer-placeholder-shown:bg-transparent"
								>Email Address x2</label
							>
						</div>
					</div>
					<button
						class="uppercase border-2 mt-3 w-full p-3 bg-orange-200 rounded-md text-gray-800 font-bold ease-in-out transform-gpu transition-all border-orange-200 hover:bg-orange-300"
						>Register</button
					>
				</form>
			{/if}
		</div>
	</div>
</div>

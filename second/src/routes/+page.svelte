<script lang="ts">
	import { onMount } from 'svelte';
	import { Diamonds } from 'svelte-loading-spinners';
	import { fade } from 'svelte/transition';

	const dateObj = new Date();
	const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	let weather: any = {};
	let shortcuts: any[] = [];
	let popup = false;
	let url: string
	let name: string

	function submit() { 
		console.log('attempting')
		shortcuts.push({
			name: name,
			url: url
		})
		localStorage.setItem('shortcuts', JSON.stringify(shortcuts)) 
		popup = false
	}

	let mouseEnter = () => (document.getElementById('weather')!.style.right = '20rem');
	let mouseLeave = () => {
		document.getElementById('weather')!.style.right = '7rem';
		document.getElementById('bookmarks')!.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};

	onMount(async () => {
		shortcuts = JSON.parse(localStorage.getItem('shortcuts') || '[]');
		const API_KEY = localStorage.getItem('API_KEY');
		const ZIP_CODE = localStorage.getItem('ZIP_CODE');

		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?zip=${ZIP_CODE}&appid=${API_KEY}&units=imperial`
		);
		weather = await res.json();
	});

</script>

<main class="h-screen w-screen overflow-hidden">
	{#if popup}
		<div transition:fade class="absolute z-50 flex h-full w-full items-center justify-center">
			<div class="h-min w-min bg-black p-4">
				<h1 class="mb-6 text-4xl">New Shortcut</h1>
				<div class="mb-4">
					<h3>URL</h3>
					<input class="text-black" type="text" bind:value={url} />
				</div>
				<div class="mb-8">
					<h3>Name</h3>
					<input class="text-black" type="text" bind:value={name} />
				</div>
				<div class="flex w-full items-center justify-between">
					<button class="bg-white px-2 text-2xl text-black" on:click={submit}>Add Shortcut</button>
					<button on:click={() => (popup = false)}>X</button>
				</div>
			</div>
		</div>
	{/if}
	<div class="background-image" />
	<div class="absolute flex h-full flex-col justify-between p-10 text-6xl">
		<div>
			<h1>{dateObj.toLocaleString('default', { weekday: 'long' })}</h1>
			<h2>{dateObj.getMonth() + 1}/{dateObj.getDate()}</h2>
		</div>
		<h1>{time}</h1>
	</div>
	<div
		id="weather"
		class="absolute right-28 flex h-full flex-col items-end justify-center text-right text-6xl transition-all duration-300"
	>
		{#if Object.keys(weather).length != 0}
			<h1>{Math.round(weather.main.temp)}°</h1>
			<h1>{weather.weather[0].description}</h1>
		{:else}
			<Diamonds size="60" color="#FFF" unit="px" duration="1.0s" />
		{/if}
	</div>
	<div
		id="bookmarks"
		on:mouseenter={mouseEnter}
		on:mouseleave={mouseLeave}
		class="ml-auto h-[calc(100%_-_5rem)] w-16 overflow-x-hidden overflow-y-scroll overscroll-none whitespace-nowrap rounded-bl-2xl bg-black bg-opacity-75 text-black shadow-lg transition-all duration-300 hover:w-64"
	>
		{#each shortcuts as shortcut}
			<a
				href={shortcut.url}
				class="flex items-center border-t border-t-gray-300 bg-white odd:bg-white even:bg-slate-100"
			>
				<img src={shortcut.url + 'favicon.ico'} class="h-16 w-16 flex-none p-4" alt="site icon" />
				<h1>{shortcut.name}</h1>
			</a>
		{/each}
		<button
			on:click={() => (popup = true)}
			class="fixed bottom-0 flex h-16 w-64 items-center rounded-tl-2xl bg-black text-white"
		>
			<h1 class="h-16 w-16 flex-none text-center text-5xl leading-[3.5rem]">+</h1>
			<h1>Add Shortcut</h1>
		</button>
	</div>
</main>

<style>
	.background-image {
		position: absolute;
		left: 0;
		right: 0;
		z-index: -1;
		background-image: url('/background.jpg');
		background-position: 50%;
		background-repeat: no-repeat;
		background-size: cover;
		height: 100vh;
		filter: blur(0px) brightness(0.2);
	}
</style>

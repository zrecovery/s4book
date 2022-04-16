<script lang="ts">
	import { page } from '$app/stores';
	import Findbar from '$lib/components/Findbar/findbar.svelte';
	import Searchbar from '$lib/components/Searchbar/Searchbar.svelte';
	import Alert from '$lib/components/Alert/Alert.svelte';

	let toggle = true;
	function toggleClick() {
		toggle = !toggle;
	}
</script>

<header class=" mb-2">
	<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top " style="grid-area: nav;">
		<div class="container-fluid">
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarToggler"
				aria-controls="navbarToggler"
				aria-expanded="false"
				aria-label="Toggle navigation"
				on:click={toggleClick}
			>
				<span class="navbar-toggler-icon" />
			</button>
			<div>
				{#if $page.url.pathname === '/'}
					<Searchbar />
				{:else}
					<Findbar />
				{/if}
			</div>
			<div class={toggle ? 'navbar-collapse collapse' : 'navbar-collapse'} id="navbarToggler">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item" class:active={$page.url.pathname === '/'}>
						<a
							class="nav-link active"
							aria-current="page"
							sveltekit:prefetch
							on:click={() => {
								toggle = true;
							}}
							href="/">主页</a
						>
					</li>
					<li class="nav-item" class:active={$page.url.pathname === '/add'}>
						<a
							class="nav-link"
							sveltekit:prefetch
							on:click={() => {
								toggle = true;
							}}
							href="/add">添加</a
						>
					</li>
				</ul>
			</div>
			
		</div>
	</nav>
	<div style="grid-area: alert;">
		<Alert />
	</div>
</header>

<style>
	header {
		display: grid;
		grid-template-areas:
			'nav'
			'alert';
		grid-template-rows: 2fr 2fr;
		gap: 4vw;
	}
</style>

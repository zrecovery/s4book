<script lang="ts">
	import { page } from '$app/stores';
	import Findbar from '$lib/components/Findbar/findbar.svelte';
	import Searchbar from '$lib/components/Searchbar/Searchbar.svelte';
	let toggle = true;
	function toggleClick() {
		toggle = !toggle;
	}
</script>

<header class=" mb-2">
	<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top ">
		<div class="container-fluid">
			<a class="navbar-brand" href="/">主页</a>
			{#if $page.url.pathname === '/'}
				<Searchbar />
			{:else}
				<Findbar />
			{/if}

			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarTogglerDemo02"
				aria-controls="navbarTogglerDemo02"
				aria-expanded="false"
				aria-label="Toggle navigation"
				on:click={toggleClick}
			>
				<span class="navbar-toggler-icon" />
			</button>
			<div class={toggle ? 'navbar-collapse collapse' : 'navbar-collapse'} id="navbarTogglerDemo02">
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
</header>

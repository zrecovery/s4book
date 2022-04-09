<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
</script>

<Header />

<main class="p-4" style="margin-top: 3rem;">
	<slot />
</main>

<footer />

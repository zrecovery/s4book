<script lang="ts">
	import { articlesDBStoreService } from '$lib/articles/articlesStoreService';
	import Pagination from '$lib/components/Pagination/Pagination.svelte';
	import { liveQuery } from 'dexie';

	$: keyword = '';
	$: keywords = keyword.split(' ');

	$: totalArticles = liveQuery(async () => {
		return articlesDBStoreService.countArticles(keywords);
	});

	const limit = 15;
	let currentPage = 1;

	$: page = Math.ceil($totalArticles / limit);
	$: offset = Math.ceil((currentPage - 1) * limit);

	$: articles = liveQuery(async () => {
		return articlesDBStoreService.getArticles(limit, offset, keywords);
	});
</script>

<input bind:value={keyword} />

{#if $articles}
	<div>
		{#each $articles as article}
			<a href="/articles/{article.id}">
				<p>{article.title}</p>
			</a>
		{/each}
	</div>
{/if}
<Pagination bind:currentPage bind:page />

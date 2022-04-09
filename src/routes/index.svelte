<script lang="ts">
	import { articlesDBStoreService } from '$lib/articles/articlesStoreService';
	import Pagination from '$lib/components/Pagination/Pagination.svelte';
	import { keyword } from '$lib/stores/search';
	import { liveQuery } from 'dexie';
	$: keywords = $keyword.split(' ');

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

{#if $articles}
	<ul class="list-group">
		{#each $articles as article}
			<li class="list-group-item">
				<a href="/articles/{article.id}">
					{article.title}
				</a>
			</li>
		{/each}
	</ul>
{/if}
<Pagination bind:currentPage bind:page />

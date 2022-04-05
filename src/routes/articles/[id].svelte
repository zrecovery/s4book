<script lang="ts">
	import { page } from '$app/stores';

	import { articlesDBStoreService } from '$lib/articles/articlesStoreService';
	import { liveQuery } from 'dexie';
	const ID = Number($page.params.id);
	let article = liveQuery(async () => {
		return await articlesDBStoreService.getArticleByID(ID);
	});
</script>
{#if $article}

<article>
	<h1>{$article.title}</h1>
	<p style="white-space: pre-line;">{$article.content}</p>
</article>
{/if}
<script lang="ts">
	import { page } from '$app/stores';

	import { articlesDBStoreService } from '$lib/articles/articlesStoreService';
	import { liveQuery } from 'dexie';
	const ID = Number($page.params.id);
	let article = liveQuery(async () => {
		return await articlesDBStoreService.getArticleByID(ID);
	});
	
	let keyword: string;
	function find() {
		globalThis.find(keyword, false, false, true, false, true, true);
	}
</script>

{#if $article}
	<input bind:value={keyword}/>
	<button on:click={find} >搜索</button>
	<article>
		<h1>{$article.title}</h1>
		<p style="white-space: pre-line;">{$article.content}</p>
	</article>
{/if}

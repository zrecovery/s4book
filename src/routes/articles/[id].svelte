<script lang="ts">
	import { page } from '$app/stores';
	import { Article } from '$lib/articles/articles';

	import { articlesDBStoreService } from '$lib/articles/articlesStoreService';
	import ArticleEditor from '$lib/components/ArticleEditor/ArticleEditor.svelte';

	const ID = Number($page.params.id);
	let article: Article = new Article("", "", "",1.0, "");
	articlesDBStoreService
		.getArticleByID(ID)
		.then((data) => {
			article = data;
		})
		.catch((err) => {
			console.error(err);
		});

	async function update() {
		try {
			await articlesDBStoreService.updateArticle(ID, article);
		} catch (error) {
			console.error(error);
		}
	}

	enum Mode {
		Read,
		Edit
	}
	let mode: Mode = Mode.Read;
</script>

<svelte:head><title>{article.title}</title></svelte:head>

{#if mode === Mode.Read}
	<div class="m-2">
		{#if article}
			<article>
				<h1>{article.title}</h1>
				<p style="white-space: pre-line;">{article.content}</p>
			</article>
		{/if}
	</div>
	<button
		type="button"
		class="btn btn-primary col-2 m-2"
		on:click={() => {
			mode = Mode.Edit;
		}}>编辑</button
	>
{:else}
	<button
		type="button"
		class="btn btn primary"
		on:click={() => {
			mode = Mode.Read;
		}}>返回</button
	>

	<ArticleEditor bind:article />
	<button type="button" on:click={update}>更改</button>
{/if}

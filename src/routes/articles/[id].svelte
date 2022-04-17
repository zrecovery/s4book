<script lang="ts">
	import { page } from '$app/stores';
	import { Article } from '$lib/articles/articles';

	import { articlesDBStoreService } from '$lib/articles/articlesStore.service';
	import ArticleEditor from '$lib/components/ArticleEditor/ArticleEditor.svelte';
	import { alertMessage } from '$lib/stores/alert';

	const ID = Number($page.params.id);
	let article: Article = new Article('', '', '', 1.0, '');
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
			let result = await articlesDBStoreService.updateArticle(ID, article);
			$alertMessage = `已修改：${result}`;
		} catch (error) {
			console.error(error);
		}
	}

	async function remove() {
		try {
			await articlesDBStoreService.deleteArticle(ID);
			$alertMessage = `已删除：${ID}`;
		} catch (err) {
			console.error(err);
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
			<article style="font-size: large;">
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
	<button type="button" class="btn btn-danger col-2 m-2" on:click={remove}>删除</button>
{:else}
	<button
		type="button"
		class="btn btn-primary"
		on:click={() => {
			mode = Mode.Read;
		}}>返回</button
	>

	<ArticleEditor bind:article />
	<button type="button" class="btn btn-primary" on:click={update}>更改</button>
{/if}

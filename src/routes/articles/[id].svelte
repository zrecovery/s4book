<script lang="ts">
	import { page } from '$app/stores';
	import type { Article } from '$lib/articles/articles';

	import { articlesDBStoreService } from '$lib/articles/articlesStoreService';
	import { liveQuery } from 'dexie';
	const ID = Number($page.params.id);
	const article = liveQuery(async () => {
		return await articlesDBStoreService.getArticleByID(ID);
	});

	let newArticle = article;
	let keyword: string;
	function find() {
		globalThis.find(keyword, false, false, true, false, true, true);
	}

	async function update() {
		try {
			await articlesDBStoreService.updateArticle(ID, $newArticle);
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

{#if mode === Mode.Read}
	<div id="reader">
		<button
			on:click={() => {
				mode = Mode.Edit;
			}}>编辑</button
		>
		<div id="findbar">
			<input bind:value={keyword} />
			<button on:click={find}>搜索</button>
		</div>

		{#if $article}
			<article>
				<h1>{$article.title}</h1>
				<p style="white-space: pre-line;">{$article.content}</p>
			</article>
		{/if}
	</div>
{:else}
	<button
		on:click={() => {
			mode = Mode.Read;
		}}>返回</button
	>
	<form>
		<label>标题：<input type="text" placeholder="标题" bind:value={$newArticle.title} /></label>
		<label>作者：<input type="text" placeholder="作者" bind:value={$newArticle.author} /></label>
		<label>系列：<input type="text" placeholder="系列" bind:value={$newArticle.book} /></label>
		<label>顺序：<input type="number" placeholder="顺序" bind:value={$newArticle.serial} /></label>
		<label>内容：<textarea bind:value={$newArticle.content} /></label>
		<button on:click={update}>更改</button>
	</form>
{/if}

<style>
	article {
		margin: 1rem;
	}
	@media screen and (max-width: 800px) {
		#reader {
			display: grid;
			grid-template-rows: repeat(3, 1fr);
		}

		#findbar {
			position: fixed;
			top: 1rem;
			left: 1rem;
		}

		form {
			margin: 1rem;
			display: grid;
			grid-template-rows: repeat(4, 1fr) 2fr 1fr;
			gap: 1rem;
		}
	}
	@media screen and (min-width: 800px) {
		#reader {
			display: grid;
		}

		#findbar {
			position: fixed;
			top: 1rem;
			right: 1rem;
		}

		form {
			margin: 1rem;
			display: grid;
			grid-template-rows: repeat(4, 1fr) 2fr 1fr;
			gap: 1rem;
		}
	}
</style>

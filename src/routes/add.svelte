<script lang="ts">
	import { articlesDBStoreService } from '$lib/articles/articlesStoreService';
	import { Article } from '$lib/articles/articles';

	let files: FileList;
	let article = new Article('', '', '', 1.0, '');
	async function saveArticleFromJSON(jsonFILE: File) {
		let articles: Article[] = [];
		try {
			articles = JSON.parse(await jsonFILE.text());
		} catch (error) {
			console.error(error);
		} finally {
			await articlesDBStoreService.addArticles(articles);
		}
	}

	$: if (files) {
		let fileList = Array.from(files);
		Promise.all(fileList.map(saveArticleFromJSON));
	}
	async function save() {
		await articlesDBStoreService.addArticles([article]);
	}
</script>

<form>
	<label>标题：<input type="text" placeholder="标题" bind:value={article.title} /></label>
	<label>作者：<input type="text" placeholder="作者" bind:value={article.author} /></label>
	<label>系列：<input type="text" placeholder="系列" bind:value={article.book} /></label>
	<label>顺序：<input type="number" placeholder="顺序" bind:value={article.serial} /></label>
	<label>内容：<textarea bind:value={article.content} /></label>
	<button on:click={save}>保存</button>
</form>

<div>
	<input accept="application/json" type="file" bind:files id="files" />
</div>

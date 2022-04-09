<script lang="ts">
	import { articlesDBStoreService } from '$lib/articles/articlesStoreService';
	import { Article } from '$lib/articles/articles';
	import ArticleEditor from '$lib/components/ArticleEditor/ArticleEditor.svelte';

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

<svelte:head><title>添加</title></svelte:head>
<ArticleEditor {article} />
<div class="col-12">
	<button type="button" class="btn btn-primary mb-3 col-auto" on:click={save}>保存</button>
</div>

<input class="form-control col-6" accept="application/json" type="file" bind:files id="files" />

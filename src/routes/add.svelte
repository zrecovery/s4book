<script lang="ts">
	import { articlesDBStoreService } from '$lib/articles/articlesStoreService';
	import type { Article } from '$lib/articles/articles';

    let files: FileList;

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
</script>

<div>
	<input accept="application/json" type="file" bind:files id="files" />
</div>
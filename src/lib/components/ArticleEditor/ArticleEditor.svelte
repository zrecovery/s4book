<script lang="ts">
	import type { Article } from '$lib/articles/articles';

	export let article: Article;
</script>

<form class="m-2 row g-3">
	<label class="form-label col-md-6"
		>标题：<input
			class="form-control"
			type="text"
			placeholder="标题"
			bind:value={article.title}
		/></label
	>
	<label class="form-label col-md-6"
		>作者：<input
			class="form-control"
			type="text"
			placeholder="作者"
			bind:value={article.author}
		/></label
	>
	<label class="form-label col-md-6"
		>系列：<input
			class="form-control"
			type="text"
			placeholder="系列"
			bind:value={article.book}
		/></label
	>
	<label class="form-label col-md-6"
		>顺序：<input
			class="form-control"
			type="number"
			placeholder="顺序"
			bind:value={article.serial}
		/></label
	>
	<label class="form-label col-12"
		>内容：<textarea
			class="form-control"
			bind:value={article.content}
			style="height: 20rem"
		/></label
	>
</form>

<script lang="ts">
	let keyword: string = '';
	// 在iOS下PWA中，搜索关键词时，由于查找栏位于顶部，会强制聚焦于用户输入的关键词，导致无法搜索正文部分的关键词。
	let cache = '';
	function find() {
		// 通过先缓存用户输入，再清空用户输入，保证搜索时不会聚焦至用户输入的关键词。
		if (keyword !== '') {
			cache = keyword;
			keyword = '';
		}
		// find不是标准的一部分，属于浏览器私有。
		globalThis.find(cache, false, false, true, false, true, true);
	}
</script>

<div class="row g-3">
	<div class="col-auto">
		<input class="form-control col-sm-7" type="text" placeholder="关键词" bind:value={keyword} />
	</div>
	<div class="col-auto">
		<button type="button" class="btn btn-primary" on:click={find}>搜索</button>
	</div>
</div>

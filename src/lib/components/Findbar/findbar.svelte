<script lang="ts">
	let keyword: string;
	function find() {
		globalThis.find(keyword, false, false, true, false, true, true);
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

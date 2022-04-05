<script lang="ts">
    export let currentPage:number;
    export let page: number;

    function prev() {
		currentPage > 1 ? currentPage-- : (currentPage = 1);
	}

	function next() {
		currentPage < page ? currentPage++ : (currentPage = page);
	}
</script>

<div>
	{#if currentPage !== 1}
		<button on:click={prev}>上一页</button>
	{/if}
	<p>{currentPage}/{page}</p>
	{#if currentPage !== page}
		<button on:click={next}>下一页</button>
	{/if}
</div>
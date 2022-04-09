<script lang="ts">
	export let currentPage: number;
	export let page: number;

	function prev() {
		currentPage > 1 ? currentPage-- : (currentPage = 1);
	}

	function next() {
		currentPage < page ? currentPage++ : (currentPage = page);
	}
</script>

<nav aria-label="Page navigation">
	<ul class="pagination">
		<li class="page-item {currentPage !== 1 ? '' : 'disabled'}">
			<button type="button" class="page-link" on:click={prev} aria-label="Previous">
				<span aria-hidden="true">&laquo;</span>
			</button>
		</li>
		<li class="page-item"><p class="page-link">{currentPage}/{page}</p></li>
		<li class="page-item {currentPage !== page ? '' : 'disabled'}">
			<button type="button" class="page-link" on:click={next} aria-label="Next">
				<span aria-hidden="true">&raquo;</span>
			</button>
		</li>
	</ul>
</nav>

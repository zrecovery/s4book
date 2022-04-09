<script lang="ts">
	import { keyword } from '$lib/stores/search';
</script>

<div class="row g-3">
	<div class="col-auto">
		<input placeholder="关键词" class="form-control col-sm-7" type="text" bind:value={$keyword} />
	</div>
</div>

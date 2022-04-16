<script lang="ts">
	import { alertMessage } from '$lib/stores/search';

	export let message = '';
	alertMessage.subscribe((msg) => {
		message = msg;
	});
	enum Level {
		success = 'alert-success',
		danger = 'alert-danger',
		warning = 'alert-warning',
		info = 'alert-info'
	}
	export let level = Level.info;
	$: isShow = $alertMessage !== '';
	function hide() {
		isShow = false;
		$alertMessage = '';
	}
</script>

{#if isShow}
	<div class="alert {level} alert-dismissible" role="alert">
		{message}
		<button
			type="button"
			on:click={hide}
			class="btn-close"
			data-bs-dismiss="alert"
			aria-label="Close"
		/>
	</div>
{/if}

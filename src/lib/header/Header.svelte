<script lang="ts">
	import { page } from '$app/stores';
</script>

<header>
	<nav>
		<ul>
			<li class:active={$page.url.pathname === '/'}><a sveltekit:prefetch href="/">列表</a></li>
			<li class:active={$page.url.pathname === '/add'}>
				<a sveltekit:prefetch href="/add">添加</a>
			</li>
		</ul>
	</nav>
</header>

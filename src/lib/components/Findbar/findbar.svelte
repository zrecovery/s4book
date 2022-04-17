<script lang="ts">
	let keyword: string = '';
	// 在iOS下PWA中，搜索关键词时，由于查找栏位于顶部，会强制聚焦于用户输入的关键词，导致无法搜索正文部分的关键词。
	let cache = '';
	let count = 0;
	let keywordTags: HTMLCollectionOf<HTMLSpanElement>;
	function find() {
		// 通过先缓存用户输入，再清空用户输入，保证搜索时不会聚焦至用户输入的关键词。
		if (window.navigator.userAgent.includes('iPhone')) {
			if (keyword !== '') {
				cache = keyword;
				keyword = '';
				count = 0;
				let articleTags = document.getElementsByTagName('article');
				if (articleTags.length === 1) {
					let contentElement = articleTags[0].lastChild as HTMLParagraphElement;
					const newContentHtml = contentElement.innerHTML.replaceAll(
						cache,
						`<span style="background-color: yellow;">${cache}</span>`
					);
					contentElement.innerHTML = newContentHtml;
					keywordTags = document.getElementsByTagName('span');
				}
			}
			let index = count % keywordTags.length;
			count = count + 1;
			keywordTags[index].scrollIntoView({ block: 'center' });
		} else {
			globalThis.find(keyword, false, false, true, false, true, true);
		}
	}
</script>

<div class="row g-3">
	<div class="col-auto">
		<input class="form-control col-sm-7" type="text" placeholder="关键词" bind:value={keyword} />
	</div>
	<div class="col-auto">
		<button
			type="button"
			class="btn btn-primary"
			on:click={() => {
				find();
			}}>搜索</button
		>
	</div>
</div>

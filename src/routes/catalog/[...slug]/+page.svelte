<script>
	import { Category } from '../UI';

	let { data } = $props();
	// $inspect('data', data);
</script>

<!-- <Category /> -->

<main class="h-full flex-1 overflow-y-auto">
	{#if data.isCategory}
		<Category data={data.req.category} />
	{:else}
		<p>12345</p>
	{/if}
</main>




<script>
	import { Category } from '../UI';

	import ProductFormCreate from '../modals/ProductFormCreate/index.svelte';
	import ProductFormUpdate from '../modals/ProductFormUpdate/index.svelte';
	import ProductFormDelete from '../modals/ProductFormDelete/index.svelte';

	let { data } = $props();
	// $inspect('data', data);
</script>

<main class="h-full flex-1 overflow-y-auto">
	{#if data.isCategory}
		<Category data={data.req.category} />
	{:else}
		<p>12345</p>
	{/if}
</main>

<!-- Modals -->
<ProductFormCreate data={ data.dataCategory.fullcategory } />
<ProductFormUpdate {data} />
<ProductFormDelete {data} />

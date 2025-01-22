<script>
	import { Category } from '../UI';

	import ProductFormCreate from '../modals/ProductFormCreate/index.svelte';
	import ProductFormUpdate from '../modals/ProductFormUpdate/index.svelte';
	import ProductFormDelete from '../modals/ProductFormDelete/index.svelte';

	let { data } = $props();
	// $inspect('data', data);

	// import ImageCropper from "../modals/ImageCropper/index.svelte";
	// let croppedImage = $state(null);
	// let cropperRef;

	// function handleCrop() {
	//   croppedImage = cropperRef.getCroppedImage();
	// }
</script>

<main class="h-full flex-1 overflow-y-auto">
	{#if data.isCategory}
		<Category data={data.req.category} />
	{:else}
		<div>12345</div>
	{/if}
</main>

<!-- Modals -->
<ProductFormCreate fullcategory={data.dataCategory.fullcategory} all_tags={data.dataTags.all_tags} />
<ProductFormUpdate {data} />
<ProductFormDelete {data} />

<!-- <ImageCropper bind:this={cropperRef} imageUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
  
  <button onclick={handleCrop}>Обрезать</button>
  
  {#if croppedImage}
	<h3>Результат:</h3>
	<img src={croppedImage} alt="Cropped Image" />
  {/if} -->

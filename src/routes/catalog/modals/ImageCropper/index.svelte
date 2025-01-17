<script>
    import { onMount } from 'svelte';
    import Cropper from 'cropperjs';
    import 'cropperjs/dist/cropper.css';

	let { imageUrl } = $props();
	// $inspect('data', data);

    let imageElement;
    let cropper;
  
    $effect(() => {
        if (imageElement && imageUrl) {
            if (cropper) {
                cropper.destroy();
            }
            cropper = new Cropper(imageElement, {
                aspectRatio: 1, // Пример с квадратным соотношением сторон
                viewMode: 1,
                autoCropArea: 0.8,
            });
        }
    });
  
    onMount(() => {
        return () => {
            if (cropper) {
                cropper.destroy();
            }
        };
    });
  
    export function getCroppedImage() {
        if (cropper) {
            return cropper.getCroppedCanvas().toDataURL(); // Возвращает данные Base64
        }
        return null;
    }
  </script>
  
  <style>
    .cropper-container {
      max-width: 100%;
      height: auto;
    }
  </style>
  
  <div>
    <img
      bind:this={imageElement}
      class="cropper-container"
      src={imageUrl}
      alt="Crop"
    />
  </div>
<script>
    import { onMount } from 'svelte';
    import Cropper from 'cropperjs';
    import 'cropperjs/dist/cropper.css';
  
    export let imageUrl; // Путь к изображению
    let imageElement;
    let cropper;
  
    onMount(() => {
      cropper = new Cropper(imageElement, {
        aspectRatio: 1, // Пример с квадратным соотношением сторон
        viewMode: 1,
        autoCropArea: 0.8,
      });
  
      return () => {
        cropper.destroy();
      };
    });
  
    export function getCroppedImage() {
      return cropper.getCroppedCanvas().toDataURL(); // Возвращает данные Base64
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
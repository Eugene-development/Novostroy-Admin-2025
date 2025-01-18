<script>
    import { onMount } from 'svelte';
    import Cropper from 'cropperjs';
    import 'cropperjs/dist/cropper.css';

    let { imageUrl } = $props();

    let imageElement;
    let cropper;
    let isFlipped = $state(false);
    let watermarkText = "NOVOSTROY"; // Текст водяного знака

    function addWatermark(canvas) {
        const ctx = canvas.getContext('2d');
        
        // Сохраняем текущий контекст
        ctx.save();
        
        // Настройки водяного знака
        ctx.globalAlpha = 0.01; // Устанавливаем прозрачность для всего водяного знака
        ctx.fillStyle = '#FFFFFF'; // Белый цвет
        ctx.font = 'bold 96px Arial'; // Увеличим размер и сделаем жирным для лучшей видимости
        ctx.rotate(-45 * Math.PI / 180); // Поворот на -45 градусов
        
        // Размещаем водяной знак по диагонали несколько раз
        const text = watermarkText;
        const textWidth = ctx.measureText(text).width;
        const spacing = textWidth + 100; // Увеличим расстояние между повторами
        
        for (let y = -canvas.height; y < canvas.height * 2; y += spacing) {
            for (let x = -canvas.width; x < canvas.width * 2; x += spacing) {
                ctx.fillText(text, x, y);
            }
        }
        
        // Восстанавливаем исходный контекст (включая поворот и прозрачность)
        ctx.restore();
    }

    function flipImage() {
        if (cropper) {
            const scaleX = cropper.getImageData().scaleX;
            cropper.scaleX(-scaleX);
            isFlipped = !isFlipped;
        }
    }

    $effect(() => {
        if (imageElement && imageUrl) {
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
                if (cropper) {
                    cropper.destroy();
                }
                const isVertical = img.height >= img.width;
                const aspectRatio = isVertical ? 3 / 4 : 4 / 3;

                cropper = new Cropper(imageElement, {
                    aspectRatio,
                    viewMode: 1,
                    autoCropArea: 1.0,
                    dragMode: 'move',
                    cropBoxMovable: true,
                    cropBoxResizable: true
                });
            };
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
            const canvas = cropper.getCroppedCanvas();
            if (canvas) {
                const watermarkedCanvas = document.createElement('canvas');
                watermarkedCanvas.width = canvas.width;
                watermarkedCanvas.height = canvas.height;
                
                const ctx = watermarkedCanvas.getContext('2d');
                ctx.drawImage(canvas, 0, 0);
                
                addWatermark(watermarkedCanvas);
                
                return watermarkedCanvas.toDataURL();
            }
        }
        return null;
    }
</script>

<div class="flex flex-col gap-4">
    <div class="flex gap-2 justify-end">
        <button
            type="button"
            class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 flex items-center gap-2 transition-colors"
            on:click={flipImage}
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            {isFlipped ? 'Вернуть' : 'Отзеркалить'}
        </button>
    </div>
    <div>
        <img
            bind:this={imageElement}
            class="object-contain"
            src={imageUrl}
            alt="Crop"
        />
    </div>
</div>
<script>
    import { onMount } from 'svelte';
    import Cropper from 'cropperjs';
    import 'cropperjs/dist/cropper.css';

    let { imageUrl } = $props();

    let imageElement;
    let cropper;
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

    $effect(() => {
        if (imageElement && imageUrl) {
            if (cropper) {
                cropper.destroy();
            }
            cropper = new Cropper(imageElement, {
                aspectRatio: 16 / 9,
                viewMode: 1,
                autoCropArea: 0.8,
            })
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
                // Создаем новый canvas для добавления водяного знака
                const watermarkedCanvas = document.createElement('canvas');
                watermarkedCanvas.width = canvas.width;
                watermarkedCanvas.height = canvas.height;
                
                // Копируем обрезанное изображение
                const ctx = watermarkedCanvas.getContext('2d');
                ctx.drawImage(canvas, 0, 0);
                
                // Добавляем водяной знак
                addWatermark(watermarkedCanvas);
                
                // Возвращаем итоговое изображение с водяным знаком
                return watermarkedCanvas.toDataURL();
            }
        }
        return null;
    }
</script>

<div>
    <img
        bind:this={imageElement}
        class="object-contain"
        src={imageUrl}
        alt="Crop"
    />
</div>
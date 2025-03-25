<script>
	import { onMount } from 'svelte';
	import Cropper from 'cropperjs';
	import 'cropperjs/dist/cropper.css';

	let { imageUrl } = $props();

	let imageElement;
	let cropper;
	let isFlipped = $state(false);
	let useAspectRatio = $state(false);
	let watermarkText = 'NOVOSTROY'; // Текст водяного знака

	function addWatermark(canvas) {
		const ctx = canvas.getContext('2d');

		// Сохраняем текущий контекст
		ctx.save();

		// Настройки водяного знака
		ctx.globalAlpha = 0.05; // Устанавливаем прозрачность для всего водяного знака
		ctx.fillStyle = '#FFFFFF'; // Белый цвет
		ctx.font = 'bold 96px Arial'; // Увеличим размер и сделаем жирным для лучшей видимости
		ctx.rotate((-45 * Math.PI) / 180); // Поворот на -45 градусов

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

	function toggleAspectRatio() {
		useAspectRatio = !useAspectRatio;
		
		// Reinitialize cropper with new settings
		if (imageElement && imageUrl && cropper) {
			cropper.destroy();
			initializeCropper();
		}
	}

	function initializeCropper() {
		if (imageElement && imageUrl) {
			const img = new Image();
			img.src = imageUrl;
			img.onload = () => {
				if (cropper) {
					cropper.destroy();
				}
				const isVertical = img.height > img.width;
				const aspectRatio = isVertical ? 3 / 4 : 4 / 3;

				cropper = new Cropper(imageElement, {
					// Only apply aspectRatio if it's enabled
					...(useAspectRatio ? { aspectRatio } : {}),
					viewMode: 1,
					autoCropArea: 1.0,
					dragMode: 'move',
					cropBoxMovable: true,
					cropBoxResizable: true
				});
			};
		}
	}

	$effect(() => {
		initializeCropper();
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

				// Reset the flipped state after cropping
				if (isFlipped) {
					isFlipped = false;
					// Reset the image scale in the cropper
					// cropper.scaleX(1);
				}

				return watermarkedCanvas.toDataURL();
			}
		}
		return null;
	}
</script>

<div class="flex flex-col gap-4">
	<div class="flex justify-end gap-2">
		<button
			type="button"
			class="flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-300"
			onclick={toggleAspectRatio}
		>
			{useAspectRatio ? 'Свободное соотношение' : 'Фиксированное соотношение'}
		</button>
		<button
			type="button"
			class="flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-300"
			onclick={flipImage}
		>
			{isFlipped ? 'Вернуть' : 'Отзеркалить (только GPG)'}
		</button>
	</div>
	<div>
		<img bind:this={imageElement} class="object-contain" src={imageUrl} alt="Crop" />
	</div>
</div>

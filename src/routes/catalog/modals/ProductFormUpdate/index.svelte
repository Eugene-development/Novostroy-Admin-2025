<script>
	import { visibleProductFormUpdate, currentEditingProduct } from '$lib/state/productFormUpdate.svelte';
	import { enhance } from '$app/forms';
	import ImageCropper from '../ImageCropper/index.svelte';
	import axios from 'axios';
	import { invalidateAll } from '$app/navigation';
	
	let { data } = $props();

	
	let croppedImage = $state(null);
	let cropperRef = $state(null);
	let imageUrl = $state("");
	let currentImages = $state([]);
	let visibleFileCropperSection = $state(false);
	let uploadStatus = $state({ loading: false, error: null, success: false });
	let formMessage = $state('');
	let formError = $state(false);
	let checkedTags = $state([]);
	let selectedCategoryId = $state("");

	// Когда открывается форма, загружаем данные продукта
	$effect(() => {
		if (visibleProductFormUpdate.value && currentEditingProduct.data) {
			// Загружаем существующие изображения
			currentImages = currentEditingProduct.data.image ? [...currentEditingProduct.data.image] : [];
			// Загружаем существующие теги
			checkedTags = currentEditingProduct.data.tag ? 
				currentEditingProduct.data.tag.map(tag => ({ tag_id: tag.id })) : [];
			// Загружаем выбранную категорию
			selectedCategoryId = currentEditingProduct.data.parentable.id;			
		}
	});

	function handleTagChange(tagId, checked) {
		if (checked) {
			checkedTags = [...checkedTags, { tag_id: tagId }];
		} else {
			checkedTags = checkedTags.filter(item => item.tag_id !== tagId);
		}
	}

	// Проверка, выбран ли тег
	function isTagChecked(tagId) {
		return checkedTags.some(item => item.tag_id === tagId);
	}

	// Сжатие изображения
	async function compressImage(base64Image, maxWidth = 1920, quality = 0.8) {
		return new Promise((resolve) => {
			const img = new Image();
			img.src = base64Image;
			img.onload = () => {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');

				// Вычисляем новые размеры, сохраняя пропорции
				let width = img.width;
				let height = img.height;
				
				if (width > maxWidth) {
					height = (maxWidth * height) / width;
					width = maxWidth;
				}

				canvas.width = width;
				canvas.height = height;

				// Рисуем изображение с новыми размерами
				ctx.drawImage(img, 0, 0, width, height);

				// Конвертируем в base64 с указанным качеством
				resolve(canvas.toDataURL('image/jpeg', quality));
			};
		});
	}

	// Загрузка изображения
	async function uploadImage(base64Image) {
		uploadStatus.loading = true;
		uploadStatus.error = null;
		uploadStatus.success = false;

		try {
			// Сжимаем изображение перед загрузкой
			const compressedImage = await compressImage(base64Image);
			
			const response = await fetch(compressedImage);
			const blob = await response.blob();
			const urlIMAGE = import.meta.env.VITE_URL_IMAGE;
			const formData = new FormData();

			formData.append('image', blob, 'image.jpeg');

			const result = await axios.post(urlIMAGE, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'Project': 'novostroy'
				}
			});

			uploadStatus.success = true;
			currentImages = [...currentImages, { hash: result.data }];

			return result.data;
		} catch (error) {
			uploadStatus.error = error.message;
			console.error('Error uploading image:', error);
			throw error;
		} finally {
			uploadStatus.loading = false;
		}
	}

	// Обработка обрезки изображения
	async function handleCrop() {
		if (cropperRef) {
			croppedImage = cropperRef.getCroppedImage();
			if (croppedImage) {
				try {
					const uploadedImageUrl = await uploadImage(croppedImage);
					visibleFileCropperSection = true;
				} catch (error) {
					// Handle error (already logged in uploadImage)
				}
			}
		}
	}

	// Удаление изображения
	function removeImage(index) {
		currentImages = currentImages.filter((_, i) => i !== index);
	}

	// Загрузка изображения в кроппер
	function handleFileUpload(event) {
		event.preventDefault();
		visibleFileCropperSection = true;

		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				imageUrl = e.target.result;
			};
			reader.readAsDataURL(file);
		}
	}

	// Обработчик отправки формы
	const handleSubmit = () => {
		return async ({ result }) => {
			if (result.type === 'success') {
				if (result.data.success) {
					formMessage = 'Продукт успешно обновлен';
					formError = false;
					// Обновляем данные без перезагрузки страницы
					await invalidateAll();
					// Закрываем модальное окно после успешного обновления
					setTimeout(() => {
						visibleProductFormUpdate.value = false;
						formMessage = '';
						// Удаляем перезагрузку страницы
					}, 2000);
				} else {
					formMessage = `Ошибка: ${result.data.error}`;
					formError = true;
				}
			}
		};
	};

	// Закрытие модального окна
	function closeModal() {
		visibleProductFormUpdate.value = false;
		// Очищаем состояния
		currentImages = [];
		imageUrl = "";
		visibleFileCropperSection = false;
		checkedTags = [];
		formMessage = '';
	}
</script>

{#if visibleProductFormUpdate.value && currentEditingProduct.data}
<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
	<div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
  
	<div class="fixed inset-0 pt-8 z-10 w-screen overflow-y-auto">
		<div class="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
			<div class="relative w-full max-w-5xl rounded-lg bg-white shadow sm:p-5 dark:bg-gray-800">
				<!-- Modal header -->
				<div class="mb-4 flex items-center justify-between rounded-t border-b pb-4 sm:mb-5 dark:border-gray-600">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Редактировать товар</h3>
					<button
						onclick={closeModal}
						type="button"
						class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
					>
						<svg
							aria-hidden="true"
							class="h-5 w-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clip-rule="evenodd"
							></path>
						</svg>
						<span class="sr-only">Close modal</span>
					</button>
				</div>
				
				<!-- Modal body -->
				<form method="POST" action="?/updateProduct" use:enhance={handleSubmit}>
					{#if formMessage}
						<div
							class="mb-4 rounded-lg p-4 {formError
								? 'bg-red-100 text-red-700'
								: 'bg-green-100 text-green-700'}"
						>
							{formMessage}
						</div>
					{/if}
					
					<!-- Hidden field for product ID -->
					<input type="hidden" name="product_id" value={currentEditingProduct.data.id} />
					<!-- Hidden field for description (text) ID -->
					<input type="hidden" name="description_id" value={currentEditingProduct.data.text?.id || ''} />
					
					<div class="mb-4 grid gap-4 sm:grid-cols-2">
						<div>
							<label for="value" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
								Значение
							</label>
							<input
								type="text"
								name="value"
								id="value"
								value={currentEditingProduct.data.value}
								class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
								placeholder="Значение"
								required
							/>
						</div>
						
						<div>
							<label for="user-permissions" class="mb-2 inline-flex items-center text-sm font-medium text-gray-900 dark:text-white">
								Категория
							</label>
							<select
								name="category_uuid"
								id="user-permissions" 
								class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
								bind:value={selectedCategoryId} >
								{#each data.dataCategory.fullcategory as category (category.id)} 
									<option value={String(category.id)}> {category.value}
									</option>
								{/each}
							</select>
							
						</div>

						<div class="sm:col-span-2">
							<label for="description" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
								Описание
							</label>
							<textarea
								name="description"
								id="description"
								rows="4"
								class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
								placeholder="Краткое описание"
							>{currentEditingProduct.data.text?.value || ''}</textarea>
						</div>

						<div class="sm:col-span-2">
							<label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white" for="file_input">
								Загрузите изображение
							</label>
							<div class="w-full">
								<input
									class="w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
									aria-describedby="file_input_help"
									id="file_input"
									type="file"
									accept="image/*"
									onchange={handleFileUpload}
								/>
								<p class="mt-1 text-xs font-normal text-gray-500 dark:text-gray-300" id="file_input_help">
									SVG, PNG, JPG или GIF.
								</p>
							</div>
						</div>

						{#if visibleFileCropperSection}
							<ImageCropper bind:this={cropperRef} {imageUrl} />

							<button 
								onclick={handleCrop} 
								type="button"
								class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded {uploadStatus.loading ? 'opacity-50 cursor-not-allowed' : ''}" 
								disabled={uploadStatus.loading}
							>
								{#if uploadStatus.loading}
									Загрузка...
								{:else}
									Обрезать и добавить
								{/if}
							</button>

							{#if uploadStatus.error}
								<div class="mt-2 text-red-500">
									Ошибка загрузки: {uploadStatus.error}
								</div>
							{/if}

							{#if uploadStatus.success}
								<div class="mt-2 text-green-500">
									Изображение успешно загружено!
								</div>
							{/if}
						{/if}

						<div class="mb-4 sm:col-span-2">
							<input 
								type="hidden" 
								name="currentImagesHash" 
								value={JSON.stringify(currentImages)} 
							/>
							<span class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
								Загруженные изображения (не более 4-х)
							</span>
							<div class="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
								{#each currentImages as image, index}
									<div class="relative rounded-lg bg-gray-100 p-2 dark:bg-gray-700">
										<img
											src={`${import.meta.env.VITE_S3}/catalog/${image.hash}`}
											alt="Uploaded image {index + 1}"
											class="h-full w-full object-contain"
										/>
										<button
											type="button"
											class="absolute bottom-4 right-4 text-red-600 hover:text-red-500 dark:text-red-500 dark:hover:text-red-400"
											onclick={() => removeImage(index)}
										>
											<svg
												aria-hidden="true"
												class="h-5 w-5"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fill-rule="evenodd"
													d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
													clip-rule="evenodd"
												></path>
											</svg>
											<span class="sr-only">Удалить изображение</span>
										</button>
									</div>
								{/each}
							</div>
						</div>

						<div class="sm:col-span-2">
							<label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white" for="role">
								Теги:
							</label>
							<div class="space-y-4 grid gap-4 sm:grid-cols-6 sm:space-y-0">
								{#each data.dataTags.all_tags as tag}
									<div class="mr-4 flex items-center">
										<input
											type="checkbox"
											id={`tag-update-${tag.id}`}
											value={tag.id}
											name="role"
											checked={isTagChecked(tag.id)}
											onchange={(e) => handleTagChange(tag.id, e.target.checked)}
											class="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 size-4 rounded border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
										/>
										<label
											for={`tag-update-${tag.id}`}
											class="ml-2 text-xs font-medium text-gray-900 dark:text-gray-300"
										>
											{tag.value}
										</label>
									</div>
								{/each}
							</div>
							<input 
								type="hidden" 
								name="currentTagsID" 
								value={JSON.stringify(checkedTags)} 
							/>
						</div>

						<div>
							<div class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Статус:</div>
							<label for="user-status" class="relative inline-flex cursor-pointer items-center">
								<input 
									type="checkbox" 
									value="true" 
									name="is_active"
									id="user-status" 
									class="peer sr-only" 
									checked={currentEditingProduct.data.is_active}
								/>
								<div
									class="peer-focus:!ring-primary-300 dark:peer-focus:!ring-primary-800 peer-checked:!bg-primary-600 h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:!transition-all after:content-[''] peer-checked:after:!translate-x-full peer-checked:after:!border-white peer-focus:!outline-none peer-focus:!ring-4 dark:border-gray-600 dark:bg-gray-700"
								></div>
								<span class="ml-3 text-sm font-medium text-gray-500 dark:text-gray-300">
									{currentEditingProduct.data.is_active ? 'Активен' : 'Не активен'}
								</span>
							</label>
						</div>
					</div>

					<div class="flex items-center space-x-4">
						<button
							type="submit"
							class="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
						>
							<svg
								class="-ml-1 h-5 w-5 sm:mr-1"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
									clip-rule="evenodd"
								></path>
							</svg>
							Обновить
						</button>
						<button
							onclick={closeModal}
							type="button"
							class="focus:ring-primary-300 inline-flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
						>
							Отменить
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
{/if}

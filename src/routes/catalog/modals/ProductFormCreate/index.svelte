<script>
	import { visibleProductFormCreate } from '$lib/state/productFormCreate.svelte';
	import { enhance } from '$app/forms';
	import ImageCropper from '../ImageCropper/index.svelte';
	import axios from 'axios';

	let croppedImage = $state(null);
	let cropperRef = $state(null);
	let imageUrl = $state("");
	let currentImages = $state([]);

	let visibleFileCropperSection = $state(false);

	let uploadStatus = $state({ loading: false, error: null, success: false });

	async function uploadImage(base64Image) {
		uploadStatus.loading = true;
		uploadStatus.error = null;
		uploadStatus.success = false;

		try {
			const response = await fetch(base64Image);
			const blob = await response.blob();

			const formData = new FormData();
			formData.append('image', blob, 'image/*');

			const result = await axios.post('http://localhost:8001/upload-image', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'Project': 'Novostroy'
				}
			});

			uploadStatus.success = true;

			currentImages = [...currentImages, result.data];

			return result.data;
		} catch (error) {
			uploadStatus.error = error.message;
			console.error('Error uploading image:', error);
			throw error;
		} finally {
			uploadStatus.loading = false;
		}
	}
	// $inspect('currentImages', currentImages);


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

	function removeImage(index) {
		currentImages = currentImages.filter((_, i) => i !== index);
	}

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

	let formMessage = $state('');
	let formError = $state(false);

	const handleSubmit = () => {
		return async ({ result }) => {
			if (result.type === 'success') {
				if (result.data.success) {
					formMessage = 'Продукт успешно создан';
					formError = false;
					// Закрываем модальное окно после успешного создания
					setTimeout(() => {
						visibleProductFormCreate.value = false;
						formMessage = '';
					}, 2000);
				} else {
					formMessage = `Ошибка: ${result.data.error}`;
					formError = true;
				}
			}
		};
	};

	let { data } = $props();

</script>

{#if visibleProductFormCreate.value}


<div class="relative  z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
	<!--
	  Background backdrop, show/hide based on modal state.
  
	  Entering: "ease-out duration-300"
		From: "opacity-0"
		To: "opacity-100"
	  Leaving: "ease-in duration-200"
		From: "opacity-100"
		To: "opacity-0"
	-->
	<div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
  
	<div class="fixed inset-0 pt-8 z-10 w-screen overflow-y-auto">
	  <div class="flex min-h-full  items-end justify-center p-4  sm:items-center sm:p-0">
		<!--
		  Modal panel, show/hide based on modal state.
  
		  Entering: "ease-out duration-300"
			From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
			To: "opacity-100 translate-y-0 sm:scale-100"
		  Leaving: "ease-in duration-200"
			From: "opacity-100 translate-y-0 sm:scale-100"
			To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
		-->
		<div class="relative w-full max-w-5xl rounded-lg bg-white shadow sm:p-5 dark:bg-gray-800">
			<!-- Modal header -->
			<div
				class="mb-4 flex items-center justify-between rounded-t border-b pb-4 sm:mb-5 dark:border-gray-600"
			>
				<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Добавить</h3>
				<button
					onclick={() => (visibleProductFormCreate.value = false)}
					type="button"
					class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
					data-modal-toggle="createUserdefaultModal"
				>
					<svg
						aria-hidden="true"
						class="h-5 w-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd"
						></path></svg
					>
					<span class="sr-only">Close modal</span>
				</button>
			</div>
			<!-- Modal body -->
			<form method="POST" action="?/addProduct" use:enhance={handleSubmit}>
				{#if formMessage}
					<div
						class="mb-4 rounded-lg p-4 {formError
							? 'bg-red-100 text-red-700'
							: 'bg-green-100 text-green-700'}"
					>
						{formMessage}
					</div>
				{/if}
				<div class="mb-4 grid gap-4 sm:grid-cols-2">
					<div>
						<label for="value" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
							>Значение</label
						>
						<input
							type="text"
							name="value"
							id="value"
							class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
							placeholder="Значение"
							required=""
						/>
					</div>
					<div>
						<label
							for="user-permissions"
							class="mb-2 inline-flex items-center text-sm font-medium text-gray-900 dark:text-white"
						>
							Категория
							<button
								type="button"
								data-tooltip-target="tooltip-dark"
								data-tooltip-style="dark"
								class="ml-1"
							>
								<svg
									aria-hidden="true"
									class="h-4 w-4 cursor-pointer text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									><path
										fill-rule="evenodd"
										d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
										clip-rule="evenodd"
									></path></svg
								>
								<span class="sr-only">Details</span>
							</button>
							<div
								id="tooltip-dark"
								role="tooltip"
								class="tooltip invisible absolute z-10 inline-block max-w-sm rounded-lg bg-gray-900 px-3 py-2 text-xs font-normal text-white opacity-0 shadow-sm dark:bg-gray-700"
							>
								User permissions, part of the overall user management process, are access granted to
								users to specific resources such as files, applications, networks, or devices.
								<div class="tooltip-arrow" data-popper-arrow></div>
							</div>
						</label>
						<select
							name="category_uuid"
							id="user-permissions"
							class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
						>
							{#each data as category}
								<option value={category.id}>{category.value}</option>
							{/each}
						</select>
					</div>

					<div>
						<label
							for="last-name"
							class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Title</label
						>
						<input
							type="text"
							name="last-name"
							id="last-name"
							class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
						/>
					</div>
					<div>
						<label for="email" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
							>Description</label
						>
						<input
							type="email"
							name="email"
							id="email"
							class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
						/>
					</div>
					<div class="sm:col-span-2">
						<label
							for="description"
							class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Описание</label
						>
						<div
							class="w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700"
						>
							<div
								class="flex items-center justify-between border-b px-3 py-2 dark:border-gray-600"
							>
								<div
									class="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600"
								>
									<div class="flex items-center space-x-1 sm:pr-4">
										<button
											type="button"
											class="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
										>
											<svg
												aria-hidden="true"
												class="h-5 w-5"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
												><path
													fill-rule="evenodd"
													d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
													clip-rule="evenodd"
												></path></svg
											>
											<span class="sr-only">Attach file</span>
										</button>

										  

										<button
											type="button"
											class="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
										>
											<svg
												aria-hidden="true"
												class="h-5 w-5"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
												><path
													fill-rule="evenodd"
													d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
													clip-rule="evenodd"
												></path></svg
											>
											<span class="sr-only">Embed map</span>
										</button>
										<button
											type="button"
											class="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
										>
											<svg
												aria-hidden="true"
												class="h-5 w-5"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
												><path
													fill-rule="evenodd"
													d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
													clip-rule="evenodd"
												></path></svg
											>
											<span class="sr-only">Upload image</span>
										</button>
										<button
											type="button"
											class="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
										>
											<svg
												aria-hidden="true"
												class="h-5 w-5"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
												><path
													fill-rule="evenodd"
													d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
													clip-rule="evenodd"
												></path></svg
											>
											<span class="sr-only">Format code</span>
										</button>
										<button
											type="button"
											class="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
										>
											<svg
												aria-hidden="true"
												class="h-5 w-5"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
												><path
													fill-rule="evenodd"
													d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
													clip-rule="evenodd"
												></path></svg
											>
											<span class="sr-only">Add emoji</span>
										</button>
									</div>
									<div class="hidden flex-wrap items-center space-x-1 sm:flex sm:pl-4">
										<button
											type="button"
											class="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 sm:ml-auto dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
										>
											<svg
												aria-hidden="true"
												class="h-5 w-5"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
												><path
													fill-rule="evenodd"
													d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
													clip-rule="evenodd"
												></path></svg
											>
											<span class="sr-only">Timeline</span>
										</button>
										<button
											type="button"
											class="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 sm:ml-auto dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
										>
											<svg
												aria-hidden="true"
												class="h-5 w-5"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
												><path
													fill-rule="evenodd"
													d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
													clip-rule="evenodd"
												></path></svg
											>
											<span class="sr-only">Download</span>
										</button>
									</div>
								</div>
								<button
									type="button"
									data-tooltip-target="tooltip-fullscreen"
									class="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 sm:ml-auto dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
								>
									<svg
										aria-hidden="true"
										class="h-5 w-5"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
										><path
											fill-rule="evenodd"
											d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
											clip-rule="evenodd"
										></path></svg
									>
									<span class="sr-only">Full screen</span>
								</button>
								<div
									id="tooltip-fullscreen"
									role="tooltip"
									class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
									data-popper-reference-hidden=""
									data-popper-escaped=""
									data-popper-placement="bottom"
									style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate3d(0px, 335px, 0px);"
								>
									Show full screen
									<div class="tooltip-arrow" data-popper-arrow=""></div>
								</div>
							</div>
							<div class="rounded-b-lg bg-white px-4 py-2 dark:bg-gray-800">
								<textarea
									id="biography"
									rows="4"
									class="block w-full border-0 bg-white px-0 text-sm text-gray-800 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
									placeholder="Краткое описание"
								></textarea>
							</div>
						</div>
					</div>

					<div class="sm:col-span-2">
						<label
							class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
							for="file_input">Загрузите изображение</label
						>
						<div class="w-full items-center sm:flex">
							<!-- <img
								class="mb-4 h-20 w-20 rounded-full sm:mb-0 sm:mr-4"
								src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"
								alt="Helene avatar"
							/> -->
							<div class="w-full">
								<input
									class="w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
									aria-describedby="file_input_help"
									id="file_input"
									type="file"
									accept="image/*"
									onchange={handleFileUpload}
								/>
								<p
									class="mt-1 text-xs font-normal text-gray-500 dark:text-gray-300"
									id="file_input_help"
								>
									SVG, PNG, JPG или GIF.
								</p>
							</div>
						</div>
					</div>


					{#if visibleFileCropperSection}

						<ImageCropper bind:this={cropperRef} {imageUrl} />

						<!-- Сделай форму внутри формы. Пользуй formaction -->
						<button onclick={handleCrop} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded {uploadStatus.loading ? 'opacity-50 cursor-not-allowed' : ''}" disabled={uploadStatus.loading}>
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
	
						<!-- {#if croppedImage}
							<img src={croppedImage} alt="Обработанное изображение" class="mt-2 max-w-xs" />
						{/if} -->
						<div class="mb-4 sm:col-span-2">
							<input 
								type="hidden" 
								name="currentImages" 
								value={JSON.stringify(currentImages)} 
							/>
							<span class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
								>Загруженные изображения (не более 4-х)</span
							>
							<div class="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
								{#each currentImages as image, index}
									<div class="relative rounded-lg bg-gray-100 p-2 dark:bg-gray-700">
										<img
											src={`${import.meta.env.VITE_S8}/${image}`}
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
												><path
													fill-rule="evenodd"
													d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
													clip-rule="evenodd"
												></path></svg
											>
											<span class="sr-only">Удалить изображение</span>
										</button>
									</div>
								{/each}
							</div>
						</div>
					{/if}
						
				  
					

					<div class="sm:col-span-2">
						<label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white" for="role"
							>Теги</label
						>
						<div class="space-y-4 sm:flex sm:space-y-0">
							<div class="mr-4 flex items-center">
								<input
									id="inline-checkbox"
									type="checkbox"
									value=""
									name="role"
									class="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
								/>
								<label
									for="inline-checkbox"
									class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
									>Administrator</label
								>
							</div>
							<div class="mr-4 flex items-center">
								<input
									id="inline-2-checkbox"
									type="checkbox"
									value=""
									name="role"
									class="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
								/>
								<label
									for="inline-2-checkbox"
									class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Member</label
								>
							</div>
							<div class="mr-4 flex items-center">
								<input
									checked=""
									id="inline-checked-checkbox"
									type="checkbox"
									value=""
									name="role"
									class="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
								/>
								<label
									for="inline-checked-checkbox"
									class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Viewer</label
								>
							</div>
						</div>
					</div>
					<div>
						<div class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Статус</div>
						<label for="user-status" class="relative inline-flex cursor-pointer items-center">
							<input type="checkbox" value="" id="user-status" class="peer sr-only" />
							<div
								class="peer-focus:!ring-primary-300 dark:peer-focus:!ring-primary-800 peer-checked:!bg-primary-600 h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:!transition-all after:content-[''] peer-checked:after:!translate-x-full peer-checked:after:!border-white peer-focus:!outline-none peer-focus:!ring-4 dark:border-gray-600 dark:bg-gray-700"
							></div>
							<span class="ml-3 text-sm font-medium text-gray-500 dark:text-gray-300">Inactive</span
							>
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
							><path
								fill-rule="evenodd"
								d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
								clip-rule="evenodd"
							></path></svg
						>
						Добавить
					</button>
					<button
						onclick={() => (visibleProductFormCreate.value = false)}
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

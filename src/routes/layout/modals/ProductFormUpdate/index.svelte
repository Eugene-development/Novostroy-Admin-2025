<script>
	import { visibleProductFormUpdate } from '$lib/state/productFormUpdate.svelte';
</script>

{#if visibleProductFormUpdate.value}
	<div
		class="fixed inset-0 z-50 mt-8 flex items-center justify-center overflow-y-auto p-4"
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true"
	>
		<div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
		<div class="relative w-full max-w-3xl rounded-lg shadow">
			<!-- Modal content -->
			<div class="relative rounded-lg bg-white p-4 shadow sm:p-5 dark:bg-gray-800">
				<!-- Modal header -->
				<div
					class="mb-4 mt-32 flex items-center justify-between rounded-t border-b pb-4 sm:mb-5 dark:border-gray-600"
				>
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Обновить</h3>
					<button
						onclick={() => (visibleProductFormUpdate.value = false)}
						type="button"
						class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
						data-modal-toggle="createProductModal"
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
				<form action="#">
					<div class="mb-4 grid gap-4 sm:grid-cols-2">
						<div>
							<label for="name" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
								>Product Name</label
							>
							<input
								type="text"
								name="name"
								id="name"
								value="Apple iPad 5th Gen Wi-Fi"
								class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
								placeholder="Ex. Apple iMac 27&ldquo;"
								required=""
							/>
						</div>
						<div>
							<label
								for="category"
								class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Category</label
							>
							<select
								id="category"
								class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
							>
								<option selected="">Electronics</option>
								<option value="TV">TV/Monitors</option>
								<option value="PC">PC</option>
								<option value="GA">Gaming/Console</option>
								<option value="PH">Phones</option>
							</select>
						</div>
						<div>
							<label
								for="brand"
								class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Brand</label
							>
							<input
								type="text"
								name="brand"
								id="brand"
								value="Tesla"
								class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
								placeholder="Ex. Apple"
								required=""
							/>
						</div>
						<div>
							<label
								for="price"
								class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Price</label
							>
							<input
								type="number"
								name="price"
								id="price"
								value="259"
								class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
								placeholder="$2999"
								required=""
							/>
						</div>
						<div class="grid gap-4 sm:col-span-2 sm:grid-cols-4 md:gap-6">
							<div>
								<label
									for="weight"
									class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
									>Item weight (kg)</label
								>
								<input
									type="number"
									name="weight"
									id="weight"
									value="32"
									class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
									placeholder="Ex. 12"
									required=""
								/>
							</div>
							<div>
								<label
									for="length"
									class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
									>Lenght (cm)</label
								>
								<input
									type="number"
									name="length"
									id="length"
									value="126"
									class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
									placeholder="Ex. 105"
									required=""
								/>
							</div>
							<div>
								<label
									for="breadth"
									class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
									>Breadth (cm)</label
								>
								<input
									type="number"
									name="breadth"
									id="breadth"
									value="121"
									class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
									placeholder="Ex. 15"
									required=""
								/>
							</div>
							<div>
								<label
									for="width"
									class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
									>Width (cm)</label
								>
								<input
									type="number"
									name="width"
									id="width"
									value="953"
									class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
									placeholder="Ex. 23"
									required=""
								/>
							</div>
						</div>
						<div class="sm:col-span-2">
							<label
								for="description"
								class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
								>Description</label
							>
							<textarea
								id="description"
								rows="4"
								class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
								placeholder="Write your description..."
								>Standard glass, 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost
								up to 5.0GHz, 16GB 2666MHz DDR4 memory, Radeon Pro 5500 XT with 8GB of GDDR6 memory,
								256GB SSD storage, Gigabit Ethernet, Magic Mouse 2, Magic Keyboard - US</textarea
							>
						</div>
					</div>
					<div class="mb-4 space-y-4 sm:flex sm:space-y-0">
						<div class="mr-4 flex items-center">
							<input
								id="inline-checkbox"
								type="checkbox"
								value=""
								name="sellingType"
								class="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
							/>
							<label
								for="inline-checkbox"
								class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
								>In-store only</label
							>
						</div>
						<div class="mr-4 flex items-center">
							<input
								id="inline-2-checkbox"
								type="checkbox"
								value=""
								name="sellingType"
								class="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
							/>
							<label
								for="inline-2-checkbox"
								class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
								>Online selling only</label
							>
						</div>
						<div class="mr-4 flex items-center">
							<input
								checked=""
								id="inline-checked-checkbox"
								type="checkbox"
								value=""
								name="sellingType"
								class="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
							/>
							<label
								for="inline-checked-checkbox"
								class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
								>Both in-store and online</label
							>
						</div>
					</div>
					<div class="mb-4">
						<span class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
							>Product Images</span
						>
						<div class="mb-4 grid grid-cols-3 gap-4 sm:grid-cols-4">
							<div class="relative rounded-lg bg-gray-100 p-2 sm:h-36 sm:w-36 dark:bg-gray-700">
								<img
									src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-side-image.png"
									alt="iMac Side Image"
								/>
								<button
									type="button"
									class="absolute bottom-1 left-1 text-red-600 hover:text-red-500 dark:text-red-500 dark:hover:text-red-400"
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
									<span class="sr-only">Delete image</span>
								</button>
							</div>
							<div class="relative rounded-lg bg-gray-100 p-2 sm:h-36 sm:w-36 dark:bg-gray-700">
								<img
									src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png"
									alt="iMac Front Image"
								/>
								<button
									type="button"
									class="absolute bottom-1 left-1 text-red-600 hover:text-red-500 dark:text-red-500 dark:hover:text-red-400"
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
									<span class="sr-only">Delete image</span>
								</button>
							</div>
							<div class="relative rounded-lg bg-gray-100 p-2 sm:h-36 sm:w-36 dark:bg-gray-700">
								<img
									src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-back-image.png"
									alt="iMac Back Image"
								/>
								<button
									type="button"
									class="absolute bottom-1 left-1 text-red-600 hover:text-red-500 dark:text-red-500 dark:hover:text-red-400"
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
									<span class="sr-only">Delete image</span>
								</button>
							</div>
							<div class="relative rounded-lg bg-gray-100 p-2 sm:h-36 sm:w-36 dark:bg-gray-700">
								<img
									src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-back-image.png"
									alt="iMac Back Image"
								/>
								<button
									type="button"
									class="absolute bottom-1 left-1 text-red-600 hover:text-red-500 dark:text-red-500 dark:hover:text-red-400"
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
									<span class="sr-only">Delete image</span>
								</button>
							</div>
						</div>
						<div class="flex w-full items-center justify-center">
							<label
								for="dropzone-file"
								class="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
							>
								<div class="flex flex-col items-center justify-center pb-6 pt-5">
									<svg
										aria-hidden="true"
										class="mb-3 h-10 w-10 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
										></path></svg
									>
									<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
										<span class="font-semibold">Click to upload</span> or drag and drop
									</p>
									<p class="text-xs text-gray-500 dark:text-gray-400">
										SVG, PNG, JPG or GIF (MAX. 800x400px)
									</p>
								</div>
								<input id="dropzone-file" type="file" class="hidden" />
							</label>
						</div>
					</div>
					<div class="flex items-center space-x-4">
						<button
							type="submit"
							class="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
						>
							Update product
						</button>
						<button
							onclick={() => (visibleProductFormUpdate.value = false)}
							type="button"
							class="inline-flex items-center rounded-lg border border-red-600 px-5 py-2.5 text-center text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
						>
							<svg
								aria-hidden="true"
								class="-ml-1 mr-1 h-5 w-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								><path
									fill-rule="evenodd"
									d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
									clip-rule="evenodd"
								></path></svg
							>
							Закрыть
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}

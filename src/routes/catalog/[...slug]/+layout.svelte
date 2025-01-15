<script>
	/** @type {{ data: import('./$types').LayoutData, children: import('svelte').Snippet }} */
	import { visibleProductFormCreate } from '$lib/state/productFormCreate.svelte';

	import { enhance } from '$app/forms';


	let { children, data } = $props();

	let currentSubCatalogIndex = $state(null);
	let currentSubCatalogValue = $state('Каталог');
	let visibleSubCatalog = $state(false);

	let toggleSubCatalog = (i, item) => {
		currentSubCatalogIndex = currentSubCatalogIndex === i ? null : i;
		currentSubCatalogValue = currentSubCatalogValue === item.value ? 'Каталог' : item.value;
		visibleSubCatalog = false;
	};

	let currentRubricIndex = $state(null);
	let currentRubricValue = $state('Рубрика');
	let visibleRubric = $state(false);

	let toggleRubric = (i, item) => {
		currentRubricIndex = currentRubricIndex === i ? null : i;
		currentRubricValue = currentRubricValue === item.value ? 'Рубрика' : item.value;
		visibleRubric = false;
	};

	let currentCategoryIndex = $state(null);
	let currentCategoryValue = $state('Категория');
	let visibleCategory = $state(false);

	let toggleCategory = (i, item) => {
		currentCategoryIndex = currentCategoryIndex === i ? null : i;
		currentCategoryValue = currentCategoryValue === item.value ? 'Категория' : item.value;
		visibleCategory = false;
	};

	// $inspect("currentSubCatalogIndex", currentSubCatalogIndex)
	// $inspect("currentRubricIndex", currentRubricIndex)
	// $inspect("currentCategoryIndex", currentCategoryIndex)
	// $inspect("fullcatalog", data.req.fullcatalog)
</script>

<section class="bg-gray-50 py-3 sm:py-5">
	<div class="mx-auto max-w-screen-2xl px-4 lg:px-12">
		<!-- Start coding here -->
		<div class="relative overflow-hidden bg-white shadow-md sm:rounded-lg">
			<div
				class="flex flex-col items-center justify-between space-y-3 border-b p-4 md:flex-row md:space-x-4 md:space-y-0"
			>
				<div class="flex w-full items-center space-x-3">
					<h5 class="font-semibold">Полный каталог</h5>
					<div class="font-medium text-gray-400">Всего: 6 560</div>
					<div data-tooltip-target="results-tooltip">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4 text-gray-400"
							viewbox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
								clip-rule="evenodd"
							/>
						</svg>
						<span class="sr-only">More info</span>
					</div>
				</div>
				<div class="flex w-full flex-row items-center justify-end space-x-3">
					<button
						onclick={() => (visibleProductFormCreate.value = true)}
						type="button"
						class="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 flex w-full items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-gray-800 focus:outline-none focus:ring-4 md:w-auto"
					>
						<svg
							class="mr-2 h-3.5 w-3.5"
							fill="currentColor"
							viewbox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								clip-rule="evenodd"
								fill-rule="evenodd"
								d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
							/>
						</svg>
						Добавить
					</button>
					<button
						type="button"
						class="hover:text-primary-700 flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 md:w-auto"
					>
						<svg
							class="mr-2 h-3 w-3"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							stroke="currentColor"
							viewbox="0 0 12 13"
							aria-hidden="true"
						>
							<path d="M1 2V1h10v3H1V2Zm0 4h5v6H1V6Zm8 0h2v6H9V6Z" />
						</svg>
						Структура каталога
					</button>
				</div>
			</div>
			<div
				class="flex flex-col-reverse items-start justify-between border-b p-4 md:flex-row md:items-center md:space-x-4"
			>
				<div class="mt-3 md:mt-0">
					<button
						id="actionsDropdownButton"
						data-dropdown-toggle="actionsDropdown"
						class="hover:text-primary-700 flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 md:w-auto"
						type="button"
					>
						<svg
							class="-ml-1 mr-1.5 h-5 w-5"
							fill="currentColor"
							viewbox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								clip-rule="evenodd"
								fill-rule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							/>
						</svg>
						Действия
					</button>
					<div
						id="actionsDropdown"
						class="z-10 hidden w-44 divide-y divide-gray-100 rounded bg-white shadow"
					>
						<ul class="py-1 text-sm text-gray-700" aria-labelledby="actionsDropdownButton">
							<li>
								<a href="/" class="block px-4 py-2 hover:bg-gray-100">Массовое удаление</a>
							</li>
						</ul>
						<div class="py-1">
							<a href="/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								>Развернуть всё</a
							>
						</div>
					</div>
				</div>
				<div
					class="grid w-full grid-cols-1 rounded-md bg-gray-50 p-2 md:grid-cols-4 md:gap-4 lg:w-2/3"
				>
					<div>
						<!-- <label id="listbox-label" class="block text-sm/6 font-medium text-gray-900">Каталог</label> -->
						<div class="relative">
							<button
								onclick={() => (visibleSubCatalog = !visibleSubCatalog)}
								type="button"
								class="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
								aria-haspopup="listbox"
								aria-expanded="true"
								aria-labelledby="listbox-label"
							>
								<span class="col-start-1 row-start-1 flex items-center gap-3 pr-6">
									<span
										aria-label="Online"
										class="inline-block size-2 shrink-0 rounded-full border border-transparent"
									></span>
									<span class="block truncate">{currentSubCatalogValue}</span>
								</span>
								<svg
									class="col-start-1 row-start-1 size-5 self-center justify-self-end text-green-500 sm:size-4"
									viewBox="0 0 16 16"
									fill="currentColor"
									aria-hidden="true"
									data-slot="icon"
								>
									<path
										fill-rule="evenodd"
										d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
										clip-rule="evenodd"
									/>
								</svg>
							</button>

							{#if visibleSubCatalog}
								<div
									class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
									tabindex="-1"
									role="listbox"
									aria-labelledby="listbox-label"
									aria-activedescendant="listbox-option-3"
								>
									{#each data.req.fullcatalog as item, i}
										<button
											type="button"
											onclick={() => toggleSubCatalog(i, item)}
											class="relative w-full cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-gray-100"
											id="listbox-option-0"
										>
											<div class="flex items-center">
												<!-- Online: "bg-green-400 forced-colors:bg-[Highlight]", Not Online: "bg-gray-200" -->
												<span
													class="inline-block size-2 shrink-0 rounded-full border border-transparent bg-green-400"
													aria-hidden="true"
												></span>
												<!-- Selected: "font-semibold", Not Selected: "font-normal" -->
												<span class="ml-3 block truncate font-normal">
													{item.value}
													<span class="sr-only"> is online</span>
												</span>
											</div>
										</button>
									{/each}
								</div>
							{/if}
						</div>
					</div>

					{#if currentSubCatalogIndex !== null}
						<div>
							<!-- <label id="listbox-label" class="block text-sm/6 font-medium text-gray-900">Каталог</label> -->
							<div class="relative">
								<button
									onclick={() => (visibleRubric = !visibleRubric)}
									type="button"
									class="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
									aria-haspopup="listbox"
									aria-expanded="true"
									aria-labelledby="listbox-label"
								>
									<span class="col-start-1 row-start-1 flex items-center gap-3 pr-6">
										<span
											aria-label="Online"
											class="inline-block size-2 shrink-0 rounded-full border border-transparent"
										></span>
										<span class="block truncate">{currentRubricValue}</span>
									</span>
									<svg
										class="col-start-1 row-start-1 size-5 self-center justify-self-end text-green-500 sm:size-4"
										viewBox="0 0 16 16"
										fill="currentColor"
										aria-hidden="true"
										data-slot="icon"
									>
										<path
											fill-rule="evenodd"
											d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
											clip-rule="evenodd"
										/>
									</svg>
								</button>

								{#if visibleRubric}
									<div
										class=" absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
										tabindex="-1"
										role="listbox"
										aria-labelledby="listbox-label"
										aria-activedescendant="listbox-option-3"
									>
										{#each data.req.fullcatalog[currentSubCatalogIndex].rubric as item, i}
											<button
												type="button"
												onclick={() => toggleRubric(i, item)}
												class="relative w-full cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-gray-100"
												id="listbox-option-0"
											>
												<div class="flex items-center">
													<!-- Online: "bg-green-400 forced-colors:bg-[Highlight]", Not Online: "bg-gray-200" -->
													<span
														class="inline-block size-2 shrink-0 rounded-full border border-transparent bg-green-400"
														aria-hidden="true"
													></span>
													<!-- Selected: "font-semibold", Not Selected: "font-normal" -->
													<span class="ml-3 block truncate font-normal">
														{item.value}
														<span class="sr-only"> is online</span>
													</span>
												</div>
											</button>
										{/each}
									</div>
								{/if}
							</div>
						</div>
					{/if}

					{#if currentRubricIndex !== null}
						<div>
							<!-- <label id="listbox-label" class="block text-sm/6 font-medium text-gray-900">Каталог</label> -->
							<div class="relative">
								<button
									onclick={() => (visibleCategory = !visibleCategory)}
									type="button"
									class="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
									aria-haspopup="listbox"
									aria-expanded="true"
									aria-labelledby="listbox-label"
								>
									<span class="col-start-1 row-start-1 flex items-center gap-3 pr-6">
										<span
											aria-label="Online"
											class="inline-block size-2 shrink-0 rounded-full border border-transparent"
										></span>
										<span class="block truncate">{currentCategoryValue}</span>
									</span>
									<svg
										class="col-start-1 row-start-1 size-5 self-center justify-self-end text-green-500 sm:size-4"
										viewBox="0 0 16 16"
										fill="currentColor"
										aria-hidden="true"
										data-slot="icon"
									>
										<path
											fill-rule="evenodd"
											d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
											clip-rule="evenodd"
										/>
									</svg>
								</button>

								{#if visibleCategory}
									<div
										class=" absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
										tabindex="-1"
										role="listbox"
										aria-labelledby="listbox-label"
										aria-activedescendant="listbox-option-3"
									>
										{#each data.req.fullcatalog[currentSubCatalogIndex].rubric[currentRubricIndex].category as item, i}
											<button
												onclick={() => toggleCategory(i, item)}
												class="relative w-full cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-gray-100"
												id="listbox-option-0"
											>
												<a
													href="/catalog/{item.parentable.parentable.slug}/{item.parentable
														.slug}/{item.slug}"
													class="flex items-center"
												>
													<span
														class="inline-block size-2 shrink-0 rounded-full border border-transparent bg-green-400"
														aria-hidden="true"
													></span>
													<span class="ml-3 block truncate font-normal">
														{item.value}
														<span class="sr-only"> is online</span>
													</span>
												</a>
											</button>
										{/each}
									</div>
								{/if}
							</div>
						</div>
					{/if}

					<!-- <div class="w-full">
						<label for="price" class="sr-only">Рубрика</label><select
							id="price"
							class="peer block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-sm text-gray-500 focus:border-gray-200 focus:outline-none focus:ring-0"
							><option selected="">Рубрика</option><option value="below-100">$ 1-100</option><option
								value="below-500">$ 101-500</option
							><option value="below-1000">$ 501-1000</option><option value="over-1000"
								>$ 1001+</option
							></select
						>
					</div> -->
					<!-- <div class="w-full">
						<label for="category" class="sr-only">Категория</label><select
							id="category"
							class="peer block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-sm text-gray-500 focus:border-gray-200 focus:outline-none focus:ring-0"
							><option selected="">Категория</option><option value="pc">PC</option><option
								value="phone">Phone</option
							><option value="tablet">Tablet</option><option value="console">Gaming/Console</option
							></select
						>
					</div> -->
					<!-- <div class="w-full">
						<label for="category" class="sr-only">Статус</label><select
							id="category"
							class="peer block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-sm text-gray-500 focus:border-gray-200 focus:outline-none focus:ring-0"
							><option selected="">Все</option><option value="pc">Активно</option><option
								value="phone">Не активно</option
							></select
						>
					</div> -->
				</div>
			</div>

			{@render children()}

			<div
				class="flex flex-col items-start justify-between space-y-3 px-4 pb-4 pt-3 md:flex-row md:items-center md:space-y-0"
				aria-label="Table navigation"
			>
				<div
					id="results-tooltip"
					role="tooltip"
					class=" tooltip z-10 inline-block rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-900 shadow-sm transition-opacity duration-300"
				>
					Showing 1-10 of 6,560 results
					<div class="tooltip-arrow" data-popper-arrow=""></div>
				</div>
				<!-- <div class="text-xs flex items-center space-x-5">
                    <div>
                        <div class="text-gray-500 mb-1">Purchase price</div>
                        <div class="font-medium">$ 3,567,890</div>
                    </div>
                    <div>
                        <div class="text-gray-500 mb-1">Total selling price</div>
                        <div class=" font-medium">$ 8,489,400</div>
                    </div>
                </div> -->
				<div class="flex items-center space-x-4">
					<button
						type="button"
						class="text-primary-700 hover:text-primary-800 focus:ring-primary-300 flex items-center rounded-lg py-1.5 text-center text-sm font-medium focus:outline-none focus:ring-4"
						>Print barcodes</button
					><button
						type="button"
						class="text-primary-700 hover:text-primary-800 focus:ring-primary-300 flex items-center rounded-lg py-1.5 text-center text-sm font-medium focus:outline-none focus:ring-4"
						>Export CSV</button
					>
				</div>
			</div>
		</div>
	</div>
</section>


<!-- TEST -->
<form method="POST" action="?/ddd" use:enhance>
	<label>
		Email
		<input name="email" type="email">
	</label>
	<label>
		Password
		<input name="password" type="password">
	</label>
	<button>Log in</button>
</form>

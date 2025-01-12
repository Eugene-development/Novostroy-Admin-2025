<script>
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();
    $inspect(data);
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
				<div class="grid w-full grid-cols-1 md:grid-cols-4 md:gap-4 lg:w-2/3">
                    <div>
                        <!-- <label id="listbox-label" class="block text-sm/6 font-medium text-gray-900">Каталог</label> -->
                        <div class="relative mt-2">
                          <button type="button" class="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                            <span class="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                              <span aria-label="Online" class="inline-block size-2 shrink-0 rounded-full border border-transparent"></span>
                              <span class="block truncate">Каталог</span>
                            </span>
                            <svg class="col-start-1 row-start-1 size-5 self-center justify-self-end text-green-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                              <path fill-rule="evenodd" d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z" clip-rule="evenodd" />
                            </svg>
                          </button>
                      
                          <!--
                            Select popover, show/hide based on select state.
                      
                            Entering: ""
                              From: ""
                              To: ""
                            Leaving: "transition ease-in duration-100"
                              From: "opacity-100"
                              To: "opacity-0"
                          -->
                          <ul class="hidden absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                            <!--
                              Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.
                      
                              Highlighted: "bg-green-600 text-white outline-none", Not Highlighted: "text-gray-900"
                            -->
                            <li class="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900" id="listbox-option-0" role="option">
                              <div class="flex items-center">
                                <!-- Online: "bg-green-400 forced-colors:bg-[Highlight]", Not Online: "bg-gray-200" -->
                                <span class="inline-block size-2 shrink-0 rounded-full border border-transparent bg-green-400" aria-hidden="true"></span>
                                <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                                <span class="ml-3 block truncate font-normal">
                                  Wade Cooper
                                  <span class="sr-only"> is online</span>
                                </span>
                              </div>
                      
                              <!--
                                Checkmark, only display for selected option.
                      
                                Highlighted: "text-white", Not Highlighted: "text-green-600"
                              -->
                              <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-green-600">
                                <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                  <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                                </svg>
                              </span>
                            </li>
                            <li class="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900" id="listbox-option-0" role="option">
                              <div class="flex items-center">
                                <!-- Online: "bg-green-400 forced-colors:bg-[Highlight]", Not Online: "bg-gray-200" -->
                                <span class="inline-block size-2 shrink-0 rounded-full border border-transparent bg-green-400" aria-hidden="true"></span>
                                <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                                <span class="ml-3 block truncate font-normal">
                                  Wade Cooper
                                  <span class="sr-only"> is online</span>
                                </span>
                              </div>
                      
                              <!--
                                Checkmark, only display for selected option.
                      
                                Highlighted: "text-white", Not Highlighted: "text-green-600"
                              -->
                              <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-green-600">
                                <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                  <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                                </svg>
                              </span>
                            </li>
                      
                            <!-- More items... -->
                          </ul>
                        </div>
                      </div>
                      
					<!-- <div class="w-full">
						<label for="catalog" class="sr-only">Каталог</label>
						<select
							id="catalog"
							class="peer block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-sm text-gray-500 focus:border-gray-200 focus:outline-none focus:ring-0"
						>
							<option selected disabled>Каталог</option>
							{#each data.req.fullcatalog as item}
								<option value={item.slug}>{item.value}</option>
							{/each}
						</select>
					</div> -->
					<div class="w-full">
						<label for="price" class="sr-only">Рубрика</label><select
							id="price"
							class="peer block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-sm text-gray-500 focus:border-gray-200 focus:outline-none focus:ring-0"
							><option selected="">Рубрика</option><option value="below-100">$ 1-100</option><option
								value="below-500">$ 101-500</option
							><option value="below-1000">$ 501-1000</option><option value="over-1000"
								>$ 1001+</option
							></select
						>
					</div>
					<div class="w-full">
						<label for="category" class="sr-only">Категория</label><select
							id="category"
							class="peer block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-sm text-gray-500 focus:border-gray-200 focus:outline-none focus:ring-0"
							><option selected="">Категория</option><option value="pc">PC</option><option
								value="phone">Phone</option
							><option value="tablet">Tablet</option><option value="console">Gaming/Console</option
							></select
						>
					</div>
					<div class="w-full">
						<label for="category" class="sr-only">Статус</label><select
							id="category"
							class="peer block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-sm text-gray-500 focus:border-gray-200 focus:outline-none focus:ring-0"
							><option selected="">Все</option><option value="pc">Активно</option><option
								value="phone">Не активно</option
							></select
						>
					</div>
				</div>
			</div>
			<div class="overflow-x-auto">
				<table class="w-full text-left text-sm text-gray-500">
					<thead class="bg-gray-50 text-xs uppercase">
						<tr>
							<th scope="col" class="p-4">
								<div class="flex items-center">
									<input
										id="checkbox-all"
										type="checkbox"
										class="text-primary-600 focus:ring-primary-500 h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2"
									/>
									<label for="checkbox-all" class="sr-only">checkbox</label>
								</div>
							</th>
							<th scope="col" class="px-4 py-3">
								<span class="sr-only">Expand/Collapse Row</span>
							</th>
							<th scope="col" class="min-w-[14rem] px-4 py-3">Продукт</th>
							<th scope="col" class="min-w-[10rem] px-4 py-3">
								Категория
								<svg
									class="ml-1 inline-block h-4 w-4"
									fill="currentColor"
									viewbox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
								>
									<path
										clip-rule="evenodd"
										fill-rule="evenodd"
										d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
									/>
								</svg>
							</th>
							<th scope="col" class="min-w-[6rem] px-4 py-3">
								Бренд
								<svg
									class="ml-1 inline-block h-4 w-4"
									fill="currentColor"
									viewbox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
								>
									<path
										clip-rule="evenodd"
										fill-rule="evenodd"
										d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
									/>
								</svg>
							</th>
							<th scope="col" class="min-w-[6rem] px-4 py-3">
								Добавлено
								<svg
									class="ml-1 inline-block h-4 w-4"
									fill="currentColor"
									viewbox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
								>
									<path
										clip-rule="evenodd"
										fill-rule="evenodd"
										d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
									/>
								</svg>
							</th>
							<th scope="col" class="min-w-[6rem] px-4 py-3">
								Изменено
								<svg
									class="ml-1 inline-block h-4 w-4"
									fill="currentColor"
									viewbox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
								>
									<path
										clip-rule="evenodd"
										fill-rule="evenodd"
										d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
									/>
								</svg>
							</th>
							<!-- <th scope="col" class="px-4 py-3 min-w-[12rem]">
                                Total Sales
                                <svg class="h-4 w-4 ml-1 inline-block" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" />
                                </svg>
                            </th> -->
							<th scope="col" class="min-w-[7rem] px-4 py-3">
								Статус
								<svg
									class="ml-1 inline-block h-4 w-4"
									fill="currentColor"
									viewbox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
								>
									<path
										clip-rule="evenodd"
										fill-rule="evenodd"
										d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
									/>
								</svg>
							</th>
						</tr>
					</thead>
					<tbody data-accordion="table-column">
						<tr
							class="cursor-pointer border-b transition hover:bg-gray-200"
							id="table-column-header-0"
							data-accordion-target="#table-column-body-0"
							aria-expanded="false"
							aria-controls="table-column-body-0"
						>
							<td class="w-4 px-4 py-3">
								<div class="flex items-center">
									<input
										id="checkbox-table-search-1"
										type="checkbox"
										class="text-primary-600 focus:ring-primary-500 h-4 w-4 rounded border-gray-300 bg-gray-100"
									/>
									<label for="checkbox-table-search-1" class="sr-only">checkbox</label>
								</div>
							</td>
							<td class="w-4 p-3">
								<svg
									data-accordion-icon=""
									class="h-6 w-6 shrink-0"
									fill="currentColor"
									viewbox="0 0 20 20"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/>
								</svg>
							</td>
							<th
								scope="row"
								class="flex items-center whitespace-nowrap px-4 py-3 font-medium text-gray-900"
							>
								<img
									src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png"
									alt="iMac Front"
									class="mr-3 h-8 w-auto"
								/>
								Apple iMac 27&#34;
							</th>
							<td class="px-4 py-3">PC</td>
							<td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900">Apple</td>
							<td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900">$2999</td>
							<td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900">200</td>
							<!-- <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">245</td> -->
							<td class="whitespace-nowrap px-4 py-3">
								<div
									class="mr-2 w-fit rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
								>
									Active
								</div>
							</td>
						</tr>
						<tr
							class=" w-full flex-1 overflow-x-auto"
							id="table-column-body-0"
							aria-labelledby="table-column-header-0"
						>
							<td class="border-b p-4" colspan="9">
								<div class="mb-4 grid grid-cols-4 gap-4">
									<div
										class="relative flex h-32 items-center justify-center rounded-lg bg-gray-100 p-2 sm:h-36 sm:w-full"
									>
										<img
											src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png"
											alt="iMac Front"
											class="h-full w-auto"
										/>
									</div>
								</div>
								<div>
									<h6 class="mb-2 text-base font-medium leading-none text-gray-900">Описание</h6>
									<div class="max-w-screen-md text-base text-gray-500">
										Standard glass, 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo
										Boost up to 5.0GHz, 16GB 2666MHz DDR4 memory, Radeon Pro 5500 XT with 8GB of
										GDDR6 memory, 256GB SSD storage, Gigabit Ethernet, Magic Mouse 2, Magic Keyboard
										- US.
									</div>
								</div>
								<div class="mt-4 grid grid-cols-4 gap-4">
									<div
										class="relative flex flex-col items-start justify-between rounded-lg bg-gray-100 p-3"
									>
										<h6 class="mb-2 text-base font-medium leading-none text-gray-900">Статус</h6>
										<div
											class="bg-primary-100 text-primary-800 flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="mr-1 h-3.5 w-3.5"
												viewbox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
												/>
											</svg>
											Активно
										</div>
									</div>
									<div class="relative flex flex-col justify-between rounded-lg bg-gray-100 p-3">
										<h6 class="mb-2 text-base font-medium leading-none text-gray-900">Категория</h6>
										<div class="flex items-center text-gray-500">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="mr-1 h-3.5 w-3.5"
												viewbox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													fill-rule="evenodd"
													d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
													clip-rule="evenodd"
												/>
											</svg>
											Worldwide
										</div>
									</div>
									<div class="relative rounded-lg bg-gray-100 p-3">
										<h6 class="mb-2 text-base font-medium leading-none text-gray-900">Теги</h6>
										<div class="flex items-center space-x-2">
											<div class="h-6 w-6 rounded-full bg-purple-600"></div>
											<div class="h-6 w-6 rounded-full bg-green-400"></div>
											<div class="bg-primary-600 h-6 w-6 rounded-full"></div>
											<div class="h-6 w-6 rounded-full bg-pink-400"></div>
											<div class="h-6 w-6 rounded-full bg-teal-300"></div>
											<div class="h-6 w-6 rounded-full bg-green-300"></div>
										</div>
									</div>
									<div class="relative rounded-lg bg-gray-100 p-3">
										<h6 class="mb-2 text-base font-medium leading-none text-gray-900">Бренд</h6>
										<div class="flex items-center text-gray-500">Apple</div>
									</div>
								</div>
								<div class="mt-4 flex items-center space-x-3">
									<button
										type="button"
										class="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 flex items-center rounded-lg px-3 py-2 text-center text-sm font-medium text-gray-800 focus:outline-none focus:ring-4"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="mr-1 h-4 w-4"
											viewbox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
											/>
											<path
												fill-rule="evenodd"
												d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
												clip-rule="evenodd"
											/>
										</svg>
										Применить
									</button>
									<button
										type="button"
										class="hover:text-primary-700 flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
										>Вернуть
									</button>
									<button
										type="button"
										class="flex items-center rounded-lg bg-red-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="mr-1 h-4 w-4"
											viewbox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fill-rule="evenodd"
												d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0111 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
												clip-rule="evenodd"
											/>
										</svg>
										Удалить
									</button>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

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

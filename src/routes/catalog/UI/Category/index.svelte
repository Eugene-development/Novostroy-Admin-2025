<script>
	/** @type {import('./$types').PageData} */

	import ItemProduct from './ItemProduct/index.svelte';
	let { data } = $props();

	// $inspect(isVisibleCurrentProduct);
	// $inspect('data', data);
</script>

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
					Рубрика
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
			{#each data.product as item}
				<ItemProduct data={item} />
			{/each}
		</tbody>
	</table>
</div>

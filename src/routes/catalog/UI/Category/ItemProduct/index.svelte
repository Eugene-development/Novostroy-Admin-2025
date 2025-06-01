<script>
	/** @type {import('./$types').PageData} */
	// import { isVisibleCurrentProduct } from '$lib/state/visibleCurrentProduct.svelte';
	const isVisibleCurrentProduct = $state({
		value: false
	});
	let { data } = $props();
</script>

<tr
	class="border-t-2 {isVisibleCurrentProduct.value
		? ' border-r-2 border-green-200'
		: ''} transition hover:bg-gray-50"
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
		<button
			onclick={() => (isVisibleCurrentProduct.value = !isVisibleCurrentProduct.value)}
			type="button"
			aria-label="Раскрыть строку"
			class="cursor-pointer"
		>
			<svg
				data-accordion-icon=""
				class="h-6 w-6 shrink-0 {isVisibleCurrentProduct.value ? 'rotate-180 text-red-600' : ''}"
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
		</button>
	</td>
	<th scope="row" class="flex items-center whitespace-nowrap px-4 py-3 font-medium text-gray-900">
		<img
			src={`${import.meta.env.VITE_S3}/catalog/${data.image[data.image.length - 1].hash}`}
			alt="iMac Front"
			class="mr-3 h-8 w-auto"
		/>
		{data.value}
	</th>
	<td class="px-4 py-3">{data.parentable.parentable.value}</td>
	<td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900">{data.parentable.value}</td>
	<td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900">{data.created_at}</td>
	{#if data.created_at != data.updated_at}
		<td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900">{data.updated_at}</td>
	{:else}
		<td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900">-</td>
	{/if}
	<!-- <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">245</td> -->
	<td class="whitespace-nowrap px-4 py-3">
		<div class="mr-2 w-fit rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
			{data?.is_active ? 'Активно' : 'Не активно'}
		</div>
	</td>
</tr>
{#if isVisibleCurrentProduct.value}
	<tr
		class="w-full flex-1 overflow-x-auto border-b-2 border-r-2 border-green-200 bg-gray-50/50 shadow-xl"
		id="table-column-body-0"
		aria-labelledby="table-column-header-0"
	>
		<td class="border-b p-4" colspan="9">
			<div class="mb-4 grid grid-cols-4 gap-4">
				{#each data.image.reverse() as image}
					<div
						class="relative flex h-32 items-center justify-center rounded-lg border bg-gray-100 p-2 sm:h-36 sm:w-full"
					>
						<img
							src={`${import.meta.env.VITE_S3}/catalog/${image.hash}`}
							alt={data.value}
							class="h-full w-auto"
						/>
					</div>
				{/each}
			</div>
			<div>
				<h6 class="mb-2 text-base font-medium leading-none text-gray-900">Описание</h6>
				<div class="max-w-screen-md text-base text-gray-500">
					{data?.text ? data.text.value : 'Нет описания'}
				</div>
			</div>
			<div class="mt-4 grid grid-cols-4 gap-4">
				<div class="relative flex flex-col items-start justify-between rounded-lg bg-gray-100 p-3">
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
						{data?.is_active ? 'Активно' : 'Не активно'}
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
					{#each data?.tag || [] as tag}
						<div>{tag.value}</div>
					{/each}
				</div>
				<div class="relative rounded-lg bg-gray-100 p-3">
					<h6 class="mb-2 text-base font-medium leading-none text-gray-900">Наименование</h6>
					<div class="flex items-center text-gray-500">{data.value}</div>
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
					Редактировать
				</button>
				<button
					type="button"
					class="hover:text-primary-700 flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
					>Отменить
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
{/if}

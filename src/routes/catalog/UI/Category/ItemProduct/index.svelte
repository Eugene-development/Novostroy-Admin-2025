<script>
    /** @type {import('./$types').PageData} */
    // import { isVisibleCurrentProduct } from '$lib/state/visibleCurrentProduct.svelte';
    import { visibleProductFormUpdate, currentEditingProduct } from '$lib/state/productFormUpdate.svelte';
    import { visibleProductFormDelete, currentDeletingProduct } from '$lib/state/productFormDelete.svelte';

    // $state и $derived обычно доступны глобально в Svelte 5,
    // но если ваш проект настроен иначе, может потребоваться:
    // import { $state, $derived } from 'svelte';

    const isVisibleCurrentProduct = $state({
        value: false
    });
    let { data } = $props(); // data содержит created_at и updated_at как строки

    // Вспомогательная функция для форматирования даты
    function formatDisplayDate(dateString) {
        if (!dateString || typeof dateString !== 'string') return dateString || ''; // Возвращаем как есть или пустую строку
        const parts = dateString.split(' ');
        if (parts.length !== 2) return dateString; // Некорректный формат

        const datePart = parts[0];
        const timePart = parts[1];

        const dateParts = datePart.split('-');
        if (dateParts.length !== 3) return dateString; // Некорректный формат даты

        const [year, month, day] = dateParts;
        return `${day}.${month}.${year} ${timePart}`;
    }

    // Создаем производные значения для отформатированных дат
    const formattedCreatedAt = $derived(formatDisplayDate(data.created_at));
    const formattedUpdatedAt = $derived(formatDisplayDate(data.updated_at));

    function handleEdit() {
        currentEditingProduct.data = data;
        visibleProductFormUpdate.value = true;
    }

    function handleDelete() {
        currentDeletingProduct.data = data;
        visibleProductFormDelete.value = true;
    }
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
                id="checkbox-table-search-1-{data.id}" type="checkbox"
                class="text-primary-600 focus:ring-primary-500 h-4 w-4 rounded border-gray-300 bg-gray-100"
            />
            <label for="checkbox-table-search-1-{data.id}" class="sr-only">checkbox</label>
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
            src={`${import.meta.env.VITE_S3}/catalog/${data?.image[data.image.length - 1]?.hash}`}
            alt="iMac Front"
            class="mr-3 h-8 w-auto"
        />
        {data.value}
    </th>
    <td class="px-4 py-3">{data.parentable?.parentable?.value || '-'}</td> <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900">{data.parentable?.value || '-'}</td> <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900">{formattedCreatedAt}</td>
    {#if data.created_at !== data.updated_at} <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900">{formattedUpdatedAt}</td>
    {:else}
        <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900">-</td>
    {/if}
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
                {#each data?.image?.slice().reverse() || [] as image} <div
                        class="relative flex h-32 items-center justify-center rounded-lg border bg-gray-100 p-2 sm:h-48 sm:w-full"
                    >
                        <img
                            src={`${import.meta.env.VITE_S3}/catalog/${image?.hash}`}
                            alt={data.value}
                            class="h-full w-auto"
                        />
                    </div>
                {/each}
            </div>
            <div>
                <h6 class="mb-2 text-base font-medium leading-none text-gray-900">Описание</h6>
                <div class="max-w-screen-md text-base text-gray-500">
                    {data?.text?.value || 'Нет описания'} </div>
            </div>
            <div>
                <h6 class="my-4 text-base font-medium leading-none text-gray-900">Теги</h6>
                <div class="mt-4 grid grid-cols-4 gap-4">
                    {#each data?.tag || [] as tag}
                    <div class="relative rounded-lg bg-gray-100 p-3">
                        <div>{tag.value}</div>
                    </div>
                    {/each}
                </div>
            </div>
            <div class="mt-8 flex items-center space-x-3">
                <button
                    onclick={handleEdit}
                    type="button"
                    class="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 flex items-center rounded-lg px-3 py-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"  >
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
                    onclick={handleDelete}
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
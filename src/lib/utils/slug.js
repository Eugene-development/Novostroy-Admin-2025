/**
 * Преобразует русский текст в slug (URL-friendly строку)
 * @param {string} str - Исходная строка
 * @returns {string} - Преобразованная строка в формате slug
 */
export function createSlug(str) {
    const charMap = {
        а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e',
        ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm',
        н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u',
        ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch',
        ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya'
    };

    return str
        .toLowerCase()
        .trim()
        .split('')
        .map(char => charMap[char] || char) // Транслитерация
        .join('')
        .replace(/[\s\W-]+/g, '-')         // Замена пробелов и небуквенных символов на дефисы
        .replace(/^-+|-+$/g, '');          // Удаление лишних дефисов
}

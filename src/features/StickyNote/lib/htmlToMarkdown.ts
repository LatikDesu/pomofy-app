export function htmlToMarkdown(html: string): string {
	// Сначала обрабатываем форматирование
	let text = html
		// Заголовки
		.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n# $1\n')
		.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n')
		.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n')
		.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n')
		.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '\n##### $1\n')
		.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '\n###### $1\n')

		// Жирный и курсив
		.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
		.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
		.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
		.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
		.replace(/<u[^>]*>(.*?)<\/u>/gi, '_$1_')

		// Списки
		.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
		.replace(/<\/?(ul|ol)[^>]*>/gi, '\n')

		// Код
		.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
		.replace(/<pre[^>]*>(.*?)<\/pre>/gi, '\n```\n$1\n```\n')

		// Ссылки
		.replace(/<a[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi, '[$2]($1)')

		// Цитаты
		.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '\n> $1\n')

		// Переносы строк и параграфы
		.replace(/<br\s*\/?>/gi, '\n')
		.replace(/<\/p>/gi, '\n\n')
		.replace(/<p[^>]*>/gi, '')

		// Удаляем оставшиеся теги
		.replace(/<[^>]+>/g, '')

	// Декодируем HTML entities
	const div = document.createElement('div')
	div.innerHTML = text
	text = div.textContent || div.innerText || ''

	// Чистим лишние переносы
	return text
		.split('\n')
		.map(line => line.trim())
		.join('\n')
		.replace(/\n{3,}/g, '\n\n')
		.trim()
}

export function hasHtmlTags(text: string): boolean {
	return /<[^>]+>/.test(text)
}

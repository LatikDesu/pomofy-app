interface ParseResult {
	success: boolean
	name?: string
	url?: string
	error?: string
}

export function parseYandexIframe(iframeCode: string): ParseResult {
	const srcRegex = /src="([^"]*)"/
	const srcMatch = iframeCode.match(srcRegex)

	if (!srcMatch?.[1] || !srcMatch[1].startsWith('https://music.yandex.ru/iframe/')) {
		return {
			success: false,
			error: 'Некорректный URL плейлиста'
		}
	}

	const nameRegex = /<a[^>]*>([^<]+)<\/a>/
	const nameMatch = iframeCode.match(nameRegex)

	const name = nameMatch?.[1] || 'Плейлист без названия'
	const url = srcMatch[1]

	return {
		success: true,
		name,
		url
	}
}

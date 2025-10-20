/**
 * Time and Date Formatting Utilities
 * ---
 * Helper functions for formatting time and date
 */

/**
 * Format time based on format preference
 */
export function formatTime(date: Date, format: '24h' | '12h'): string {
	if (format === '12h') {
		return date.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true
		})
	}

	return date.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	})
}

/**
 * Format date using strftime-like format string
 * Based on strftime.org standard
 */
export function formatDate(date: Date, format: string): string {
	const dayNames = [
		'Воскресенье',
		'Понедельник',
		'Вторник',
		'Среда',
		'Четверг',
		'Пятница',
		'Суббота'
	]
	const dayNamesShort = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
	const monthNames = [
		'января',
		'февраля',
		'марта',
		'апреля',
		'мая',
		'июня',
		'июля',
		'августа',
		'сентября',
		'октября',
		'ноября',
		'декабря'
	]
	const monthNamesShort = [
		'янв',
		'фев',
		'мар',
		'апр',
		'май',
		'июн',
		'июл',
		'авг',
		'сен',
		'окт',
		'ноя',
		'дек'
	]

	const day = date.getDate()
	const month = date.getMonth()
	const year = date.getFullYear()
	const weekday = date.getDay()

	// Create replacement map for strftime codes
	const replacements: Record<string, string> = {
		'%a': dayNamesShort[weekday],
		'%A': dayNames[weekday],
		'%w': weekday.toString(),
		'%d': day.toString().padStart(2, '0'),
		'%-d': day.toString(),
		'%b': monthNamesShort[month],
		'%B': monthNames[month],
		'%m': (month + 1).toString().padStart(2, '0'),
		'%-m': (month + 1).toString(),
		'%y': year.toString().slice(-2),
		'%Y': year.toString(),
		'%%': '%'
	}

	// Replace all strftime codes in the format string
	let result = format
	for (const [code, replacement] of Object.entries(replacements)) {
		result = result.replace(new RegExp(code.replace('%', '\\%'), 'g'), replacement)
	}

	return result
}

/**
 * Get current time in specific timezone
 */
export function getCurrentTimeInTimezone(timezone: string): Date {
	if (timezone === 'auto') {
		return new Date()
	}

	try {
		const now = new Date()
		const formatter = new Intl.DateTimeFormat('en-CA', {
			timeZone: timezone,
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false
		})

		const parts = formatter.formatToParts(now)
		const dateStr = `${parts.find(p => p.type === 'year')?.value}-${parts.find(p => p.type === 'month')?.value}-${parts.find(p => p.type === 'day')?.value}T${parts.find(p => p.type === 'hour')?.value}:${parts.find(p => p.type === 'minute')?.value}:${parts.find(p => p.type === 'second')?.value}`

		return new Date(dateStr)
	} catch (error) {
		console.error('Error getting time in timezone:', error)
		return new Date()
	}
}

/**
 * Get list of common timezones
 */
export function getTimezoneList(): Array<{ value: string; label: string }> {
	return [
		{ value: 'auto', label: 'Автоматически' },
		{ value: 'Europe/Moscow', label: 'Москва (UTC+3)' },
		{ value: 'Europe/London', label: 'Лондон (UTC+0)' },
		{ value: 'Europe/Paris', label: 'Париж (UTC+1)' },
		{ value: 'Europe/Berlin', label: 'Берлин (UTC+1)' },
		{ value: 'America/New_York', label: 'Нью-Йорк (UTC-5)' },
		{ value: 'America/Los_Angeles', label: 'Лос-Анджелес (UTC-8)' },
		{ value: 'Asia/Tokyo', label: 'Токио (UTC+9)' },
		{ value: 'Asia/Shanghai', label: 'Шанхай (UTC+8)' },
		{ value: 'Asia/Dubai', label: 'Дубай (UTC+4)' },
		{ value: 'Australia/Sydney', label: 'Сидней (UTC+10)' }
	]
}

/**
 * Get list of popular date formats with examples
 */
export function getDateFormatList(): Array<{ value: string; label: string; example: string }> {
	const now = new Date()

	const formats = [
		{ value: '%d.%m.%Y', label: 'ДД.ММ.ГГГГ' },
		{ value: '%m/%d/%Y', label: 'ММ/ДД/ГГГГ (US)' },
		{ value: '%Y-%m-%d', label: 'ГГГГ-ММ-ДД (ISO)' },
		{ value: '%A, %d %B, %Y', label: 'Полная дата' },
		{ value: '%a, %b %d', label: 'Короткая дата' },
		{ value: '%d %B %Y', label: 'Европейский стиль' },
		{ value: '%B %d, %Y', label: 'Американский стиль' },
		{ value: '%d/%m/%y', label: 'Короткий год' },
		{ value: '%A, %d.%m.%Y', label: 'С днем недели' },
		{ value: '%d %b %Y', label: 'Сокращенный месяц' }
	]

	return formats.map(format => ({
		...format,
		example: formatDate(now, format.value)
	}))
}

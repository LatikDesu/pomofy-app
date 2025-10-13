import { useEffect } from 'react'

export const useTimerTitleEffect = (
	minutes: string,
	seconds: string,
	sessionType: string,
	hasStarted: boolean
) => {
	useEffect(() => {
		if (hasStarted) {
			const icon = sessionType === 'Session' ? '⏱' : '🍅'
			document.title = `Pomofy -  ${icon} ${minutes}:${seconds}`
		} else {
			document.title = 'Pomofy'
		}
	}, [hasStarted, minutes, seconds, sessionType])
}

import { useEffect, useState } from 'react'

import { getFontSizeClasses } from '../lib/font-size-utils'
import { formatDate, formatTime, getCurrentTimeInTimezone } from '../lib/time-utils'
import { useWatch } from '../model/watch.store'

/**
 * Watch Display Component
 * ---
 * Shows current time and date with formatting options
 */

export function WatchDisplay() {
	const { settings, geoData } = useWatch()
	const [currentTime, setCurrentTime] = useState(new Date())

	useEffect(() => {
		const updateTime = () => {
			let timezone = settings.timezone

			if (timezone === 'auto' && geoData?.timezone) {
				timezone = geoData.timezone
			}

			const time = getCurrentTimeInTimezone(timezone)
			setCurrentTime(time)
		}

		updateTime()

		const interval = setInterval(updateTime, 1000)

		return () => clearInterval(interval)
	}, [settings.timezone, geoData?.timezone])

	const timeString = formatTime(currentTime, settings.timeFormat)
	const dateString = formatDate(currentTime, settings.dateFormat)
	const sizeClasses = getFontSizeClasses(settings.fontSize)

	return (
		<div className='flex flex-col items-center justify-center text-center'>
			<div
				className={`${sizeClasses.time} font-bold tabular-nums`}
				style={{ color: settings.color }}
			>
				{timeString}
			</div>
			<div
				className={`${sizeClasses.date} tabular-nums opacity-80`}
				style={{ color: settings.color }}
			>
				{dateString}
			</div>
		</div>
	)
}

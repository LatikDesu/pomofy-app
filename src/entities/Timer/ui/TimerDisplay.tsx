import { useEffect, useState } from 'react'

import { formatDisplayTime, secondsToTime } from '@/shared/lib/utils'

import { useTimer } from '../model/useTimer'

export const TimerDisplay = () => {
	const { timerQueue } = useTimer()
	const [minutes, setMinutes] = useState('00')
	const [seconds, setSeconds] = useState('00')

	useEffect(() => {
		const [m, s] = secondsToTime(timerQueue)
		setMinutes(formatDisplayTime(m) as string)
		setSeconds(formatDisplayTime(s) as string)
	}, [timerQueue])

	return (
		<div className='text-6xl font-bold tabular-nums sm:text-8xl'>
			{minutes}:{seconds}
		</div>
	)
}

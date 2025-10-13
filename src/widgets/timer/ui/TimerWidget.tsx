import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

import { ResetTimer, SelectBreakType, SettingsPopover, ToggleCountdown } from '@/features/Timer'

import { ModeToast } from '@/shared/lib/toast'
import { CloseWidgetButton, WidgetWrapper } from '@/shared/ui'

import {
	TimerDisplay,
	useAlarm,
	useAudioVolume,
	useBreakStarted,
	useLongBreakTimer,
	usePomodoroTimer,
	useShortBreakTimer,
	useTimer,
	useTimerStarted,
	useTimerTitleEffect,
	useToggleTimer
} from '@/entities/Timer'

export const TimerWidget = () => {
	const { pomodoroLength } = usePomodoroTimer()
	const { shortBreakLength } = useShortBreakTimer()
	const { longBreakLength } = useLongBreakTimer()
	const { breakStarted, setBreakStarted } = useBreakStarted()
	const { audioVolume } = useAudioVolume()
	const { setIsTimerToggled } = useToggleTimer()
	const { timerStarted, setTimerStarted } = useTimerStarted()
	const { timerQueue, setTimerQueue } = useTimer()
	const [currentBreakLength, setCurrentBreakLength] = useState(shortBreakLength)
	const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null)
	const audioRef = useRef<HTMLAudioElement>(null)
	const sessionType = breakStarted ? 'Перерыв' : 'Сессия'
	const { alarm } = useAlarm()

	useEffect(() => {
		if (timerQueue === 0) {
			if (audioRef.current) {
				audioRef.current.volume = audioVolume
				audioRef.current.play()
			}
			if (sessionType === 'Сессия') {
				setBreakStarted(true)
				setTimerQueue(currentBreakLength)
				toast.custom(t => <ModeToast t={t} message='Перерыв' icon='☕️' />, {
					duration: currentBreakLength * 1000
				})
			} else {
				setBreakStarted(false)
				setTimerQueue(pomodoroLength)
				toast.dismiss()
				toast.custom(t => <ModeToast t={t} message='Рабочий режим' icon='🍅' />, {
					duration: pomodoroLength * 1000
				})
			}
		}
	}, [
		timerQueue,
		sessionType,
		audioVolume,
		pomodoroLength,
		currentBreakLength,
		setBreakStarted,
		setTimerQueue
	])

	useEffect(() => {
		if (!timerStarted && !breakStarted) {
			setTimerQueue(pomodoroLength)
		}
	}, [pomodoroLength, breakStarted])

	useEffect(() => {
		if (timerStarted) {
			intervalIdRef.current = setInterval(() => {
				setTimerQueue(useTimer.getState().timerQueue - 1)
			}, 1000)
		} else {
			if (intervalIdRef.current) {
				clearInterval(intervalIdRef.current)
				intervalIdRef.current = null
			}
		}
		return () => {
			if (intervalIdRef.current) clearInterval(intervalIdRef.current)
		}
	}, [timerStarted, setTimerQueue])

	useTimerTitleEffect(
		String(Math.floor(timerQueue / 60)).padStart(2, '0'),
		String(timerQueue % 60).padStart(2, '0'),
		sessionType,
		timerStarted
	)

	const actions = (
		<>
			<SettingsPopover />
			<CloseWidgetButton
				onClick={() => {
					setIsTimerToggled(false)
					if (intervalIdRef.current) {
						clearInterval(intervalIdRef.current)
					}
					setTimerStarted(false)
				}}
			/>
		</>
	)

	return (
		<WidgetWrapper actions={actions}>
			<SelectBreakType
				onSelect={setCurrentBreakLength}
				shortBreakLength={shortBreakLength}
				longBreakLength={longBreakLength}
				currentBreakLength={currentBreakLength}
				sessionType={sessionType}
			/>
			<div className='flex flex-col items-center justify-center pt-2'>
				{/* <p id="tabular-nums">{sessionType}</p> */}
				<TimerDisplay />
			</div>
			<div className='timer-control flex items-center justify-center gap-2 pb-2 tabular-nums'>
				<ToggleCountdown />
				<ResetTimer audioRef={audioRef} />
			</div>
			<audio id='beep' preload='auto' ref={audioRef} src={alarm} />
		</WidgetWrapper>
	)
}

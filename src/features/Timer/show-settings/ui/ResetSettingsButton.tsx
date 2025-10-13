import { failureToast, successToast } from '@/shared/lib/toast'
import { Button } from '@/shared/ui'

import {
	useAlarm,
	useAudioVolume,
	useLongBreakTimer,
	usePomodoroTimer,
	useShortBreakTimer,
	useTimerStarted
} from '@/entities/Timer'

export const ResetSettingsButton = () => {
	const { timerStarted } = useTimerStarted()
	const { defaultPomodoroLength } = usePomodoroTimer()
	const { defaultShortBreakLength } = useShortBreakTimer()
	const { defaultLongBreakLength } = useLongBreakTimer()
	const { defaultAudioVolume } = useAudioVolume()
	const { defaultAlarm } = useAlarm()

	const handleReset = () => {
		if (timerStarted) {
			failureToast('Нельзя сбросить настройки во время работы таймера', true)
			return
		}

		defaultPomodoroLength()
		defaultShortBreakLength()
		defaultLongBreakLength()
		defaultAudioVolume()
		defaultAlarm()

		successToast('Настройки сброшены до стандартных', true)
	}

	return (
		<div className='flex justify-end pt-1'>
			<Button
				type='button'
				variant='outline'
				className='h-8 w-full border border-[var(--color-secondary-border)] text-sm hover:bg-[var(--color-secondary-hover)] dark:border-[var(--color-default-hover)] dark:hover:bg-[var(--color-default-hover)]'
				onClick={handleReset}
				disabled={timerStarted}
			>
				Сбросить до стандартных
			</Button>
		</div>
	)
}

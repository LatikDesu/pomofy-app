import clsx from 'clsx'

import { successToast } from '@/shared/lib/toast'
import { Button } from '@/shared/ui'

import { useTimerStarted } from '@/entities/Timer'

export const SelectBreakType = ({
	onSelect,
	shortBreakLength,
	longBreakLength,
	currentBreakLength,
	sessionType
}: {
	onSelect: (breakLength: number) => void
	shortBreakLength: number
	longBreakLength: number
	currentBreakLength: number
	sessionType: string
}) => {
	const { timerStarted } = useTimerStarted()

	const handleSelect = (breakLength: number) => {
		if (timerStarted || sessionType === 'Перерыв') return
		onSelect(breakLength)
		successToast(`Длина перерыва установлена на ${breakLength / 60} минут`, true)
	}

	return (
		<div className='flex items-center justify-center gap-2'>
			<Button
				variant='default'
				className={clsx(
					'text-xs',
					currentBreakLength === shortBreakLength &&
						'bg-[var(--color-secondary-active)] dark:bg-[var(--color-default-active)]'
				)}
				onClick={() => handleSelect(shortBreakLength)}
				disabled={timerStarted}
			>
				Короткий перерыв
			</Button>
			<Button
				variant='default'
				className={clsx(
					'text-xs',
					currentBreakLength === longBreakLength &&
						'bg-[var(--color-secondary-active)] dark:bg-[var(--color-default-active)]'
				)}
				onClick={() => handleSelect(longBreakLength)}
				disabled={timerStarted}
			>
				Длинный перерыв
			</Button>
		</div>
	)
}

import { Minus, Plus } from 'lucide-react'

import { Button } from '@/shared/ui'

import {
	useLongBreakTimer,
	usePomodoroTimer,
	useShortBreakTimer,
	useTimerStarted
} from '@/entities/Timer'

const TimeInput = ({
	label,
	value,
	onDecrement,
	onIncrement,
	disabled
}: {
	label: string
	value: number
	onDecrement: () => void
	onIncrement: () => void
	disabled: boolean
}) => (
	<div className='flex-1'>
		<div className='mb-1 text-center text-[10px]'>{label}</div>
		<div className='flex items-center justify-center gap-1 rounded-lg border border-[var(--color-secondary-border)] p-0.5 dark:border-[var(--color-default-hover)]'>
			<Button
				type='button'
				variant='ghost'
				size='icon'
				className='h-6 w-6'
				onClick={onDecrement}
				disabled={disabled}
			>
				<Minus className='size-3' />
			</Button>
			<span className='w-6 text-center text-sm font-semibold'>{value}</span>
			<Button
				type='button'
				variant='ghost'
				size='icon'
				className='h-6 w-6'
				onClick={onIncrement}
				disabled={disabled}
			>
				<Plus className='size-3' />
			</Button>
		</div>
	</div>
)

export const TimeSettingsControl = () => {
	const { timerStarted } = useTimerStarted()
	const { pomodoroLength, setPomodoroLength } = usePomodoroTimer()
	const { shortBreakLength, setShortBreak } = useShortBreakTimer()
	const { longBreakLength, setLongBreak } = useLongBreakTimer()

	const handleTimeChange = (
		currentValue: number,
		setValue: (value: number) => void,
		delta: number
	) => {
		if (timerStarted) return
		const newValue = Math.max(60, Math.min(3600, currentValue + delta))
		setValue(newValue)
	}

	return (
		<div className='space-y-2'>
			<label className='block text-xs font-medium'>Время (минуты)</label>
			<div className='flex items-center gap-2'>
				<TimeInput
					label='Помодоро'
					value={Math.floor(pomodoroLength / 60)}
					onDecrement={() => handleTimeChange(pomodoroLength, setPomodoroLength, -60)}
					onIncrement={() => handleTimeChange(pomodoroLength, setPomodoroLength, 60)}
					disabled={timerStarted}
				/>
				<TimeInput
					label='Короткий'
					value={Math.floor(shortBreakLength / 60)}
					onDecrement={() => handleTimeChange(shortBreakLength, setShortBreak, -60)}
					onIncrement={() => handleTimeChange(shortBreakLength, setShortBreak, 60)}
					disabled={timerStarted}
				/>
				<TimeInput
					label='Длинный'
					value={Math.floor(longBreakLength / 60)}
					onDecrement={() => handleTimeChange(longBreakLength, setLongBreak, -60)}
					onIncrement={() => handleTimeChange(longBreakLength, setLongBreak, 60)}
					disabled={timerStarted}
				/>
			</div>
		</div>
	)
}

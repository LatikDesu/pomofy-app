import { Button } from '@/shared/ui'

import { useTimerStarted } from '@/entities/Timer'

export const ToggleCountdown = () => {
	const { timerStarted, setTimerStarted } = useTimerStarted()

	const handleToggle = () => {
		setTimerStarted(!timerStarted)
	}

	return (
		<Button className='font-normal tabular-nums' onClick={handleToggle}>
			<p className='tabular-nums'>{timerStarted ? 'Пауза' : 'Старт'}</p>
		</Button>
	)
}

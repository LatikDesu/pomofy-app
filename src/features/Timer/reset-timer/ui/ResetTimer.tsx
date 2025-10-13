import { Button } from '@/shared/ui'

import { useBreakStarted, usePomodoroTimer, useTimer, useTimerStarted } from '@/entities/Timer'

export const ResetTimer = ({
	audioRef
}: {
	audioRef: React.RefObject<HTMLAudioElement | null>
}) => {
	const { pomodoroLength } = usePomodoroTimer()
	const { setTimerStarted } = useTimerStarted()
	const { setTimerQueue } = useTimer()
	const { setBreakStarted } = useBreakStarted()

	const handleReset = () => {
		if (audioRef.current) {
			audioRef.current.load()
		}
		setTimerStarted(false)
		setBreakStarted(false)
		setTimerQueue(pomodoroLength)
	}

	return (
		<Button className='ml-4 font-normal tabular-nums' onClick={handleReset}>
			<p className='tabular-nums'>Сброс</p>
		</Button>
	)
}

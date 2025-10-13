import { usePosTask } from '@/entities/Task'
import { usePosTimer } from '@/entities/Timer'

function useSetDefault() {
	const { setTaskPosDefault } = usePosTask()
	const { setTimerPosDefault } = usePosTimer()

	return () => {
		// Reset all widget positions
		setTaskPosDefault()
		setTimerPosDefault()
	}
}

export default useSetDefault

import { usePosSpotify } from '@/entities/Spotify'
import { usePosTask } from '@/entities/Task'
import { usePosTimer } from '@/entities/Timer'
import { usePosYandex } from '@/entities/YandexMusic'

function useSetDefault() {
	const { setTaskPosDefault } = usePosTask()
	const { setTimerPosDefault } = usePosTimer()
	const { setYandexPosDefault } = usePosYandex()
	const { setSpotifyPosDefault } = usePosSpotify()

	return () => {
		// Reset all widget positions
		setTaskPosDefault()
		setTimerPosDefault()
		setYandexPosDefault()
		setSpotifyPosDefault()
	}
}

export default useSetDefault

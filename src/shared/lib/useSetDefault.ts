import { usePosSpotify } from '@/entities/Spotify'
import { usePosTask } from '@/entities/Task'
import { usePosTimer } from '@/entities/Timer'
import { usePosWatch } from '@/entities/Watch'
import { usePosYandex } from '@/entities/YandexMusic'
import { usePosYouTube } from '@/entities/YouTube'

function useSetDefault() {
	const { setTaskPosDefault } = usePosTask()
	const { setTimerPosDefault } = usePosTimer()
	const { setYandexPosDefault } = usePosYandex()
	const { setSpotifyPosDefault } = usePosSpotify()
	const { setYouTubePosDefault } = usePosYouTube()
	const { setWatchPosDefault } = usePosWatch()

	return () => {
		// Reset all widget positions
		setTaskPosDefault()
		setTimerPosDefault()
		setYandexPosDefault()
		setSpotifyPosDefault()
		setYouTubePosDefault()
		setWatchPosDefault()
	}
}

export default useSetDefault

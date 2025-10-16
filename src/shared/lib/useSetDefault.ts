import { usePosSpotify } from '@/entities/Spotify'
import { usePosTask } from '@/entities/Task'
import { usePosTimer } from '@/entities/Timer'
import { usePosYandex } from '@/entities/YandexMusic'
import { usePosYouTube } from '@/entities/YouTube'

function useSetDefault() {
	const { setTaskPosDefault } = usePosTask()
	const { setTimerPosDefault } = usePosTimer()
	const { setYandexPosDefault } = usePosYandex()
	const { setSpotifyPosDefault } = usePosSpotify()
	const { setYouTubePosDefault } = usePosYouTube()

	return () => {
		// Reset all widget positions
		setTaskPosDefault()
		setTimerPosDefault()
		setYandexPosDefault()
		setSpotifyPosDefault()
		setYouTubePosDefault()
	}
}

export default useSetDefault

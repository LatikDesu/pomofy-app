import { useCallback } from 'react'

import { useYouTubePlayer, useYouTubePlaylists } from '@/entities/YouTube'

export function useYouTubeNavigation() {
	const { getNextVideo, getPrevVideo, setCurrentVideoIndex, clearTemporaryVideo } =
		useYouTubePlaylists()
	const { reset, setPlaying } = useYouTubePlayer()

	const handleNext = useCallback(() => {
		clearTemporaryVideo()
		const nextVideo = getNextVideo()
		if (nextVideo) {
			const playlist = useYouTubePlaylists.getState().getSelectedPlaylist()
			if (!playlist) return

			const nextIndex = playlist.videos.findIndex(v => v.id === nextVideo.id)
			setCurrentVideoIndex(nextIndex)
			reset()
			setPlaying(true)
		}
	}, [getNextVideo, setCurrentVideoIndex, reset, clearTemporaryVideo, setPlaying])

	const handlePrev = useCallback(() => {
		clearTemporaryVideo()
		const prevVideo = getPrevVideo()
		if (prevVideo) {
			const playlist = useYouTubePlaylists.getState().getSelectedPlaylist()
			if (!playlist) return

			const prevIndex = playlist.videos.findIndex(v => v.id === prevVideo.id)
			setCurrentVideoIndex(prevIndex)
			reset()
			setPlaying(true)
		}
	}, [getPrevVideo, setCurrentVideoIndex, reset, clearTemporaryVideo, setPlaying])

	const handleEnded = useCallback(
		(loop: boolean) => {
			if (loop) {
				return
			}
			clearTemporaryVideo()
			const nextVideo = getNextVideo()
			if (nextVideo) {
				const playlist = useYouTubePlaylists.getState().getSelectedPlaylist()
				if (!playlist) return

				const nextIndex = playlist.videos.findIndex(v => v.id === nextVideo.id)
				setCurrentVideoIndex(nextIndex)
				reset()
				setPlaying(true)
			}
		},
		[getNextVideo, setCurrentVideoIndex, reset, setPlaying, clearTemporaryVideo]
	)

	return {
		handleNext,
		handlePrev,
		handleEnded
	}
}

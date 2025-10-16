import { useEffect } from 'react'

import { useYouTubePlayer } from '@/entities/YouTube'

export function useYouTubeKeyboardControls(handleSeek: (seconds: number) => void) {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
				return
			}

			switch (e.key) {
				case ' ':
					e.preventDefault()
					useYouTubePlayer.getState().togglePlaying()
					break
				case 'm':
				case 'M':
				case 'ь':
				case 'Ь':
					e.preventDefault()
					useYouTubePlayer.getState().toggleMute()
					break
				case 'ArrowRight':
					e.preventDefault()
					handleSeek(useYouTubePlayer.getState().played * useYouTubePlayer.getState().duration + 5)
					break
				case 'ArrowLeft':
					e.preventDefault()
					handleSeek(useYouTubePlayer.getState().played * useYouTubePlayer.getState().duration - 5)
					break
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [handleSeek])
}

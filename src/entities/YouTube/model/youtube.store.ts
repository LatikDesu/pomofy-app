import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * YouTube Music Store
 * ---
 * Main YouTube widget state
 */

interface YouTubeStore {
	isYouTubeToggled: boolean
	setIsYouTubeToggled: (value: boolean) => void
	isYouTubeShown: boolean
	setIsYouTubeShown: (value: boolean) => void
}

export const useYouTubeMusic = create<YouTubeStore>()(
	persist(
		set => ({
			isYouTubeToggled: false,
			setIsYouTubeToggled: (value: boolean) => set({ isYouTubeToggled: value }),
			isYouTubeShown: true,
			setIsYouTubeShown: (isYouTubeShown: boolean) => set({ isYouTubeShown })
		}),
		{
			name: 'youtube_music_store'
		}
	)
)

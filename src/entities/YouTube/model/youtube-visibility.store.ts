import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * YouTube Visibility Store
 * ---
 * Manage YouTube widget position
 */

export interface IPosYouTube {
	youtubePosX: number
	youtubePosY: number
	setYouTubePos: (X: number, Y: number) => void
	setYouTubePosDefault: () => void
}

export const usePosYouTube = create<IPosYouTube>()(
	persist(
		set => ({
			youtubePosX: 500,
			youtubePosY: 100,
			setYouTubePos: (X, Y) => set({ youtubePosX: X, youtubePosY: Y }),
			setYouTubePosDefault: () => set(() => ({ youtubePosX: 500, youtubePosY: 100 }))
		}),
		{
			name: 'set_youtube_position'
		}
	)
)

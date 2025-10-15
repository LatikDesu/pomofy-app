import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface IPosSpotify {
	spotifyPosX: number
	spotifyPosY: number
	setSpotifyPos: (X: number, Y: number) => void
	setSpotifyPosDefault: () => void
}
export const usePosSpotify = create<IPosSpotify>()(
	persist(
		(set, _) => ({
			spotifyPosX: 600,
			spotifyPosY: 158,
			setSpotifyPos: (X, Y) => set({ spotifyPosX: X, spotifyPosY: Y }),
			setSpotifyPosDefault: () => set(() => ({ spotifyPosX: 600, spotifyPosY: 158 }))
		}),
		{
			name: 'set_spotify_position'
		}
	)
)

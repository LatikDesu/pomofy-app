/**
 * Spotify Section Store
 * ---
 * Handle the Spotify section
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface IToggleSpotify {
	isSpotifyToggled: boolean
	setIsSpotifyToggled: (isSpotifyToggled: boolean) => void
	isSpotifyShown: boolean
	setIsSpotifyShown: (isSpotifyShown: boolean) => void
}

export const useSpotifyMusic = create<IToggleSpotify>()(
	persist(
		(set, _) => ({
			isSpotifyToggled: true,
			setIsSpotifyToggled: isSpotifyToggled => set({ isSpotifyToggled }),
			isSpotifyShown: false,
			setIsSpotifyShown: isSpotifyShown => set({ isSpotifyShown })
		}),
		{
			name: 'state_spotify_section'
		}
	)
)

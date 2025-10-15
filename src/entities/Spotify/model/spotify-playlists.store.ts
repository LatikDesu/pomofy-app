import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Spotify Playlists Store
 * ---
 * Manage Spotify playlists
 */

export interface SpotifyPlaylist {
	id: string
	name: string
	url: string
	isDefault: boolean
	isRemovable: boolean
}

interface SpotifyPlaylistsStore {
	playlists: SpotifyPlaylist[]
	selectedPlaylistId: string
	addPlaylist: (name: string, url: string) => void
	removePlaylist: (id: string) => void
	selectPlaylist: (id: string) => void
	getSelectedPlaylist: () => SpotifyPlaylist | undefined
}

const DEFAULT_PLAYLIST: SpotifyPlaylist = {
	id: 'default-spotify-lofi',
	name: 'Lofi beats',
	url: 'https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM',
	isDefault: true,
	isRemovable: false
}

export const useSpotifyPlaylists = create<SpotifyPlaylistsStore>()(
	persist(
		(set, get) => ({
			playlists: [DEFAULT_PLAYLIST],
			selectedPlaylistId: DEFAULT_PLAYLIST.id,

			addPlaylist: (name: string, url: string) => {
				const newPlaylist: SpotifyPlaylist = {
					id: `playlist-${Date.now()}`,
					name,
					url,
					isDefault: false,
					isRemovable: true
				}
				set(state => ({
					playlists: [...state.playlists, newPlaylist]
				}))
			},

			removePlaylist: (id: string) => {
				const { playlists, selectedPlaylistId } = get()
				const playlistToRemove = playlists.find(p => p.id === id)

				if (!playlistToRemove?.isRemovable) return

				const newPlaylists = playlists.filter(p => p.id !== id)
				const newSelectedId = selectedPlaylistId === id ? DEFAULT_PLAYLIST.id : selectedPlaylistId

				set({
					playlists: newPlaylists,
					selectedPlaylistId: newSelectedId
				})
			},

			selectPlaylist: (id: string) => {
				set({ selectedPlaylistId: id })
			},

			getSelectedPlaylist: () => {
				const { playlists, selectedPlaylistId } = get()
				return playlists.find(p => p.id === selectedPlaylistId) || DEFAULT_PLAYLIST
			}
		}),
		{
			name: 'spotify_playlists_store'
		}
	)
)

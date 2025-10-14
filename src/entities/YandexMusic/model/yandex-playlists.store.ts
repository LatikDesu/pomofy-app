import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Yandex Playlists Store
 * ---
 * Manage Yandex Music playlists
 */

export interface Playlist {
	id: string
	name: string
	url: string
	isDefault: boolean
	isRemovable: boolean
}

interface YandexPlaylistsStore {
	playlists: Playlist[]
	selectedPlaylistId: string
	addPlaylist: (name: string, url: string) => void
	removePlaylist: (id: string) => void
	selectPlaylist: (id: string) => void
	getSelectedPlaylist: () => Playlist | undefined
}

const DEFAULT_PLAYLIST: Playlist = {
	id: 'default-lofi',
	name: 'Лоу-фай для работы и учёбы',
	url: 'https://music.yandex.ru/iframe/playlist/music-blog/2620',
	isDefault: true,
	isRemovable: false
}

export const useYandexPlaylists = create<YandexPlaylistsStore>()(
	persist(
		(set, get) => ({
			playlists: [DEFAULT_PLAYLIST],
			selectedPlaylistId: DEFAULT_PLAYLIST.id,

			addPlaylist: (name: string, url: string) => {
				const newPlaylist: Playlist = {
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
			name: 'yandex_playlists_store'
		}
	)
)

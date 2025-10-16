import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { YOUTUBE_DEFAULT_PLAYLISTS } from './constants'
import { useYouTubePlayer } from './youtube-player.store'

/**
 * YouTube Playlists Store
 * ---
 * Manage YouTube playlists and videos
 */

export interface YouTubeVideo {
	id: string
	url: string
	title: string
	thumbnail?: string
	duration?: number
}

export type PlaylistType = 'radio' | 'dynamic'

export interface YouTubePlaylist {
	id: string
	name: string
	type: PlaylistType
	videos: YouTubeVideo[]
	isDefault: boolean
	isRemovable: boolean
	youtubePlaylistId?: string
}

interface YouTubePlaylistsStore {
	playlists: YouTubePlaylist[]
	selectedPlaylistId: string
	currentVideoIndex: number
	temporaryVideo: YouTubeVideo | null
	createRadio: (name: string, video: YouTubeVideo) => void
	addDynamicPlaylist: (name: string, youtubePlaylistId: string) => void
	updateRadioVideo: (playlistId: string, video: YouTubeVideo) => void
	playTemporaryVideo: (video: YouTubeVideo) => void
	clearTemporaryVideo: () => void
	removePlaylist: (id: string) => void
	selectPlaylist: (id: string) => void
	setCurrentVideoIndex: (index: number) => void
	getSelectedPlaylist: () => YouTubePlaylist | undefined
	getCurrentVideo: () => YouTubeVideo | undefined
	getNextVideo: () => YouTubeVideo | undefined
	getPrevVideo: () => YouTubeVideo | undefined
}

export const useYouTubePlaylists = create<YouTubePlaylistsStore>()(
	persist(
		(set, get) => ({
			playlists: YOUTUBE_DEFAULT_PLAYLISTS,
			selectedPlaylistId: YOUTUBE_DEFAULT_PLAYLISTS[0].id,
			currentVideoIndex: 0,
			temporaryVideo: null,

			createRadio: (name: string, video: YouTubeVideo) => {
				const newPlaylist: YouTubePlaylist = {
					id: `radio-${Date.now()}`,
					name,
					type: 'radio',
					videos: [video],
					isDefault: false,
					isRemovable: true
				}
				set(state => ({
					playlists: [...state.playlists, newPlaylist],
					selectedPlaylistId: newPlaylist.id,
					currentVideoIndex: 0
				}))
			},

			addDynamicPlaylist: (name: string, youtubePlaylistId: string) => {
				const newPlaylist: YouTubePlaylist = {
					id: `playlist-${Date.now()}`,
					name,
					type: 'dynamic',
					videos: [],
					isDefault: false,
					isRemovable: true,
					youtubePlaylistId
				}
				set(state => ({
					playlists: [...state.playlists, newPlaylist],
					selectedPlaylistId: newPlaylist.id,
					currentVideoIndex: 0
				}))
			},

			updateRadioVideo: (playlistId: string, video: YouTubeVideo) => {
				set(state => ({
					playlists: state.playlists.map(p =>
						p.id === playlistId && p.type === 'radio' ? { ...p, videos: [video] } : p
					),
					currentVideoIndex: 0
				}))
			},

			playTemporaryVideo: (video: YouTubeVideo) => {
				set({ temporaryVideo: video })
			},

			clearTemporaryVideo: () => {
				set({ temporaryVideo: null })
			},

			removePlaylist: (id: string) => {
				const { playlists, selectedPlaylistId } = get()
				const playlistToRemove = playlists.find(p => p.id === id)

				if (!playlistToRemove?.isRemovable) return

				const newPlaylists = playlists.filter(p => p.id !== id)
				const newSelectedId =
					selectedPlaylistId === id ? YOUTUBE_DEFAULT_PLAYLISTS[0].id : selectedPlaylistId

				set({
					playlists: newPlaylists,
					selectedPlaylistId: newSelectedId,
					currentVideoIndex: 0
				})
			},

			selectPlaylist: (id: string) => {
				set({
					selectedPlaylistId: id,
					currentVideoIndex: 0,
					temporaryVideo: null
				})
			},

			setCurrentVideoIndex: (index: number) => {
				const playlist = get().getSelectedPlaylist()
				if (!playlist) return

				const validIndex = Math.max(0, Math.min(index, playlist.videos.length - 1))
				set({
					currentVideoIndex: validIndex,
					temporaryVideo: null
				})
			},

			getSelectedPlaylist: () => {
				const { playlists, selectedPlaylistId } = get()
				return playlists.find(p => p.id === selectedPlaylistId) || YOUTUBE_DEFAULT_PLAYLISTS[0]
			},

			getCurrentVideo: () => {
				const { temporaryVideo, currentVideoIndex } = get()
				if (temporaryVideo) return temporaryVideo
				const playlist = get().getSelectedPlaylist()
				return playlist?.videos[currentVideoIndex]
			},

			getNextVideo: () => {
				const { currentVideoIndex } = get()
				const playlist = get().getSelectedPlaylist()
				if (!playlist || playlist.videos.length === 0) return undefined

				const { shuffle } = useYouTubePlayer.getState()
				if (shuffle) {
					if (playlist.videos.length <= 1) return playlist.videos[0]
					let randomIndex
					do {
						randomIndex = Math.floor(Math.random() * playlist.videos.length)
					} while (randomIndex === currentVideoIndex)
					return playlist.videos[randomIndex]
				}

				const nextIndex = (currentVideoIndex + 1) % playlist.videos.length
				return playlist.videos[nextIndex]
			},

			getPrevVideo: () => {
				const { currentVideoIndex } = get()
				const playlist = get().getSelectedPlaylist()
				if (!playlist || playlist.videos.length === 0) return undefined

				const { shuffle } = useYouTubePlayer.getState()
				if (shuffle) {
					if (playlist.videos.length <= 1) return playlist.videos[0]
					let randomIndex
					do {
						randomIndex = Math.floor(Math.random() * playlist.videos.length)
					} while (randomIndex === currentVideoIndex)
					return playlist.videos[randomIndex]
				}

				const prevIndex =
					currentVideoIndex === 0 ? playlist.videos.length - 1 : currentVideoIndex - 1
				return playlist.videos[prevIndex]
			}
		}),
		{
			name: 'youtube_playlists_store'
		}
	)
)

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * YouTube Player Store
 * ---
 * Manage YouTube player state and controls
 */

interface YouTubePlayerStore {
	// Player state
	playing: boolean
	volume: number
	muted: boolean
	playbackRate: number
	loop: boolean
	shuffle: boolean

	// UI state
	isMiniMode: boolean

	// Player progress
	played: number
	duration: number

	// Actions
	setPlaying: (playing: boolean) => void
	togglePlaying: () => void
	setVolume: (volume: number) => void
	toggleMute: () => void
	setPlaybackRate: (rate: number) => void
	toggleLoop: () => void
	toggleShuffle: () => void
	toggleMiniMode: () => void
	setPlayed: (played: number) => void
	setDuration: (duration: number) => void
	reset: () => void
}

const DEFAULT_STATE = {
	playing: false,
	volume: 0.7,
	muted: false,
	playbackRate: 1,
	loop: false,
	shuffle: false,
	isMiniMode: false,
	played: 0,
	duration: 0
}

export const useYouTubePlayer = create<YouTubePlayerStore>()(
	persist(
		set => ({
			...DEFAULT_STATE,

			setPlaying: (playing: boolean) => {
				set({ playing })
			},

			togglePlaying: () => {
				set(state => ({ playing: !state.playing }))
			},

			setVolume: (volume: number) => {
				const validVolume = Math.max(0, Math.min(1, volume))
				set({ volume: validVolume, muted: validVolume === 0 })
			},

			toggleMute: () => {
				set(state => ({ muted: !state.muted }))
			},

			setPlaybackRate: (rate: number) => {
				const validRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
				const validRate = validRates.includes(rate) ? rate : 1
				set({ playbackRate: validRate })
			},

			toggleLoop: () => {
				set(state => ({ loop: !state.loop }))
			},

			toggleShuffle: () => {
				set(state => ({ shuffle: !state.shuffle }))
			},

			toggleMiniMode: () => {
				set(state => ({ isMiniMode: !state.isMiniMode }))
			},

			setPlayed: (played: number) => {
				set({ played })
			},

			setDuration: (duration: number) => {
				set({ duration })
			},

			reset: () => {
				set({
					played: 0,
					duration: 0,
					playing: false
				})
			}
		}),
		{
			name: 'youtube_player_store',
			partialize: state => ({
				volume: state.volume,
				muted: state.muted,
				playbackRate: state.playbackRate,
				loop: state.loop,
				shuffle: state.shuffle,
				isMiniMode: state.isMiniMode
			})
		}
	)
)

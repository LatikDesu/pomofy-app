import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Fullscreen Mode Store
 * ---
 * Handle state of fullscreen vs normal app view
 */

interface IFullscreenState {
	isFullscreen: boolean
	toggleFullscreenMode: () => void
	isFullscreenShown: boolean
	setIsFullscreenShown: (isFullscreenShown: boolean) => void
}

export const useFullScreenToggleStore = create<IFullscreenState>()(
	persist(
		set => ({
			isFullscreen: false,
			toggleFullscreenMode: () => set(oldState => ({ isFullscreen: !oldState.isFullscreen })),
			isFullscreenShown: true,
			setIsFullscreenShown: isFullscreenShown => set({ isFullscreenShown })
		}),
		{ name: 'state_fullscreen' }
	)
)

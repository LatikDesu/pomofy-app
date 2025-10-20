import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { type IPosWatch, type IToggleWatch } from './types'

/**
 * Watch Section Store
 * ---
 * Handle the visibility of the watch section
 */

export const useToggleWatch = create<IToggleWatch>()(
	persist(
		(set, _) => ({
			isWatchToggled: true,
			setIsWatchToggled: isWatchToggled => set({ isWatchToggled }),
			isWatchShown: true,
			setIsWatchShown: isWatchShown => set({ isWatchShown })
		}),
		{
			name: 'state_watch_section'
		}
	)
)

export const usePosWatch = create<IPosWatch>()(
	persist(
		(set, _) => ({
			watchPosX: 25,
			watchPosY: 700,
			setWatchPos: (X, Y) => set({ watchPosX: X, watchPosY: Y }),
			setWatchPosDefault: () => set(() => ({ watchPosX: 25, watchPosY: 700 }))
		}),
		{
			name: 'set_watch_position'
		}
	)
)

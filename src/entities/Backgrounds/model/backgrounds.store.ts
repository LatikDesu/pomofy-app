import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Background } from './types'

/**
 * Background Store
 * ---
 * Handles the background image state of app
 */
interface IBackground {
	backgroundColor: string
	backgroundId: Background
	setBackgroundId: (backgroundId: Background) => void
	setBackgroundColor: (color: string) => void
}

export const useSetBackground = create<IBackground>()(
	persist(
		set => ({
			backgroundId: Background.GRADIENT,
			backgroundColor: '',
			setBackgroundColor: color => set({ backgroundColor: color }),
			setBackgroundId: backgroundId => set({ backgroundId })
		}),
		{
			name: 'app_background'
		}
	)
)

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Dark Mode Store
 * ---
 * Handle different styling between app dark and light mode
 */

interface IDarkModeState {
	isDark: boolean
	toggleDarkMode: () => void
	isDarkModeShown: boolean
	setIsDarkModeShown: (isDarkModeShown: boolean) => void
}

export const useDarkToggleStore = create<IDarkModeState>()(
	persist(
		set => ({
			isDark: true,
			toggleDarkMode: () => set(oldState => ({ isDark: !oldState.isDark })),
			isDarkModeShown: false,
			setIsDarkModeShown: isDarkModeShown => set({ isDarkModeShown })
		}),
		{ name: 'state_darkmode' }
	)
)

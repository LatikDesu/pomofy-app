import { create } from 'zustand'

/**
 * Break Started Store
 * ---
 * Handler break started in timer sessions
 */

interface IBreakStarted {
	breakStarted: boolean
	setBreakStarted: (breakStarted: boolean) => void
}

export const useBreakStarted = create<IBreakStarted>(set => ({
	breakStarted: false,
	setBreakStarted: breakStarted => set({ breakStarted })
}))

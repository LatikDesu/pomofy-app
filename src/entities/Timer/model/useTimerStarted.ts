import { create } from 'zustand'

/**
 * Timer Started Store
 * ---
 * Handler timer started in timer sessions
 */

interface ITimerStarted {
	timerStarted: boolean
	setTimerStarted: (timerStarted: boolean) => void
}
export const useTimerStarted = create<ITimerStarted>(set => ({
	timerStarted: false,
	setTimerStarted: timerStarted => set({ timerStarted })
}))

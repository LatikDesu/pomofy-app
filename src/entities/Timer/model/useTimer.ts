import { create } from 'zustand'

/**
 * Timer Store
 * ---
 * Handler for Timer
 */

interface ITimer {
	timerQueue: number
	setTimerQueue: (newTime: number) => void
}

export const useTimer = create<ITimer>(set => ({
	timerQueue: 1500,
	setTimerQueue: newTime => set({ timerQueue: newTime })
}))

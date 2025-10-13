import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IShortBreakTime {
	shortBreakLength: number
	defaultShortBreakLength: () => void
	setShortBreak: (value: number) => void
}

export const useShortBreakTimer = create<IShortBreakTime>()(
	persist(
		set => ({
			shortBreakLength: 300,
			defaultShortBreakLength: () => set(() => ({ shortBreakLength: 300 })),
			setShortBreak: value => set({ shortBreakLength: value })
		}),
		{ name: 'short_break_timer_length' }
	)
)

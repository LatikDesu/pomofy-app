import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ILongBreakTime {
	longBreakLength: number
	defaultLongBreakLength: () => void
	setLongBreak: (value: number) => void
}

export const useLongBreakTimer = create<ILongBreakTime>()(
	persist(
		set => ({
			longBreakLength: 900,
			defaultLongBreakLength: () => set(() => ({ longBreakLength: 900 })),
			setLongBreak: value => set({ longBreakLength: value })
		}),
		{ name: 'long_break_timer_length' }
	)
)

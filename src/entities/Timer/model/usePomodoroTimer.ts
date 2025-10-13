import { persist } from 'zustand/middleware'
import { create } from 'zustand/react'

/**
 * Pomodoro Time Store
 * ---
 * Handle pomodoro times
 */

interface IPomodoroTime {
	pomodoroLength: number
	defaultPomodoroLength: () => void
	setPomodoroLength: (value: number) => void
}

export const usePomodoroTimer = create<IPomodoroTime>()(
	persist(
		set => ({
			pomodoroLength: 1500,
			defaultPomodoroLength: () => set(() => ({ pomodoroLength: 1500 })),
			setPomodoroLength: value => set({ pomodoroLength: value })
		}),
		{ name: 'pomodoro_timer_length' }
	)
)

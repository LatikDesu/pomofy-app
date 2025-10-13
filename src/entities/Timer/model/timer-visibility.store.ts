import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IToggleTimer {
	isTimerToggled: boolean
	setIsTimerToggled: (isTimerToggled: boolean) => void
	isTimerShown: boolean
	setIsTimerShown: (isTimerShown: boolean) => void
}

interface IPosTimer {
	timerPosX: number
	timerPosY: number
	setTimerPos: (X: number, Y: number) => void
	setTimerPosDefault: () => void
}

/**
 * Timer Section Store
 * ---
 * Handle the timer section
 */

export const useToggleTimer = create<IToggleTimer>()(
	persist(
		set => ({
			isTimerToggled: true,
			setIsTimerToggled: isTimerToggled => set({ isTimerToggled }),
			isTimerShown: true,
			setIsTimerShown: isTimerShown => set({ isTimerShown })
		}),
		{ name: 'state_timer_section' }
	)
)

export const usePosTimer = create<IPosTimer>()(
	persist(
		set => ({
			timerPosX: 804,
			timerPosY: 0,
			setTimerPos: (X, Y) => set({ timerPosX: X, timerPosY: Y }),
			setTimerPosDefault: () => set(() => ({ timerPosX: 804, timerPosY: 0 }))
		}),
		{
			name: 'set_timers_position'
		}
	)
)

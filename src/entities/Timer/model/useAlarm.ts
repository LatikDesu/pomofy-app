import { persist } from 'zustand/middleware'
import { create } from 'zustand/react'

/**
 * Alarm  Store
 * ---
 * Handler for Alarm
 */

interface IAlarmOption {
	alarm: string
	setAlarm: (alarmPath: string) => void
	defaultAlarm: () => void
}

export const useAlarm = create<IAlarmOption>()(
	persist(
		set => ({
			alarm: '/assets/beep.wav',
			setAlarm: alarmPath => set({ alarm: alarmPath }),
			defaultAlarm: () => set({ alarm: '/assets/beep.wav' })
		}),
		{ name: 'set_alarm' }
	)
)

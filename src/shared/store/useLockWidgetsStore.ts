import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Lock Widgets Store
 * ---
 * Handles storing key for determining if widgets are allowed to be moved
 */

interface ILockWidgets {
	areWidgetsLocked: boolean
	setAreWidgetsLocked: (areWidgetsLocked: boolean) => void
}

export const useLockWidgetsStore = create<ILockWidgets>()(
	persist(
		(set, _) => ({
			areWidgetsLocked: false,
			setAreWidgetsLocked: areWidgetsLocked => set({ areWidgetsLocked })
		}),
		{ name: 'state_widgets_lock' }
	)
)

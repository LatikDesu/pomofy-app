import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Reset Widgets Section Store
 * ---
 * Handle the visibility of the reset widget nav item
 */
interface IToggleWidgetReset {
	isWidgetResetShown: boolean
	setIsWidgetResetShown: (isWidgetResetShown: boolean) => void
}

export const useToggleWidgetReset = create<IToggleWidgetReset>()(
	persist(
		(set, _) => ({
			isWidgetResetShown: false,
			setIsWidgetResetShown: isWidgetResetShown => set({ isWidgetResetShown })
		}),
		{
			name: 'state_widget_reset'
		}
	)
)

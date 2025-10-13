import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Side Nav Item Store
 * ---
 * Handles storing side nav item order
 */

interface ISideNavOrderStore {
	sideNavOrder: number[]
	setSideNavOrder: (sideNavOrder: number[]) => void
}

export const useSideNavOrderStore = create<ISideNavOrderStore>()(
	persist(
		set => ({
			sideNavOrder: [...Array(12).keys()],
			setSideNavOrder: sideNavOrder => set({ sideNavOrder })
		}),
		{ name: 'side_nav_order' }
	)
)

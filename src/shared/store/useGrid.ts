import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Grid Store
 * ---
 * Handler for Grid Value
 */
export interface IGrid {
	grid: number[] | null
	setGrid: (grid: number[] | null) => void
	setGridDefault: () => void
}

export const useGrid = create<IGrid>()(
	persist(
		(set, _) => ({
			grid: null,
			setGrid: gridVal => set({ grid: gridVal }),
			setGridDefault: () => set(() => ({ grid: null }))
		}),
		{ name: 'set_grid' }
	)
)

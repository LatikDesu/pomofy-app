import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Grid Store
 * ---
 * Handler for Grid Value
 */
export interface IGrid {
	grid: number[]
	setGrid: (grid: number[]) => void
	setGridDefault: () => void
}

export const useGrid = create<IGrid>()(
	persist(
		(set, _) => ({
			grid: [],
			setGrid: gridVal => set({ grid: gridVal }),
			setGridDefault: () => set(() => ({ grid: [] }))
		}),
		{ name: 'set_grid' }
	)
)

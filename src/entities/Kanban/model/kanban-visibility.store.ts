import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { type IPosKanban, type IToggleKanban } from './types'

export const useToggleKanban = create<IToggleKanban>()(
	persist(
		(set, _) => ({
			isKanbanToggled: false,
			setIsKanbanToggled: isKanbanToggled => set({ isKanbanToggled }),
			isKanbanShown: false,
			setIsKanbanShown: isKanbanShown => set({ isKanbanShown })
		}),
		{
			name: 'state_kanban_section'
		}
	)
)

export const usePosKanban = create<IPosKanban>()(
	persist(
		(set, _) => ({
			kanbanPosX: 200,
			kanbanPosY: 0,
			setKanbanPos: (X, Y) => set({ kanbanPosX: X, kanbanPosY: Y }),
			setKanbanPosDefault: () => set(() => ({ kanbanPosX: 200, kanbanPosY: 0 }))
		}),
		{
			name: 'set_kanban_position'
		}
	)
)

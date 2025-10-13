import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { type IPosTask, type IToggleTasks } from './types'

/**
 * Tasks Section Store
 * ---
 * Handle the visibility of the tasks section
 */

export const useToggleTasks = create<IToggleTasks>()(
	persist(
		(set, _) => ({
			isTasksToggled: true,
			setIsTasksToggled: isTasksToggled => set({ isTasksToggled }),
			isTasksShown: true,
			setIsTasksShown: isTasksShown => set({ isTasksShown })
		}),
		{
			name: 'state_tasks_section'
		}
	)
)

export const usePosTask = create<IPosTask>()(
	persist(
		(set, _) => ({
			taskPosX: 804,
			taskPosY: 302,
			setTaskPos: (X, Y) => set({ taskPosX: X, taskPosY: Y }),
			setTaskPosDefault: () => set(() => ({ taskPosX: 804, taskPosY: 306 }))
		}),
		{
			name: 'set_task_position'
		}
	)
)

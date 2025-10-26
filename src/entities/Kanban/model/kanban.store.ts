import { v4 } from 'uuid'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { type IKanbanBoardState, type IKanbanColumn } from './types'

const COLUMN_1_ID = 'column-1'
const COLUMN_2_ID = 'column-2'
const COLUMN_3_ID = 'column-3'

export const useKanban = create<IKanbanBoardState>()(
	persist(
		(set, get) => ({
			board: {
				columns: [
					{
						id: COLUMN_1_ID,
						title: 'Нужно сделать',
						tasks: []
					},
					{
						id: COLUMN_2_ID,
						title: 'В работе',
						tasks: []
					},
					{
						id: COLUMN_3_ID,
						title: 'Готово',
						tasks: []
					}
				]
			},
			setColumns: (columns: IKanbanColumn[]) => {
				set(() => ({
					board: {
						columns: columns
					}
				}))
			},
			addTask: (columnId: string, taskName: string) => {
				const { board } = get()
				const newColumns = board.columns.map(column => {
					if (column.id === columnId) {
						return {
							...column,
							tasks: [...column.tasks, { id: v4(), name: taskName }]
						}
					}
					return column
				})
				set({ board: { columns: newColumns } })
			},
			updateTask: (taskId: string, taskName: string) => {
				const { board } = get()
				const newColumns = board.columns.map(column => ({
					...column,
					tasks: column.tasks.map(task => (task.id === taskId ? { ...task, name: taskName } : task))
				}))
				set({ board: { columns: newColumns } })
			},
			deleteTask: (taskId: string) => {
				const { board } = get()
				const newColumns = board.columns.map(column => ({
					...column,
					tasks: column.tasks.filter(task => task.id !== taskId)
				}))
				set({ board: { columns: newColumns } })
			},
			moveTask: (
				sourceColumnId: string,
				destinationColumnId: string,
				sourceIndex: number,
				destinationIndex: number
			) => {
				const { board } = get()
				const newColumns = [...board.columns]
				const sourceColumnIndex = newColumns.findIndex(col => col.id === sourceColumnId)
				const destColumnIndex = newColumns.findIndex(col => col.id === destinationColumnId)

				if (sourceColumnIndex === -1 || destColumnIndex === -1) return

				if (sourceColumnId === destinationColumnId) {
					const column = newColumns[sourceColumnIndex]
					const newTasks = Array.from(column.tasks)
					const [removed] = newTasks.splice(sourceIndex, 1)
					newTasks.splice(destinationIndex, 0, removed)
					newColumns[sourceColumnIndex] = { ...column, tasks: newTasks }
				} else {
					const sourceColumn = newColumns[sourceColumnIndex]
					const destColumn = newColumns[destColumnIndex]
					const sourceTasks = Array.from(sourceColumn.tasks)
					const destTasks = Array.from(destColumn.tasks)
					const [removed] = sourceTasks.splice(sourceIndex, 1)
					destTasks.splice(destinationIndex, 0, removed)
					newColumns[sourceColumnIndex] = { ...sourceColumn, tasks: sourceTasks }
					newColumns[destColumnIndex] = { ...destColumn, tasks: destTasks }
				}

				set({ board: { columns: newColumns } })
			}
		}),
		{
			name: 'state_kanban_board'
		}
	)
)

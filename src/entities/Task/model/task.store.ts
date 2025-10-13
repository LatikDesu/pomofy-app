import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { type ITask, type ITaskState } from './types'

export const useTask = create<ITaskState>()(
	persist(
		(set, _) => ({
			tasks: [
				{
					id: Date.now(),
					description: 'Задача в процессе',
					inProgress: true,
					completed: false,
					pomodoro: 1,
					pomodoroCounter: 0,
					alerted: false,
					menuToggled: false
				} as ITask,
				{
					id: Date.now() + 1,
					description: 'Задача не активна',
					inProgress: false,
					completed: false,
					pomodoro: 1,
					pomodoroCounter: 0,
					alerted: false,
					menuToggled: false
				} as ITask
			],
			addTask: (description: string, count: number, isBreak: boolean) => {
				set(state => ({
					tasks: [
						{
							id: Date.now() + state.tasks.length,
							description,
							inProgress: false,
							completed: false,
							pomodoro: count,
							pomodoroCounter: isBreak ? -1 : 0,
							alerted: false,
							menuToggled: false
						} as ITask,
						...state.tasks
					]
				}))
			},
			renameTask: (id, newName) => {
				set(state => ({
					tasks: state.tasks.map(task =>
						task.id === id
							? ({
									...task,
									description: newName
								} as ITask)
							: task
					)
				}))
			},
			removeTask: id => {
				set(state => ({
					tasks: state.tasks.filter(task => task.id !== id)
				}))
			},
			removeAllTasks: () => set({ tasks: [] }),
			toggleInProgressState: (id, flag) => {
				set(state => ({
					tasks: state.tasks.map(task =>
						task.id === id ? ({ ...task, inProgress: flag } as ITask) : task
					)
				}))
			},
			setCompleted: (id, flag) => {
				set(state => ({
					tasks: state.tasks.map(task =>
						task.id === id ? ({ ...task, completed: flag } as ITask) : task
					)
				}))
			},
			setPomodoroCounter: id => {
				set(state => ({
					tasks: state.tasks.map(task =>
						task.id === id
							? ({
									...task,
									pomodoroCounter:
										task.pomodoroCounter < task.pomodoro ? task.pomodoroCounter + 1 : task.pomodoro
								} as ITask)
							: task
					)
				}))
			},
			setPomodoro: (id, newVal) => {
				set(state => ({
					tasks: state.tasks.map(task =>
						task.id === id
							? ({
									...task,
									pomodoro: newVal
								} as ITask)
							: task
					)
				}))
			},
			alertTask: (id, flag) => {
				set(state => ({
					tasks: state.tasks.map(task =>
						task.id === id
							? ({
									...task,
									alerted: flag
								} as ITask)
							: task
					)
				}))
			},
			toggleMenu: (id, flag) => {
				set(state => ({
					tasks: state.tasks.map(task =>
						task.id === id
							? ({
									...task,
									menuToggled: flag
								} as ITask)
							: task
					)
				}))
			}
		}),
		{ name: 'user_tasks' }
	)
)

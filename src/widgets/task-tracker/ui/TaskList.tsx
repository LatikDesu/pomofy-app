import { useEffect } from 'react'

import { AddTaskForm, ClearAllTasksButton } from '@/features/Task'

import { TaskItem } from './TaskItem'
import { useTask as useTaskEntity } from '@/entities/Task'
import { useBreakStarted, useTimer } from '@/entities/Timer'

// --- Main Widget Content Component ---

export const TaskList = () => {
	const { tasks, setPomodoroCounter, alertTask } = useTaskEntity()
	const { timerQueue } = useTimer()
	const { breakStarted } = useBreakStarted()

	useEffect(() => {
		if (timerQueue === 0) {
			const inProgressTask = tasks.find(t => t.inProgress && !t.alerted)
			if (inProgressTask) {
				setPomodoroCounter(inProgressTask.id)
			}
		}
	}, [timerQueue, breakStarted, tasks, setPomodoroCounter])

	useEffect(() => {
		tasks.forEach(task => {
			if (task.pomodoroCounter >= task.pomodoro && !task.alerted) {
				alertTask(task.id, true)
			}
		})
	}, [tasks, alertTask])

	return (
		<div className='joyRideTaskTracker pr-3 pb-3 pl-3 text-[var(--text-secondary)] dark:text-[var(--text-default)]'>
			<div className='flex items-center justify-between'>
				<h1 className='text-md font-semibold'>Трекер задач</h1>
				<AddTaskForm />
			</div>

			<div>
				{tasks.length > 0 ? (
					tasks.map(task => <TaskItem key={task.id} task={task} />)
				) : (
					<p className='text-sm'>Нет задач</p>
				)}
			</div>

			{tasks.length > 0 && (
				<div className='flex justify-end'>
					<ClearAllTasksButton />
				</div>
			)}
		</div>
	)
}

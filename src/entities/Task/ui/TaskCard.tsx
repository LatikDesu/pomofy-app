import clsx from 'clsx'
import React from 'react'

import { type ITask } from '../model/types'

interface TaskCardProps {
	task: ITask
	toggleSlot?: React.ReactNode
	actionsSlot?: React.ReactNode
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, toggleSlot, actionsSlot }) => {
	const getTaskClassName = () => {
		if (task.completed) {
			return 'border-green-500 bg-green-300 dark:bg-green-300 dark:text-[var(--text-secondary)]'
		}
		if (task.alerted) {
			return 'border-[var(--color-primary-active)] bg-[var(--color-primary-active)] text-[var(--text-default)]'
		}
		if (task.inProgress) {
			return 'border-[var(--color-secondary-border)] bg-[var(--color-secondary-active)] dark:bg-[var(--color-default-active)] dark:text-[var(--text-default)] text-[var(--text-secondary)]'
		}
		return 'joyRideTask'
	}

	return (
		<div
			className={clsx(
				'mb-1 w-full rounded-lg border border-[var(--color-secondary-border)] px-2 text-sm dark:border-[var(--color-default-hover)]',
				getTaskClassName()
			)}
		>
			<div className='cancelDrag flex items-center justify-between'>
				<div className='flex items-center space-x-2'>
					{toggleSlot}
					<div className='whitespace-normal'>{task.description}</div>
				</div>
				<div className='flex items-center'>
					<div className='flex justify-end'>
						{task.pomodoroCounter}/{task.pomodoro}
					</div>
					{actionsSlot}
				</div>
			</div>
		</div>
	)
}

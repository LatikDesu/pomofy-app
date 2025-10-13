import React from 'react'

import { DeleteTaskButton } from '@/features/Task'

import { useClickOff } from '@/shared/lib/useClickOff'

import { type ITask, useTask } from '@/entities/Task'

interface ActionMenuProps {
	task: ITask
	onClose: () => void
}

export const ActionMenu: React.FC<ActionMenuProps> = ({ task, onClose }) => {
	const menuRef = useClickOff(onClose)
	const { toggleInProgressState, setCompleted } = useTask()

	const handleTrackClick = () => {
		if (task.completed) {
			setCompleted(task.id, false)
		}
		toggleInProgressState(task.id, !task.inProgress)
		onClose()
	}

	const handleCompleteClick = () => {
		setCompleted(task.id, !task.completed)
		onClose()
	}

	return (
		<div
			ref={menuRef}
			className='w-60 rounded-lg bg-[var(--color-secondary)] text-sm shadow-lg dark:bg-[var(--color-default)]'
			style={{ zIndex: 5 }}
		>
			<ul className='py-1 text-[var(--text-secondary)] dark:text-[var(--text-default)]'>
				<li
					onClick={handleTrackClick}
					className='cursor-pointer rounded-lg px-5 py-2 hover:bg-[var(--color-secondary-hover)] dark:hover:bg-[var(--color-default-hover)]'
				>
					<div className='select-none'>
						{task.inProgress ? 'Не отслеживать задачу' : 'Отслеживать задачу'}
					</div>
				</li>
				<li
					onClick={handleCompleteClick}
					className='cursor-pointer rounded-lg px-5 py-2 hover:bg-[var(--color-secondary-hover)] dark:hover:bg-[var(--color-default-hover)]'
				>
					<div className='select-none'>
						{task.completed ? 'Задача не выполнена' : 'Задача выполнена'}
					</div>
				</li>
				<DeleteTaskButton taskId={task.id} />
			</ul>
		</div>
	)
}

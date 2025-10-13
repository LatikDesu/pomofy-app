import React from 'react'

import { EditTaskForm, ToggleTaskButton, TrackTaskWrapper } from '@/features/Task'

import { useClickOff } from '@/shared/lib/useClickOff'

import { ActionMenu } from './ActionMenu'
import { type ITask, TaskCard, useTask as useTaskEntity } from '@/entities/Task'

export const TaskItem = ({ task }: { task: ITask }) => {
	const { tasks, toggleMenu } = useTaskEntity()
	const menuRef = useClickOff(() => toggleMenu(task.id, false))

	const handleContextMenu = (e: React.MouseEvent) => {
		e.preventDefault()
		// Закрываем все другие открытые меню
		tasks.forEach((t: ITask) => {
			if (t.menuToggled && t.id !== task.id) {
				toggleMenu(t.id, false)
			}
		})
		// Открываем/закрываем текущее
		toggleMenu(task.id, !task.menuToggled)
	}

	return (
		<div onContextMenu={handleContextMenu} className='relative'>
			<TrackTaskWrapper task={task}>
				<TaskCard
					task={task}
					toggleSlot={<ToggleTaskButton task={task} />}
					actionsSlot={<EditTaskForm task={task} />}
				/>
			</TrackTaskWrapper>
			<div className='absolute z-10' ref={menuRef}>
				{task.menuToggled && <ActionMenu task={task} onClose={() => toggleMenu(task.id, false)} />}
			</div>
		</div>
	)
}

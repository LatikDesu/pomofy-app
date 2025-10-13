import React from 'react'

import { type ITask, useTask } from '@/entities/Task'

interface ToggleTaskButtonProps {
	task: ITask
}

export const ToggleTaskButton: React.FC<ToggleTaskButtonProps> = ({ task }) => {
	const { setCompleted } = useTask()

	return (
		<div onClick={() => setCompleted(task.id, !task.completed)} className='flex items-center'>
			{/* {task.completed && <Check className='size-5 ml-2 cursor-pointer text-green-500' />} */}
		</div>
	)
}

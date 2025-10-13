import React from 'react'

import { type ITask, useTask } from '@/entities/Task'

interface TrackTaskWrapperProps {
	task: ITask
	children: React.ReactNode
}

export const TrackTaskWrapper: React.FC<TrackTaskWrapperProps> = ({ task, children }) => {
	const { toggleInProgressState, setCompleted } = useTask()

	const handleDoubleClick = () => {
		if (task.completed) {
			setCompleted(task.id, false)
		}
		toggleInProgressState(task.id, !task.inProgress)
	}

	return <div onDoubleClick={handleDoubleClick}>{children}</div>
}

import { InfoPopover } from '@/features/Task'

import { CloseWidgetButton, WidgetWrapper } from '@/shared/ui'

import { TaskList } from './TaskList'
import { useToggleTasks } from '@/entities/Task'

export const TaskTrackerWidget = () => {
	const { setIsTasksToggled } = useToggleTasks()

	const actions = (
		<>
			<InfoPopover />
			<CloseWidgetButton onClick={() => setIsTasksToggled(false)} />
		</>
	)

	return (
		<WidgetWrapper actions={actions}>
			<TaskList />
		</WidgetWrapper>
	)
}

import { InfoPopover } from '@/features/Task'

import { CloseWidgetButton, DWrapper, WidgetWrapper } from '@/shared/ui'

import { usePosTask, useToggleTasks } from '@/entities/Task'
import { useGrid } from '@/shared/store'
import { TaskList } from './TaskList'

export const TaskTrackerWidget = () => {
	const { setIsTasksToggled } = useToggleTasks()
	const { isTasksToggled, isTasksShown } = useToggleTasks()
	const { taskPosX, taskPosY, setTaskPos } = usePosTask()
	const { grid } = useGrid()


	const actions = (
		<>
			<InfoPopover />
			<CloseWidgetButton onClick={() => setIsTasksToggled(false)} />
		</>
	)

	return (
		<DWrapper
			toggleHook={isTasksToggled && isTasksShown}
			defaultX={taskPosX}
			defaultY={taskPosY}
			setPosition={setTaskPos}
			isSticky={false}
			gridValues={grid}
			handle='.handle'
		>
			<WidgetWrapper actions={actions}>
				<TaskList />
			</WidgetWrapper>
		</DWrapper>
	)
}

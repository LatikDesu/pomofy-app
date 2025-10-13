import clsx from 'clsx'
import React, { useState } from 'react'
import { IoMdSettings } from 'react-icons/io'
import { MdWidgets } from 'react-icons/md'
import { TbBackground } from 'react-icons/tb'

import useMediaQuery from '@/shared/lib/useMediaQuery'
import { useGrid } from '@/shared/store'
import { CustomizationButton, DWrapper } from '@/shared/ui'

import { BackgroundMenu } from '@/entities/Backgrounds'
import { usePosTask, useToggleTasks } from '@/entities/Task'
import { usePosTimer, useToggleTimer } from '@/entities/Timer'
import { StickyNotesList } from '@/widgets/sticky-note'
import { TaskTrackerWidget } from '@/widgets/task-tracker'
import { TimerWidget } from '@/widgets/timer'

export const WorkflowPage = React.forwardRef<HTMLDivElement>((_props, ref) => {
	const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState(false)
	const isDesktop = useMediaQuery('(min-width: 768px)')
	const { isTasksToggled, isTasksShown } = useToggleTasks()
	const { taskPosX, taskPosY, setTaskPos } = usePosTask()
	const { isTimerToggled, isTimerShown } = useToggleTimer()
	const { timerPosX, timerPosY, setTimerPos } = usePosTimer()
	const { grid } = useGrid()

	return (
		<div ref={ref} className='pb-8 md:h-screen md:pb-0'>
			<div className={'bodyPart ml-auto flex w-5/6 flex-wrap justify-end gap-2 px-2 py-2'}>
				<div className='settingsButton'>
					<CustomizationButton
						title=''
						icon={<IoMdSettings size={20} className='' />}
						modal={<div></div>}
						changeModal={() => {}}
					/>
				</div>
				<div className='configureWidgetsButton'>
					<CustomizationButton
						title=''
						icon={<MdWidgets size={20} className='' />}
						modal={<div></div>}
						changeModal={() => {}}
					/>
				</div>
				<div className='chooseBackgroundButton'>
					<CustomizationButton
						title=''
						icon={<TbBackground size={20} className='' />}
						modal={
							<BackgroundMenu
								isVisible={isBackgroundModalOpen}
								onClose={() => setIsBackgroundModalOpen(false)}
							/>
						}
						changeModal={setIsBackgroundModalOpen}
					/>
				</div>
			</div>

			{!isDesktop ? (
				<div className='ml-8 flex flex-col items-center'>
					<div className={clsx(isTimerToggled ? 'block' : 'hidden')}>
						<TimerWidget />
					</div>
					<div className={clsx(isTasksToggled ? 'block' : 'hidden')}>
						<TaskTrackerWidget />
					</div>
				</div>
			) : (
				<>
					<StickyNotesList />
					<DWrapper
						toggleHook={isTasksToggled && isTasksShown}
						defaultX={taskPosX}
						defaultY={taskPosY}
						setPosition={setTaskPos}
						isSticky={false}
						gridValues={grid}
						handle='.handle'
					>
						<TaskTrackerWidget />
					</DWrapper>
					<DWrapper
						toggleHook={isTimerToggled && isTimerShown}
						defaultX={timerPosX}
						defaultY={timerPosY}
						setPosition={setTimerPos}
						isSticky={false}
						gridValues={grid}
						handle='.handle'
					>
						<TimerWidget />
					</DWrapper>
				</>
			)}
		</div>
	)
})

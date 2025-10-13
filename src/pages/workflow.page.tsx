import clsx from 'clsx'
import React, { useState } from 'react'
import { IoMdSettings } from 'react-icons/io'
import { MdWidgets } from 'react-icons/md'
import { TbBackground } from 'react-icons/tb'

import useMediaQuery from '@/shared/lib/useMediaQuery'
import { CustomizationButton } from '@/shared/ui'

import { BackgroundMenu } from '@/entities/Backgrounds'
import { useToggleTasks } from '@/entities/Task'
import { useToggleTimer } from '@/entities/Timer'
import { StickyNotesList } from '@/widgets/sticky-note'
import { TaskTrackerWidget } from '@/widgets/task-tracker'
import { TimerWidget } from '@/widgets/timer'

export const WorkflowPage = React.forwardRef<HTMLDivElement>((_props, ref) => {
	const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState(false)
	const isDesktop = useMediaQuery('(min-width: 768px)')
	const { isTasksToggled, } = useToggleTasks()
	const { isTimerToggled } = useToggleTimer()

	return (
		<div ref={ref} className='pb-8 md:h-screen md:pb-0'>
			<div className={'bodyPart ml-auto flex w-5/6 flex-wrap justify-end gap-2 px-2 py-2'}>
				<div className='settingsButton'>
					<CustomizationButton
						title=''
						icon={<IoMdSettings size={20} className='' />}
						modal={<div></div>}
						changeModal={() => { }}
					/>
				</div>
				<div className='configureWidgetsButton'>
					<CustomizationButton
						title=''
						icon={<MdWidgets size={20} className='' />}
						modal={<div></div>}
						changeModal={() => { }}
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
					<TaskTrackerWidget />
					<TimerWidget />
				</>
			)}
		</div>
	)
})

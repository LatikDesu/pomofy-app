import clsx from 'clsx'
import React from 'react'

import { SettingsModal } from '@/features/SettingsModal'
import { WidgetControlModal } from '@/features/WidgetControl'

import useMediaQuery from '@/shared/lib/useMediaQuery'
import { useGrid } from '@/shared/store'
import { DWrapper } from '@/shared/ui'

import { BackgroundModal } from '@/entities/Backgrounds'
import { usePosKanban, useToggleKanban } from '@/entities/Kanban'
import { usePosQuickLinks, useToggleQuickLinks } from '@/entities/QuickLinks'
import { usePosSpotify, useSpotifyMusic } from '@/entities/Spotify'
import { usePosTask, useToggleTasks } from '@/entities/Task'
import { usePosTimer, useToggleTimer } from '@/entities/Timer'
import { usePosWatch, useToggleWatch } from '@/entities/Watch'
import { usePosYandex, useYandexMusic } from '@/entities/YandexMusic'
import { usePosYouTube, useYouTubeMusic } from '@/entities/YouTube'
import { KanbanWidget } from '@/widgets/kanban'
import { QuickLinksWidget } from '@/widgets/quick-links'
import { SpotifyWidget } from '@/widgets/spotify'
import { StickyNotesList } from '@/widgets/sticky-note'
import { TaskTrackerWidget } from '@/widgets/task-tracker'
import { TimerWidget } from '@/widgets/timer'
import { WatchWidget } from '@/widgets/watch'
import { YandexWidget } from '@/widgets/yandex-music'
import { YouTubeWidget } from '@/widgets/youtube'

export const WorkflowPage = React.forwardRef<HTMLDivElement>((_props, ref) => {
	const isDesktop = useMediaQuery('(min-width: 768px)')
	const { isTasksToggled, isTasksShown } = useToggleTasks()
	const { taskPosX, taskPosY, setTaskPos } = usePosTask()
	const { isTimerToggled, isTimerShown } = useToggleTimer()
	const { timerPosX, timerPosY, setTimerPos } = usePosTimer()
	const { isWatchToggled, isWatchShown } = useToggleWatch()
	const { watchPosX, watchPosY, setWatchPos } = usePosWatch()
	const { isYandexToggled, isYandexShown } = useYandexMusic()
	const { yandexPosX, yandexPosY, setYandexPos } = usePosYandex()
	const { isSpotifyToggled, isSpotifyShown } = useSpotifyMusic()
	const { spotifyPosX, spotifyPosY, setSpotifyPos } = usePosSpotify()
	const { isYouTubeToggled, isYouTubeShown } = useYouTubeMusic()
	const { youtubePosX, youtubePosY, setYouTubePos } = usePosYouTube()
	const { isQuickLinksToggled, isQuickLinksShown } = useToggleQuickLinks()
	const { quickLinksPosX, quickLinksPosY, setQuickLinksPos } = usePosQuickLinks()
	const { isKanbanToggled, isKanbanShown } = useToggleKanban()
	const { kanbanPosX, kanbanPosY, setKanbanPos } = usePosKanban()
	const { grid } = useGrid()

	return (
		<div ref={ref} className='pb-8 md:h-screen md:pb-0'>
			<div className={'bodyPart ml-auto flex w-5/6 flex-wrap justify-end gap-2 px-2 py-2'}>
				<SettingsModal />
				<WidgetControlModal />
				<BackgroundModal />
			</div>

			{!isDesktop ? (
				<div className='ml-8 flex flex-col items-center'>
					<div className={clsx(isWatchToggled ? 'block' : 'hidden')}>
						<WatchWidget />
					</div>
					<div className={clsx(isTimerToggled ? 'block' : 'hidden')}>
						<TimerWidget />
					</div>
					<div className={clsx(isTasksToggled ? 'block' : 'hidden')}>
						<TaskTrackerWidget />
					</div>
					<div className={clsx(isKanbanToggled ? 'block' : 'hidden')}>
						<KanbanWidget />
					</div>
					<div className={clsx(isQuickLinksToggled ? 'block' : 'hidden')}>
						<QuickLinksWidget />
					</div>
					<div className={clsx(isYandexToggled ? 'block' : 'hidden')}>
						<YandexWidget />
					</div>
					<div className={clsx(isSpotifyToggled ? 'block' : 'hidden')}>
						<SpotifyWidget />
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
					<DWrapper
						toggleHook={isWatchToggled && isWatchShown}
						defaultX={watchPosX}
						defaultY={watchPosY}
						setPosition={setWatchPos}
						isSticky={false}
						gridValues={grid}
						handle='.handle'
					>
						<WatchWidget />
					</DWrapper>
					<DWrapper
						toggleHook={isYandexToggled && isYandexShown}
						defaultX={yandexPosX}
						defaultY={yandexPosY}
						setPosition={setYandexPos}
						isSticky={false}
						gridValues={grid}
						handle='.handle'
					>
						<YandexWidget />
					</DWrapper>
					<DWrapper
						toggleHook={isSpotifyToggled && isSpotifyShown}
						defaultX={spotifyPosX}
						defaultY={spotifyPosY}
						setPosition={setSpotifyPos}
						isSticky={false}
						gridValues={grid}
						handle='.handle'
					>
						<SpotifyWidget />
					</DWrapper>
					<DWrapper
						toggleHook={isYouTubeToggled && isYouTubeShown}
						defaultX={youtubePosX}
						defaultY={youtubePosY}
						setPosition={setYouTubePos}
						isSticky={false}
						gridValues={grid}
						handle='.handle'
					>
						<YouTubeWidget />
					</DWrapper>
					<DWrapper
						toggleHook={isQuickLinksToggled && isQuickLinksShown}
						defaultX={quickLinksPosX}
						defaultY={quickLinksPosY}
						setPosition={setQuickLinksPos}
						isSticky={false}
						gridValues={grid}
						handle='.handle'
					>
						<QuickLinksWidget />
					</DWrapper>
					<DWrapper
						toggleHook={isKanbanToggled && isKanbanShown}
						defaultX={kanbanPosX}
						defaultY={kanbanPosY}
						setPosition={setKanbanPos}
						isSticky={false}
						gridValues={grid}
						handle='.handle'
					>
						<KanbanWidget />
					</DWrapper>
				</>
			)}
		</div>
	)
})

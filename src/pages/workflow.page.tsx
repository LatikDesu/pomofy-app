import clsx from 'clsx'
import React, { lazy, Suspense } from 'react'

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

// Lazy loading для виджетов
const KanbanWidget = lazy(() =>
	import('@/widgets/kanban').then((module) => ({ default: module.KanbanWidget }))
)
const QuickLinksWidget = lazy(() =>
	import('@/widgets/quick-links').then((module) => ({ default: module.QuickLinksWidget }))
)
const SpotifyWidget = lazy(() =>
	import('@/widgets/spotify').then((module) => ({ default: module.SpotifyWidget }))
)
const StickyNotesList = lazy(() =>
	import('@/widgets/sticky-note').then((module) => ({ default: module.StickyNotesList }))
)
const TaskTrackerWidget = lazy(() =>
	import('@/widgets/task-tracker').then((module) => ({ default: module.TaskTrackerWidget }))
)
const TimerWidget = lazy(() =>
	import('@/widgets/timer').then((module) => ({ default: module.TimerWidget }))
)
const WatchWidget = lazy(() =>
	import('@/widgets/watch').then((module) => ({ default: module.WatchWidget }))
)
const YandexWidget = lazy(() =>
	import('@/widgets/yandex-music').then((module) => ({ default: module.YandexWidget }))
)
const YouTubeWidget = lazy(() =>
	import('@/widgets/youtube').then((module) => ({ default: module.YouTubeWidget }))
)

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
						<Suspense fallback={<div className='h-20 w-full animate-pulse rounded bg-white/5' />}>
							<WatchWidget />
						</Suspense>
					</div>
					<div className={clsx(isTimerToggled ? 'block' : 'hidden')}>
						<Suspense fallback={<div className='h-20 w-full animate-pulse rounded bg-white/5' />}>
							<TimerWidget />
						</Suspense>
					</div>
					<div className={clsx(isTasksToggled ? 'block' : 'hidden')}>
						<Suspense fallback={<div className='h-32 w-full animate-pulse rounded bg-white/5' />}>
							<TaskTrackerWidget />
						</Suspense>
					</div>
					<div className={clsx(isKanbanToggled ? 'block' : 'hidden')}>
						<Suspense fallback={<div className='h-96 w-full animate-pulse rounded bg-white/5' />}>
							<KanbanWidget />
						</Suspense>
					</div>
					<div className={clsx(isQuickLinksToggled ? 'block' : 'hidden')}>
						<Suspense fallback={<div className='h-32 w-full animate-pulse rounded bg-white/5' />}>
							<QuickLinksWidget />
						</Suspense>
					</div>
					<div className={clsx(isYandexToggled ? 'block' : 'hidden')}>
						<Suspense fallback={<div className='h-24 w-full animate-pulse rounded bg-white/5' />}>
							<YandexWidget />
						</Suspense>
					</div>
					<div className={clsx(isSpotifyToggled ? 'block' : 'hidden')}>
						<Suspense fallback={<div className='h-24 w-full animate-pulse rounded bg-white/5' />}>
							<SpotifyWidget />
						</Suspense>
					</div>
				</div>
			) : (
				<>
					<Suspense fallback={null}>
						<StickyNotesList />
					</Suspense>
					<DWrapper
						toggleHook={isTasksToggled && isTasksShown}
						defaultX={taskPosX}
						defaultY={taskPosY}
						setPosition={setTaskPos}
						isSticky={false}
						gridValues={grid}
						handle='.handle'
					>
						<Suspense fallback={<div className='h-32 w-64 animate-pulse rounded bg-white/5' />}>
							<TaskTrackerWidget />
						</Suspense>
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
						<Suspense fallback={<div className='h-24 w-48 animate-pulse rounded bg-white/5' />}>
							<TimerWidget />
						</Suspense>
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
						<Suspense fallback={<div className='h-20 w-40 animate-pulse rounded bg-white/5' />}>
							<WatchWidget />
						</Suspense>
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
						<Suspense fallback={<div className='h-24 w-80 animate-pulse rounded bg-white/5' />}>
							<YandexWidget />
						</Suspense>
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
						<Suspense fallback={<div className='h-24 w-80 animate-pulse rounded bg-white/5' />}>
							<SpotifyWidget />
						</Suspense>
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
						<Suspense fallback={<div className='h-24 w-80 animate-pulse rounded bg-white/5' />}>
							<YouTubeWidget />
						</Suspense>
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
						<Suspense fallback={<div className='h-32 w-64 animate-pulse rounded bg-white/5' />}>
							<QuickLinksWidget />
						</Suspense>
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
						<Suspense fallback={<div className='h-96 w-[800px] animate-pulse rounded bg-white/5' />}>
							<KanbanWidget />
						</Suspense>
					</DWrapper>
				</>
			)}
		</div>
	)
})

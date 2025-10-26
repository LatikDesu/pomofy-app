import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { Clock, Link, ListTodo, RotateCcw, StickyNote, Timer } from 'lucide-react'
import { useState } from 'react'
import { BsArrowsFullscreen } from 'react-icons/bs'
import { IoMenu } from 'react-icons/io5'
import { MdDarkMode, MdWbSunny } from 'react-icons/md'

import { useToggleWidgetReset } from '@/features/ResetWidgetPosition'
import { useSetDefault } from '@/features/SetDefault'

import { SpotifyIcon, YandexIcon, YouTubeIcon } from '@/shared/icons'
import { toggleFullScreen } from '@/shared/lib/fullscreen'
import { useDarkToggleStore, useFullScreenToggleStore } from '@/shared/store'

import { useSideNavOrderStore } from '../model/useSideNavOrder.store'

import { DraggableNavItem } from './DraggableNavItem'
import { SideBarItem } from './SideBarItem'
import { useToggleQuickLinks } from '@/entities/QuickLinks'
import { useSpotifyMusic } from '@/entities/Spotify'
import { useStickyNote, useToggleStickyNote } from '@/entities/StickyNote'
import { useToggleTasks } from '@/entities/Task'
import { useToggleTimer } from '@/entities/Timer'
import { useToggleWatch } from '@/entities/Watch'
import { useYandexMusic } from '@/entities/YandexMusic'
import { useYouTubeMusic } from '@/entities/YouTube'

export const SideBar = () => {
	const [active, setActive] = useState(false)
	const { sideNavOrder, setSideNavOrder } = useSideNavOrderStore()
	const { isFullscreen, isFullscreenShown, toggleFullscreenMode } = useFullScreenToggleStore()
	const { isDark, toggleDarkMode, isDarkModeShown } = useDarkToggleStore()
	const { isTasksToggled, setIsTasksToggled, isTasksShown } = useToggleTasks()
	const { isTimerToggled, setIsTimerToggled, isTimerShown } = useToggleTimer()
	const { isYandexToggled, setIsYandexToggled, isYandexShown } = useYandexMusic()
	const { isSpotifyToggled, setIsSpotifyToggled, isSpotifyShown } = useSpotifyMusic()
	const { isYouTubeToggled, setIsYouTubeToggled, isYouTubeShown } = useYouTubeMusic()
	const setDefault = useSetDefault()
	const { isWidgetResetShown } = useToggleWidgetReset()
	const { isStickyNoteShown } = useToggleStickyNote()
	const { stickyNotes, addStickyNote } = useStickyNote()
	const { isQuickLinksToggled, setIsQuickLinksToggled, isQuickLinksShown } = useToggleQuickLinks()
	const { isWatchToggled, setIsWatchToggled, isWatchShown } = useToggleWatch()

	const theme = isDark ? <MdWbSunny className='h-6 w-6' /> : <MdDarkMode className='h-6 w-6' />

	const sideNavItems = [
		{
			id: '1',
			content: <Clock className='h-6 w-6' />,
			tooltipTitle: 'Часы',
			isToggled: isWatchToggled,
			setToggled: setIsWatchToggled,
			toggleString: 'Часы',
			toggleIcon: '🕐',
			isShown: isWatchShown
		},
		{
			id: '2',
			content: <Timer className='h-6 w-6' />,
			tooltipTitle: 'Таймер',
			isToggled: isTimerToggled,
			setToggled: setIsTimerToggled,
			toggleString: 'Таймер',
			toggleIcon: '🍅',
			isShown: isTimerShown
		},
		{
			id: '3',
			content: <ListTodo className='h-6 w-6' />,
			tooltipTitle: 'Трекер задач',
			isToggled: isTasksToggled,
			setToggled: setIsTasksToggled,
			toggleString: 'Трекер задач',
			toggleIcon: '📝',
			isShown: isTasksShown
		},
		{
			id: '4',
			content: <StickyNote className='h-6 w-6' />,
			tooltipTitle: 'Заметки',
			isToggled: stickyNotes.length > 0,
			setToggled: addNewStickyNote,
			toggleString: 'Заметки',
			toggleIcon: '📝',
			isShown: isStickyNoteShown
		},
		{
			id: '5',
			content: <Link className='h-6 w-6' />,
			tooltipTitle: 'Быстрые ссылки',
			isToggled: isQuickLinksToggled,
			setToggled: setIsQuickLinksToggled,
			toggleString: 'Быстрые ссылки',
			toggleIcon: '🔗',
			isShown: isQuickLinksShown
		},
		{
			id: '6',
			content: <YandexIcon className='h-6 w-6' />,
			tooltipTitle: 'Яндекс.Музыка',
			isToggled: isYandexToggled,
			setToggled: setIsYandexToggled,
			toggleString: 'Яндекс. Музыка',
			toggleIcon: '🎵',
			isShown: isYandexShown
		},
		{
			id: '7',
			content: <SpotifyIcon className='h-6 w-6' />,
			tooltipTitle: 'Spotify',
			isToggled: isSpotifyToggled,
			setToggled: setIsSpotifyToggled,
			toggleString: 'Spotify',
			toggleIcon: '🎵',
			isShown: isSpotifyShown
		},
		{
			id: '8',
			content: <YouTubeIcon className='h-6 w-6' />,
			tooltipTitle: 'YouTube',
			isToggled: isYouTubeToggled,
			setToggled: setIsYouTubeToggled,
			toggleString: 'YouTube',
			toggleIcon: '▶️',
			isShown: isYouTubeShown
		},
		{
			id: '9',
			content: theme,
			tooltipTitle: 'Тема',
			isToggled: isDark,
			setToggled: toggleDarkMode,
			toggleString: 'Темная тема',
			toggleIcon: '🌙',
			isShown: isDarkModeShown
		},
		{
			id: '10',
			content: <RotateCcw className='h-6 w-6' />,
			tooltipTitle: 'Сбросить позиции',
			isToggled: false,
			setToggled: toggleDefaultPositions,
			toggleString: 'Положение виджетов сброшено',
			toggleIcon: '🔄',
			isShown: isWidgetResetShown
		},
		{
			id: '11',
			content: <BsArrowsFullscreen className='h-6 w-6' />,
			tooltipTitle: 'Полноэкранный режим',
			isToggled: isFullscreen,
			setToggled: () => {
				toggleFullScreen()
				toggleFullscreenMode()
			},
			toggleString: 'Полноэкранный режим',
			toggleIcon: '',
			isShown: isFullscreenShown
		}
		// {
		//   id: "11",
		//   content: <MdOutlineViewKanban className="h-6 w-6" />,
		//   tooltipTitle: "Kanban",
		//   isToggled: isKanbanToggled,
		//   setToggled: setIsKanbanToggled,
		//   toggleString: "Kanban Toggled",
		//   toggleIcon: "📃",
		//   isShown: isKanbanShown,
		// },
	]

	function toggleDefaultPositions() {
		setDefault()
	}

	function addNewStickyNote() {
		addStickyNote('')
	}

	function toggleNavBar() {
		setActive(oldDate => !oldDate)
	}

	const reorder = (list: number[], startIndex: number, endIndex: number): number[] => {
		const result = Array.from(list)
		const [removed] = result.splice(startIndex, 1)
		result.splice(endIndex, 0, removed)
		return result
	}

	function onDragEnd(result: any) {
		if (!result.destination) {
			return
		}

		setSideNavOrder(reorder(sideNavOrder, result.source.index, result.destination.index))
	}

	return (
		<div className='sideNav absolute flex p-2'>
			<aside className='flex flex-col overflow-hidden rounded-md'>
				<ul>
					<div className='sm:hidden'>
						<SideBarItem onClick={toggleNavBar} shown={true}>
							<IoMenu className='h-6 w-6' />
						</SideBarItem>
					</div>
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId='droppable'>
							{provided => (
								<div {...provided.droppableProps} ref={provided.innerRef}>
									{sideNavOrder &&
										sideNavOrder.map &&
										sideNavOrder.map((id, index) => {
											const item = sideNavItems[id]
											if (!item) return

											return (
												<Draggable
													key={item.id}
													draggableId={String(item.id)}
													index={index}
													disableInteractiveElementBlocking={true}
												>
													{provided => (
														<div
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
														>
															<DraggableNavItem active={active} item={item} />
														</div>
													)}
												</Draggable>
											)
										})}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</ul>
			</aside>
		</div>
	)
}

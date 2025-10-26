import { Link, ListTodo, RotateCcw, Timer, WatchIcon } from 'lucide-react'
import { BsArrowsFullscreen } from 'react-icons/bs'
import { MdOutlineNoteAdd, MdWbSunny, MdWidgets } from 'react-icons/md'

import { useToggleWidgetReset } from '@/features/ResetWidgetPosition'

import { SpotifyIcon, YandexIcon, YouTubeIcon } from '@/shared/icons'
import useMediaQuery from '@/shared/lib/useMediaQuery'
import { useDarkToggleStore, useFullScreenToggleStore } from '@/shared/store'
import { NeumorphButton } from '@/shared/ui'
import { Modal, ModalBody, ModalContent, ModalTrigger } from '@/shared/ui/Modal'

import { WidgetButton } from './WidgetButton'
import { useToggleQuickLinks } from '@/entities/QuickLinks'
import { useSpotifyMusic } from '@/entities/Spotify'
import { useToggleStickyNote } from '@/entities/StickyNote'
import { useToggleTasks } from '@/entities/Task'
import { useToggleTimer } from '@/entities/Timer'
import { useToggleWatch } from '@/entities/Watch'
import { useYandexMusic } from '@/entities/YandexMusic'
import { useYouTubeMusic } from '@/entities/YouTube'

export const WidgetControlModal = () => {
	const { isTimerShown, setIsTimerShown } = useToggleTimer()
	const { isStickyNoteShown, setIsStickyNoteShown } = useToggleStickyNote()
	const { isTasksShown, setIsTasksShown } = useToggleTasks()
	const { isDarkModeShown, setIsDarkModeShown } = useDarkToggleStore()
	const { isFullscreenShown, setIsFullscreenShown } = useFullScreenToggleStore()
	const { isWidgetResetShown, setIsWidgetResetShown } = useToggleWidgetReset()
	const { isYandexShown, setIsYandexShown } = useYandexMusic()
	const { isSpotifyShown, setIsSpotifyShown } = useSpotifyMusic()
	const { isYouTubeShown, setIsYouTubeShown } = useYouTubeMusic()
	const { isWatchShown, setIsWatchShown } = useToggleWatch()
	const { isQuickLinksShown, setIsQuickLinksShown } = useToggleQuickLinks()
	const isDesktop = useMediaQuery('(min-width: 641px)')
	const isDark = useDarkToggleStore(state => state.isDark)

	return (
		<Modal>
			<ModalTrigger asChild className='configureWidgetsButton'>
				<NeumorphButton intent={isDark ? 'default' : 'secondary'} size='small'>
					<MdWidgets size={20} />
				</NeumorphButton>
			</ModalTrigger>
			<ModalBody>
				<ModalContent>
					<div className='mb-3 font-bold'>Виджеты</div>
					<hr className='mb-3 border-t border-[var(--color-secondary-border)] dark:border-[var(--color-default-hover)]' />
					<div className='grid grid-cols-2 gap-2 text-center sm:grid-cols-3'>
						<WidgetButton
							isActive={isTimerShown}
							onClick={() => setIsTimerShown(!isTimerShown)}
							title='Таймер'
							icon={<Timer className='h-6 w-6' />}
						/>
						<WidgetButton
							isActive={isTasksShown}
							onClick={() => setIsTasksShown(!isTasksShown)}
							title='Трекер задач'
							icon={<ListTodo className='h-6 w-6' />}
						/>
						{isDesktop && (
							<WidgetButton
								isActive={isStickyNoteShown}
								onClick={() => setIsStickyNoteShown(!isStickyNoteShown)}
								title='Заметки'
								icon={<MdOutlineNoteAdd className='h-6 w-6' />}
							/>
						)}
						<WidgetButton
							isActive={isYandexShown}
							onClick={() => setIsYandexShown(!isYandexShown)}
							title='Я.Музыка'
							icon={<YandexIcon className='h-6 w-6' />}
						/>
						<WidgetButton
							isActive={isSpotifyShown}
							onClick={() => setIsSpotifyShown(!isSpotifyShown)}
							title='Spotify'
							icon={<SpotifyIcon className='h-6 w-6' />}
						/>
						{isDesktop && (
							<WidgetButton
								isActive={isYouTubeShown}
								onClick={() => setIsYouTubeShown(!isYouTubeShown)}
								title='YouTube'
								icon={<YouTubeIcon className='h-6 w-6' />}
							/>
						)}
						<WidgetButton
							isActive={isWatchShown}
							onClick={() => setIsWatchShown(!isWatchShown)}
							title='Часы'
							icon={<WatchIcon className='h-6 w-6' />}
						/>
						<WidgetButton
							isActive={isQuickLinksShown}
							onClick={() => setIsQuickLinksShown(!isQuickLinksShown)}
							title='Ссылки'
							icon={<Link className='h-6 w-6' />}
						/>
						<WidgetButton
							isActive={isDarkModeShown}
							onClick={() => setIsDarkModeShown(!isDarkModeShown)}
							title='Тема'
							icon={<MdWbSunny className='h-6 w-6' />}
						/>
						<WidgetButton
							isActive={isWidgetResetShown}
							onClick={() => setIsWidgetResetShown(!isWidgetResetShown)}
							title='Сброс'
							icon={<RotateCcw className='h-6 w-6' />}
						/>
						{isDesktop && (
							<WidgetButton
								isActive={isFullscreenShown}
								onClick={() => setIsFullscreenShown(!isFullscreenShown)}
								title='Экран'
								icon={<BsArrowsFullscreen className='h-6 w-6' />}
							/>
						)}
					</div>
				</ModalContent>
			</ModalBody>
		</Modal>
	)
}

import { ListTodo, RotateCcw, Timer } from 'lucide-react'
import { BsArrowsFullscreen } from 'react-icons/bs'
import { MdOutlineNoteAdd, MdWbSunny, MdWidgets } from 'react-icons/md'

import { useToggleWidgetReset } from '@/features/ResetWidgetPosition'

import useMediaQuery from '@/shared/lib/useMediaQuery'
import { useDarkToggleStore, useFullScreenToggleStore } from '@/shared/store'
import { NeumorphButton } from '@/shared/ui/Button'
import { Modal, ModalBody, ModalContent, ModalTrigger } from '@/shared/ui/Modal'

import { WidgetButton } from './WidgetButton'
import { useToggleStickyNote } from '@/entities/StickyNote'
import { useToggleTasks } from '@/entities/Task'
import { useToggleTimer } from '@/entities/Timer'

export const WidgetControlModal = () => {
	const { isTimerShown, setIsTimerShown } = useToggleTimer()
	const { isStickyNoteShown, setIsStickyNoteShown } = useToggleStickyNote()
	const { isTasksShown, setIsTasksShown } = useToggleTasks()
	const { isDarkModeShown, setIsDarkModeShown } = useDarkToggleStore()
	const { isFullscreenShown, setIsFullscreenShown } = useFullScreenToggleStore()
	const { isWidgetResetShown, setIsWidgetResetShown } = useToggleWidgetReset()

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
							isActive={isTasksShown}
							onClick={() => setIsTasksShown(!isTasksShown)}
							title='Трекер задач'
							icon={<ListTodo className='h-6 w-6' />}
						/>
						<WidgetButton
							isActive={isTimerShown}
							onClick={() => setIsTimerShown(!isTimerShown)}
							title='Таймер'
							icon={<Timer className='h-6 w-6' />}
						/>
						<WidgetButton
							isActive={isDarkModeShown}
							onClick={() => setIsDarkModeShown(!isDarkModeShown)}
							title='Тема'
							icon={<MdWbSunny className='h-6 w-6' />}
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

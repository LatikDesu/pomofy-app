import clsx from 'clsx'

import { toggledToastNotification } from '@/shared/lib/toast'

import { SideBarItem } from './SideBarItem'
import { useStickyNote } from '@/entities/StickyNote'

export const DraggableNavItem = ({ active, item }: { active: boolean; item: any }) => {
	const { stickyNotes } = useStickyNote()

	return (
		<div
			className={clsx(active ? '' : 'hidden', 'w-full sm:flex sm:w-auto sm:flex-grow sm:flex-col')}
		>
			<SideBarItem
				onClick={() =>
					toggledToastNotification(
						item.isToggled,
						item.setToggled,
						item.toggleString,
						750,
						item.toggleIcon
					)
				}
				toggled={item.isToggled}
				shown={item.isShown}
			>
				{item.content}
				{item.tooltipTitle === 'Заметки' && stickyNotes.length > 0 && (
					<span className='absolute right-[12px] bottom-[12px] h-[18px] w-[18px] rounded-full bg-[var(--color-default)] text-center text-xs text-[var(--text-default)] dark:bg-[var(--color-secondary)] dark:text-[var(--text-secondary)]'>
						{stickyNotes.length}
					</span>
				)}
			</SideBarItem>
		</div>
	)
}

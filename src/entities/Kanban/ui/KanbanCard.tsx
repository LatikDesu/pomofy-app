import React from 'react'

import { cn } from '@/shared/lib/utils'

import type { IKanbanTask } from '../model/types'

interface KanbanCardProps {
	task: IKanbanTask
	actionsSlot?: React.ReactNode
	isDragging?: boolean
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ task, actionsSlot, isDragging }) => {
	return (
		<div
			className={cn(
				'bg-background-default group relative mb-1 w-full rounded-lg border border-[var(--color-secondary-border)] px-3 py-2 text-xs transition-colors hover:bg-[var(--color-secondary-hover)] dark:border-[var(--color-default-hover)] dark:hover:bg-[var(--color-default-hover)]',
				isDragging && 'bg-active-default'
			)}
		>
			<div className='text-text-default break-words whitespace-normal'>{task.name}</div>
			{actionsSlot && (
				<div className='absolute right-2 bottom-[-2px] flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100'>
					{actionsSlot}
				</div>
			)}
		</div>
	)
}

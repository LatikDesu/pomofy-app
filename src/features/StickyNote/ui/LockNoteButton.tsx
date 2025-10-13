import { Lock, LockOpen } from 'lucide-react'

import { useStickyNote } from '@/entities/StickyNote'

interface LockNoteButtonProps {
	noteId: number
	isLocked: boolean
}

export function LockNoteButton({ noteId, isLocked }: LockNoteButtonProps) {
	const { updateNote } = useStickyNote()

	function handleToggleLock(e: React.MouseEvent) {
		e.stopPropagation()
		updateNote(noteId, { isLocked: !isLocked })
	}

	return (
		<button
			onClick={handleToggleLock}
			className='flex cursor-pointer items-center justify-center transition-opacity hover:opacity-70'
			title={isLocked ? 'Разблокировать' : 'Заблокировать'}
		>
			{isLocked ? (
				<Lock className='text-[var(--text-secondary)]' size={14} />
			) : (
				<LockOpen className='text-[var(--text-secondary)]' size={14} />
			)}
		</button>
	)
}

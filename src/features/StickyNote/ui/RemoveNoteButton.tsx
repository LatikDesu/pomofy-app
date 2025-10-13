import { CircleX } from 'lucide-react'

import { useStickyNote } from '@/entities/StickyNote'

interface RemoveNoteButtonProps {
	noteId: number
}

export function RemoveNoteButton({ noteId }: RemoveNoteButtonProps) {
	const { removeNote } = useStickyNote()

	function handleRemoveNote() {
		removeNote(noteId)
	}

	return (
		<CircleX
			className='cursor-pointer transition-opacity hover:opacity-70'
			size={16}
			onClick={handleRemoveNote}
		/>
	)
}


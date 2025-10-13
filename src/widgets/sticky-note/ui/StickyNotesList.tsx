import { useStickyNote, useToggleStickyNote } from '@/entities/StickyNote'
import { useGrid } from '@/shared/store'
import { DWrapper } from '@/shared/ui'

import { StickyNoteWidget } from './StickyNoteWidget'

export function StickyNotesList() {
	const { stickyNotes, setStickyNotePosition } = useStickyNote()
	const { isStickyNoteShown } = useToggleStickyNote()
	const { grid } = useGrid()

	return (
		<>
			{stickyNotes.map(note => (
				<DWrapper
					key={note.id}
					toggleHook={isStickyNoteShown}
					defaultX={note.stickyNotesPosX}
					defaultY={note.stickyNotesPosY}
					setPosition={setStickyNotePosition}
					isSticky={true}
					stickyID={note.id}
					gridValues={grid}
					handle='.handle'
				>
					<StickyNoteWidget id={note.id} text={note.text} color={note.color} />
				</DWrapper>
			))}
		</>
	)
}


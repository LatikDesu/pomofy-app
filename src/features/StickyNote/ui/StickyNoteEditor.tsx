import { useStickyNote } from '@/entities/StickyNote'

interface StickyNoteEditorProps {
	noteId: number
	text: string
	containerHeight: number
}

export function StickyNoteEditor({ noteId, text, containerHeight }: StickyNoteEditorProps) {
	const { updateNote } = useStickyNote()

	function handleTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
		updateNote(noteId, { text: event.target.value })
	}

	const editorHeight = containerHeight - 50

	return (
		<div className='cancelDrag px-[7px] pb-5' style={{ height: editorHeight }}>
			<textarea
				placeholder='Добавить заметку'
				value={text}
				onChange={handleTextChange}
				className='h-full w-full sticky-note-scrollbar resize-none text-sm'
				style={{
					border: 'none',
					backgroundColor: 'transparent',
					outline: 'none'
				}}
			/>
		</div>
	)
}


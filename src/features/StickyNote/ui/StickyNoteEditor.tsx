import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { useStickyNote } from '@/entities/StickyNote'
import { hasHtmlTags, htmlToMarkdown } from '@/features/StickyNote/lib'

interface StickyNoteEditorProps {
	noteId: number
	text: string
	containerHeight: number
}

export function StickyNoteEditor({ noteId, text, containerHeight }: StickyNoteEditorProps) {
	const { updateNote } = useStickyNote()
	const [isEditing, setIsEditing] = useState(false)

	function handleTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
		updateNote(noteId, { text: event.target.value })
	}

	function handlePaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
		const html = e.clipboardData.getData('text/html')

		if (html && html.trim()) {
			e.preventDefault()
			const markdown = htmlToMarkdown(html)
			const target = e.currentTarget
			const start = target.selectionStart
			const end = target.selectionEnd
			const newText = text.substring(0, start) + markdown + text.substring(end)
			updateNote(noteId, { text: newText })

			setTimeout(() => {
				target.setSelectionRange(start + markdown.length, start + markdown.length)
			}, 0)
		}
	}

	function handleFocus() {
		setIsEditing(true)
	}

	function handleBlur() {
		setIsEditing(false)
	}

	const editorHeight = containerHeight - 50

	// Проверяем, есть ли HTML теги в тексте
	const displayText = hasHtmlTags(text) ? htmlToMarkdown(text) : text

	return (
		<div className='cancelDrag px-[7px] pb-5' style={{ height: editorHeight }}>
			{!isEditing && text ? (
				<div
					className='h-full w-full sticky-note-scrollbar overflow-y-auto text-sm markdown-content cursor-text'
					onClick={handleFocus}
				>
					<ReactMarkdown remarkPlugins={[remarkGfm]}>{displayText}</ReactMarkdown>
				</div>
			) : (
				<textarea
					placeholder='Введите текст...'
					value={text}
					onChange={handleTextChange}
					onPaste={handlePaste}
					onFocus={handleFocus}
					onBlur={handleBlur}
					autoFocus={isEditing}
					className='h-full w-full sticky-note-scrollbar resize-none text-sm'
					style={{
						border: 'none',
						backgroundColor: 'transparent',
						outline: 'none'
					}}
				/>
			)}
		</div>
	)
}


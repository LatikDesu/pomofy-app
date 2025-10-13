import { GripIcon } from 'lucide-react'
import { useState } from 'react'

import {
	ColorSelector,
	LockNoteButton,
	RemoveNoteButton,
	StickyNoteEditor
} from '@/features/StickyNote'

import { useDragHandle } from '@/shared/ui'

import type { ColorOption } from '@/entities/StickyNote'

interface StickyNoteWidgetProps {
	id: number
	text: string
	color: ColorOption
	isLocked: boolean
}

export function StickyNoteWidget({ id, text, color, isLocked }: StickyNoteWidgetProps) {
	const dragHandleProps = useDragHandle()
	const [size, setSize] = useState({ width: 228, height: 215 })

	function handleMouseDown(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()

		const startX = e.clientX
		const startY = e.clientY
		const startWidth = size.width
		const startHeight = size.height

		function handleMouseMove(e: MouseEvent) {
			const newWidth = Math.max(180, startWidth + (e.clientX - startX))
			const newHeight = Math.max(180, startHeight + (e.clientY - startY))
			setSize({ width: newWidth, height: newHeight })
		}

		function handleMouseUp() {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
		}

		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)
	}

	return (
		<div
			className='relative rounded-md bg-[#feff9c] text-[var(--text-secondary)] shadow-md'
			style={{ backgroundColor: color, width: size.width, height: size.height }}
		>
			<div className='relative flex w-full items-center justify-end px-3 pt-2 pb-1'>
				<div className='absolute inset-0 cursor-move' {...dragHandleProps} />
				<div className='relative z-10 flex items-center gap-2'>
					<ColorSelector noteId={id} />
					<LockNoteButton noteId={id} isLocked={isLocked} />
					<RemoveNoteButton noteId={id} />
				</div>
			</div>
			<StickyNoteEditor noteId={id} text={text} containerHeight={size.height} isLocked={isLocked} />
			<div
				className='absolute right-1 bottom-1 z-20 cursor-nwse-resize'
				onMouseDown={handleMouseDown}
			>
				<GripIcon size={16} className='rotate-90 text-gray-500' />
			</div>
		</div>
	)
}

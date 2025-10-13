import { Settings2 } from 'lucide-react'

import { COLOR_OPTIONS, type ColorOption, useStickyNote } from '@/entities/StickyNote'
import { PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger } from '@/shared/ui'

interface ColorSelectorProps {
	noteId: number
}

export function ColorSelector({ noteId }: ColorSelectorProps) {
	const { updateNote } = useStickyNote()

	function handleSelectColor(selectedColor: ColorOption) {
		updateNote(noteId, { color: selectedColor })
	}

	return (
		<PopoverRoot>
			<PopoverTrigger className='!border-none hover:!bg-transparent !p-0 '>
				<Settings2 className='cursor-pointer !text-[var(--text-secondary)]' size={16} />
			</PopoverTrigger>
			<PopoverContent className='w-auto -right-4.5'>
				<PopoverBody className='!p-2'>
					<div className='flex gap-1'>
						{Object.values(COLOR_OPTIONS).map(color => (
							<div
								key={color}
								className='h-8 w-8 cursor-pointer rounded transition-opacity hover:opacity-80'
								style={{ backgroundColor: color }}
								onClick={() => handleSelectColor(color)}
							/>
						))}
					</div>
				</PopoverBody>
			</PopoverContent>
		</PopoverRoot>
	)
}


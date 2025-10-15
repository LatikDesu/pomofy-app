import { Settings2 } from 'lucide-react'

import { PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger } from '@/shared/ui'

import { COLOR_OPTIONS, type ColorOption, useStickyNote } from '@/entities/StickyNote'

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
			<PopoverTrigger className='!border-none !p-0 hover:!bg-transparent'>
				<Settings2 className='cursor-pointer !text-[var(--text-secondary)]' size={16} />
			</PopoverTrigger>
			<PopoverContent className='-right-9 w-auto'>
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

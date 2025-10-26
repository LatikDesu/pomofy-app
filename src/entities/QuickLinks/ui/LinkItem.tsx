import { Trash2 } from 'lucide-react'
import { useState } from 'react'

import { DynamicIcon } from '../lib/icon-loader'
import { type IQuickLink, useQuickLinks, useQuickLinksSettings } from '../model'

interface LinkItemProps {
	link: IQuickLink
	editSlot?: React.ReactNode
}

export function LinkItem({ link, editSlot }: LinkItemProps) {
	const { removeLink } = useQuickLinks()
	const [isHovered, setIsHovered] = useState(false)
	const { isIconOnly } = useQuickLinksSettings()

	function handleClick(e: React.MouseEvent) {
		e.preventDefault()
		window.open(link.url, '_blank', 'noopener,noreferrer')
	}

	function handleRemove(e: React.MouseEvent) {
		e.stopPropagation()
		removeLink(link.id)
	}

	return (
		<div
			className='group hover:bg-hover-default relative flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-transparent p-2 transition-all duration-200'
			onClick={handleClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<DynamicIcon iconName={link.icon} className='text-xl' size={24} />
			{!isIconOnly && (
				<span className='line-clamp-2 text-center text-xs font-medium'>{link.title}</span>
			)}
			{editSlot}
			{isHovered && (
				<button
					className='absolute top-1 right-1 rounded-md p-1 opacity-0 transition-opacity hover:opacity-100'
					onClick={handleRemove}
					aria-label='Удалить ссылку'
				>
					<Trash2 size={14} />
				</button>
			)}
		</div>
	)
}

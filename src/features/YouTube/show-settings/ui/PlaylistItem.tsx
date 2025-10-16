import { ListVideo, Radio, Trash } from 'lucide-react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

import type { YouTubePlaylist } from '@/entities/YouTube'

interface PlaylistItemProps {
	playlist: YouTubePlaylist
	isSelected: boolean
	onSelect: () => void
	onRemove: () => void
}

export function PlaylistItem({ playlist, isSelected, onSelect, onRemove }: PlaylistItemProps) {
	return (
		<div
			className={cn(
				'flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors',
				'hover:bg-[var(--color-secondary-hover)] dark:hover:bg-[var(--color-default-hover)]',
				isSelected && 'bg-[var(--color-secondary-active)] dark:bg-[var(--color-default-active)]'
			)}
			onClick={onSelect}
		>
			<div className='flex flex-1 flex-col truncate'>
				<div className='flex items-center gap-1'>
					<span className='truncate text-sm font-medium'>{playlist.name}</span>
				</div>
				<span className='text-xs opacity-60'>
					{playlist.type === 'radio' ? (
						<div className='flex items-center gap-1'>
							<Radio size={12} /> <span>Радио</span>
						</div>
					) : (
						<div className='flex items-center gap-1'>
							<ListVideo size={12} />{' '}
							<span> Плейлист из {playlist.videos.length || '...'} видео</span>
						</div>
					)}
				</span>
			</div>
			{playlist.isRemovable && (
				<Button
					type='button'
					variant='ghost'
					size='icon'
					className='h-6 w-6 flex-shrink-0'
					onClick={e => {
						e.stopPropagation()
						onRemove()
					}}
				>
					<Trash className='size-3.5' />
				</Button>
			)}
		</div>
	)
}

import { Trash } from 'lucide-react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

import type { SpotifyPlaylist } from '@/entities/Spotify'

interface PlaylistItemProps {
	playlist: SpotifyPlaylist
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
			<span className='flex-1 truncate text-sm'>{playlist.name}</span>
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
					<Trash className='size-4' />
				</Button>
			)}
		</div>
	)
}

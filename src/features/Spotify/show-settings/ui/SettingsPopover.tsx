import { ListMusic } from 'lucide-react'

import {
	PopoverBody,
	PopoverContent,
	PopoverHeader,
	PopoverRoot,
	PopoverTrigger
} from '@/shared/ui'

import { AddPlaylistForm } from './AddPlaylistForm'
import { PlaylistSelector } from './PlaylistSelector'

export function SettingsPopover() {
	return (
		<PopoverRoot>
			<PopoverTrigger className='!-mr-3 !border-none hover:!bg-transparent'>
				<ListMusic className='cursor-pointer' size={18} />
			</PopoverTrigger>
			<PopoverContent className='!top-8 !-right-8.5 w-[280px]'>
				<div className='flex items-center justify-between px-4 py-3'>
					<PopoverHeader className='!p-0 font-bold'>Настройки Spotify</PopoverHeader>
				</div>
				<PopoverBody className='space-y-3 !pt-0'>
					<hr className='border-t border-[var(--color-secondary-border)] dark:border-[var(--color-default-hover)]' />
					<PlaylistSelector />
					<hr className='border-t border-[var(--color-secondary-border)] dark:border-[var(--color-default-hover)]' />
					<AddPlaylistForm />
				</PopoverBody>
			</PopoverContent>
		</PopoverRoot>
	)
}

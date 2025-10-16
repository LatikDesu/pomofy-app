import { Repeat, Settings, Shuffle } from 'lucide-react'

import {
	PopoverBody,
	PopoverContent,
	PopoverHeader,
	PopoverRoot,
	PopoverTrigger
} from '@/shared/ui'

import { useYouTubePlayer } from '@/entities/YouTube'
import { AddVideoForm } from './AddVideoForm'
import { PlaylistSelector } from './PlaylistSelector'

export function SettingsPopover() {
	const { loop, shuffle, toggleLoop, toggleShuffle } = useYouTubePlayer()

	return (
		<PopoverRoot>
			<PopoverTrigger className='!-mr-3 !-ml-3 !border-none hover:!bg-transparent'>
				<Settings className='cursor-pointer' size={18} />
			</PopoverTrigger>
			<PopoverContent className='!top-8 w-[340px] !-right-4'>
				<div className='flex items-center justify-between px-4 py-3'>
					<PopoverHeader className='!p-0 font-bold'>Настройки YouTube</PopoverHeader>
				</div>
				<PopoverBody className='space-y-3 !pt-0'>
					<hr className='border-t border-[var(--color-secondary-border)] dark:border-[var(--color-default-hover)]' />
					<div className='space-y-2'>
						<label className='block text-xs font-medium'>Параметры воспроизведения</label>
						<div className='space-y-1'>
							<button
								onClick={toggleLoop}
								className={`flex w-full items-center gap-2 rounded-lg p-2 text-sm transition-colors ${loop
									? 'bg-[var(--color-secondary-active)] dark:bg-[var(--color-default-active)]'
									: 'hover:bg-[var(--color-secondary-hover)] dark:hover:bg-[var(--color-default-hover)]'
									}`}
							>
								<Repeat className='h-4 w-4' />
								<span>Повторять видео</span>
							</button>
							<button
								onClick={toggleShuffle}
								className={`flex w-full items-center gap-2 rounded-lg p-2 text-sm transition-colors ${shuffle
									? 'bg-[var(--color-secondary-active)] dark:bg-[var(--color-default-active)]'
									: 'hover:bg-[var(--color-secondary-hover)] dark:hover:bg-[var(--color-default-hover)]'
									}`}
							>
								<Shuffle className='h-4 w-4' />
								<span>Случайный порядок</span>
							</button>
						</div>
					</div>

					<hr className='border-t border-[var(--color-secondary-border)] dark:border-[var(--color-default-hover)]' />
					<PlaylistSelector />
					<hr className='border-t border-[var(--color-secondary-border)] dark:border-[var(--color-default-hover)]' />
					<AddVideoForm />
				</PopoverBody>
			</PopoverContent>
		</PopoverRoot>
	)
}

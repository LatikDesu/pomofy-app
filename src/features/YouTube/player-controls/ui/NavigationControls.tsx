import { IoPlay } from 'react-icons/io5'
import { MdPause } from 'react-icons/md'

import { ArrowNext, ArrowSkip } from '@/shared/icons'

import { useYouTubePlayer } from '@/entities/YouTube'

interface NavigationControlsProps {
	onPrev: () => void
	onNext: () => void
}

export function NavigationControls({ onPrev, onNext }: NavigationControlsProps) {
	const { playing, togglePlaying } = useYouTubePlayer()
	return (
		<div className='flex items-center gap-2'>
			<button
				onClick={onPrev}
				className='flex h-8 w-8 items-center justify-center rounded-full transition-all hover:bg-[var(--color-secondary-hover)] dark:hover:bg-[var(--color-default-hover)]'
				aria-label='Previous video'
			>
				<ArrowSkip className='h-5 w-5' />
			</button>
			<button
				onClick={togglePlaying}
				className='flex h-12 w-12 items-center justify-center rounded-full transition-all hover:bg-[var(--color-secondary-hover)] dark:hover:bg-[var(--color-default-hover)]'
				aria-label={playing ? 'Pause' : 'Play'}
			>
				{playing ? <MdPause className='h-8 w-8' /> : <IoPlay className='ml-0.5 h-8 w-8' />}
			</button>
			<button
				onClick={onNext}
				className='flex h-8 w-8 items-center justify-center rounded-full transition-all hover:bg-[var(--color-secondary-hover)] dark:hover:bg-[var(--color-default-hover)]'
				aria-label='Next video'
			>
				<ArrowNext className='h-5 w-5' />
			</button>
		</div>
	)
}

import { useState } from 'react'

import { VolumeFull, VolumeMute } from '@/shared/icons'
import { Slider } from '@/shared/ui/Slider'

import { useYouTubePlayer } from '@/entities/YouTube'

export function VolumeControl() {
	const { volume, muted, setVolume } = useYouTubePlayer()
	const [isOpen, setIsOpen] = useState(false)

	const handleVolumeChange = (value: number[]) => {
		setVolume(value[0])
	}

	return (
		<div className='relative flex items-center gap-2'>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className='flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-default-disabled)] transition-all hover:bg-[var(--color-secondary-hover)] dark:hover:bg-[var(--color-default-hover)]'
				aria-label='Volume control'
			>
				{muted || volume === 0 ? (
					<VolumeMute className='h-5 w-5' />
				) : (
					<VolumeFull className='h-5 w-5' />
				)}
			</button>

			{isOpen && (
				<>
					<div className='fixed inset-0 z-10' onClick={() => setIsOpen(false)} aria-hidden='true' />
					<div className='absolute bottom-full left-1/2 z-20 h-24 -translate-x-1/2 rounded-lg border border-[var(--color-secondary-border)] bg-[var(--color-secondary)] p-3 dark:border-[var(--color-default-hover)] dark:bg-[var(--color-default)]'>
						<Slider
							orientation='vertical'
							value={[muted ? 0 : volume]}
							min={0}
							max={1}
							step={0.01}
							onValueChange={handleVolumeChange}
							className='cursor-pointer'
							classNames={{
								track: 'w-1.5'
							}}
						/>
					</div>
				</>
			)}
		</div>
	)
}

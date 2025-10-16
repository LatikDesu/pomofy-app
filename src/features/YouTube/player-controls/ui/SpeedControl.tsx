import { CircleGauge } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/shared/lib/utils'

import { useYouTubePlayer } from '@/entities/YouTube'

const PLAYBACK_RATES = [0.75, 1, 1.25, 1.5, 1.75]

export function SpeedControl() {
	const { playbackRate, setPlaybackRate } = useYouTubePlayer()
	const [isOpen, setIsOpen] = useState(false)

	const handleRateSelect = (rate: number) => {
		setPlaybackRate(rate)
		setIsOpen(false)
	}

	return (
		<div className='relative'>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={cn(
					'flex h-8 min-w-8 items-center gap-1 rounded-full p-2 text-xs text-[var(--color-default-disabled)] transition-all hover:bg-[var(--color-secondary-hover)] dark:hover:bg-[var(--color-default-hover)]',
					playbackRate !== 1
						? 'bg-[var(--color-secondary-active)] dark:bg-[var(--color-default-active)]'
						: ''
				)}
				aria-label='Playback speed'
			>
				{/* {playbackRate === 1 ? '' : <span>{playbackRate}x</span>} */}
				<CircleGauge className='h-4.5 w-4.5' />
			</button>

			{isOpen && (
				<>
					<div className='fixed inset-0 z-10' onClick={() => setIsOpen(false)} aria-hidden='true' />
					<div className='absolute right-0 bottom-full z-20 w-20 rounded-lg border border-[var(--color-secondary-border)] bg-[var(--color-secondary)] dark:border-[var(--color-default-hover)] dark:bg-[var(--color-default)]'>
						{PLAYBACK_RATES.map(rate => (
							<button
								key={rate}
								onClick={() => handleRateSelect(rate)}
								className={`w-full rounded px-2 py-1 text-xs transition-colors ${
									rate === playbackRate
										? 'bg-[var(--color-secondary-active)] dark:bg-[var(--color-default-active)]'
										: 'hover:bg-[var(--color-secondary-hover)] dark:hover:bg-[var(--color-default-hover)]'
								}`}
							>
								{rate}x
							</button>
						))}
					</div>
				</>
			)}
		</div>
	)
}

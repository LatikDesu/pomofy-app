import { useState } from 'react'

import { SeekSlider } from '@/features/YouTube'

import { YouTubeControls } from './YouTubeControls'
import { YouTubePlayer } from './YouTubePlayer'
import { YouTubeResizeHandle } from './YouTubeResizeHandle'
import { YouTubeUnavailablePlaceholder } from './YouTubeUnavailablePlaceholder'
import type { YouTubeVideo } from '@/entities/YouTube'
import { useYouTubePlayer } from '@/entities/YouTube'

interface YouTubeFullPlayerProps {
	currentVideo: YouTubeVideo | null
	videoUrl?: string
	isYouTubeAvailable: boolean
	isChecking: boolean
	size: { width: number; height: number }
	onRetry: () => void
	onPrev: () => void
	onNext: () => void
	onSeek: (seconds: number) => void
	onEnded: () => void
	onError: (error: any) => void
	onSeekUpdate: (playerRef: React.RefObject<HTMLVideoElement>) => void
	onMouseDown: (e: React.MouseEvent) => void
}

export function YouTubeFullPlayer({
	currentVideo,
	videoUrl,
	isYouTubeAvailable,
	isChecking,
	size,
	onRetry,
	onPrev,
	onNext,
	onSeek,
	onEnded,
	onError,
	onSeekUpdate,
	onMouseDown
}: YouTubeFullPlayerProps) {
	const [isHovered, setIsHovered] = useState(false)
	const { playing, setPlaying } = useYouTubePlayer()

	return (
		<div className='cancelDrag relative rounded-lg p-2 pt-0'>
			{currentVideo ? (
				isChecking || !isYouTubeAvailable ? (
					<div style={{ height: `${size.height}px` }}>
						<YouTubeUnavailablePlaceholder onRetry={onRetry} isChecking={isChecking} />
					</div>
				) : (
					<div
						className='relative overflow-hidden rounded-lg'
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
					>
						<YouTubePlayer
							videoUrl={videoUrl}
							onEnded={onEnded}
							onError={onError}
							onSeekUpdate={onSeekUpdate}
							style={{ width: '100%', height: `${size.height}px` }}
						>
							{/* Overlay для блокировки кликов по видео */}
							<div
								className='absolute inset-0 cursor-pointer'
								onClick={() => setPlaying(!playing)}
								style={{ pointerEvents: 'auto' }}
							/>
							{isHovered && currentVideo?.duration && <SeekSlider onSeek={onSeek} />}
						</YouTubePlayer>
					</div>
				)
			) : (
				<div
					className='flex items-center justify-center rounded-lg bg-white/5'
					style={{ height: `${size.height}px` }}
				>
					<p className='text-sm opacity-60'>Добавьте видео в плейлист</p>
				</div>
			)}

			<div className='px-2 pt-2'>
				<YouTubeControls
					onPrev={onPrev}
					onNext={onNext}
					showTimeDisplay={!!currentVideo?.duration}
				/>
			</div>

			<YouTubeResizeHandle onMouseDown={onMouseDown} />
		</div>
	)
}

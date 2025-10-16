import { Music } from 'lucide-react'

import { SeekSlider } from '@/features/YouTube'

import { YouTubeControls } from './YouTubeControls'
import { YouTubePlayer } from './YouTubePlayer'
import { YouTubeUnavailablePlaceholder } from './YouTubeUnavailablePlaceholder'
import type { YouTubeVideo } from '@/entities/YouTube'

interface YouTubeMiniPlayerProps {
	currentVideo: YouTubeVideo | null
	videoUrl?: string
	isYouTubeAvailable: boolean
	isChecking: boolean
	onRetry: () => void
	onPrev: () => void
	onNext: () => void
	onSeek: (seconds: number) => void
	onEnded: () => void
	onError: (error: any) => void
	onSeekUpdate: (playerRef: React.RefObject<HTMLVideoElement>) => void
}

export function YouTubeMiniPlayer({
	currentVideo,
	videoUrl,
	isYouTubeAvailable,
	isChecking,
	onRetry,
	onPrev,
	onNext,
	onSeek,
	onEnded,
	onError,
	onSeekUpdate
}: YouTubeMiniPlayerProps) {
	return (
		<div className='px-2 pt-0 pb-2'>
			{isChecking || !isYouTubeAvailable ? (
				<YouTubeUnavailablePlaceholder onRetry={onRetry} isChecking={isChecking} isMiniMode />
			) : (
				<div className='relative px-2'>
					<div className='flex items-center gap-2 pb-1'>
						<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-red-600 text-white'>
							<Music className='h-6 w-6' />
						</div>
						<div className='flex-1 overflow-hidden'>
							<h3 className='truncate text-sm font-medium'>
								{currentVideo?.title || 'Видео не выбрано'}
							</h3>
						</div>
					</div>

					<YouTubeControls
						onPrev={onPrev}
						onNext={onNext}
						showTimeDisplay={!!currentVideo?.duration}
					/>

					{currentVideo?.duration && <SeekSlider onSeek={onSeek} isAbsolute={false} />}
				</div>
			)}

			{/* Скрытый плеер для воспроизведения */}
			{currentVideo && isYouTubeAvailable && (
				<div style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}>
					<YouTubePlayer
						videoUrl={videoUrl}
						onEnded={onEnded}
						onError={onError}
						onSeekUpdate={onSeekUpdate}
						style={{ width: '0', height: '0' }}
					/>
				</div>
			)}
		</div>
	)
}

import { Minimize } from 'lucide-react'
import { useCallback, useRef } from 'react'

import { SearchVideoDialog, SettingsPopover } from '@/features/YouTube'

import { CloseWidgetButton, WidgetWrapper } from '@/shared/ui'

import {
	useYouTubeAvailabilityCheck,
	useYouTubeKeyboardControls,
	useYouTubeNavigation,
	useYouTubeResize
} from '../lib'

import { YouTubeFullPlayer } from './YouTubeFullPlayer'
import { YouTubeMiniPlayer } from './YouTubeMiniPlayer'
import {
	useDynamicPlaylist,
	useYouTubeMusic,
	useYouTubePlayer,
	useYouTubePlaylists
} from '@/entities/YouTube'

export function YouTubeWidget() {
	const { setIsYouTubeToggled } = useYouTubeMusic()
	const { getCurrentVideo } = useYouTubePlaylists()
	const { isMiniMode, loop, toggleMiniMode } = useYouTubePlayer()

	// Загружаем видео для динамических плейлистов
	useDynamicPlaylist()

	// Хуки для функциональности
	const { isYouTubeAvailable, isChecking, checkYouTubeAvailability } = useYouTubeAvailabilityCheck()
	const { size, handleMouseDown } = useYouTubeResize()
	const { handleNext, handlePrev, handleEnded } = useYouTubeNavigation()

	const playerRef = useRef<HTMLVideoElement | null>(null)

	const currentVideo = getCurrentVideo() ?? null
	const videoUrl = currentVideo ? `https://www.youtube.com/watch?v=${currentVideo.id}` : undefined

	const handleSeek = useCallback((seconds: number) => {
		if (playerRef.current) {
			playerRef.current.currentTime = seconds
		}
	}, [])

	const handleSeekUpdate = useCallback((ref: React.RefObject<HTMLVideoElement>) => {
		if (ref.current) {
			playerRef.current = ref.current
		}
	}, [])

	const handleError = useCallback((error: any) => {
		console.error('YouTube Player error:', error)
	}, [])

	const onEnded = useCallback(() => {
		handleEnded(loop)
	}, [handleEnded, loop])

	// Клавиатурные хоткеи
	useYouTubeKeyboardControls(handleSeek)

	const leftActions = !isMiniMode ? <SearchVideoDialog /> : <></>

	const actions = (
		<>
			<Minimize
				className='cursor-pointer text-[var(--text-secondary)] dark:text-[var(--text-default)]'
				size={18}
				onClick={toggleMiniMode}
			/>
			<SettingsPopover />
			<CloseWidgetButton
				onClick={() => {
					setIsYouTubeToggled(false)
				}}
			/>
		</>
	)

	if (isMiniMode) {
		return (
			<WidgetWrapper className='!w-80' actions={actions} leftActions={leftActions}>
				<YouTubeMiniPlayer
					currentVideo={currentVideo}
					videoUrl={videoUrl}
					isYouTubeAvailable={isYouTubeAvailable}
					isChecking={isChecking}
					onRetry={checkYouTubeAvailability}
					onPrev={handlePrev}
					onNext={handleNext}
					onSeek={handleSeek}
					onEnded={onEnded}
					onError={handleError}
					onSeekUpdate={handleSeekUpdate}
				/>
			</WidgetWrapper>
		)
	}

	return (
		<WidgetWrapper
			className='!w-auto'
			style={{ width: `${size.width}px` }}
			actions={actions}
			leftActions={leftActions}
		>
			<YouTubeFullPlayer
				currentVideo={currentVideo}
				videoUrl={videoUrl}
				isYouTubeAvailable={isYouTubeAvailable}
				isChecking={isChecking}
				size={size}
				onRetry={checkYouTubeAvailability}
				onPrev={handlePrev}
				onNext={handleNext}
				onSeek={handleSeek}
				onEnded={onEnded}
				onError={handleError}
				onSeekUpdate={handleSeekUpdate}
				onMouseDown={handleMouseDown}
			/>
		</WidgetWrapper>
	)
}

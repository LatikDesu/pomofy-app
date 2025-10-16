// @ts-nocheck
import { useCallback, useRef } from 'react'
import ReactPlayer from 'react-player'

import { useYouTubePlayer } from '@/entities/YouTube'

interface YouTubePlayerProps {
	videoUrl?: string
	onEnded: () => void
	onError: (error: any) => void
	onSeekUpdate: (playerRef: React.RefObject<HTMLVideoElement>) => void
	style?: React.CSSProperties
	controls?: boolean
	children?: React.ReactNode
}

export function YouTubePlayer({
	videoUrl,
	onEnded,
	onError,
	onSeekUpdate,
	style,
	controls = false,
	children
}: YouTubePlayerProps) {
	const { playing, volume, muted, playbackRate, loop, setPlaying, setPlayed, setDuration } =
		useYouTubePlayer()

	const playerRef = useRef<HTMLVideoElement | null>(null)

	const handleTimeUpdate = useCallback(() => {
		const player = playerRef.current
		if (!player || !player.duration) return
		setPlayed(player.currentTime / player.duration)
	}, [setPlayed])

	const handleDurationChange = useCallback(() => {
		const player = playerRef.current
		if (!player) return
		setDuration(player.duration)
	}, [setDuration])

	const handleReady = useCallback(() => {
		// Player ready
		if (playerRef.current) {
			onSeekUpdate(playerRef)
		}
	}, [onSeekUpdate])

	const handlePlay = useCallback(() => {
		setPlaying(true)
	}, [setPlaying])

	const handlePause = useCallback(() => {
		setPlaying(false)
	}, [setPlaying])

	const setPlayerRefCallback = useCallback((player: HTMLVideoElement) => {
		if (!player) return
		playerRef.current = player
	}, [])

	return (
		<>
			<ReactPlayer
				ref={setPlayerRefCallback}
				src={videoUrl}
				playing={playing}
				volume={volume}
				muted={muted}
				loop={loop}
				playbackRate={playbackRate}
				style={style}
				controls={controls}
				onReady={handleReady}
				onPlay={handlePlay}
				onPause={handlePause}
				onTimeUpdate={handleTimeUpdate}
				onDurationChange={handleDurationChange}
				onEnded={onEnded}
				onError={onError}
				config={{
					youtube: {
						playerVars: {
							modestbranding: 1,
							rel: 0,
							fs: 0,
							iv_load_policy: 3,
							disablekb: 1
						}
					}
				}}
			/>
			{children}
		</>
	)
}

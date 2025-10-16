import { useYouTubePlayer } from '@/entities/YouTube'

export function TimeDisplay() {
	const { played, duration } = useYouTubePlayer()

	const formatTime = (seconds: number): string => {
		if (!seconds || isNaN(seconds)) return '0:00'
		const mins = Math.floor(seconds / 60)
		const secs = Math.floor(seconds % 60)
		return `${mins}:${secs.toString().padStart(2, '0')}`
	}

	const currentTime = played * duration

	return (
		<div className='flex items-center gap-1 text-xs text-[var(--color-default-disabled)]'>
			<span>{formatTime(currentTime)}</span>
			<span>/</span>
			<span>{formatTime(duration)}</span>
		</div>
	)
}

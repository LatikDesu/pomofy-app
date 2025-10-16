import { NavigationControls, SpeedControl, TimeDisplay, VolumeControl } from '@/features/YouTube'

interface YouTubeControlsProps {
	onPrev: () => void
	onNext: () => void
	showTimeDisplay: boolean
}

export function YouTubeControls({ onPrev, onNext, showTimeDisplay }: YouTubeControlsProps) {
	return (
		<div className='flex items-center justify-between gap-4'>
			<div className='flex items-center gap-3'>
				<NavigationControls onPrev={onPrev} onNext={onNext} />
				{showTimeDisplay && <TimeDisplay />}
			</div>
			<div className='flex items-center'>
				<SpeedControl />
				<VolumeControl />
			</div>
		</div>
	)
}

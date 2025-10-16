import { cn } from '@/shared/lib/utils'
import { Slider } from '@/shared/ui/Slider'

import { useYouTubePlayer } from '@/entities/YouTube'

interface SeekSliderProps {
	onSeek: (seconds: number) => void
	isAbsolute?: boolean
}

export function SeekSlider({ onSeek, isAbsolute = true }: SeekSliderProps) {
	const { played, duration } = useYouTubePlayer()

	const handleSeek = (value: number[]) => {
		const seekTo = duration * value[0]
		onSeek(seekTo)
	}

	return (
		<div className={cn('w-full', isAbsolute && 'absolute bottom-2 left-0 px-2')}>
			<Slider
				value={[played]}
				min={0}
				max={1}
				step={0.001}
				onValueChange={handleSeek}
				className='w-full cursor-pointer py-2'
				classNames={{
					track: 'h-1',
					thumb: 'size-3 border'
				}}
			/>
		</div>
	)
}

import { Slider } from '@/shared/ui'

import { useAudioVolume } from '@/entities/Timer'

export const VolumeControl = () => {
	const { audioVolume, setAudioVolume } = useAudioVolume()

	return (
		<div className='space-y-2.5'>
			<label className='flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] dark:text-[var(--text-default)]'>
				Громкость сигнала
			</label>
			<Slider
				value={[audioVolume]}
				onValueChange={([value]) => setAudioVolume(value)}
				min={0}
				max={1}
				step={0.1}
				className='pb-1'
				classNames={{
					track: 'h-1.5'
				}}
			/>
		</div>
	)
}

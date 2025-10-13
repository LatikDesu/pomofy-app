import { BsBellFill, BsMusicPlayerFill } from 'react-icons/bs'
import { CgPiano } from 'react-icons/cg'
import { GiPanFlute } from 'react-icons/gi'

import { cn } from '@/shared/lib/utils'

import { useAlarm, useAudioVolume } from '@/entities/Timer'

const ALARM_OPTIONS = [
	{
		id: 'arcade',
		name: 'Retro',
		path: '/src/shared/assets/music/arcade.wav',
		icon: BsMusicPlayerFill
	},
	{ id: 'bells', name: 'Bells', path: '/src/shared/assets/music/bells.wav', icon: BsBellFill },
	{ id: 'flute', name: 'Flute', path: '/src/shared/assets/music/flute.wav', icon: GiPanFlute },
	{ id: 'piano', name: 'Piano', path: '/src/shared/assets/music/piano.wav', icon: CgPiano }
] as const

export const AlarmSelector = () => {
	const { alarm, setAlarm } = useAlarm()
	const { audioVolume } = useAudioVolume()

	const handleAlarmChange = (alarmPath: string) => {
		const audioRef = new Audio(alarmPath)
		audioRef.volume = audioVolume
		audioRef.play()
		setAlarm(alarmPath)
	}

	return (
		<div className='space-y-1.5'>
			<label className='block text-xs font-medium'>Звуковой сигнал</label>
			<div className='flex items-center justify-between gap-1.5'>
				{ALARM_OPTIONS.map(option => {
					const Icon = option.icon
					return (
						<div key={option.id} className='flex flex-1 flex-col items-center gap-0.5 pb-1'>
							<div className='text-[10px]'>{option.name}</div>
							<button
								type='button'
								className={cn(
									'flex h-8 w-full items-center justify-center rounded-lg bg-[var(--color-secondary)] ring-1 ring-[var(--color-secondary-border)] transition-colors hover:bg-[var(--color-secondary-hover)] dark:bg-[var(--color-default)] dark:ring-[var(--color-default-hover)] dark:hover:bg-[var(--color-default-hover)]',
									alarm === option.path &&
										'bg-[var(--color-secondary-active)] dark:bg-[var(--color-default-active)]'
								)}
								onClick={() => handleAlarmChange(option.path)}
							>
								<Icon className='size-4' />
							</button>
						</div>
					)
				})}
			</div>
		</div>
	)
}

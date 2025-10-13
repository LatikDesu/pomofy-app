import { Settings } from 'lucide-react'

import {
	PopoverBody,
	PopoverContent,
	PopoverHeader,
	PopoverRoot,
	PopoverTrigger
} from '@/shared/ui'

import { AlarmSelector } from './AlarmSelector'
import { ResetSettingsButton } from './ResetSettingsButton'
import { TimeSettingsControl } from './TimeSettingsControl'
import { VolumeControl } from './VolumeControl'

export const SettingsPopover = () => {
	return (
		<PopoverRoot>
			<PopoverTrigger className='!-mr-3 !border-none hover:!bg-transparent'>
				<Settings className='cursor-pointer' size={18} />
			</PopoverTrigger>
			<PopoverContent className='!-right-6.5 h-auto w-[360px]'>
				<div className='flex items-center justify-between px-4 py-3'>
					<PopoverHeader className='!p-0 font-bold'>Настройки Таймера</PopoverHeader>
				</div>
				<PopoverBody className='space-y-3 !pt-0'>
					<hr className='border-t border-[var(--color-secondary-border)] dark:border-[var(--color-default-hover)]' />
					<TimeSettingsControl />
					<hr className='border-t border-[var(--color-secondary-border)] dark:border-[var(--color-default-hover)]' />
					<VolumeControl />
					<hr className='border-t border-[var(--color-secondary-border)] dark:border-[var(--color-default-hover)]' />
					<AlarmSelector />
					<hr className='border-t border-[var(--color-secondary-border)] dark:border-[var(--color-default-hover)]' />
					<ResetSettingsButton />
				</PopoverBody>
			</PopoverContent>
		</PopoverRoot>
	)
}

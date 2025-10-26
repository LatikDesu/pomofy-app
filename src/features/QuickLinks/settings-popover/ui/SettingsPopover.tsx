import { Settings } from 'lucide-react'

import {
	PopoverBody,
	PopoverContent,
	PopoverHeader,
	PopoverRoot,
	PopoverTrigger
} from '@/shared/ui'

import { AddGroupForm } from './AddGroupForm'
import { ToggleGroupingButton } from './ToggleGroupingButton'
import { ToggleOnlyIconsButton } from './ToggleOnlyIconsButton'
import { useQuickLinksSettings } from '@/entities/QuickLinks'

export function SettingsPopover() {
	const { isGroupingEnabled } = useQuickLinksSettings()

	return (
		<PopoverRoot>
			<PopoverTrigger className='!-mx-3 !border-none hover:!bg-transparent'>
				<Settings className='cursor-pointer' size={18} />
			</PopoverTrigger>
			<PopoverContent className='!-right-6.5 h-auto w-[280px]'>
				<div className='flex items-center justify-between px-4 py-3'>
					<PopoverHeader className='!p-0 font-bold'>Настройки</PopoverHeader>
				</div>
				<PopoverBody className='space-y-3 !pt-0'>
					<hr className='border-t border-[var(--color-secondary-border)] dark:border-[var(--color-default-hover)]' />
					<ToggleGroupingButton />
					<ToggleOnlyIconsButton />
					{isGroupingEnabled && (
						<>
							<hr className='border-t border-[var(--color-secondary-border)] dark:border-[var(--color-default-hover)]' />
							<AddGroupForm />
						</>
					)}
				</PopoverBody>
			</PopoverContent>
		</PopoverRoot>
	)
}

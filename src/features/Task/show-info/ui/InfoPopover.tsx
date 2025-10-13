import { Info } from 'lucide-react'

import {
	PopoverBody,
	PopoverContent,
	PopoverHeader,
	PopoverRoot,
	PopoverTrigger
} from '@/shared/ui'

export const InfoPopover = () => {
	return (
		<PopoverRoot>
			<PopoverTrigger className='!-mr-3 !border-none hover:!bg-transparent'>
				<Info className='cursor-pointer' size={18} />
			</PopoverTrigger>
			<PopoverContent className='h-auto w-[320px]'>
				<div className='flex items-center justify-between px-4 py-3'>
					<PopoverHeader className='!p-0 font-bold'>Трекер Задач</PopoverHeader>
				</div>
				<PopoverBody className='space-y-2 !pt-0'>
					<hr className='border-t border-[var(--color-secondary-border)] dark:border-[var(--color-default-hover)]' />
					<p className='text-sm text-[var(--text-secondary)] dark:text-[var(--text-default)]'>
						Щелкните правой кнопкой мыши над любой задачей, чтобы отслеживать, завершать или удалять
						задачу.
					</p>
				</PopoverBody>
			</PopoverContent>
		</PopoverRoot>
	)
}

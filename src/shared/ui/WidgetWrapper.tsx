import type { ReactNode } from 'react'

import { useDragHandle } from '@/shared/ui'

interface WidgetWrapperProps {
	children: ReactNode
	actions?: ReactNode
	className?: string
}

export function WidgetWrapper({ children, actions, className = '' }: WidgetWrapperProps) {
	const dragHandleProps = useDragHandle()

	return (
		<div
			className={`mb-2 w-72 rounded-lg bg-[var(--color-secondary)]/[.96] shadow-md sm:w-96 dark:bg-[var(--color-default)]/[.96] ${className}text-[var(--text-secondary)] dark:text-[var(--text-default)]`}
		>
			<div className='relative flex w-full items-center justify-end px-3 pt-1'>
				<div className='absolute inset-0 cursor-move' {...dragHandleProps} />
				<div className='relative z-10 flex items-center gap-2'>{actions}</div>
			</div>
			{children}
		</div>
	)
}

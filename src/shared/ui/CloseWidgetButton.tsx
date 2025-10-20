import { CircleX } from 'lucide-react'

import { cn } from '../lib/utils'

interface CloseWidgetButtonProps {
	onClick: () => void
	className?: string
}

export const CloseWidgetButton = ({ onClick, className }: CloseWidgetButtonProps) => {
	return (
		<CircleX
			className={cn(
				'cursor-pointer text-[var(--text-secondary)] dark:text-[var(--text-default)]',
				className
			)}
			size={18}
			onClick={() => onClick()}
		/>
	)
}

import { CircleX } from 'lucide-react'

interface CloseWidgetButtonProps {
	onClick: () => void
}

export const CloseWidgetButton = ({ onClick }: CloseWidgetButtonProps) => {
	return (
		<CircleX
			className='cursor-pointer text-[var(--text-secondary)] dark:text-[var(--text-default)]'
			size={18}
			onClick={() => onClick()}
		/>
	)
}

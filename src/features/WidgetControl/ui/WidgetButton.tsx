import { type ReactNode } from 'react'

interface WidgetButtonProps {
	isActive: boolean
	onClick: () => void
	title: string
	icon: ReactNode
}

export const WidgetButton = ({ isActive, onClick, title, icon }: WidgetButtonProps) => {
	return (
		<div
			onClick={onClick}
			className={`flex w-full flex-col items-center justify-center gap-2 rounded-lg bg-[var(--color-secondary)] p-3 ring-1 ring-[var(--color-secondary-border)] transition-colors hover:bg-[var(--color-secondary-hover)] dark:bg-[var(--color-default)] dark:ring-[var(--color-default-hover)] dark:hover:bg-[var(--color-default-hover)] ${
				isActive ? 'bg-[var(--color-secondary-active)] dark:bg-[var(--color-default-active)]' : ''
			}`}
		>
			<span className='text-sm font-medium'>{title}</span>
			{icon}
		</div>
	)
}

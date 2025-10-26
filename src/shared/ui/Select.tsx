import React from 'react'

import { cn } from '../lib/utils'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	children: React.ReactNode
}

export function Select({ className, children, ...props }: SelectProps) {
	return (
		<div className='text-text-default relative'>
			<select
				className={cn(
					'w-full appearance-none rounded-lg border border-[var(--color-secondary-border)] bg-[var(--color-secondary)] py-2 pr-8 pl-2 text-sm focus:ring-2 focus:ring-[var(--color-secondary-active)] focus:outline-none dark:border-[var(--color-default-hover)] dark:bg-[var(--color-default)] dark:focus:ring-[var(--color-default-active)]',
					className
				)}
				{...props}
			>
				{children}
			</select>
			<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
				<svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
					<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
				</svg>
			</div>
		</div>
	)
}

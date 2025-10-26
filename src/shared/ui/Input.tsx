import { cn } from '../lib/utils'

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			className={cn(
				'focus:ring-active-default w-full rounded-lg border border-[var(--color-border-default)] bg-transparent px-2 py-2 text-sm focus:ring-2 focus:outline-none dark:border-[var(--color-default-hover)] dark:text-[var(--text-default)] dark:focus:ring-[var(--color-default-active)]',
				className
			)}
			{...props}
		/>
	)
}

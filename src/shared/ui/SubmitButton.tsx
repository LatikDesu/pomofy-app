import { type ComponentProps } from 'react'

export function SubmitButton({ children, className, ...props }: ComponentProps<'button'>) {
	const baseClasses =
		'relative flex h-8 shrink-0 scale-100 appearance-none items-center justify-center rounded-lg border border-[var(--color-secondary-border)] bg-transparent px-2 text-sm text-[var(--text-secondary)] transition-colors select-none hover:bg-[var(--color-secondary-hover)] hover:text-[var(--text-secondary)] focus-visible:ring-2 active:scale-[0.98] dark:border-[var(--color-default-hover)] dark:text-[var(--text-default)] dark:hover:bg-[var(--color-default-hover)] dark:hover:text-[var(--text-default)]'

	return (
		<button type='submit' className={`${baseClasses} ${className || ''}`.trim()} {...props}>
			{children || 'Сохранить'}
		</button>
	)
}

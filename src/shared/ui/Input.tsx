import { cn } from '../lib/utils'

export function Input({
	as = 'input',
	className,
	...props
}: (
	| React.InputHTMLAttributes<HTMLInputElement>
	| React.TextareaHTMLAttributes<HTMLTextAreaElement>
) & {
	as?: 'input' | 'textarea'
}) {
	const baseClasses = cn(
		'focus:ring-active-default w-full rounded-lg border border-[var(--color-border-default)] bg-transparent px-2 py-2 text-sm focus:ring-2 focus:outline-none dark:border-[var(--color-default-hover)] dark:text-[var(--text-default)] dark:focus:ring-[var(--color-default-active)]',
		className
	)

	if (as === 'textarea') {
		const textareaProps = props as React.TextareaHTMLAttributes<HTMLTextAreaElement>
		return <textarea className={cn(baseClasses, 'resize-none')} {...textareaProps} />
	}

	const inputProps = props as React.InputHTMLAttributes<HTMLInputElement>
	return <input className={baseClasses} {...inputProps} />
}

import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { X } from 'lucide-react'
import React, { createContext, useContext, useEffect, useId, useRef, useState } from 'react'

import { cn } from '@/shared/lib/utils'

const TRANSITION = {
	type: 'spring' as const,
	bounce: 0.05,
	duration: 0.3
}

function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				handler()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [ref, handler])
}

interface PopoverContextType {
	isOpen: boolean
	openPopover: () => void
	closePopover: () => void
	uniqueId: string
	note: string
	setNote: (note: string) => void
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined)

function usePopover() {
	const context = useContext(PopoverContext)
	if (!context) {
		throw new Error('usePopover must be used within a PopoverProvider')
	}
	return context
}

function usePopoverLogic() {
	const uniqueId = useId()
	const [isOpen, setIsOpen] = useState(false)
	const [note, setNote] = useState('')

	const openPopover = () => setIsOpen(true)
	const closePopover = () => {
		setIsOpen(false)
		setNote('')
	}

	return { isOpen, openPopover, closePopover, uniqueId, note, setNote }
}

interface PopoverRootProps {
	children: React.ReactNode
	className?: string
}

export function PopoverRoot({ children, className }: PopoverRootProps) {
	const popoverLogic = usePopoverLogic()

	return (
		<PopoverContext.Provider value={popoverLogic}>
			<MotionConfig transition={TRANSITION}>
				<div className={cn('relative flex items-center justify-center', className)}>{children}</div>
			</MotionConfig>
		</PopoverContext.Provider>
	)
}

interface PopoverTriggerProps {
	children: React.ReactNode
	className?: string
}

export function PopoverTrigger({ children, className }: PopoverTriggerProps) {
	const { openPopover } = usePopover()

	return (
		<button
			type='button'
			className={cn(
				'flex h-9 items-center border border-[var(--color-secondary-border)] bg-transparent px-3 text-[var(--text-secondary)] transition-colors hover:bg-[var(--color-secondary-hover)] dark:border-[var(--color-default-border)] dark:bg-transparent dark:text-[var(--text-default)] dark:hover:bg-[var(--color-default-hover)]',
				className
			)}
			style={{
				borderRadius: 8
			}}
			onClick={openPopover}
		>
			<span className='text-sm'>{children}</span>
		</button>
	)
}

interface PopoverContentProps {
	children: React.ReactNode
	className?: string
}

export function PopoverContent({ children, className }: PopoverContentProps) {
	const { isOpen, closePopover } = usePopover()
	const formContainerRef = useRef<HTMLDivElement>(null)

	useClickOutside(formContainerRef, closePopover)

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				closePopover()
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [closePopover])

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					ref={formContainerRef}
					initial={{ opacity: 0, scale: 0.95, y: 0 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.95, y: 0 }}
					transition={{ duration: 0.15, ease: 'easeOut' }}
					className={cn(
						'absolute top-full right-0 z-50 mt-1 overflow-hidden border border-[var(--color-secondary-border)] bg-[var(--color-secondary)] outline-none dark:border-[var(--color-default-hover)] dark:bg-[var(--color-default)]',
						className
					)}
					style={{
						borderRadius: 12
					}}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	)
}

interface PopoverFormProps {
	children: React.ReactNode
	onSubmit?: (note: string) => void
	className?: string
}

export function PopoverForm({ children, onSubmit, className }: PopoverFormProps) {
	const { note, closePopover } = usePopover()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onSubmit?.(note)
		closePopover()
	}

	return (
		<form className={cn('flex h-full flex-col', className)} onSubmit={handleSubmit}>
			{children}
		</form>
	)
}

interface PopoverLabelProps {
	children: React.ReactNode
	className?: string
}

export function PopoverLabel({ children, className }: PopoverLabelProps) {
	const { uniqueId, note } = usePopover()

	return (
		<motion.span
			layoutId={`popover-label-${uniqueId}`}
			aria-hidden='true'
			style={{
				opacity: note ? 0 : 1
			}}
			className={cn(
				'absolute top-3 left-4 text-sm text-zinc-500 select-none dark:text-zinc-400',
				className
			)}
		>
			{children}
		</motion.span>
	)
}

interface PopoverTextareaProps {
	className?: string
}

export function PopoverTextarea({ className }: PopoverTextareaProps) {
	const { note, setNote } = usePopover()

	return (
		<textarea
			className={cn(
				'h-full w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-none',
				className
			)}
			autoFocus
			value={note}
			onChange={e => setNote(e.target.value)}
		/>
	)
}

interface PopoverFooterProps {
	children: React.ReactNode
	className?: string
}

export function PopoverFooter({ children, className }: PopoverFooterProps) {
	return (
		<div key='close' className={cn('flex justify-between px-4 py-3', className)}>
			{children}
		</div>
	)
}

interface PopoverCloseButtonProps {
	className?: string
}

export function PopoverCloseButton({ className }: PopoverCloseButtonProps) {
	const { closePopover } = usePopover()

	return (
		<button
			type='button'
			className={cn('flex items-center', className)}
			onClick={closePopover}
			aria-label='Close popover'
		>
			<X size={16} className='text-zinc-900 dark:text-zinc-100' />
		</button>
	)
}

interface PopoverSubmitButtonProps {
	className?: string
	text?: string
}

export function PopoverSubmitButton({ className, text }: PopoverSubmitButtonProps) {
	return (
		<button
			className={cn(
				'relative ml-1 flex h-8 shrink-0 scale-100 appearance-none items-center justify-center rounded-lg border border-[var(--color-secondary-border)] bg-transparent px-2 text-sm text-[var(--text-secondary)] transition-colors select-none hover:bg-[var(--color-secondary-hover)] hover:text-[var(--text-secondary)] focus-visible:ring-2 active:scale-[0.98] dark:border-[var(--color-default-hover)] dark:text-[var(--text-default)] dark:hover:bg-[var(--color-default-hover)] dark:hover:text-[var(--text-default)]',
				className
			)}
			type='submit'
			aria-label='Submit note'
		>
			{text}
		</button>
	)
}

export function PopoverHeader({
	children,
	className
}: {
	children: React.ReactNode
	className?: string
}) {
	return (
		<div
			className={cn(
				'px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] dark:text-[var(--text-default)]',
				className
			)}
		>
			{children}
		</div>
	)
}

export function PopoverBody({
	children,
	className
}: {
	children: React.ReactNode
	className?: string
}) {
	return <div className={cn('p-4', className)}>{children}</div>
}

// New component: PopoverButton
export function PopoverButton({
	children,
	onClick,
	className
}: {
	children: React.ReactNode
	onClick?: () => void
	className?: string
}) {
	return (
		<button
			className={cn(
				'flex w-full items-center gap-2 rounded-md px-4 py-2 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700',
				className
			)}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

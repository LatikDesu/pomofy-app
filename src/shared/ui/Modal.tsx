import { AnimatePresence, motion } from 'framer-motion'
import React, {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useRef,
	useState
} from 'react'
import { createPortal } from 'react-dom'

import { cn } from '@/shared/lib/utils'

interface ModalContextType {
	open: boolean
	setOpen: (open: boolean) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [open, setOpen] = useState(false)

	return <ModalContext.Provider value={{ open, setOpen }}>{children}</ModalContext.Provider>
}

export const useModal = () => {
	const context = useContext(ModalContext)
	if (!context) {
		throw new Error('useModal must be used within a ModalProvider')
	}
	return context
}

export function Modal({ children }: { children: ReactNode }) {
	return <ModalProvider>{children}</ModalProvider>
}

export const ModalTrigger = ({
	children,
	className,
	onClick,
	asChild = false
}: {
	children: ReactNode
	className?: string
	onClick?: () => void
	asChild?: boolean
}) => {
	const { setOpen } = useModal()

	if (asChild && React.isValidElement(children)) {
		const childElement = children as React.ReactElement<any>
		return React.cloneElement(childElement, {
			onClick: (e: React.MouseEvent) => {
				setOpen(true)
				onClick?.()
				childElement.props.onClick?.(e)
			},
			className: cn(childElement.props.className, className)
		})
	}

	return (
		<button
			className={cn(
				'relative overflow-hidden rounded-md px-4 py-2 text-center text-[var(--text-secondary)] dark:text-[var(--text-default)]',
				className
			)}
			onClick={() => {
				setOpen(true)
				onClick?.()
			}}
		>
			{children}
		</button>
	)
}

export const ModalBody = ({ children, className }: { children: ReactNode; className?: string }) => {
	const { open } = useModal()

	useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
	}, [open])

	const modalRef = useRef<HTMLDivElement>(null)
	const { setOpen } = useModal()
	useOutsideClick(modalRef as React.RefObject<HTMLDivElement>, () => setOpen(false))

	return createPortal(
		<AnimatePresence>
			{open && (
				<motion.div
					initial={{
						opacity: 0
					}}
					animate={{
						opacity: 1,
						backdropFilter: 'blur(10px)'
					}}
					exit={{
						opacity: 0,
						backdropFilter: 'blur(0px)'
					}}
					className='fixed inset-0 z-50 flex h-full w-full items-center justify-center [perspective:800px] [transform-style:preserve-3d]'
				>
					<motion.div
						ref={modalRef}
						className={cn(
							'relative z-50 flex w-auto max-w-md flex-col rounded-lg bg-[var(--color-secondary)] shadow-lg dark:bg-[var(--color-default)]',
							className
						)}
						initial={{
							opacity: 0,
							scale: 0.5,
							rotateX: 40,
							y: 40
						}}
						animate={{
							opacity: 1,
							scale: 1,
							rotateX: 0,
							y: 0
						}}
						exit={{
							opacity: 0,
							scale: 0.8,
							rotateX: 10
						}}
						transition={{
							type: 'spring',
							stiffness: 260,
							damping: 15
						}}
					>
						<CloseIcon />
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>,
		document.body
	)
}

export const ModalContent = ({
	children,
	className
}: {
	children: ReactNode
	className?: string
}) => {
	return (
		<div
			className={cn(
				'flex flex-col p-6 text-[var(--text-secondary)] dark:text-[var(--text-default)]',
				className
			)}
		>
			{children}
		</div>
	)
}

export const ModalFooter = ({
	children,
	className
}: {
	children: ReactNode
	className?: string
}) => {
	return <div className={cn('flex justify-end px-6 pt-2 pb-6', className)}>{children}</div>
}

const CloseIcon = () => {
	const { setOpen } = useModal()
	return (
		<button onClick={() => setOpen(false)} className='group absolute top-3 right-3'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='24'
				height='24'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				className='h-4 w-4 text-[var(--text-secondary)] transition duration-200 group-hover:scale-110 dark:text-[var(--text-default)]'
			>
				<path stroke='none' d='M0 0h24v24H0z' fill='none' />
				<path d='M18 6l-12 12' />
				<path d='M6 6l12 12' />
			</svg>
		</button>
	)
}

// Hook to detect clicks outside of a component.
// Add it in a separate file, I've added here for simplicity
export const useOutsideClick = (ref: React.RefObject<HTMLDivElement>, callback: Function) => {
	useEffect(() => {
		const listener = (event: any) => {
			// DO NOTHING if the element being clicked is the target element or their children
			if (!ref.current || ref.current.contains(event.target)) {
				return
			}
			callback(event)
		}

		document.addEventListener('mousedown', listener)
		document.addEventListener('touchstart', listener)

		return () => {
			document.removeEventListener('mousedown', listener)
			document.removeEventListener('touchstart', listener)
		}
	}, [ref, callback])
}

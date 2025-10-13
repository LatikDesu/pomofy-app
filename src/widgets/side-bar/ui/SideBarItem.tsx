import clsx from 'clsx'
import { type FC } from 'react'

export const SideBarItem: FC<{
	children: React.ReactNode
	onClick?: () => void
	toggled?: boolean
	shown?: boolean
}> = ({ children, onClick, toggled, shown }) => {
	if (shown) {
		return (
			<li>
				<button
					className={clsx(
						'relative flex h-14 items-center bg-[var(--color-secondary)] px-4 text-[var(--text-secondary)] sm:h-16 sm:px-6 md:hover:bg-[var(--color-secondary-hover)] dark:bg-[var(--color-default)] dark:text-[var(--text-default)] md:hover:dark:bg-[var(--color-default-hover)]',
						toggled &&
							'border-b-2 border-[var(--color-secondary-border)] bg-[var(--color-secondary-hover)] text-[var(--text-default)] md:hover:bg-[var(--color-secondary-hover)] dark:border-[var(--color-default-border)] dark:bg-[var(--color-default-hover)] md:hover:dark:bg-[var(--color-default-hover)]'
					)}
					onClick={onClick}
				>
					{children}
				</button>
			</li>
		)
	} else {
		return <></>
	}
}

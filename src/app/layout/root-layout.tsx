import { version } from '@Root/package.json'
import { DndContext } from '@dnd-kit/core'
import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import { Toaster } from 'react-hot-toast'

import { Backgrounds } from '@/features/Backgrounds'

import useSetDefault from '@/shared/lib/useSetDefault'
import { useDarkToggleStore, useSeoVisibilityStore } from '@/shared/store'

import { useBreakStarted } from '@/entities/Timer'
import { InfoSection, WorkflowPage } from '@/pages'
import { SideBar } from '@/widgets/side-bar'

function RootLayout() {
	const isDark = useDarkToggleStore(state => state.isDark)
	const setDefault = useSetDefault()
	const { breakStarted } = useBreakStarted()
	const { isSeoVisible, toggleSeoVisibility } = useSeoVisibilityStore()
	const workflowPageRef = useRef<HTMLDivElement>(null)

	const handleButtonClick = () => {
		if (workflowPageRef.current) {
			workflowPageRef.current.scrollIntoView({ behavior: 'smooth' })
		}
		setTimeout(() => {
			toggleSeoVisibility()
		}, 700)
	}

	useEffect(() => {
		if (isDark) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}, [isDark])

	useEffect(() => {
		if (!localStorage.APP_VERSION || localStorage.APP_VERSION != version) {
			setDefault()
			localStorage.setItem('APP_VERSION', version)
		}
	}, [])

	return (
		<>
			<Backgrounds />
			<DndContext>
				<div
					className={clsx(
						'scrollbar-hide fixed inset-0 overflow-auto',
						!isSeoVisible && 'md:overflow-hidden',
						breakStarted && 'bg-yellow-300/15'
					)}
				>
					<Toaster />
					<SideBar />
					<WorkflowPage ref={workflowPageRef} />
					<InfoSection onButtonClick={handleButtonClick} isSeoVisible={isSeoVisible} />
				</div>
			</DndContext>
		</>
	)
}

export default RootLayout

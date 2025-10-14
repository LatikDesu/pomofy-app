import { useState } from 'react'
import { IoMdSettings } from 'react-icons/io'

import { successToast } from '@/shared/lib/toast'
import useSetDefault from '@/shared/lib/useSetDefault'
import {
	useDarkToggleStore,
	useGrid,
	useLockWidgetsStore,
	useSeoVisibilityStore
} from '@/shared/store'
import { NeumorphButton } from '@/shared/ui/Button'
import { Modal, ModalBody, ModalContent, ModalTrigger } from '@/shared/ui/Modal'

import { GridSizeSetting } from './GridSizeSetting'
import { ResetConfirmDialog } from './ResetConfirmDialog'
import { SettingsActions } from './SettingsActions'
import { WidgetLockSetting } from './WidgetLockSetting'

export const SettingsModal = () => {
	const { isDark } = useDarkToggleStore()
	const { setGrid } = useGrid()
	const { setSeoVisibility } = useSeoVisibilityStore()
	const { setAreWidgetsLocked } = useLockWidgetsStore()
	const [showResetConfirm, setShowResetConfirm] = useState(false)

	const setDefault = useSetDefault()

	function handleDefaults() {
		setShowResetConfirm(true)
	}

	function confirmReset() {
		setDefault()
		setGrid(null)
		setAreWidgetsLocked(false)
		setSeoVisibility(true)
		setShowResetConfirm(false)
		successToast('Настройки сброшены', isDark)
	}

	function cancelReset() {
		setShowResetConfirm(false)
	}

	return (
		<>
			<Modal>
				<ModalTrigger asChild className='settingsButton'>
					<NeumorphButton intent={isDark ? 'default' : 'secondary'} size='small'>
						<IoMdSettings size={20} />
					</NeumorphButton>
				</ModalTrigger>
				<ModalBody>
					<ModalContent className='w-80 space-y-3 pb-3'>
						<div className='font-bold'>Настройки</div>
						<hr className='border-t border-[var(--color-secondary-border)] dark:border-[var(--color-default-hover)]' />

						<GridSizeSetting />

						<hr className='border-t border-[var(--color-secondary-border)] dark:border-[var(--color-default-hover)]' />

						<WidgetLockSetting />

						<hr className='border-t border-[var(--color-secondary-border)] dark:border-[var(--color-default-hover)]' />

						<SettingsActions onResetDefaults={handleDefaults} />
					</ModalContent>
				</ModalBody>
			</Modal>

			<ResetConfirmDialog
				isVisible={showResetConfirm}
				onCancel={cancelReset}
				onConfirm={confirmReset}
			/>
		</>
	)
}

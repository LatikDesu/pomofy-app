import { X } from 'lucide-react'
import { createPortal } from 'react-dom'

import { Button } from '@/shared/ui'

interface ResetConfirmDialogProps {
	isVisible: boolean
	onCancel: () => void
	onConfirm: () => void
}

export const ResetConfirmDialog = ({ isVisible, onCancel, onConfirm }: ResetConfirmDialogProps) => {
	if (!isVisible) return null

	return createPortal(
		<div className='fixed inset-0 z-[1000] flex items-center justify-center text-[var(--text-secondary)] dark:text-[var(--text-default)]'>
			<div className='relative max-w-sm rounded-lg border border-[var(--color-secondary-border)] bg-[var(--color-secondary)] p-4 dark:border-[var(--color-default-hover)] dark:bg-[var(--color-default)]'>
				<button onClick={onCancel} className='group absolute top-3 right-3 cursor-pointer'>
					<X size={16} />
				</button>
				<h2 className='text-md mb-4 font-bold'>Сбросить настройки</h2>
				<p className='mb-6 text-sm'>
					Вы уверены, что хотите сбросить все настройки к значениям по умолчанию?
				</p>
				<div className='flex justify-end gap-4'>
					<Button onClick={onCancel} variant='secondary' size='sm'>
						Отмена
					</Button>
					<Button onClick={onConfirm} variant='destructive' size='sm'>
						Сбросить
					</Button>
				</div>
			</div>
		</div>,
		document.body
	)
}

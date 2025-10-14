import { useLockWidgetsStore } from '@/shared/store'

export const WidgetLockSetting = () => {
	const { areWidgetsLocked, setAreWidgetsLocked } = useLockWidgetsStore()

	function toggleLockWidgets() {
		setAreWidgetsLocked(!areWidgetsLocked)
	}

	return (
		<div className='space-y-2.5 pb-1'>
			<label className='flex items-center gap-1.5 text-xs font-medium'>Положение виджетов</label>
			<div className='flex justify-center'>
				<button
					onClick={toggleLockWidgets}
					className={`h-8 w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-secondary)] text-sm font-medium ring-1 ring-[var(--color-secondary-border)] transition-colors hover:bg-[var(--color-secondary-hover)] dark:bg-[var(--color-default)] dark:ring-[var(--color-default-hover)] ${
						areWidgetsLocked
							? '!bg-[var(--color-danger)] !text-[var(--text-default)] hover:!bg-[var(--color-danger-hover)]'
							: ''
					}`}
				>
					{areWidgetsLocked ? 'Разблокировать' : 'Заблокировать'}
				</button>
			</div>
		</div>
	)
}

import { useSeoVisibilityStore } from '@/shared/store'
import { Button } from '@/shared/ui'

interface SettingsActionsProps {
	onResetDefaults: () => void
}

export const SettingsActions = ({ onResetDefaults }: SettingsActionsProps) => {
	const { isSeoVisible, toggleSeoVisibility } = useSeoVisibilityStore()

	return (
		<div className='flex justify-center gap-3'>
			<Button onClick={onResetDefaults} variant='ghost' size='sm' className='flex-1'>
				По умолчанию
			</Button>

			<Button onClick={toggleSeoVisibility} variant='ghost' size='sm' className='flex-1'>
				{isSeoVisible ? 'Скрыть SEO' : 'Показать SEO'}
			</Button>
		</div>
	)
}

import { Switch } from '@/shared/ui/Switch'

import { useQuickLinksSettings } from '@/entities/QuickLinks'

export function ToggleOnlyIconsButton() {
	const { isIconOnly, toggleIconOnly } = useQuickLinksSettings()

	return (
		<div className='flex items-center justify-between'>
			<label htmlFor='only-icons-toggle' className='text-xs'>
				Показывать только иконки
			</label>
			<Switch id='only-icons-toggle' checked={isIconOnly} onCheckedChange={toggleIconOnly} />
		</div>
	)
}

import { Switch } from '@/shared/ui/Switch'

import { useQuickLinksSettings } from '@/entities/QuickLinks'

export function ToggleGroupingButton() {
	const { isGroupingEnabled, toggleGrouping } = useQuickLinksSettings()

	return (
		<div className='flex items-center justify-between'>
			<label htmlFor='grouping-toggle' className='text-xs'>
				Показывать группы
			</label>
			<Switch id='grouping-toggle' checked={isGroupingEnabled} onCheckedChange={toggleGrouping} />
		</div>
	)
}

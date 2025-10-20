import { WatchSettings } from '@/features/Watch/ui/WatchSettings'

import { CloseWidgetButton, WidgetWrapper } from '@/shared/ui'

import { WatchDisplay, WeatherDisplay, useToggleWatch } from '@/entities/Watch'

export function WatchWidget() {
	const { setIsWatchToggled } = useToggleWatch()

	const actions = (
		<>
			<WatchSettings />
			<CloseWidgetButton
				className='!text-[var(--color-default)]'
				onClick={() => {
					setIsWatchToggled(false)
				}}
			/>
		</>
	)

	return (
		<div className='group select-none'>
			<WidgetWrapper
				actions={
					<div className='flex justify-end gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
						{actions}
					</div>
				}
				className='!bg-transparent !shadow-none'
			>
				<div className='flex flex-col items-center justify-center gap-2'>
					<WatchDisplay />
					<WeatherDisplay />
				</div>
			</WidgetWrapper>
		</div>
	)
}

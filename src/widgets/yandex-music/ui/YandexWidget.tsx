import { SettingsPopover } from '@/features/YandexMusic'

import { CloseWidgetButton, WidgetWrapper } from '@/shared/ui'

import { useYandexMusic, useYandexPlaylists } from '@/entities/YandexMusic'

export const YandexWidget = () => {
	const { setIsYandexToggled } = useYandexMusic()
	const { getSelectedPlaylist } = useYandexPlaylists()

	const selectedPlaylist = getSelectedPlaylist()
	const iframeSrc =
		selectedPlaylist?.url || 'https://music.yandex.ru/iframe/playlist/music-blog/2620'

	const actions = (
		<>
			<SettingsPopover />
			<CloseWidgetButton
				onClick={() => {
					setIsYandexToggled(false)
				}}
			/>
		</>
	)

	return (
		<WidgetWrapper className='!w-72 sm:!w-88' actions={actions}>
			<div className='cancelDrag justify-center rounded-lg p-2 pt-0'>
				<iframe
					key={iframeSrc}
					className='rounded-lg'
					src={iframeSrc}
					height='405'
					width='100%'
					allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
				></iframe>
			</div>
		</WidgetWrapper>
	)
}

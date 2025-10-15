import { SettingsPopover } from '@/features/Spotify'

import { useDarkToggleStore } from '@/shared/store'
import { CloseWidgetButton, WidgetWrapper } from '@/shared/ui'

import { useSpotifyMusic, useSpotifyPlaylists } from '@/entities/Spotify'

export const SpotifyWidget = () => {
	const { setIsSpotifyToggled } = useSpotifyMusic()
	const { getSelectedPlaylist } = useSpotifyPlaylists()
	const isDark = useDarkToggleStore(state => state.isDark)

	const selectedPlaylist = getSelectedPlaylist()
	const iframeSrc =
		selectedPlaylist?.url || 'https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM'

	const iframeWithTheme = `${iframeSrc}?utm_source=generator&theme=${isDark ? 0 : 1}`

	const actions = (
		<>
			<SettingsPopover />
			<CloseWidgetButton
				onClick={() => {
					setIsSpotifyToggled(false)
				}}
			/>
		</>
	)

	return (
		<WidgetWrapper className='!w-72 sm:!w-96' actions={actions}>
			<div className='cancelDrag justify-center rounded-lg p-2 pt-0'>
				<iframe
					key={iframeWithTheme}
					className='rounded-lg'
					src={iframeWithTheme}
					height='405'
					width='100%'
					allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
				></iframe>
			</div>
		</WidgetWrapper>
	)
}

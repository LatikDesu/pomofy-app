import { PlaylistItem } from './PlaylistItem'
import { useYandexPlaylists } from '@/entities/YandexMusic'

export function PlaylistSelector() {
	const { playlists, selectedPlaylistId, selectPlaylist, removePlaylist } = useYandexPlaylists()

	return (
		<div className='space-y-1.5'>
			<label className='block text-xs font-medium'>Плейлисты</label>
			<div className='max-h-[240px] space-y-1 overflow-y-auto pr-1'>
				{playlists.map(playlist => (
					<PlaylistItem
						key={playlist.id}
						playlist={playlist}
						isSelected={selectedPlaylistId === playlist.id}
						onSelect={() => selectPlaylist(playlist.id)}
						onRemove={() => removePlaylist(playlist.id)}
					/>
				))}
			</div>
		</div>
	)
}

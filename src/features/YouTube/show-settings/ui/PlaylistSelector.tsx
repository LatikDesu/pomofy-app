import { PlaylistItem } from './PlaylistItem'
import { useYouTubePlaylists } from '@/entities/YouTube'

export function PlaylistSelector() {
	const { playlists, selectedPlaylistId, selectPlaylist, removePlaylist } = useYouTubePlaylists()

	return (
		<div className='space-y-1.5'>
			<label className='block text-xs font-medium'>Плейлисты</label>
			<div className='sticky-note-scrollbar max-h-[240px] overflow-y-auto pr-1'>
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

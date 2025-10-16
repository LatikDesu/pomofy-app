import { useEffect, useState } from 'react'

import { getPlaylistVideos, parseISO8601Duration } from '@/shared/api/youtube.api'

import type { YouTubeVideo } from '../model/youtube-playlists.store'
import { useYouTubePlaylists } from '../model/youtube-playlists.store'

/**
 * Hook для работы с динамическими плейлистами
 * Загружает видео из YouTube плейлиста при выборе
 */
export function useDynamicPlaylist() {
	const { getSelectedPlaylist } = useYouTubePlaylists()
	const [isLoading, setIsLoading] = useState(false)
	const [cachedVideos, setCachedVideos] = useState<Map<string, YouTubeVideo[]>>(new Map())

	const selectedPlaylist = getSelectedPlaylist()

	useEffect(() => {
		async function loadPlaylistVideos() {
			if (
				!selectedPlaylist ||
				selectedPlaylist.type !== 'dynamic' ||
				!selectedPlaylist.youtubePlaylistId
			) {
				return
			}

			// Проверяем кеш
			if (cachedVideos.has(selectedPlaylist.id)) {
				const videos = cachedVideos.get(selectedPlaylist.id)!
				// Обновляем videos в store
				useYouTubePlaylists.setState(state => ({
					playlists: state.playlists.map(p => (p.id === selectedPlaylist.id ? { ...p, videos } : p))
				}))
				return
			}

			setIsLoading(true)
			try {
				const videos = await getPlaylistVideos(selectedPlaylist.youtubePlaylistId)

				const formattedVideos: YouTubeVideo[] = videos.map(video => ({
					id: video.id,
					url: `https://www.youtube.com/watch?v=${video.id}`,
					title: video.title,
					thumbnail: video.thumbnail,
					duration: parseISO8601Duration(video.duration)
				}))

				// Сохраняем в кеш
				setCachedVideos(prev => new Map(prev).set(selectedPlaylist.id, formattedVideos))

				// Обновляем videos в store
				useYouTubePlaylists.setState(state => ({
					playlists: state.playlists.map(p =>
						p.id === selectedPlaylist.id ? { ...p, videos: formattedVideos } : p
					)
				}))
			} catch (error) {
				console.error('Error loading dynamic playlist:', error)
			} finally {
				setIsLoading(false)
			}
		}

		loadPlaylistVideos()
	}, [selectedPlaylist?.id, selectedPlaylist?.type])

	return { isLoading }
}

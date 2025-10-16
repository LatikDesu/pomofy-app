/**
 * YouTube Data API v3 Service
 * ---
 * Search videos and get video details
 */

const API_KEY = import.meta.env.VITE_YT_API_KEY
const BASE_URL = 'https://www.googleapis.com/youtube/v3'

export interface YouTubeSearchResult {
	id: string
	title: string
	thumbnail: string
	channelTitle: string
	duration?: string
}

interface YouTubeApiSearchResponse {
	items: Array<{
		id: {
			videoId: string
		}
		snippet: {
			title: string
			thumbnails: {
				medium: {
					url: string
				}
			}
			channelTitle: string
		}
	}>
}

interface YouTubeApiVideoResponse {
	items: Array<{
		id: string
		contentDetails: {
			duration: string
		}
	}>
}

/**
 * Search YouTube videos by query
 */
export async function searchYouTubeVideos(
	query: string,
	maxResults: number = 10
): Promise<YouTubeSearchResult[]> {
	if (!API_KEY) {
		throw new Error('YouTube API key is not configured')
	}

	try {
		const searchUrl = `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${API_KEY}`
		const response = await fetch(searchUrl)

		if (!response.ok) {
			throw new Error(`YouTube API error: ${response.status}`)
		}

		const data: YouTubeApiSearchResponse = await response.json()

		const videoIds = data.items.map(item => item.id.videoId).join(',')
		const detailsUrl = `${BASE_URL}/videos?part=contentDetails&id=${videoIds}&key=${API_KEY}`
		const detailsResponse = await fetch(detailsUrl)

		if (!detailsResponse.ok) {
			throw new Error(`YouTube API error: ${detailsResponse.status}`)
		}

		const detailsData: YouTubeApiVideoResponse = await detailsResponse.json()

		return data.items.map((item, index) => ({
			id: item.id.videoId,
			title: item.snippet.title,
			thumbnail: item.snippet.thumbnails.medium.url,
			channelTitle: item.snippet.channelTitle,
			duration: detailsData.items[index]?.contentDetails.duration
		}))
	} catch (error) {
		console.error('YouTube API search error:', error)
		throw error
	}
}

/**
 * Extract video ID from YouTube URL (включая music.youtube.com)
 */
export function extractVideoId(url: string): string | null {
	const patterns = [
		/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|music\.youtube\.com\/watch\?v=)([^&\n?#]+)/,
		/^([a-zA-Z0-9_-]{11})$/
	]

	for (const pattern of patterns) {
		const match = url.match(pattern)
		if (match) return match[1]
	}

	return null
}

/**
 * Extract playlist ID from YouTube URL
 */
export function extractPlaylistId(url: string): string | null {
	const patterns = [/[?&]list=([^&\n?#]+)/, /^([a-zA-Z0-9_-]+)$/]

	for (const pattern of patterns) {
		const match = url.match(pattern)
		if (match) return match[1]
	}

	return null
}

/**
 * Check if playlist ID is a YouTube Music radio playlist (starts with RD)
 * These are dynamic and not accessible via standard API
 */
export function isRadioPlaylist(playlistId: string): boolean {
	return playlistId.startsWith('RD') && !playlistId.startsWith('RDMM')
}

/**
 * Get video details by ID
 */
export async function getVideoDetails(videoId: string): Promise<YouTubeSearchResult | null> {
	if (!API_KEY) {
		throw new Error('YouTube API key is not configured')
	}

	try {
		const url = `${BASE_URL}/videos?part=snippet,contentDetails&id=${videoId}&key=${API_KEY}`
		const response = await fetch(url)

		if (!response.ok) {
			throw new Error(`YouTube API error: ${response.status}`)
		}

		const data = await response.json()

		if (!data.items || data.items.length === 0) {
			return null
		}

		const item = data.items[0]
		return {
			id: item.id,
			title: item.snippet.title,
			thumbnail: item.snippet.thumbnails.medium.url,
			channelTitle: item.snippet.channelTitle,
			duration: item.contentDetails.duration
		}
	} catch (error) {
		console.error('YouTube API video details error:', error)
		throw error
	}
}

/**
 * Get videos from a playlist
 */
export async function getPlaylistVideos(
	playlistId: string,
	maxResults = 50
): Promise<YouTubeSearchResult[]> {
	if (!API_KEY) {
		throw new Error('YouTube API key is not configured')
	}

	try {
		// Get playlist items
		const playlistUrl = `${BASE_URL}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${API_KEY}`
		const playlistResponse = await fetch(playlistUrl)

		if (!playlistResponse.ok) {
			throw new Error(`YouTube API error: ${playlistResponse.status}`)
		}

		const playlistData = await playlistResponse.json()

		if (!playlistData.items || playlistData.items.length === 0) {
			return []
		}

		// Extract video IDs
		const videoIds = playlistData.items
			.map((item: any) => item.snippet.resourceId.videoId)
			.join(',')

		// Get video details (including duration)
		const videosUrl = `${BASE_URL}/videos?part=snippet,contentDetails&id=${videoIds}&key=${API_KEY}`
		const videosResponse = await fetch(videosUrl)

		if (!videosResponse.ok) {
			throw new Error(`YouTube API error: ${videosResponse.status}`)
		}

		const videosData = await videosResponse.json()

		return videosData.items.map((item: any) => ({
			id: item.id,
			title: item.snippet.title,
			thumbnail: item.snippet.thumbnails.medium.url,
			channelTitle: item.snippet.channelTitle,
			duration: item.contentDetails.duration
		}))
	} catch (error) {
		console.error('YouTube API playlist error:', error)
		throw error
	}
}

/**
 * Format ISO 8601 duration to readable format (e.g., PT1H2M10S -> 1:02:10)
 */
export function formatDuration(isoDuration?: string): string {
	if (!isoDuration) return '0:00'

	const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
	if (!match) return '0:00'

	const hours = parseInt(match[1] || '0')
	const minutes = parseInt(match[2] || '0')
	const seconds = parseInt(match[3] || '0')

	if (hours > 0) {
		return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
	}
	return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

/**
 * Parse ISO 8601 duration to seconds
 */
export function parseISO8601Duration(isoDuration?: string): number | undefined {
	if (!isoDuration || isoDuration === 'P0D') return undefined // P0D is for live streams

	const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
	if (!match) return undefined

	const hours = parseInt(match[1] || '0')
	const minutes = parseInt(match[2] || '0')
	const seconds = parseInt(match[3] || '0')

	return hours * 3600 + minutes * 60 + seconds
}

/**
 * Parse Spotify URL
 * ---
 * Convert regular Spotify playlist URL to embed URL
 */

export function parseSpotifyUrl(url: string): string | null {
	if (!url.includes('https://open.spotify.com/playlist/')) {
		return null
	}
	const parts = url.split('https://open.spotify.com/')
	if (parts.length < 2) {
		return null
	}
	return `https://open.spotify.com/embed/${parts[1]}`
}

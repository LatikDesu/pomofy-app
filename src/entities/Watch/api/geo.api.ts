import { type IGeoData } from '../model/types'

/**
 * Geo Location API Service
 * ---
 * Get user location using multiple fallback APIs
 */

interface IpApiResponse {
	city: string
	timezone: string
	country_name: string
}

interface IpInfoResponse {
	city: string
	timezone: string
	country: string
}

interface IpGeolocationResponse {
	city: string
	time_zone: {
		name: string
	}
	country_name: string
}

/**
 * Get user geolocation data with multiple API fallbacks
 */
export async function getGeoLocation(): Promise<IGeoData> {
	// Try multiple APIs in sequence
	const apis = [
		{
			name: 'ipinfo.io',
			url: 'https://ipinfo.io/json',
			parser: (data: IpInfoResponse) => ({
				city: data.city || 'Unknown',
				timezone: data.timezone || 'UTC',
				country: data.country || 'Unknown'
			})
		},
		{
			name: 'ipgeolocation.io',
			url: 'https://api.ipgeolocation.io/ipgeo?apiKey=free',
			parser: (data: IpGeolocationResponse) => ({
				city: data.city || 'Unknown',
				timezone: data.time_zone?.name || 'UTC',
				country: data.country_name || 'Unknown'
			})
		},
		{
			name: 'ipapi.co',
			url: 'https://ipapi.co/json/',
			parser: (data: IpApiResponse) => ({
				city: data.city || 'Unknown',
				timezone: data.timezone || 'UTC',
				country: data.country_name || 'Unknown'
			})
		}
	]

	for (const api of apis) {
		try {
			console.log(`Trying ${api.name} for geolocation...`)

			const response = await fetch(api.url, {
				method: 'GET',
				headers: {
					Accept: 'application/json'
				}
			})

			if (!response.ok) {
				throw new Error(`${api.name} API error: ${response.status}`)
			}

			const data = await response.json()
			const result = api.parser(data)

			console.log(`Successfully got location from ${api.name}:`, result)
			return result
		} catch (error) {
			console.warn(`${api.name} failed:`, error)
			continue
		}
	}

	// If all APIs fail, try to get timezone from browser
	try {
		const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
		console.log('Using browser timezone as fallback:', browserTimezone)

		return {
			city: 'Unknown',
			timezone: browserTimezone || 'UTC',
			country: 'Unknown'
		}
	} catch (error) {
		console.error('Browser timezone detection failed:', error)
	}

	// Final fallback to default values
	console.log('Using default fallback location')
	return {
		city: 'Moscow',
		timezone: 'Europe/Moscow',
		country: 'Russia'
	}
}

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { getGeoLocation } from '../api/geo.api'
import { getWeather } from '../api/weather.api'

import { type IWatchSettings, type IWatchState } from './types'

/**
 * Watch Store
 * ---
 * Handle watch settings, weather data, and geo data
 */

const defaultSettings: IWatchSettings = {
	timezone: 'auto',
	city: 'auto',
	color: '#ffffff',
	showWeather: true,
	dateFormat: '%d.%m.%Y',
	timeFormat: '24h',
	fontSize: 'medium'
}

export const useWatch = create<IWatchState>()(
	persist(
		(set, get) => ({
			settings: defaultSettings,
			weatherData: null,
			geoData: null,
			isLoadingWeather: false,
			isLoadingGeo: false,

			updateSettings: newSettings => {
				const currentSettings = get().settings
				const updatedSettings = { ...currentSettings, ...newSettings }
				set({ settings: updatedSettings })

				// If city or timezone changed, refresh data
				if (newSettings.city !== undefined || newSettings.timezone !== undefined) {
					get().refreshWeather()
					if (newSettings.timezone === 'auto' || newSettings.city === 'auto') {
						get().refreshGeo()
					}
				}
			},

			updateWeatherData: data => set({ weatherData: data }),
			updateGeoData: data => set({ geoData: data }),
			setLoadingWeather: loading => set({ isLoadingWeather: loading }),
			setLoadingGeo: loading => set({ isLoadingGeo: loading }),

			refreshWeather: async () => {
				const { settings, geoData } = get()
				set({ isLoadingWeather: true })

				try {
					let cityToUse = settings.city

					// If city is auto, use geo data
					if (cityToUse === 'auto' && geoData?.city) {
						cityToUse = geoData.city
					} else if (cityToUse === 'auto') {
						cityToUse = 'Moscow' // fallback
					}

					const weatherData = await getWeather(cityToUse)
					set({ weatherData })
				} catch (error) {
					console.error('Failed to refresh weather:', error)
				} finally {
					set({ isLoadingWeather: false })
				}
			},

			refreshGeo: async () => {
				set({ isLoadingGeo: true })

				try {
					const geoData = await getGeoLocation()
					set({ geoData })

					// If using auto settings, update weather with new geo data
					const { settings } = get()
					if (settings.city === 'auto') {
						get().refreshWeather()
					}
				} catch (error) {
					console.error('Failed to refresh geo data:', error)
				} finally {
					set({ isLoadingGeo: false })
				}
			}
		}),
		{
			name: 'watch_store',
			// Only persist settings, not dynamic data
			partialize: state => ({
				settings: state.settings
			}),
			// Migrate old settings to include fontSize
			migrate: (persistedState: any) => {
				if (persistedState && persistedState.settings && !persistedState.settings.fontSize) {
					persistedState.settings.fontSize = 'medium'
				}
				return persistedState
			},
			version: 1
		}
	)
)

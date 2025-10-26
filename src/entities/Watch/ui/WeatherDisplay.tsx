import { Loader2 } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { getFontSizeClasses } from '../lib/font-size-utils'
import { useWatch } from '../model/watch.store'

/**
 * Weather Display Component
 * ---
 * Shows current weather information
 */

export function WeatherDisplay() {
	const { settings, weatherData, geoData, isLoadingWeather, refreshWeather, refreshGeo } =
		useWatch()

	const intervalRef = useRef<number | null>(null)
	const initialLoadRef = useRef(false)

	// Initial data load - only once on mount
	useEffect(() => {
		if (!initialLoadRef.current) {
			if (settings.city === 'auto' || settings.timezone === 'auto') {
				refreshGeo()
			}

			refreshWeather()
			initialLoadRef.current = true
		}
	}, [])

	// Setup weather refresh interval - only once on mount
	useEffect(() => {
		// Set up weather refresh interval (30 minutes)
		intervalRef.current = setInterval(
			() => {
				const store = useWatch.getState()
				store.refreshWeather()
			},
			30 * 60 * 1000
		)

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
				intervalRef.current = null
			}
		}
	}, [])

	// Refresh weather when city settings change
	useEffect(() => {
		if (initialLoadRef.current) {
			if (settings.city === 'auto' && !geoData) {
				refreshGeo()
			}
			refreshWeather()
		}
	}, [settings.city])

	if (!settings.showWeather) {
		return null
	}

	// Show loading state
	if (isLoadingWeather && !weatherData) {
		return (
			<div className='flex items-center justify-center gap-2 text-sm opacity-70'>
				<Loader2 className='h-4 w-4 animate-spin' />
				<span>Загрузка погоды...</span>
			</div>
		)
	}

	// Show weather data
	if (weatherData) {
		const cityName = settings.city === 'auto' ? geoData?.city || 'Unknown' : settings.city

		const sizeClasses = getFontSizeClasses(settings.fontSize)

		return (
			<div className='flex items-center justify-center gap-4'>
				<div className='flex flex-col items-center justify-center'>
					<span className={sizeClasses.weatherIcon}>{weatherData.icon}</span>
				</div>
				<div className={`flex flex-col ${sizeClasses.weather} opacity-60`}>
					<div style={{ color: settings.color }}>
						{weatherData.temperature}, {cityName}
					</div>
					<div className='text-xs opacity-70' style={{ color: settings.color }}>
						{weatherData.condition}
					</div>
				</div>
			</div>
		)
	}

	// Fallback if no weather data
	return (
		<div className='text-center text-xs opacity-50' style={{ color: settings.color }}>
			Погода недоступна
		</div>
	)
}

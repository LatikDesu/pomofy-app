export interface IWatchSettings {
	timezone: string
	city: string
	color: string
	showWeather: boolean
	dateFormat: string
	timeFormat: '24h' | '12h'
	fontSize: 'small' | 'medium' | 'large' | 'extra-large'
}

export interface IWeatherData {
	temperature: string
	condition: string
	icon: string
	lastUpdated: number
}

export interface IGeoData {
	city: string
	timezone: string
	country: string
}

export interface IWatchState {
	settings: IWatchSettings
	weatherData: IWeatherData | null
	geoData: IGeoData | null
	isLoadingWeather: boolean
	isLoadingGeo: boolean
	updateSettings: (settings: Partial<IWatchSettings>) => void
	updateWeatherData: (data: IWeatherData) => void
	updateGeoData: (data: IGeoData) => void
	setLoadingWeather: (loading: boolean) => void
	setLoadingGeo: (loading: boolean) => void
	refreshWeather: () => Promise<void>
	refreshGeo: () => Promise<void>
}

export interface IToggleWatch {
	isWatchToggled: boolean
	setIsWatchToggled: (isWatchToggled: boolean) => void
	isWatchShown: boolean
	setIsWatchShown: (isWatchShown: boolean) => void
}

export interface IPosWatch {
	watchPosX: number
	watchPosY: number
	setWatchPos: (X: number, Y: number) => void
	setWatchPosDefault: () => void
}

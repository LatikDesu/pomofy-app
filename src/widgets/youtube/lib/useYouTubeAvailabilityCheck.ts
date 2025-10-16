import { useCallback, useEffect, useState } from 'react'

export function useYouTubeAvailabilityCheck() {
	const [isYouTubeAvailable, setIsYouTubeAvailable] = useState(false)
	const [isChecking, setIsChecking] = useState(true)

	const checkYouTubeAvailability = useCallback(() => {
		setIsChecking(true)
		const script = document.createElement('script')
		script.src = 'https://www.youtube.com/iframe_api'

		const timeoutId = setTimeout(() => {
			console.error('YouTube API script load timed out.')
			setIsYouTubeAvailable(false)
			setIsChecking(false)
			script.remove()
		}, 5000) // 5 seconds timeout

		script.onload = () => {
			clearTimeout(timeoutId)
			setIsYouTubeAvailable(true)
			setIsChecking(false)
			script.remove()
		}

		script.onerror = () => {
			clearTimeout(timeoutId)
			console.error('YouTube API script failed to load.')
			setIsYouTubeAvailable(false)
			setIsChecking(false)
			script.remove()
		}

		document.body.appendChild(script)
	}, [])

	useEffect(() => {
		checkYouTubeAvailability()
	}, [checkYouTubeAvailability])

	return {
		isYouTubeAvailable,
		isChecking,
		checkYouTubeAvailability
	}
}

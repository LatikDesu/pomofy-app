import { persist } from 'zustand/middleware'
import { create } from 'zustand/react'

/**
 * Audio Volume Store
 * ---
 * Handler for Audio Volume
 */

interface IAudioVolume {
	audioVolume: number
	setAudioVolume: (audioVolume: number) => void
	defaultAudioVolume: () => void
}

export const useAudioVolume = create<IAudioVolume>()(
	persist(
		set => ({
			audioVolume: 0.7,
			setAudioVolume: volume => set({ audioVolume: volume }),
			defaultAudioVolume: () => set({ audioVolume: 0.7 })
		}),
		{ name: 'set_audio_volume' }
	)
)

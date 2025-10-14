/**
 * Yandex Section Store
 * ---
 * Handle the Yandex section
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface IToggleYandex {
	isYandexToggled: boolean
	setIsYandexToggled: (isYandexToggled: boolean) => void
	isYandexShown: boolean
	setIsYandexShown: (isYandexShown: boolean) => void
}

export const useYandexMusic = create<IToggleYandex>()(
	persist(
		(set, _) => ({
			isYandexToggled: true,
			setIsYandexToggled: isYandexToggled => set({ isYandexToggled }),
			isYandexShown: true,
			setIsYandexShown: isYandexShown => set({ isYandexShown })
		}),
		{
			name: 'state_yandex_section'
		}
	)
)

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface IPosYandex {
	yandexPosX: number
	yandexPosY: number
	setYandexPos: (X: number, Y: number) => void
	setYandexPosDefault: () => void
}
export const usePosYandex = create<IPosYandex>()(
	persist(
		(set, _) => ({
			yandexPosX: 400,
			yandexPosY: 158,
			setYandexPos: (X, Y) => set({ yandexPosX: X, yandexPosY: Y }),
			setYandexPosDefault: () => set(() => ({ yandexPosX: 400, yandexPosY: 158 }))
		}),
		{
			name: 'set_yandex_position'
		}
	)
)

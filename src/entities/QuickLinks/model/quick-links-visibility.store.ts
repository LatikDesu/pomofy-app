import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { type IPosQuickLinks, type IQuickLinksVisibility } from './types'

export const useToggleQuickLinks = create<IQuickLinksVisibility>()(
	persist(
		(set, _) => ({
			isQuickLinksToggled: true,
			setIsQuickLinksToggled: isQuickLinksToggled => set({ isQuickLinksToggled }),
			isQuickLinksShown: true,
			setIsQuickLinksShown: isQuickLinksShown => set({ isQuickLinksShown })
		}),
		{
			name: 'state_quick_links_section'
		}
	)
)

export const usePosQuickLinks = create<IPosQuickLinks>()(
	persist(
		(set, _) => ({
			quickLinksPosX: 100,
			quickLinksPosY: 100,
			setQuickLinksPos: (X, Y) => set({ quickLinksPosX: X, quickLinksPosY: Y }),
			setQuickLinksPosDefault: () => set(() => ({ quickLinksPosX: 100, quickLinksPosY: 100 }))
		}),
		{
			name: 'set_quick_links_position'
		}
	)
)

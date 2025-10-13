import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Toggle SEO Content
 * ---
 * Handles storing SEO content visibility
 */

export interface ISeoContent {
	isSeoVisible: boolean
	toggleSeoVisibility: () => void
}

export const useSeoVisibilityStore = create<ISeoContent>()(
	persist(
		(set, get) => ({
			isSeoVisible: true,
			toggleSeoVisibility: () => set({ isSeoVisible: !get().isSeoVisible })
		}),
		{ name: 'state_seo_visibility' }
	)
)

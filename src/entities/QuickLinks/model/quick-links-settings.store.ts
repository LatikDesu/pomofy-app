import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { type IQuickLinksSettings } from './types'

export const useQuickLinksSettings = create<IQuickLinksSettings>()(
	persist(
		(set, _) => ({
			isGroupingEnabled: false,
			isIconOnly: false,
			toggleGrouping: () => set(state => ({ isGroupingEnabled: !state.isGroupingEnabled })),
			toggleIconOnly: () => set(state => ({ isIconOnly: !state.isIconOnly }))
		}),
		{
			name: 'quick_links_settings'
		}
	)
)

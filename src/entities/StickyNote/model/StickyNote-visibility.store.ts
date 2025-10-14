import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { IToggleStickyNote } from './types'

/**
 * Sticky Note Visibility Store
 * ---
 * Manages the visibility state of sticky notes
 */

export const useToggleStickyNote = create<IToggleStickyNote>()(
	persist(
		set => ({
			isStickyNoteShown: false,
			toggleStickyNote: () => set(state => ({ isStickyNoteShown: !state.isStickyNoteShown })),
			setIsStickyNoteShown: isShown => set({ isStickyNoteShown: isShown })
		}),
		{
			name: 'state_sticky_note'
		}
	)
)

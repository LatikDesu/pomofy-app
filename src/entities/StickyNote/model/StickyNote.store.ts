import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { createStickyNote } from '../lib/createStickyNote'

import type { IStickyNoteState } from './types'

/**
 * Sticky Note Store
 * ---
 * Manages sticky notes created in the tasks section
 */
export const useStickyNote = create<IStickyNoteState>()(
	persist(
		set => ({
			stickyNotes: [],
			addStickyNote: text => {
				set(state => ({
					stickyNotes: [...state.stickyNotes, createStickyNote(text, state.stickyNotes.length)]
				}))
			},
			updateNote: (id, updates) => {
				set(state => ({
					stickyNotes: state.stickyNotes.map(note =>
						note.id === id ? { ...note, ...updates } : note
					)
				}))
			},
			removeNote: id => {
				set(state => ({
					stickyNotes: state.stickyNotes.filter(note => note.id !== id)
				}))
			},
			setStickyNotePosition: (id, position) => {
				set(state => ({
					stickyNotes: state.stickyNotes.map(note =>
						note.id === id
							? {
									...note,
									stickyNotesPosX: position.x,
									stickyNotesPosY: position.y
								}
							: note
					)
				}))
			}
		}),
		{ name: 'user_sticky_notes' }
	)
)

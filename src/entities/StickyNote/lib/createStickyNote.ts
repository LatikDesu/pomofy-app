import { COLOR_OPTIONS, type IStickyNote } from '../model/types'

import { generateStickyNoteId } from './generateStickyNoteId'

/**
 * Creates a new sticky note with default values
 */

const DEFAULT_STICKY_NOTE_POS_X = 165
const DEFAULT_STICKY_NOTE_POS_Y = 0

export function createStickyNote(text: string, existingNotesCount: number): IStickyNote {
	return {
		id: generateStickyNoteId(existingNotesCount),
		text,
		color: COLOR_OPTIONS.Yellow,
		stickyNotesPosX: DEFAULT_STICKY_NOTE_POS_X,
		stickyNotesPosY: DEFAULT_STICKY_NOTE_POS_Y,
		isLocked: false
	}
}

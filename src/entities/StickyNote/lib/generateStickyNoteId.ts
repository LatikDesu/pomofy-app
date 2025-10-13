/**
 * Generates a unique ID for a sticky note
 */
export function generateStickyNoteId(existingNotesCount: number): number {
	return Date.now() + existingNotesCount
}

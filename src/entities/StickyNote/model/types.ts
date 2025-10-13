export const COLOR_OPTIONS = {
	Yellow: '#feff9c',
	Green: '#d1fae5',
	Pink: '#f6ccd7',
	Purple: '#e0bbff',
	Blue: '#a7cdfa'
} as const

export type ColorOption = (typeof COLOR_OPTIONS)[keyof typeof COLOR_OPTIONS]

export interface IStickyNote {
	readonly id: number
	text: string
	color: ColorOption
	stickyNotesPosX: number
	stickyNotesPosY: number
}

export interface IStickyNotePosition {
	readonly x: number
	readonly y: number
}

export interface IStickyNoteUpdate {
	text?: string
	color?: ColorOption
}

export interface IStickyNoteState {
	readonly stickyNotes: readonly IStickyNote[]
	addStickyNote: (text: string) => void
	updateNote: (id: number, updates: IStickyNoteUpdate) => void
	removeNote: (id: number) => void
	setStickyNotePosition: (id: number, position: IStickyNotePosition) => void
}

export interface IToggleStickyNote {
	isStickyNoteShown: boolean
	toggleStickyNote: () => void
	setIsStickyNoteShown: (isShown: boolean) => void
}

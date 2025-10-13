export const Background = {
	SNOW: 0,
	FADE: 1,
	GRADIENT: 2,
	JAPAN: 3,
	COTTAGE: 4,
	LOFIGIRL: 5,
	TRAIN: 6,
	DVD: 7,
	CUSTOM_COLOR: 9,
	NYAN_CAT: 10
} as const

export type Background = (typeof Background)[keyof typeof Background]

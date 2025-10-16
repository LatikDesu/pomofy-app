/**
 * YouTube Constants
 * ---
 * Default YouTube stations and configuration
 */

export const YOUTUBE_DEFAULT_VIDEOS = [
	{
		id: 'jfKfPfyJRdk',
		url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
		title: 'Lofi hip hop Radio',
		thumbnail: 'https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg'
	},
	{
		id: 'vG1OYykhUEo',
		url: 'https://www.youtube.com/watch?v=vG1OYykhUEo',
		title: 'Neon City Radio',
		thumbnail: 'https://i.ytimg.com/vi/vG1OYykhUEo/hqdefault.jpg'
	},
	{
		id: 'wuUrKVnQq_g',
		url: 'https://www.youtube.com/watch?v=wuUrKVnQq_g',
		title: 'Pomo Radio',
		thumbnail: 'https://i.ytimg.com/vi/wuUrKVnQq_g/hqdefault.jpg'
	}
]

export const YOUTUBE_DEFAULT_PLAYLISTS = [
	{
		id: 'default-lofi',
		name: 'Lofi Radio',
		type: 'radio' as const,
		videos: [YOUTUBE_DEFAULT_VIDEOS[0]],
		isDefault: true,
		isRemovable: true
	},
	{
		id: 'default-neon',
		name: 'Neon City Radio',
		type: 'radio' as const,
		videos: [YOUTUBE_DEFAULT_VIDEOS[1]],
		isDefault: true,
		isRemovable: true
	},
	{
		id: 'default-pomo',
		name: 'Pomo Radio',
		type: 'radio' as const,
		videos: [YOUTUBE_DEFAULT_VIDEOS[2]],
		isDefault: true,
		isRemovable: true
	}
]

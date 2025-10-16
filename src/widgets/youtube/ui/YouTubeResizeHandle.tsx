import { Resize } from '@/shared/icons'

interface YouTubeResizeHandleProps {
	onMouseDown: (e: React.MouseEvent) => void
}

export function YouTubeResizeHandle({ onMouseDown }: YouTubeResizeHandleProps) {
	return (
		<div className='absolute right-1 bottom-1 z-20 cursor-nwse-resize' onMouseDown={onMouseDown}>
			<Resize />
		</div>
	)
}

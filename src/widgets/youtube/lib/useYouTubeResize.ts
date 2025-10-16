import { useState } from 'react'

interface Size {
	width: number
	height: number
}

export function useYouTubeResize(initialWidth = 384, initialHeight = 240) {
	const [size, setSize] = useState<Size>({ width: initialWidth, height: initialHeight })

	function handleMouseDown(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		const startX = e.clientX
		const startY = e.clientY
		const startWidth = size.width
		const startHeight = size.height

		function handleMouseMove(e: MouseEvent) {
			const newWidth = Math.max(384, startWidth + (e.clientX - startX))
			const newHeight = Math.max(240, startHeight + (e.clientY - startY))
			setSize({ width: newWidth, height: newHeight })
		}

		function handleMouseUp() {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
		}

		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)
	}

	return {
		size,
		handleMouseDown
	}
}

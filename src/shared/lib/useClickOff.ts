import { useEffect, useRef } from 'react'

export const useClickOff = (callback: () => void) => {
	const innerRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (innerRef.current && !innerRef.current.contains(e.target as Node)) {
				callback()
			}
		}
		document.addEventListener('click', handleClick)
		return () => document.removeEventListener('click', handleClick)
	}, [callback])
	return innerRef
}

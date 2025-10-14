import type { DraggableAttributes } from '@dnd-kit/core'
import { useDraggable } from '@dnd-kit/core'
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'

import { useLockWidgetsStore } from '@/shared/store'

let GLOBAL_Z = 50

interface DragContextType {
	listeners?: SyntheticListenerMap
	attributes?: DraggableAttributes
}

const DragContext = createContext<DragContextType | null>(null)

export function useDragHandle() {
	const context = useContext(DragContext)
	if (!context) {
		return {}
	}
	return { ...context.listeners, ...context.attributes }
}

export const DWrapper = ({
	children,
	toggleHook,
	defaultX,
	defaultY,
	setPosition,
	isSticky,
	stickyID,
	gridValues,
	handle
}: {
	children: any
	toggleHook: boolean
	defaultX: number
	defaultY: number
	setPosition: any
	isSticky: boolean
	stickyID?: number
	gridValues?: number[] | null
	handle?: string
}) => {
	const { areWidgetsLocked } = useLockWidgetsStore()
	const [z, setZIndex] = useState(0)
	const ref = useRef<HTMLDivElement>(null)
	const [savedPosition, setSavedPosition] = useState({ x: defaultX, y: defaultY })
	const lastTransformRef = useRef<{ x: number; y: number } | null>(null)

	const id = useMemo(
		() => `draggable-${isSticky ? `sticky-${stickyID}` : 'widget'}-${Math.random()}`,
		[isSticky, stickyID]
	)

	const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
		id,
		disabled: areWidgetsLocked
	})

	const getFocus = () => {
		setZIndex(++GLOBAL_Z)
	}

	const triggerMouseEvent = (element: HTMLElement, eventType: string) => {
		const mouseEvent = new MouseEvent(eventType, { bubbles: true, cancelable: true })
		element.dispatchEvent(mouseEvent)
	}

	useEffect(() => {
		const listener = () => {
			if (!ref.current) return
			triggerMouseEvent(ref.current, 'mouseover')
			triggerMouseEvent(ref.current, 'mousedown')
			triggerMouseEvent(document as unknown as HTMLElement, 'mousemove')
			triggerMouseEvent(ref.current, 'mouseup')
			triggerMouseEvent(ref.current, 'click')
		}

		addEventListener('resize', listener)
		return () => removeEventListener('resize', listener)
	}, [])

	useEffect(() => {
		if (toggleHook) {
			setZIndex(++GLOBAL_Z)
		}
	}, [toggleHook])

	// Update saved position when defaultX/defaultY change from parent
	useEffect(() => {
		setSavedPosition({ x: defaultX, y: defaultY })
	}, [defaultX, defaultY])

	// Track transform for saving on drag end
	useEffect(() => {
		if (isDragging && transform) {
			lastTransformRef.current = { x: transform.x, y: transform.y }
		}
	}, [isDragging, transform])

	// Save position when drag ends
	useEffect(() => {
		if (!isDragging && lastTransformRef.current) {
			const newX = savedPosition.x + lastTransformRef.current.x
			const newY = savedPosition.y + lastTransformRef.current.y

			let x = newX
			let y = newY

			if (gridValues && gridValues.length === 2) {
				x = Math.round(newX / gridValues[0]) * gridValues[0]
				y = Math.round(newY / gridValues[1]) * gridValues[1]
			}

			setSavedPosition({ x, y })
			lastTransformRef.current = null

			if (isSticky && stickyID !== undefined) {
				setPosition(stickyID, { x, y })
			} else {
				setPosition(x, y)
			}
		}
	}, [isDragging, savedPosition, gridValues, isSticky, stickyID, setPosition])

	// Calculate current position with transform
	const currentX = savedPosition.x + (transform?.x || 0)
	const currentY = savedPosition.y + (transform?.y || 0)

	// Apply grid snapping
	let finalX = currentX
	let finalY = currentY
	if (gridValues && gridValues.length === 2 && transform) {
		finalX = Math.round(currentX / gridValues[0]) * gridValues[0]
		finalY = Math.round(currentY / gridValues[1]) * gridValues[1]
	}

	const style = {
		transform:
			gridValues && transform
				? `translate3d(${finalX}px, ${finalY}px, 0)`
				: `translate3d(${currentX}px, ${currentY}px, 0)`,
		zIndex: z,
		position: 'absolute' as const,
		cursor: handle ? 'default' : areWidgetsLocked ? 'default' : isDragging ? 'grabbing' : 'grab',
		touchAction: 'none',
		display: toggleHook ? 'block' : 'none'
	}

	const rootDragProps = handle ? {} : { ...listeners, ...attributes }
	const content = (
		<div ref={ref} className='inline-block'>
			{children}
		</div>
	)

	return (
		<div
			ref={setNodeRef}
			style={style}
			onMouseDown={getFocus}
			className={isSticky ? '' : 'dcard box dwidth'}
			{...rootDragProps}
		>
			{handle ? (
				<DragContext.Provider value={{ listeners, attributes }}>{content}</DragContext.Provider>
			) : (
				content
			)}
		</div>
	)
}

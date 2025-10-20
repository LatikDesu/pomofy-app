import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/shared/lib/utils'

interface ColorPickerProps {
	isOpen: boolean
	onClose: () => void
	onColorSelect: (color: string) => void
	currentColor: string
	className?: string
}

interface HSL {
	h: number
	s: number
	l: number
}

function hslToHex(h: number, s: number, l: number): string {
	l /= 100
	const a = (s * Math.min(l, 1 - l)) / 100
	const f = (n: number) => {
		const k = (n + h / 30) % 12
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, '0')
	}
	return `#${f(0)}${f(8)}${f(4)}`
}

function hexToHsl(hex: string): HSL {
	const r = parseInt(hex.slice(1, 3), 16) / 255
	const g = parseInt(hex.slice(3, 5), 16) / 255
	const b = parseInt(hex.slice(5, 7), 16) / 255

	const max = Math.max(r, g, b)
	const min = Math.min(r, g, b)
	let h = 0
	let s = 0
	const l = (max + min) / 2

	if (max !== min) {
		const d = max - min
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0)
				break
			case g:
				h = (b - r) / d + 2
				break
			case b:
				h = (r - g) / d + 4
				break
		}
		h /= 6
	}

	return {
		h: Math.round(h * 360),
		s: Math.round(s * 100),
		l: Math.round(l * 100)
	}
}

export function ColorPicker({
	isOpen,
	onClose,
	onColorSelect,
	currentColor,
	className
}: ColorPickerProps) {
	const [hsl, setHsl] = useState<HSL>(() => hexToHsl(currentColor))
	const [hexInput, setHexInput] = useState(currentColor)
	const pickerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		setHsl(hexToHsl(currentColor))
		setHexInput(currentColor)
	}, [currentColor])

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
				onClose()
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen, onClose])

	const handleHueChange = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			const rect = e.currentTarget.getBoundingClientRect()
			const x = e.clientX - rect.left
			const hue = Math.round((x / rect.width) * 360)
			const newHsl = { ...hsl, h: hue }
			setHsl(newHsl)
			const hex = hslToHex(newHsl.h, newHsl.s, newHsl.l)
			setHexInput(hex)
			onColorSelect(hex)
		},
		[hsl, onColorSelect]
	)

	const handleSaturationLightnessChange = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			const rect = e.currentTarget.getBoundingClientRect()
			const x = e.clientX - rect.left
			const y = e.clientY - rect.top
			const saturation = Math.round((x / rect.width) * 100)
			const lightness = Math.round(100 - (y / rect.height) * 100)
			const newHsl = { ...hsl, s: saturation, l: lightness }
			setHsl(newHsl)
			const hex = hslToHex(newHsl.h, newHsl.s, newHsl.l)
			setHexInput(hex)
			onColorSelect(hex)
		},
		[hsl, onColorSelect]
	)

	const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setHexInput(value)

		if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
			setHsl(hexToHsl(value))
			onColorSelect(value)
		}
	}

	if (!isOpen) return null

	return (
		<AnimatePresence>
			<motion.div
				ref={pickerRef}
				initial={{ opacity: 0, scale: 0.95, y: 10 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				exit={{ opacity: 0, scale: 0.95, y: 10 }}
				className={cn(
					'absolute z-50 w-72 rounded-xl border border-[var(--color-secondary-border)] bg-[var(--color-secondary)] p-4 shadow-xl dark:border-[var(--color-default-hover)] dark:bg-[var(--color-default)]',
					'right-full bottom-full mt-2',
					className
				)}
			>
				<h3 className='mb-3 text-sm font-semibold text-[var(--text-secondary)] dark:text-[var(--text-default)]'>
					Выбор цвета
				</h3>

				<div className='space-y-3'>
					{/* Saturation/Lightness picker */}
					<div
						className='relative h-24 w-full cursor-crosshair overflow-hidden rounded-lg'
						style={{
							background: `linear-gradient(to right, #fff, hsl(${hsl.h}, 100%, 50%)), linear-gradient(to top, #000, transparent)`
						}}
						onClick={handleSaturationLightnessChange}
					>
						<div
							className='absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-white shadow-lg'
							style={{
								left: `${hsl.s}%`,
								top: `${100 - hsl.l}%`
							}}
						/>
					</div>

					{/* Hue slider */}
					<div
						className='relative h-3 w-full cursor-pointer overflow-hidden rounded-lg'
						style={{
							background:
								'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)'
						}}
						onClick={handleHueChange}
					>
						<div
							className='absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-white shadow-lg'
							style={{ left: `${(hsl.h / 360) * 100}%` }}
						/>
					</div>

					{/* Current color preview and hex input */}
					<div className='flex items-center gap-2'>
						<div
							className='h-8 w-8 rounded border border-[var(--color-secondary-border)] dark:border-[var(--color-default-hover)]'
							style={{ backgroundColor: hexInput }}
						/>
						<div className='flex-1'>
							<input
								type='text'
								value={hexInput}
								onChange={handleHexInputChange}
								className='w-full rounded border border-[var(--color-secondary-border)] bg-[var(--color-secondary)] px-2 py-1 text-xs text-[var(--text-secondary)] focus:ring-1 focus:ring-[var(--color-secondary-active)] focus:outline-none dark:border-[var(--color-default-hover)] dark:bg-[var(--color-default)] dark:text-[var(--text-default)] dark:focus:ring-[var(--color-default-active)]'
								placeholder='#000000'
							/>
						</div>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	)
}

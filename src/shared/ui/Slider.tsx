import * as SliderPrimitive from '@radix-ui/react-slider'
import * as React from 'react'

import { cn } from '@/shared/lib/utils'

function Slider({
	className,
	defaultValue,
	value,
	min = 0,
	max = 100,
	...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
	const _values = React.useMemo(
		() => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
		[value, defaultValue, min, max]
	)

	return (
		<SliderPrimitive.Root
			data-slot='slider'
			defaultValue={defaultValue}
			value={value}
			min={min}
			max={max}
			className={cn(
				'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
				className
			)}
			{...props}
		>
			<SliderPrimitive.Track
				data-slot='slider-track'
				className={cn(
					'relative grow overflow-hidden rounded-full bg-[var(--color-secondary-border)] data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5 dark:bg-[var(--color-default-hover)]'
				)}
			>
				<SliderPrimitive.Range
					data-slot='slider-range'
					className={cn(
						'absolute bg-[var(--color-secondary-active)] data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full dark:bg-[var(--color-default-active)]'
					)}
				/>
			</SliderPrimitive.Track>
			{Array.from({ length: _values.length }, (_, index) => (
				<SliderPrimitive.Thumb
					data-slot='slider-thumb'
					key={index}
					className='block size-4 shrink-0 rounded-full border-2 border-[var(--color-secondary-active)] bg-[var(--color-secondary)] shadow-sm transition-[color,box-shadow] hover:ring-4 hover:ring-[var(--color-secondary-active)]/20 focus-visible:ring-4 focus-visible:ring-[var(--color-secondary-active)]/20 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:border-[var(--color-default-active)] dark:bg-[var(--color-default)] dark:hover:ring-[var(--color-default-active)]/20 dark:focus-visible:ring-[var(--color-default-active)]/20'
				/>
			))}
		</SliderPrimitive.Root>
	)
}

export { Slider }

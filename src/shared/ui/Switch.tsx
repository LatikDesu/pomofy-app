'use client'

import * as SwitchPrimitive from '@radix-ui/react-switch'
import * as React from 'react'

import { cn } from '@/shared/lib/utils'

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
	return (
		<SwitchPrimitive.Root
			data-slot='switch'
			className={cn(
				'peer focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[var(--color-default-active)] data-[state=unchecked]:bg-[var(--color-secondary-border)] dark:data-[state=unchecked]:bg-[var(--color-default-hover)]',
				className
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot='switch-thumb'
				className={cn(
					'pointer-events-none block size-4 rounded-full bg-[var(--color-background-default)] ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 dark:bg-[var(--color-text-default)]'
				)}
			/>
		</SwitchPrimitive.Root>
	)
}

export { Switch }

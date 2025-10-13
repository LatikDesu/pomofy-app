import React from 'react'

import { useDarkToggleStore } from '../store'

import { NeumorphButton } from './Button'

export const CustomizationButton = (props: {
	title?: string
	icon: React.ReactNode
	changeModal: (value: boolean) => void
	modal: React.ReactNode
}) => {
	const isDark = useDarkToggleStore(state => state.isDark)
	return (
		<div className='relative'>
			<NeumorphButton
				intent={isDark ? 'default' : 'secondary'}
				size='small'
				onClick={() => props.changeModal(true)}
			>
				<div className='flex items-center gap-2'>
					{props.icon}
					{props.title || ''}
				</div>
			</NeumorphButton>
			<div className='absolute top-full right-0 z-999 mt-2'>{props.modal}</div>
		</div>
	)
}

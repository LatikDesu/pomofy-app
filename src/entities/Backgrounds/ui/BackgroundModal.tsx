import { useState } from 'react'
import { TbBackground } from 'react-icons/tb'

import { useDarkToggleStore } from '@/shared/store'
import { NeumorphButton } from '@/shared/ui/Button'

import { BackgroundMenu } from './BackgroundMenu'

export const BackgroundModal = () => {
	const { isDark } = useDarkToggleStore()
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const handleClick = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const handleClose = () => {
		setIsMenuOpen(false)
	}

	return (
		<div className='chooseBackgroundButton relative'>
			<NeumorphButton intent={isDark ? 'default' : 'secondary'} size='small' onClick={handleClick}>
				<TbBackground size={20} />
			</NeumorphButton>
			<div className='absolute top-full right-0 z-999 mt-2'>
				{isMenuOpen && <BackgroundMenu isVisible={isMenuOpen} onClose={handleClose} />}
			</div>
		</div>
	)
}

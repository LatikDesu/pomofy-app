import { useState } from 'react'

import { NeumorphButton } from './Button'

export const SeoToggle = ({ onClick }: { onClick: () => void }) => {
	const [isBgTransparent, setIsBgTransparent] = useState(false)

	const handleClick = () => {
		onClick()
		setIsBgTransparent(!isBgTransparent)
	}

	return (
		<div className='flex justify-center py-4'>
			<NeumorphButton intent='primary' size='small' onClick={handleClick}>
				Скрыть подсказку
			</NeumorphButton>
		</div>
	)
}

import { useEffect, useRef } from 'react'

import { useSetBackground } from '../model/backgrounds.store'
import { Background } from '../model/types'

import { BackgroundDropdownItem } from './BackgroundDropdownItem'

export const BackgroundMenu = ({
	isVisible = false,
	onClose
}: {
	isVisible: boolean
	onClose: any
}) => {
	const { backgroundId, setBackgroundId } = useSetBackground()
	const menuRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		function handleClickOutside(event: any) {
			if (!menuRef.current?.contains(event.target)) {
				onClose()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [menuRef])

	return !isVisible ? null : (
		<div ref={menuRef} className='animate-in fade-in slide-in-from-top-2 duration-200'>
			<div
				className='bg-background-default w-64 origin-top-right overflow-hidden rounded-lg shadow-md focus:outline-none'
				role='menu'
			>
				<div className='space-y-1 p-2'>
					<BackgroundDropdownItem
						isPicked={backgroundId == Background.SNOW}
						setBackgroundId={setBackgroundId}
						background={Background.SNOW}
						title='Снег'
					/>
					<BackgroundDropdownItem
						isPicked={backgroundId == Background.FADE}
						setBackgroundId={setBackgroundId}
						background={Background.FADE}
						title='Блики'
					/>
					<BackgroundDropdownItem
						isPicked={backgroundId == Background.GRADIENT}
						setBackgroundId={setBackgroundId}
						background={Background.GRADIENT}
						title='Градиент'
					/>
					<BackgroundDropdownItem
						isPicked={backgroundId == Background.JAPAN}
						setBackgroundId={setBackgroundId}
						background={Background.JAPAN}
						title='Лето'
					/>
					<BackgroundDropdownItem
						isPicked={backgroundId == Background.COTTAGE}
						setBackgroundId={setBackgroundId}
						background={Background.COTTAGE}
						title='Сказка'
					/>
					<BackgroundDropdownItem
						isPicked={backgroundId == Background.TRAIN}
						setBackgroundId={setBackgroundId}
						background={Background.TRAIN}
						title='Поезд'
					/>
					<BackgroundDropdownItem
						isPicked={backgroundId == Background.CAMPFIRE}
						setBackgroundId={setBackgroundId}
						background={Background.CAMPFIRE}
						title='Костер'
					/>
					{/* <BackgroundDropdownItem
						isPicked={backgroundId == Background.DVD}
						setBackgroundId={setBackgroundId}
						background={Background.DVD}
						title='DVD плеер'
					/> */}
					{/* <BackgroundDropdownItem
						isPicked={backgroundId == Background.NYAN_CAT}
						setBackgroundId={setBackgroundId}
						background={Background.NYAN_CAT}
						title='Nyan Cat'
					/> */}
					<BackgroundDropdownItem
						isPicked={backgroundId == Background.LOFIGIRL}
						setBackgroundId={setBackgroundId}
						background={Background.LOFIGIRL}
						title='Lofi Girl'
					/>
					<BackgroundDropdownItem
						isPicked={backgroundId == Background.CUSTOM_COLOR}
						setBackgroundId={setBackgroundId}
						background={Background.CUSTOM_COLOR}
						title='Свой цвет'
					/>
				</div>
			</div>
		</div>
	)
}

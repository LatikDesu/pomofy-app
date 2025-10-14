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
				className='w-64 origin-top-right overflow-hidden rounded-xl bg-[var(--color-secondary)] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)] ring-1 ring-black/5 backdrop-blur-xl focus:outline-none dark:bg-[var(--color-default)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)] dark:ring-white/10'
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

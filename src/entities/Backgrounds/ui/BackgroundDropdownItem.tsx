import clsx from 'clsx'

import { useSetBackground } from '../model/backgrounds.store'
import { Background } from '../model/types'

export const BackgroundDropdownItem = ({
	isPicked,
	setBackgroundId,
	background,
	title,
	className
}: {
	isPicked: boolean
	setBackgroundId: any
	background: Background
	title: string
	className?: string
}) => {
	return (
		<div
			className={clsx(
				'group text-text-default relative cursor-pointer rounded-lg px-3 py-2.5 transition-all duration-200',
				'hover:bg-hover-default',
				isPicked && 'bg-active-default',
				className
			)}
			onClick={() => setBackgroundId(background)}
		>
			{title === 'Свой цвет' ? (
				<CustomColorPicker />
			) : (
				<div className='flex items-center justify-between'>
					<span
						className={clsx(
							'text-sm font-medium transition-colors',
							isPicked ? 'font-semibold' : ''
						)}
					>
						{title}
					</span>
					{isPicked && (
						<svg className='h-4 w-4' fill='currentColor' viewBox='0 0 20 20'>
							<path
								fillRule='evenodd'
								d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
								clipRule='evenodd'
							/>
						</svg>
					)}
				</div>
			)}
		</div>
	)
}

const colors = ['#000000', '#383838', '#654724', '#312465', '#1F6353', '#652424']
const CustomColorPicker = () => {
	const { backgroundId, backgroundColor, setBackgroundColor, setBackgroundId } = useSetBackground()
	const isUsingCustomBackground = backgroundId === Background.CUSTOM_COLOR

	const handleColorClick = (col: string) => {
		setBackgroundId(Background.CUSTOM_COLOR)
		setBackgroundColor(col)
	}

	return (
		<div className='space-y-2'>
			<div className='flex justify-between'>
				{colors.map(col => (
					<div
						key={col}
						className={clsx(
							'h-7 w-7 cursor-pointer rounded-md transition-all duration-200 hover:scale-103',
							'ring-2 ring-offset-2 ring-offset-gray-200 dark:ring-offset-gray-900',
							isUsingCustomBackground && backgroundColor === col
								? 'ring-border-default scale-103 ring-offset-2'
								: 'hover:ring-border-default ring-transparent'
						)}
						onClick={e => {
							e.stopPropagation()
							handleColorClick(col)
						}}
						style={{ background: col }}
					/>
				))}
			</div>
		</div>
	)
}

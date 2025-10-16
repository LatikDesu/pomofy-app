import * as React from 'react'

export const ArrowSkip = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={24}
		height={24}
		viewBox='0 0 24 24'
		fill='currentColor'
		aria-hidden='true'
		style={{
			pointerEvents: 'none'
		}}
		{...props}
	>
		<path d='M4 4a1 1 0 0 0-1 1v14a1 1 0 1 0 2 0V5a1 1 0 0 0-1-1Zm14.955.23L6 12.003l12.955 7.772A1.35 1.35 0 0 0 21 18.617V5.387a1.35 1.35 0 0 0-2.045-1.157Z' />
	</svg>
)

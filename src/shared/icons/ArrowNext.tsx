import * as React from 'react'

export const ArrowNext = (props: React.SVGProps<SVGSVGElement>) => (
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
		<path d='M20 20a1 1 0 0 0 1-1V5a1 1 0 0 0-2 0v14a1 1 0 0 0 1 1Zm-14.955-.226L18 12 5.045 4.228A1.35 1.35 0 0 0 3 5.386v13.23a1.35 1.35 0 0 0 2.045 1.158Z' />
	</svg>
)

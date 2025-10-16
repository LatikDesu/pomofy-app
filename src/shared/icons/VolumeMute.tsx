import * as React from 'react'

export const VolumeMute = (props: React.SVGProps<SVGSVGElement>) => (
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
		<path d='M11.485 2.143 3.913 6.687A6 6 0 0 0 1 11.832v.338a6 6 0 0 0 2.913 5.144l7.572 4.543A1 1 0 0 0 13 21V3a1.001 1.001 0 0 0-1.515-.857ZM4.942 8.4 11 4.767v14.466l-6.058-3.634A4 4 0 0 1 3 12.169v-.338A4 4 0 0 1 4.942 8.4Zm16.351-.108L19 10.586l-2.293-2.293a1 1 0 1 0-1.414 1.414L17.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L19 13.414l2.293 2.293a1 1 0 1 0 1.414-1.414L20.414 12l2.293-2.294a1 1 0 1 0-1.414-1.414Z' />
	</svg>
)

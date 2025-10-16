import * as React from 'react'

export const VolumeFull = (props: React.SVGProps<SVGSVGElement>) => (
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
		<path d='M11.485 2.143 3.913 6.687A6 6 0 0 0 1 11.832v.338a6 6 0 0 0 2.913 5.144l7.572 4.543A1 1 0 0 0 13 21V3a1.001 1.001 0 0 0-1.515-.857Zm6.88 2.079a1 1 0 0 0-.001 1.414 9 9 0 0 1 0 12.728 1 1 0 0 0 1.414 1.414 11 11 0 0 0 0-15.556 1 1 0 0 0-1.413 0ZM4.941 8.402l.001-.002L11 4.767v14.466l-6.058-3.635A4 4 0 0 1 3 12.168v-.337a4 4 0 0 1 1.941-3.429ZM15.535 7.05a1 1 0 0 0 0 1.415 5 5 0 0 1 0 7.07 1 1 0 0 0 1.415 1.415 6.999 6.999 0 0 0 0-9.9 1 1 0 0 0-1.415 0Z' />
	</svg>
)

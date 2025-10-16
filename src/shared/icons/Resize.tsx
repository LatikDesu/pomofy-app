import * as React from 'react'

export const Resize = (props: React.SVGProps<SVGSVGElement>) => (
	<svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} {...props}>
		<path
			d='M22 22h-2v-2h2v2m0-4h-2v-2h2v2m-4 4h-2v-2h2v2m0-4h-2v-2h2v2m-4 4h-2v-2h2v2m8-8h-2v-2h2v2Z'
			fill='#8c8885'
		/>
	</svg>
)

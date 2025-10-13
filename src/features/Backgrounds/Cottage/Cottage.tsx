import cottage from '@/shared/assets/videos/cottage.mp4'

import '../Backgrounds.scss'

export const Cottage = () => {
	return (
		<div className='background-container'>
			<video autoPlay muted loop id='cottageVideo'>
				<source src={cottage} type='video/mp4' />
			</video>
		</div>
	)
}

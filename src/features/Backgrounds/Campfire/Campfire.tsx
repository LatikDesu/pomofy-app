import campfireVideo from '@/shared/assets/videos/campfire.mp4'

import '../Backgrounds.scss'

export const Campfire = () => {
	return (
		<div className='background-container'>
			<video autoPlay muted loop id='campfireVideo'>
				<source src={campfireVideo} type='video/mp4' />
			</video>
		</div>
	)
}

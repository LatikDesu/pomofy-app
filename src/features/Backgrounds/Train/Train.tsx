import trainVideo from '@/shared/assets/videos/train.mp4'

import '../Backgrounds.scss'

export const Train = () => {
	return (
		<div className='background-container'>
			<video autoPlay muted loop id='train-video'>
				<source src={trainVideo} type='video/mp4' />
			</video>
		</div>
	)
}

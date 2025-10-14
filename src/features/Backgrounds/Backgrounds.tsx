import { Campfire } from './Campfire/Campfire'
import { Cottage } from './Cottage/Cottage'
import { CustomColor } from './CustomColor/CustomColor'
import { DvdPlayer } from './Dvd/DvdPlayer'
import { Fade } from './Fade/Fade'
import { Gradient } from './Gradient/Gradient'
import { Japan } from './Japan/Japan'
import { LofiGirl } from './LofiGirl/LofiGirl'
import NyanCat from './NyanCat/NyanCat'
import { Snow } from './Snow/Snow'
import { Train } from './Train/Train'
import { Background, useSetBackground } from '@/entities/Backgrounds'

const BackgroundComponents = {
	[Background.SNOW]: Snow,
	[Background.FADE]: Fade,
	[Background.GRADIENT]: Gradient,
	[Background.JAPAN]: Japan,
	[Background.COTTAGE]: Cottage,
	[Background.LOFIGIRL]: LofiGirl,
	[Background.TRAIN]: Train,
	[Background.CAMPFIRE]: Campfire,
	[Background.DVD]: DvdPlayer,
	[Background.NYAN_CAT]: NyanCat,
	[Background.CUSTOM_COLOR]: CustomColor
}

export const Backgrounds = () => {
	const { backgroundId } = useSetBackground()

	const BackgroundComp = BackgroundComponents[backgroundId] as React.ComponentType<any>
	return (
		<div className='fixed inset-0 bg-black'>
			<BackgroundComp />
		</div>
	)
}

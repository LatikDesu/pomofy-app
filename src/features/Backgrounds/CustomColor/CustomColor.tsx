import { useSetBackground } from '@/entities/Backgrounds'

export const CustomColor = () => {
	const { backgroundColor } = useSetBackground()
	return <div className='h-screen' style={{ backgroundColor }}></div>
}

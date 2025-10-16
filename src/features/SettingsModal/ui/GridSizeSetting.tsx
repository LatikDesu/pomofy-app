import { useGrid } from '@/shared/store'
import { Slider } from '@/shared/ui'

export const GridSizeSetting = () => {
	const { grid, setGrid } = useGrid()

	function onGridChange(value: number) {
		if (value == 0) {
			setGrid(null)
			return
		}
		setGrid([value, value])
	}

	return (
		<div className='space-y-2.5'>
			<label className='flex items-center gap-1.5 text-xs font-medium'>Размер сетки</label>
			<Slider
				value={grid ? [grid[0]] : [0]}
				onValueChange={value => onGridChange(value[0])}
				step={32}
				min={0}
				max={128}
				className='pb-1'
				classNames={{
					track: 'h-1.5'
				}}
			/>
			<div className='mt-2 text-center text-xs'>{grid ? `${grid[0]}px` : 'Отключена'}</div>
		</div>
	)
}

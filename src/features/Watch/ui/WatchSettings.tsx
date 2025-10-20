import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Pipette, Settings } from 'lucide-react'
import { useRef, useState } from 'react'

import { cn } from '@/shared/lib/utils'
import {
	Checkbox,
	ColorPicker,
	PopoverBody,
	PopoverContent,
	PopoverHeader,
	PopoverRoot,
	PopoverTrigger
} from '@/shared/ui'

import { getDateFormatList, getTimezoneList, useWatch } from '@/entities/Watch'

/**
 * Watch Settings Component
 * ---
 * Popover with watch configuration options
 */

export function WatchSettings() {
	const { settings, updateSettings } = useWatch()
	const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
	const colorPickerButtonRef = useRef<HTMLButtonElement>(null)

	const timezones = getTimezoneList()
	const dateFormats = getDateFormatList()

	const fontSizes = [
		{ value: 'small', label: 'Маленький' },
		{ value: 'medium', label: 'Средний' },
		{ value: 'large', label: 'Большой' },
		{ value: 'extra-large', label: 'Очень большой' }
	] as const

	const timeFormats = [
		{ value: '24h', label: '24 часа' },
		{ value: '12h', label: '12 часов' }
	] as const

	const predefinedColors = ['#ffffff', '#000000', '#3b82f6', '#f59e0b', '#6b7280']

	const handleColorSelect = (color: string) => {
		updateSettings({ color })
	}

	const handleOpenColorPicker = () => {
		setIsColorPickerOpen(true)
	}

	return (
		<PopoverRoot>
			<PopoverTrigger className='!-mr-3 h-0 !border-none hover:!bg-transparent'>
				<Settings className='cursor-pointer !text-[var(--color-default)]' size={18} />
			</PopoverTrigger>
			<PopoverContent className='!-right-6.5 h-auto w-[380px]'>
				<div className='flex items-center justify-between px-4 py-3'>
					<PopoverHeader className='!p-0 font-bold'>Настройки часов</PopoverHeader>
				</div>
				<PopoverBody className='space-y-2.5 !pt-0'>
					<hr className='border-t border-[var(--color-secondary-border)] dark:border-[var(--color-default-hover)]' />
					{/* Timezone Selection */}
					<div className='grid grid-cols-9 items-center gap-2'>
						<label className='col-span-3 text-xs font-medium text-[var(--text-secondary)] dark:text-[var(--text-default)]'>
							Часовой пояс
						</label>
						<div className='relative col-span-6'>
							<select
								value={settings.timezone}
								onChange={e => updateSettings({ timezone: e.target.value })}
								className='w-full appearance-none rounded-md border border-[var(--color-secondary-border)] bg-[var(--color-secondary)] py-2 pr-8 pl-3 text-xs text-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--color-secondary-active)] focus:outline-none dark:border-[var(--color-default-hover)] dark:bg-[var(--color-default)] dark:text-[var(--text-default)] dark:focus:ring-[var(--color-default-active)]'
							>
								{timezones.map(tz => (
									<option key={tz.value} value={tz.value}>
										{tz.label}
									</option>
								))}
							</select>
							<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
								<svg
									className='h-4 w-4 text-[var(--text-secondary)] dark:text-[var(--text-default)]'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M19 9l-7 7-7-7'
									/>
								</svg>
							</div>
						</div>
					</div>
					{/* City Input */}
					<div className='grid grid-cols-9 items-center gap-2'>
						<label className='col-span-3 text-xs font-medium text-[var(--text-secondary)] dark:text-[var(--text-default)]'>
							Город
						</label>
						<input
							type='text'
							value={settings.city === 'auto' ? '' : settings.city}
							onChange={e =>
								updateSettings({
									city: e.target.value.trim() || 'auto'
								})
							}
							placeholder='Автоматически'
							className='col-span-6 rounded-md border border-[var(--color-secondary-border)] bg-[var(--color-secondary)] p-2 text-xs text-[var(--text-secondary)] placeholder:text-[var(--text-secondary)]/50 focus:ring-2 focus:ring-[var(--color-secondary-active)] focus:outline-none dark:border-[var(--color-default-hover)] dark:bg-[var(--color-default)] dark:text-[var(--text-default)] dark:placeholder:text-[var(--text-default)]/50 dark:focus:ring-[var(--color-default-active)]'
						/>
					</div>
					{/* Weather Toggle */}
					<div className='grid grid-cols-9 items-center pt-2'>
						<label className='col-span-3 text-xs font-medium text-[var(--text-secondary)] dark:text-[var(--text-default)]'>
							Погода
						</label>
						<Checkbox
							checked={settings.showWeather}
							onCheckedChange={(checked: CheckboxPrimitive.CheckedState) =>
								updateSettings({
									showWeather: checked === true
								})
							}
							className='col-span-6'
						/>
					</div>

					<hr className='border-t border-[var(--color-secondary-border)] dark:border-[var(--color-default-hover)]' />

					{/* Time Format */}
					<div className='grid grid-cols-9 items-center gap-2'>
						<label className='col-span-3 text-xs font-medium text-[var(--text-secondary)] dark:text-[var(--text-default)]'>
							Формат времени
						</label>
						<div className='relative col-span-6'>
							<select
								value={settings.timeFormat}
								onChange={e =>
									updateSettings({
										timeFormat: e.target.value as any
									})
								}
								className='w-full appearance-none rounded-md border border-[var(--color-secondary-border)] bg-[var(--color-secondary)] py-2 pr-8 pl-3 text-xs text-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--color-secondary-active)] focus:outline-none dark:border-[var(--color-default-hover)] dark:bg-[var(--color-default)] dark:text-[var(--text-default)] dark:focus:ring-[var(--color-default-active)]'
							>
								{timeFormats.map(format => (
									<option key={format.value} value={format.value}>
										{format.label}
									</option>
								))}
							</select>
							<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
								<svg
									className='h-4 w-4 text-[var(--text-secondary)] dark:text-[var(--text-default)]'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M19 9l-7 7-7-7'
									/>
								</svg>
							</div>
						</div>
					</div>

					{/* Font Size */}
					<div className='grid grid-cols-9 items-center gap-2'>
						<label className='col-span-3 text-xs font-medium text-[var(--text-secondary)] dark:text-[var(--text-default)]'>
							Размер шрифта
						</label>
						<div className='relative col-span-6'>
							<select
								value={settings.fontSize}
								onChange={e =>
									updateSettings({
										fontSize: e.target.value as any
									})
								}
								className='w-full appearance-none rounded-md border border-[var(--color-secondary-border)] bg-[var(--color-secondary)] py-2 pr-8 pl-3 text-xs text-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--color-secondary-active)] focus:outline-none dark:border-[var(--color-default-hover)] dark:bg-[var(--color-default)] dark:text-[var(--text-default)] dark:focus:ring-[var(--color-default-active)]'
							>
								{fontSizes.map(size => (
									<option key={size.value} value={size.value}>
										{size.label}
									</option>
								))}
							</select>
							<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
								<svg
									className='h-4 w-4 text-[var(--text-secondary)] dark:text-[var(--text-default)]'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M19 9l-7 7-7-7'
									/>
								</svg>
							</div>
						</div>
					</div>

					{/* Color Selection */}
					<div className='grid grid-cols-9 items-center gap-2 py-1.5'>
						<label className='col-span-3 text-xs font-medium text-[var(--text-secondary)] dark:text-[var(--text-default)]'>
							Цвет
						</label>
						<div className='col-span-6 flex flex-wrap gap-3'>
							{predefinedColors.map(color => (
								<button
									key={color}
									onClick={() => updateSettings({ color })}
									className={cn(
										'h-7 w-7 cursor-pointer rounded-md transition-all duration-200 hover:scale-110',
										'ring-2 ring-offset-2 ring-offset-gray-200 dark:ring-offset-gray-900',
										settings.color === color
											? 'scale-105 ring-[var(--color-secondary-border)] ring-offset-2'
											: 'ring-transparent hover:ring-[var(--color-secondary-border)]'
									)}
									style={{ backgroundColor: color }}
									title={`Цвет ${color}`}
								/>
							))}
							{/* Color picker button */}
							<div className='relative'>
								<button
									ref={colorPickerButtonRef}
									onClick={handleOpenColorPicker}
									className={cn(
										'flex h-7 w-7 cursor-pointer items-center justify-center rounded-md transition-all duration-200 hover:scale-110',
										'ring-2 ring-offset-2 dark:ring-offset-gray-900',
										'bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] dark:bg-[var(--color-default)] dark:hover:bg-[var(--color-default-hover)]',
										'ring-transparent hover:ring-[var(--color-secondary-border)]'
									)}
									title='Открыть палитру цветов'
								>
									<Pipette
										size={14}
										className='text-[var(--text-secondary)] dark:text-[var(--text-default)]'
									/>
								</button>

								{/* Color Picker Popover */}
								<ColorPicker
									isOpen={isColorPickerOpen}
									onClose={() => setIsColorPickerOpen(false)}
									onColorSelect={handleColorSelect}
									currentColor={settings.color}
								/>
							</div>
						</div>
					</div>

					<hr className='border-t border-[var(--color-secondary-border)] dark:border-[var(--color-default-hover)]' />

					{/* Date Format */}
					<div>
						<label className='mb-2 block text-xs font-medium text-[var(--text-secondary)] dark:text-[var(--text-default)]'>
							Формат даты{' '}
							<span className='mt-1 text-xs text-[var(--text-secondary)]/70 dark:text-[var(--text-default)]/70'>
								(используйте{' '}
								<a
									href='https://strftime.org/'
									target='_blank'
									rel='noopener noreferrer'
									className='text-blue-500 hover:underline'
								>
									strftime.org
								</a>
								)
							</span>
						</label>
						<div className='relative'>
							<select
								value={settings.dateFormat}
								onChange={e =>
									updateSettings({
										dateFormat: e.target.value
									})
								}
								className='w-full appearance-none rounded-md border border-[var(--color-secondary-border)] bg-[var(--color-secondary)] py-2 pr-8 pl-3 text-xs text-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--color-secondary-active)] focus:outline-none dark:border-[var(--color-default-hover)] dark:bg-[var(--color-default)] dark:text-[var(--text-default)] dark:focus:ring-[var(--color-default-active)]'
							>
								{dateFormats.map(format => (
									<option key={format.value} value={format.value}>
										{format.label} - {format.example}
									</option>
								))}
							</select>
							<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
								<svg
									className='h-4 w-4 text-[var(--text-secondary)] dark:text-[var(--text-default)]'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M19 9l-7 7-7-7'
									/>
								</svg>
							</div>
						</div>
						<div className='mt-2'>
							<label className='mb-1 block text-xs font-medium text-[var(--text-secondary)] dark:text-[var(--text-default)]'>
								или введите свой формат:
							</label>
							<input
								type='text'
								value={settings.dateFormat}
								onChange={e =>
									updateSettings({
										dateFormat: e.target.value
									})
								}
								placeholder='%d.%m.%Y'
								className='w-full rounded-md border border-[var(--color-secondary-border)] bg-[var(--color-secondary)] p-2 text-xs text-[var(--text-secondary)] placeholder:text-[var(--text-secondary)]/50 focus:ring-2 focus:ring-[var(--color-secondary-active)] focus:outline-none dark:border-[var(--color-default-hover)] dark:bg-[var(--color-default)] dark:text-[var(--text-default)] dark:placeholder:text-[var(--text-default)]/50 dark:focus:ring-[var(--color-default-active)]'
							/>
						</div>
					</div>
				</PopoverBody>
			</PopoverContent>
		</PopoverRoot>
	)
}

import { Loader2, WifiOff } from 'lucide-react'

import { Button } from '@/shared/ui'

interface YouTubeUnavailablePlaceholderProps {
	onRetry: () => void
	isMiniMode?: boolean
	isChecking?: boolean
}

export function YouTubeUnavailablePlaceholder({
	onRetry,
	isMiniMode = false,
	isChecking = false
}: YouTubeUnavailablePlaceholderProps) {
	return (
		<div className='flex h-full flex-col items-center justify-center rounded-lg bg-black/20 p-4 text-[var(--color-default)] dark:text-[var(--color-secondary)]'>
			{isChecking ? (
				<>
					<Loader2 className='mb-2 h-8 w-8 animate-spin' />
					<p className='text-center text-sm'>Проверка соединения...</p>
				</>
			) : (
				<>
					<WifiOff className='mb-2 h-8 w-8' />
					<p className='pb-2 text-center text-sm'>
						{isMiniMode ? 'YouTube недоступен' : 'Не удалось подключиться к YouTube'}
					</p>
					{!isMiniMode && (
						<p className='mt-1 pb-4 text-center text-xs'>Проверьте ваше интернет-соединение</p>
					)}
					<Button
						type='button'
						variant='outline'
						className='h-8 border border-[var(--color-secondary-border)] bg-[var(--color-secondary-disabled)] text-sm hover:bg-[var(--color-secondary-hover)] dark:border-[var(--color-default-hover)] dark:bg-[var(--color-default)] dark:hover:bg-[var(--color-default-hover)]'
						onClick={onRetry}
					>
						Попробовать снова
					</Button>
				</>
			)}
		</div>
	)
}

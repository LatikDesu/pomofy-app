import { useState } from 'react'

import { failureToast, successToast } from '@/shared/lib/toast'
import { Button } from '@/shared/ui'

import { parseYandexIframe } from '../lib/parseYandexIframe'

import { useYandexPlaylists } from '@/entities/YandexMusic'

export function AddPlaylistForm() {
	const [iframeCode, setIframeCode] = useState('')
	const [isAdding, setIsAdding] = useState(false)
	const { addPlaylist } = useYandexPlaylists()

	function handleAdd() {
		const result = parseYandexIframe(iframeCode)

		if (!result.success) {
			failureToast(result.error || 'Ошибка парсинга', false)
			return
		}

		addPlaylist(result.name!, result.url!)
		successToast('Плейлист добавлен', true)
		setIframeCode('')
		setIsAdding(false)
	}

	function handleCancel() {
		setIsAdding(false)
		setIframeCode('')
	}

	if (!isAdding) {
		return (
			<Button
				type='button'
				variant='outline'
				className='w-full border border-[var(--color-secondary-border)] hover:bg-[var(--color-secondary-hover)] dark:border-[var(--color-default-hover)] dark:hover:bg-[var(--color-default-hover)]'
				onClick={() => setIsAdding(true)}
			>
				Добавить плейлист
			</Button>
		)
	}

	return (
		<div className='space-y-1.5'>
			<div className='rounded-lg bg-[var(--color-secondary)] p-2 text-[11px] leading-relaxed dark:bg-[var(--color-default)]'>
				<p className='mb-1 font-medium'>Как добавить плейлист:</p>
				<ol className='ml-3 list-decimal space-y-0.5 text-[10px] opacity-80'>
					<li>Откройте плейлист на music.yandex.ru</li>
					<li>Нажмите «Поделиться» → «HTML-код»</li>
					<li>Скопируйте код и вставьте ниже</li>
				</ol>
			</div>
			<textarea
				className='cancelDrag w-full rounded-lg border border-[var(--color-secondary-border)] bg-transparent p-2 text-sm placeholder-gray-400 dark:border-[var(--color-default-hover)]'
				placeholder='Вставьте код iframe из Яндекс.Музыки...'
				rows={3}
				value={iframeCode}
				onChange={e => setIframeCode(e.target.value)}
			/>
			<div className='flex gap-2'>
				<Button
					type='button'
					variant='ghost'
					size='sm'
					className='w-full flex-1 border border-[var(--color-secondary-border)] hover:bg-[var(--color-secondary-hover)] dark:border-[var(--color-default-hover)] dark:hover:bg-[var(--color-default-hover)]'
					onClick={handleCancel}
				>
					Отмена
				</Button>
				<Button
					type='button'
					variant='ghost'
					size='sm'
					className='w-full flex-1 border border-[var(--color-secondary-border)] hover:bg-[var(--color-secondary-hover)] dark:border-[var(--color-default-hover)] dark:hover:bg-[var(--color-default-hover)]'
					onClick={handleAdd}
				>
					Добавить
				</Button>
			</div>
		</div>
	)
}

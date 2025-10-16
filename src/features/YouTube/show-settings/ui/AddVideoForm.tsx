import { useState } from 'react'

import {
	extractPlaylistId,
	extractVideoId,
	getPlaylistVideos,
	getVideoDetails,
	isRadioPlaylist,
	parseISO8601Duration
} from '@/shared/api/youtube.api'
import { failureToast, successToast } from '@/shared/lib/toast'
import { Button } from '@/shared/ui'

import type { YouTubeVideo } from '@/entities/YouTube'
import { useYouTubePlaylists } from '@/entities/YouTube'

export function AddVideoForm() {
	const [mode, setMode] = useState<'none' | 'radio' | 'playlist'>('none')
	const [name, setName] = useState('')
	const [url, setUrl] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const { createRadio, addDynamicPlaylist } = useYouTubePlaylists()

	async function handleCreateRadio() {
		if (!name.trim()) {
			failureToast('Введите название радио', false)
			return
		}

		if (!url.trim()) {
			failureToast('Введите URL видео', false)
			return
		}

		const videoId = extractVideoId(url)
		if (!videoId) {
			failureToast('Неверная ссылка на YouTube видео', false)
			return
		}

		setIsLoading(true)
		try {
			const videoDetails = await getVideoDetails(videoId)

			if (!videoDetails) {
				failureToast('Не удалось получить данные видео', false)
				return
			}

			const video: YouTubeVideo = {
				id: videoDetails.id,
				url: `https://www.youtube.com/watch?v=${videoDetails.id}`,
				title: videoDetails.title,
				thumbnail: videoDetails.thumbnail,
				duration: parseISO8601Duration(videoDetails.duration)
			}

			createRadio(name, video)
			successToast(`Радио "${name}" создано`, true)
			handleCancel()
		} catch (error) {
			failureToast('Ошибка при создании радио', false)
		} finally {
			setIsLoading(false)
		}
	}

	async function handleAddPlaylist() {
		if (!name.trim()) {
			failureToast('Введите название плейлиста', false)
			return
		}

		const playlistId = extractPlaylistId(url)
		if (!playlistId) {
			failureToast('Неверная ссылка на плейлист', false)
			return
		}

		// YouTube Music радио-плейлисты (RD...) недоступны через API
		if (isRadioPlaylist(playlistId)) {
			failureToast(
				'YouTube Music радио-плейлисты недоступны. Используйте обычные плейлисты YouTube.',
				false
			)
			return
		}

		setIsLoading(true)
		try {
			// Проверяем что плейлист существует
			const videos = await getPlaylistVideos(playlistId, 1)
			if (!videos || videos.length === 0) {
				failureToast('Плейлист пуст или не найден', false)
				return
			}

			addDynamicPlaylist(name, playlistId)
			successToast(`Плейлист "${name}" добавлен`, true)
			handleCancel()
		} catch (error) {
			failureToast('Ошибка при добавлении плейлиста', false)
		} finally {
			setIsLoading(false)
		}
	}

	function handleCancel() {
		setMode('none')
		setName('')
		setUrl('')
	}

	if (mode === 'none') {
		return (
			<>
				<div className='flex flex-col gap-2'>
					<Button
						type='button'
						variant='outline'
						className='border border-[var(--color-secondary-border)] hover:bg-[var(--color-secondary-hover)] dark:border-[var(--color-default-hover)] dark:hover:bg-[var(--color-default-hover)]'
						onClick={() => setMode('radio')}
					>
						Создать радио
					</Button>
					<Button
						type='button'
						variant='outline'
						className='border border-[var(--color-secondary-border)] hover:bg-[var(--color-secondary-hover)] dark:border-[var(--color-default-hover)] dark:hover:bg-[var(--color-default-hover)]'
						onClick={() => setMode('playlist')}
					>
						Добавить плейлист
					</Button>
				</div>
			</>
		)
	}

	const isRadioMode = mode === 'radio'

	return (
		<div className='space-y-2'>
			<div className='rounded-lg bg-[var(--color-secondary)] p-2 text-[11px] leading-relaxed dark:bg-[var(--color-default)]'>
				<p className='mb-1 font-medium'>
					{isRadioMode ? 'Создание радио:' : 'Добавление плейлиста:'}
				</p>
				<ul className='ml-3 list-disc space-y-0.5 text-[10px] opacity-80'>
					{isRadioMode ? (
						<>
							<li>Радио воспроизводит одно видео/стрим в цикле</li>
							<li>Можно использовать для стримов, подкастов и т.д.</li>
						</>
					) : (
						<>
							<li>Плейлист загружает видео из YouTube</li>
							<li>Всегда актуальный контент</li>
						</>
					)}
				</ul>
			</div>

			<input
				type='text'
				className='cancelDrag w-full rounded-lg border border-[var(--color-secondary-border)] bg-transparent p-2 text-sm placeholder-gray-400 dark:border-[var(--color-default-hover)]'
				placeholder='Название'
				value={name}
				onChange={e => setName(e.target.value)}
				disabled={isLoading}
			/>

			<input
				type='text'
				className='cancelDrag w-full rounded-lg border border-[var(--color-secondary-border)] bg-transparent p-2 text-sm placeholder-gray-400 dark:border-[var(--color-default-hover)]'
				placeholder={
					isRadioMode ? 'https://youtube.com/watch?v=...' : 'https://youtube.com/playlist?list=...'
				}
				value={url}
				onChange={e => setUrl(e.target.value)}
				disabled={isLoading}
			/>

			<div className='flex gap-2'>
				<Button
					type='button'
					variant='ghost'
					size='sm'
					className='flex-1 border border-[var(--color-secondary-border)] hover:bg-[var(--color-secondary-hover)] dark:border-[var(--color-default-hover)] dark:hover:bg-[var(--color-default-hover)]'
					onClick={handleCancel}
					disabled={isLoading}
				>
					Отмена
				</Button>
				<Button
					type='button'
					variant='ghost'
					size='sm'
					className='flex-1 border border-[var(--color-secondary-border)] hover:bg-[var(--color-secondary-hover)] dark:border-[var(--color-default-hover)] dark:hover:bg-[var(--color-default-hover)]'
					onClick={isRadioMode ? handleCreateRadio : handleAddPlaylist}
					disabled={isLoading}
				>
					{isLoading ? 'Загрузка...' : isRadioMode ? 'Создать' : 'Добавить'}
				</Button>
			</div>
		</div>
	)
}

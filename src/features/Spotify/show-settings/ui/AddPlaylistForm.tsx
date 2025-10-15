import { useState } from 'react'

import { LINKS } from '@/shared/constants'
import { failureToast, successToast } from '@/shared/lib/toast'
import { Button } from '@/shared/ui'

import { parseSpotifyUrl } from '../lib/parseSpotifyUrl'

import { useSpotifyPlaylists } from '@/entities/Spotify'

export function AddPlaylistForm() {
	const [playlistUrl, setPlaylistUrl] = useState('')
	const [playlistName, setPlaylistName] = useState('')
	const [isAdding, setIsAdding] = useState(false)
	const { addPlaylist } = useSpotifyPlaylists()

	function handleAdd() {
		if (!playlistName.trim()) {
			failureToast('Введите название плейлиста', false)
			return
		}

		const embedUrl = parseSpotifyUrl(playlistUrl)

		if (!embedUrl) {
			failureToast('Неверная ссылка на Spotify плейлист', false)
			return
		}

		addPlaylist(playlistName, embedUrl)
		successToast('Плейлист добавлен', true)
		setPlaylistUrl('')
		setPlaylistName('')
		setIsAdding(false)
	}

	function handleCancel() {
		setIsAdding(false)
		setPlaylistUrl('')
		setPlaylistName('')
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
					<li>
						Откройте плейлист на{' '}
						<a href={LINKS.SPOTIFY} target='_blank'>
							open.spotify.com{' '}
						</a>
					</li>
					<li>Скопируйте URL из адресной строки</li>
					<li>Вставьте ссылку и введите название</li>
				</ol>
			</div>
			<input
				type='text'
				className='cancelDrag w-full rounded-lg border border-[var(--color-secondary-border)] bg-transparent p-2 text-sm placeholder-gray-400 dark:border-[var(--color-default-hover)]'
				placeholder='Название плейлиста...'
				value={playlistName}
				onChange={e => setPlaylistName(e.target.value)}
			/>
			<input
				type='text'
				className='cancelDrag w-full rounded-lg border border-[var(--color-secondary-border)] bg-transparent p-2 text-sm placeholder-gray-400 dark:border-[var(--color-default-hover)]'
				placeholder='https://open.spotify.com/playlist/...'
				value={playlistUrl}
				onChange={e => setPlaylistUrl(e.target.value)}
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

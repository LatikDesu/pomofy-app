import { Search } from 'lucide-react'
import { useState } from 'react'

import type { YouTubeSearchResult } from '@/shared/api/youtube.api'
import { formatDuration, parseISO8601Duration, searchYouTubeVideos } from '@/shared/api/youtube.api'
import { Button, Modal, ModalBody, ModalContent, ModalTrigger, useModal } from '@/shared/ui'

import type { YouTubeVideo } from '@/entities/YouTube'
import { useYouTubePlayer, useYouTubePlaylists } from '@/entities/YouTube'

function SearchVideoContent() {
	const [query, setQuery] = useState('')
	const [results, setResults] = useState<YouTubeSearchResult[]>([])
	const [isSearching, setIsSearching] = useState(false)
	const { playTemporaryVideo } = useYouTubePlaylists()
	const { setPlaying } = useYouTubePlayer()
	const { setOpen } = useModal()

	async function handleSearch() {
		if (!query.trim()) {
			return
		}

		setIsSearching(true)
		setResults([])
		try {
			const searchResults = await searchYouTubeVideos(query, 15)
			setResults(searchResults)
		} finally {
			setIsSearching(false)
		}
	}

	function handlePlayVideo(result: YouTubeSearchResult) {
		const video: YouTubeVideo = {
			id: result.id,
			url: `https://www.youtube.com/watch?v=${result.id}`,
			title: result.title,
			thumbnail: result.thumbnail,
			duration: parseISO8601Duration(result.duration)
		}
		playTemporaryVideo(video)
		setPlaying(true)
		handleClose()
		setOpen(false)
	}

	function handleClose() {
		setQuery('')
		setResults([])
	}

	return (
		<>
			<ModalTrigger asChild>
				<Search size={18} />
			</ModalTrigger>
			<ModalBody className='w-full max-w-2xl'>
				<ModalContent className='pr-4'>
					<div className='mb-4'>
						<h2 className='text-lg font-bold'>Поиск видео на YouTube</h2>
					</div>

					<div className='mb-4 flex items-center gap-2'>
						<input
							type='text'
							className='flex-1 rounded-lg border border-[var(--color-secondary-border)] bg-transparent px-3 py-2 text-sm focus:ring-2 focus:ring-[var(--color-secondary-active)] focus:outline-none dark:border-[var(--color-default-hover)] dark:focus:ring-[var(--color-default-active)]'
							placeholder='Введите запрос...'
							value={query}
							onChange={e => setQuery(e.target.value)}
							onKeyDown={e => e.key === 'Enter' && handleSearch()}
							autoFocus
						/>
						<Button
							type='button'
							variant='outline'
							className='border border-[var(--color-secondary-border)] hover:bg-[var(--color-secondary-hover)] dark:border-[var(--color-default-hover)] dark:hover:bg-[var(--color-default-hover)]'
							onClick={handleSearch}
							disabled={isSearching}
						>
							<Search className='h-4 w-4' />
						</Button>
					</div>

					<div className='sticky-note-scrollbar max-h-[500px] space-y-2 overflow-y-auto pr-2'>
						{isSearching && (
							<div className='py-8 text-center text-sm opacity-60'>Поиск видео...</div>
						)}

						{/* {!isSearching && results.length === 0 && query && (
							<div className='py-8 text-center text-sm opacity-60'>
								Видео не найдены. Попробуйте другой запрос.
							</div>
						)} */}

						{/* {!isSearching && results.length === 0 && !query && (
							<div className='py-8 text-center text-sm opacity-60'>Введите запрос для поиска видео</div>
						)} */}

						{results.map(result => (
							<div
								key={result.id}
								className='flex gap-3 rounded-lg border border-[var(--color-secondary-border)] p-2 transition-colors dark:border-[var(--color-default-hover)]'
							>
								<img
									src={result.thumbnail}
									alt={result.title}
									className='h-20 w-32 rounded object-cover'
								/>
								<div className='flex flex-1 flex-col justify-between'>
									<div>
										<h3 className='line-clamp-2 text-sm font-medium'>{result.title}</h3>
										<p className='text-xs opacity-60'>{result.channelTitle}</p>
									</div>
									{result.duration && (
										<p className='text-xs opacity-60'>{formatDuration(result.duration)}</p>
									)}
								</div>
								<Button
									type='button'
									variant='ghost'
									size='sm'
									className='self-center border border-[var(--color-secondary-border)] hover:bg-[var(--color-secondary-hover)] dark:border-[var(--color-default-hover)] dark:hover:bg-[var(--color-default-hover)]'
									onClick={() => handlePlayVideo(result)}
								>
									Воспроизвести
								</Button>
							</div>
						))}
					</div>
				</ModalContent>
			</ModalBody>
		</>
	)
}

export function SearchVideoDialog() {
	return (
		<Modal>
			<SearchVideoContent />
		</Modal>
	)
}

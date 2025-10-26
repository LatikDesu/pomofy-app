import { Pencil } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { LINKS } from '@/shared/constants'
import { Input, Select } from '@/shared/ui'
import { SubmitButton } from '@/shared/ui/SubmitButton'

import { type IQuickLink, useQuickLinks, useQuickLinksSettings } from '@/entities/QuickLinks'

interface EditLinkFormProps {
	link: IQuickLink
}

export function EditLinkForm({ link }: EditLinkFormProps) {
	const { updateLink, groups } = useQuickLinks()
	const { isGroupingEnabled } = useQuickLinksSettings()
	const [isOpen, setIsOpen] = useState(false)
	const [title, setTitle] = useState(link.title)
	const [url, setUrl] = useState(link.url)
	const [icon, setIcon] = useState(link.icon)
	const [groupId, setGroupId] = useState<string | undefined>(link.groupId)
	const formRef = useRef<HTMLDivElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		if (!isOpen) return

		function handleClickOutside(event: MouseEvent) {
			const target = event.target as Node

			if (formRef.current?.contains(target) || buttonRef.current?.contains(target)) {
				return
			}

			setIsOpen(false)
		}

		setTimeout(() => {
			document.addEventListener('mousedown', handleClickOutside)
		}, 0)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen])

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!title.trim() || !url.trim() || !icon.trim()) return

		updateLink(link.id, {
			title: title.trim(),
			url: url.trim(),
			icon: icon.trim(),
			groupId: isGroupingEnabled ? groupId : undefined
		})

		setIsOpen(false)
	}

	return (
		<div
			className='absolute top-1 left-1 rounded-md p-1'
			onClick={(e: React.MouseEvent) => e.stopPropagation()}
		>
			<button
				ref={buttonRef}
				className='flex h-4 w-4 items-center justify-center opacity-0 transition-opacity hover:opacity-100'
				onClick={() => setIsOpen(!isOpen)}
			>
				<Pencil size={14} />
			</button>

			{isOpen && (
				<div
					ref={formRef}
					className='bg-background-default fixed z-[9999] w-[360px] overflow-hidden rounded-xl shadow-md'
				>
					<form onSubmit={handleSubmit}>
						<div className='text-text-default mb-2 block px-4 py-3 text-sm font-semibold'>
							Редактировать ссылку
						</div>
						<div className='space-y-4 px-4'>
							<div>
								<label className='mb-2 block text-sm font-medium'>Название</label>
								<Input
									type='text'
									placeholder='Google'
									value={title}
									onChange={e => setTitle(e.target.value as string)}
									autoFocus
								/>
							</div>
							<div>
								<label className='mb-2 block text-sm font-medium'>URL</label>
								<Input
									type='url'
									placeholder='https://google.com'
									value={url}
									onChange={e => setUrl(e.target.value as string)}
								/>
							</div>
							<div>
								<label className='mb-2 block text-sm font-medium'>Иконка</label>
								<Input
									type='text'
									placeholder='google, SiGoogle, FaPauseCircle'
									value={icon}
									onChange={e => setIcon(e.target.value)}
								/>
								<span className='text-text-default/70 mt-1 block text-xs'>
									Используйте иконки{' '}
									<a href={LINKS.SIMPLE_ICONS} target='_blank' rel='noreferrer'>
										simpleicons.org
									</a>
								</span>
							</div>
							{isGroupingEnabled && groups.length > 0 && (
								<div>
									<label className='mb-2 block text-sm font-medium'>Группа (опционально)</label>
									<Select
										value={groupId || ''}
										onChange={e => setGroupId(e.target.value || undefined)}
									>
										<option value=''>Без группы</option>
										{groups.map(group => (
											<option key={group.id} value={group.id}>
												{group.name}
											</option>
										))}
									</Select>
								</div>
							)}
						</div>
						<div className='mt-2 flex justify-between px-4 py-3'>
							<SubmitButton className='w-full'>Сохранить изменения</SubmitButton>
						</div>
					</form>
				</div>
			)}
		</div>
	)
}

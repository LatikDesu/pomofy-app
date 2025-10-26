import { Plus } from 'lucide-react'
import { useState } from 'react'

import { failureToast } from '@/shared/lib/toast'
import {
	Input,
	PopoverBody,
	PopoverContent,
	PopoverFooter,
	PopoverForm,
	PopoverHeader,
	PopoverRoot,
	PopoverSubmitButton,
	PopoverTrigger,
	Select
} from '@/shared/ui'

import { useQuickLinks, useQuickLinksSettings } from '@/entities/QuickLinks'
import { LINKS } from '@/shared/constants'

export function AddLinkForm() {
	const { addLink, groups } = useQuickLinks()
	const { isGroupingEnabled } = useQuickLinksSettings()
	const [title, setTitle] = useState('')
	const [url, setUrl] = useState('')
	const [icon, setIcon] = useState('')
	const [groupId, setGroupId] = useState<string | undefined>(undefined)

	function handleSubmit() {
		if (!title.trim() || !url.trim() || !icon.trim()) {
			failureToast('Все поля должны быть заполнены', false)
			return
		}

		addLink({
			title: title.trim(),
			url: url.trim(),
			icon: icon.trim(),
			groupId: isGroupingEnabled ? groupId : undefined
		})

		setTitle('')
		setUrl('')
		setIcon('')
		setGroupId(undefined)
	}

	return (
		<PopoverRoot>
			<PopoverTrigger className='!-mr-3 !-ml-3 !border-none hover:!bg-transparent'>
				<Plus className='cursor-pointer' size={18} />
			</PopoverTrigger>
			<PopoverContent className='!top-8 !-right-13 w-[360px]'>
				<PopoverForm onSubmit={handleSubmit}>
					<PopoverHeader>Добавить ссылку</PopoverHeader>
					<PopoverBody className='space-y-4'>
						<div>
							<label className='mb-2 block text-sm font-medium'>Название</label>
							<Input
								type='text'
								value={title}
								onChange={e => setTitle(e.target.value)}
								className='w-full'
								placeholder='Google'
								autoFocus
							/>
						</div>
						<div>
							<label className='mb-2 block text-sm font-medium'>URL</label>
							<Input
								value={url}
								onChange={e => setUrl(e.target.value)}
								className='w-full'
								placeholder='https://google.com'
							/>
						</div>
						<div>
							<label className='mb-2 block text-sm font-medium'>Иконка</label>
							<Input
								value={icon}
								onChange={e => setIcon(e.target.value)}
								className='w-full'
								placeholder='google, SiGoogle, FaPauseCircle'
							/>
							<span className='mt-1block text-text-default/70 text-xs'>
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
					</PopoverBody>
					<PopoverFooter className='!pt-0'>
						<PopoverSubmitButton className='w-full' text='Добавить ссылку' />
					</PopoverFooter>
				</PopoverForm>
			</PopoverContent>
		</PopoverRoot>
	)
}

import { FolderPlus, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { Input, SubmitButton } from '@/shared/ui'

import { useQuickLinks } from '@/entities/QuickLinks'

export function AddGroupForm() {
	const { addGroup, removeGroup, groups } = useQuickLinks()
	const [mode, setMode] = useState<'none' | 'add'>('none')
	const [name, setName] = useState('')

	function handleAdd() {
		if (!name.trim()) return

		addGroup({
			name: name.trim(),
			order: groups.length
		})

		handleCancel()
	}

	function handleCancel() {
		setMode('none')
		setName('')
	}

	function handleRemoveGroup(id: string) {
		removeGroup(id)
	}

	if (mode === 'none') {
		return (
			<div className='space-y-2'>
				{groups.length > 0 && (
					<div className='space-y-1'>
						{groups.map(group => (
							<div
								key={group.id}
								className='flex items-center justify-between rounded-lg border border-[var(--color-secondary-border)] bg-transparent py-1 pr-1 pl-3 text-sm dark:border-[var(--color-default-hover)]'
							>
								<span className='flex-1'>{group.name}</span>
								<button
									type='button'
									onClick={() => handleRemoveGroup(group.id)}
									className='hover:bg-hover-default ml-2 rounded p-1'
								>
									<Trash2 size={14} className='text-background-danger' />
								</button>
							</div>
						))}
					</div>
				)}
				<SubmitButton className='w-full' onClick={() => setMode('add')}>
					<FolderPlus size={16} className='mr-2' />
					Добавить группу
				</SubmitButton>
			</div>
		)
	}

	return (
		<div className='space-y-2'>
			<Input
				className='cancelDrag w-full'
				placeholder='Название группы'
				value={name}
				onChange={e => setName(e.target.value)}
				autoFocus
			/>

			<div className='flex gap-2'>
				<SubmitButton className='flex-1' onClick={handleCancel}>
					Отмена
				</SubmitButton>
				<SubmitButton className='flex-1' onClick={handleAdd}>
					Добавить
				</SubmitButton>
			</div>
		</div>
	)
}

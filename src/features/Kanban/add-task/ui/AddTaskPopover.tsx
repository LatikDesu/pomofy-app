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
	PopoverTrigger
} from '@/shared/ui'

import { useKanban } from '@/entities/Kanban'

const TEXT_LIMIT = 256

interface AddTaskPopoverProps {
	columnId: string
}

export function AddTaskPopover({ columnId }: AddTaskPopoverProps) {
	const [text, setText] = useState('')
	const { addTask } = useKanban()

	function handleSubmit() {
		if (!text.trim()) {
			failureToast('Задача не может быть пустой', false)
			return
		}
		addTask(columnId, text.trim())
		setText('')
	}

	return (
		<PopoverRoot className='relative z-[2]'>
			<PopoverTrigger className='!border-none !p-1 hover:!bg-transparent'>
				<Plus className='size-4 cursor-pointer' />
			</PopoverTrigger>
			<PopoverContent className='h-auto w-[320px]'>
				<PopoverForm onSubmit={handleSubmit}>
					<PopoverHeader>Новая задача</PopoverHeader>
					<PopoverBody className='space-y-4'>
						<div>
							<label className='mb-2 block text-sm font-medium'>Задача</label>
							<Input
								as='textarea'
								placeholder='Опишите задачу...'
								value={text}
								maxLength={TEXT_LIMIT}
								rows={3}
								className='min-h-[60px] w-full'
								onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
							/>
							<p className='text-text-default/50 mt-1 text-xs'>
								{text.length}/{TEXT_LIMIT}
							</p>
						</div>
					</PopoverBody>
					<PopoverFooter>
						<PopoverSubmitButton className='w-full' text='Добавить задачу' />
					</PopoverFooter>
				</PopoverForm>
			</PopoverContent>
		</PopoverRoot>
	)
}

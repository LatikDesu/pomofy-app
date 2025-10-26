import { SquarePen } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/shared/lib/utils'
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

import { type IKanbanTask, useKanban } from '@/entities/Kanban'

const TEXT_LIMIT = 256

interface EditTaskPopoverProps {
	task: IKanbanTask
}

export function EditTaskPopover({ task }: EditTaskPopoverProps) {
	const [text, setText] = useState(task.name)
	const { updateTask } = useKanban()

	function handleSubmit() {
		if (!text.trim()) {
			return
		}
		updateTask(task.id, text.trim())
	}

	return (
		<PopoverRoot>
			<PopoverTrigger className={cn('!border-none !p-1 hover:!bg-transparent')}>
				<SquarePen className='size-3.5 cursor-pointer' />
			</PopoverTrigger>
			<PopoverContent className='top-0 right-6 h-auto w-[320px] -translate-y-1/2'>
				<PopoverForm onSubmit={handleSubmit}>
					<PopoverHeader>Редактировать задачу</PopoverHeader>
					<PopoverBody className='space-y-4'>
						<div>
							<label className='mb-2 block text-sm font-medium'>Описание задачи</label>
							<Input
								as='textarea'
								placeholder='Опишите задачу...'
								value={text}
								maxLength={TEXT_LIMIT}
								rows={3}
								className='sticky-note-scrollbar min-h-[64px] w-full'
								onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
							/>
							<p className='text-text-default/50 mt-1 text-xs'>
								{text.length}/{TEXT_LIMIT}
							</p>
						</div>
					</PopoverBody>
					<PopoverFooter>
						<PopoverSubmitButton className='w-full' text='Сохранить изменения' />
					</PopoverFooter>
				</PopoverForm>
			</PopoverContent>
		</PopoverRoot>
	)
}

import { Minus, Plus, SquarePen } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/shared/lib/utils'
import {
	Button,
	PopoverBody,
	PopoverContent,
	PopoverFooter,
	PopoverForm,
	PopoverHeader,
	PopoverRoot,
	PopoverSubmitButton,
	PopoverTrigger
} from '@/shared/ui'

import { type ITask, useTask } from '@/entities/Task'

interface EditTaskFormProps {
	task: ITask
}

export const EditTaskForm: React.FC<EditTaskFormProps> = ({ task }) => {
	const { setPomodoro, renameTask, alertTask } = useTask()
	const [description, setDescription] = useState(task.description)
	const [pomoCount, setPomoCount] = useState(task.pomodoro)

	const handleSubmit = () => {
		if (task.pomodoroCounter >= pomoCount) {
			alertTask(task.id, false)
		}
		setPomodoro(task.id, pomoCount)
		renameTask(task.id, description)
		setDescription(task.description)
		setPomoCount(task.pomodoro)
	}

	return (
		<PopoverRoot>
			<PopoverTrigger className={cn('!ml-2 !border-none !p-2 hover:!bg-transparent')}>
				<SquarePen
					className={cn(
						'size-4 cursor-pointer',
						task.completed && 'text-[var(--text-secondary)]',
						!task.completed && task.alerted && 'text-[var(--text-default)]'
					)}
				/>
			</PopoverTrigger>
			<PopoverContent className='!-right-2 h-auto w-[360px]'>
				<PopoverForm onSubmit={handleSubmit}>
					<PopoverHeader>Редактировать задачу</PopoverHeader>
					<PopoverBody className='space-y-4'>
						<div>
							<label className='mb-2 block text-sm font-medium text-[var(--text-secondary)] dark:text-[var(--text-default)]'>
								Название задачи
							</label>
							<input
								className='w-full rounded-lg border border-[var(--color-secondary-border)] bg-transparent px-3 py-3 text-sm text-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--color-secondary-active)] focus:outline-none dark:border-[var(--color-default-hover)] dark:text-[var(--text-default)] dark:focus:ring-[var(--color-default-active)]'
								type='text'
								placeholder='Введите название задачи'
								value={description}
								onChange={e => setDescription(e.target.value)}
							/>
						</div>
						<div>
							<label className='mb-2 block text-sm font-medium text-[var(--text-secondary)] dark:text-[var(--text-default)]'>
								Количество помодоро
							</label>
							<div className='flex items-center justify-center gap-4 rounded-lg border border-[var(--color-secondary-border)] p-1 dark:border-[var(--color-default-hover)]'>
								<Button
									type='button'
									variant='ghost'
									size='icon'
									className='text-[var(--text-secondary)] dark:text-[var(--text-default)]'
									onClick={() => setPomoCount(p => Math.max(1, p - 1))}
								>
									<Minus className='size-4' />
								</Button>
								<span className='w-8 text-center text-lg font-semibold text-[var(--text-secondary)] dark:text-[var(--text-default)]'>
									{pomoCount}
								</span>
								<Button
									type='button'
									variant='ghost'
									size='icon'
									className='text-[var(--text-secondary)] dark:text-[var(--text-default)]'
									onClick={() => setPomoCount(p => Math.min(10, p + 1))}
								>
									<Plus className='size-4' />
								</Button>
							</div>
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

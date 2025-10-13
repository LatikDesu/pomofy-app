import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

import { failureToast } from '@/shared/lib/toast'
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

import { useTask } from '@/entities/Task'
import { useBreakStarted } from '@/entities/Timer'

const TEXT_LIMIT = 100

export const AddTaskForm = () => {
	const [text, setText] = useState('')
	const [pomoCounter, setPomoCounter] = useState(1)
	const { addTask } = useTask()
	const { breakStarted } = useBreakStarted()

	const handleSubmit = () => {
		if (!text) {
			failureToast('Задача не может быть пустой', false)
			return
		}
		addTask(text, pomoCounter, breakStarted)
		setText('')
		setPomoCounter(1)
	}

	return (
		<PopoverRoot className='relative z-[2]'>
			<PopoverTrigger className='!border-none !pr-0 hover:!bg-transparent'>
				<Plus className='size-5 cursor-pointer' />
			</PopoverTrigger>
			<PopoverContent className='h-auto w-[360px]'>
				<PopoverForm onSubmit={handleSubmit}>
					<PopoverHeader>Новая задача</PopoverHeader>
					<PopoverBody className='space-y-4'>
						<div>
							<label className='mb-2 block text-sm font-medium'>Задача</label>
							<input
								className='w-full rounded-lg border border-[var(--color-secondary-border)] bg-transparent px-3 py-3 text-sm focus:ring-2 focus:ring-[var(--color-secondary-active)] focus:outline-none dark:border-[var(--color-default-hover)] dark:focus:ring-[var(--color-default-active)]'
								type='text'
								placeholder='Введите задачу'
								value={text}
								maxLength={TEXT_LIMIT}
								onChange={e => setText(e.target.value)}
							/>
							<p className='mt-1 text-xs text-zinc-500'>
								{text.length}/{TEXT_LIMIT}
							</p>
						</div>
						<div>
							<label className='mb-2 block text-sm font-medium'>Количество помодоро</label>
							<div className='flex items-center justify-center gap-4 rounded-lg border border-[var(--color-secondary-border)] p-1 dark:border-[var(--color-default-hover)]'>
								<Button
									type='button'
									variant='ghost'
									size='icon'
									onClick={() => setPomoCounter(p => Math.max(1, p - 1))}
								>
									<Minus className='size-4' />
								</Button>
								<span className='w-8 text-center text-lg font-semibold'>{pomoCounter}</span>
								<Button
									type='button'
									variant='ghost'
									size='icon'
									onClick={() => setPomoCounter(p => Math.min(10, p + 1))}
								>
									<Plus className='size-4' />
								</Button>
							</div>
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

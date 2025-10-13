import React from 'react'

import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalTrigger,
	useModal
} from '@/shared/ui'

import { useTask } from '@/entities/Task'

interface DeleteTaskButtonProps {
	taskId: number
}

export const DeleteTaskButton: React.FC<DeleteTaskButtonProps> = ({ taskId }) => {
	const { removeTask } = useTask()

	return (
		<Modal>
			<ModalTrigger className='w-full cursor-pointer rounded-lg px-5 py-2 text-left hover:bg-[var(--color-secondary-hover)] dark:hover:bg-[var(--color-default-hover)]'>
				<div className='select-none'>Удалить задачу</div>
			</ModalTrigger>
			<ModalBody>
				<ModalContent>
					<h2 className='text-xl font-bold dark:text-white'>Удалить задачу</h2>
					<p className='mt-4 text-gray-600 dark:text-gray-300'>
						Вы уверены, что хотите удалить эту задачу?
					</p>
				</ModalContent>
				<ModalFooter>
					<DeleteTaskActions taskId={taskId} removeTask={removeTask} />
				</ModalFooter>
			</ModalBody>
		</Modal>
	)
}

function DeleteTaskActions({
	taskId,
	removeTask
}: {
	taskId: number
	removeTask: (id: number) => void
}) {
	const { setOpen } = useModal()

	const handleConfirm = () => {
		removeTask(taskId)
		setOpen(false)
	}

	return (
		<div className='flex gap-4'>
			<Button variant='secondary' onClick={() => setOpen(false)}>
				Отмена
			</Button>
			<Button variant='destructive' onClick={handleConfirm}>
				Удалить
			</Button>
		</div>
	)
}

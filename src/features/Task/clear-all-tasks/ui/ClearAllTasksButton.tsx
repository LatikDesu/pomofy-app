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

export const ClearAllTasksButton = () => {
	const { removeAllTasks } = useTask()

	return (
		<Modal>
			<ModalTrigger className='cursor-pointer !pr-1 text-sm'>Очистить все</ModalTrigger>
			<ModalBody>
				<ModalContent>
					<h2 className='text-xl font-bold dark:text-white'>Очистить все задачи</h2>
					<p className='mt-4 text-gray-600 dark:text-gray-300'>
						Вы уверены, что хотите удалить все задачи? Это действие нельзя отменить.
					</p>
				</ModalContent>
				<ModalFooter>
					<ClearAllActions removeAllTasks={removeAllTasks} />
				</ModalFooter>
			</ModalBody>
		</Modal>
	)
}

function ClearAllActions({ removeAllTasks }: { removeAllTasks: () => void }) {
	const { setOpen } = useModal()

	const handleConfirm = () => {
		removeAllTasks()
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

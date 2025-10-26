import { Trash2 } from 'lucide-react'

import { useKanban } from '@/entities/Kanban'

interface DeleteTaskButtonProps {
	taskId: string
}

export function DeleteTaskButton({ taskId }: DeleteTaskButtonProps) {
	const { deleteTask } = useKanban()

	function handleDelete() {
		deleteTask(taskId)
	}

	return (
		<button
			onClick={handleDelete}
			className='flex items-center transition-colors hover:text-red-500'
			aria-label='Удалить задачу'
		>
			<Trash2 className='size-3.5 cursor-pointer hover:text-red-500' />
		</button>
	)
}

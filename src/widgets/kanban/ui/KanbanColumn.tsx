import { Draggable, Droppable } from '@hello-pangea/dnd'
import { createPortal } from 'react-dom'

import { AddTaskPopover, DeleteTaskButton, EditTaskPopover } from '@/features/Kanban'

import { type IKanbanColumn, KanbanCard } from '@/entities/Kanban'

interface KanbanColumnProps {
	column: IKanbanColumn
}

export function KanbanColumn({ column }: KanbanColumnProps) {
	return (
		<div className='bg-background-default flex w-full flex-col rounded-lg border-[var(--color-secondary-border)] p-3 pt-0 sm:w-64 dark:border-[var(--color-default-hover)]'>
			<div className='mb-1 flex items-center justify-between'>
				<h3 className='text-sm font-semibold'>{column.title}</h3>
				<AddTaskPopover columnId={column.id} />
			</div>
			<Droppable droppableId={column.id}>
				{provided => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						className='min-h-[128px] flex-1'
					>
						{column.tasks.map((task, index) => (
							<Draggable key={task.id} draggableId={task.id} index={index}>
								{(provided, snapshot) => {
									const child = (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<KanbanCard
												task={task}
												actionsSlot={
													<>
														<EditTaskPopover task={task} />
														<DeleteTaskButton taskId={task.id} />
													</>
												}
												isDragging={snapshot.isDragging}
											/>
										</div>
									)

									if (snapshot.isDragging) {
										return createPortal(child, document.body)
									}

									return child
								}}
							</Draggable>
						))}
						{provided.placeholder}
						{column.tasks.length === 0 && (
							<div className='text-text-default/50 flex h-full items-center justify-center text-xs'>
								Нет задач
							</div>
						)}
					</div>
				)}
			</Droppable>
		</div>
	)
}

import { DragDropContext, type DropResult } from '@hello-pangea/dnd'

import { InfoPopover } from '@/features/Kanban'

import { CloseWidgetButton, WidgetWrapper } from '@/shared/ui'

import { KanbanColumn } from './KanbanColumn'
import { useKanban, useToggleKanban } from '@/entities/Kanban'

export function KanbanWidget() {
	const { board, moveTask } = useKanban()
	const { setIsKanbanToggled } = useToggleKanban()

	function handleDragEnd(result: DropResult) {
		const { source, destination } = result

		if (!destination) return

		if (source.droppableId === destination.droppableId && source.index === destination.index) {
			return
		}

		moveTask(source.droppableId, destination.droppableId, source.index, destination.index)
	}

	const actions = (
		<>
			<InfoPopover />
			<CloseWidgetButton onClick={() => setIsKanbanToggled(false)} />
		</>
	)

	return (
		<WidgetWrapper actions={actions} className='!w-auto'>
			<div className='p-3 pt-0'>
				<DragDropContext onDragEnd={handleDragEnd}>
					<div className='flex flex-col sm:flex-row'>
						{board.columns.map(column => (
							<KanbanColumn key={column.id} column={column} />
						))}
					</div>
				</DragDropContext>
			</div>
		</WidgetWrapper>
	)
}

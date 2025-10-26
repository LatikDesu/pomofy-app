export interface IKanbanTask {
	id: string
	name: string
}

export interface IKanbanColumn {
	id: string
	title: string
	tasks: IKanbanTask[]
}

export interface IKanbanBoard {
	columns: IKanbanColumn[]
}

export interface IKanbanBoardState {
	board: IKanbanBoard
	setColumns: (columns: IKanbanColumn[]) => void
	addTask: (columnId: string, taskName: string) => void
	updateTask: (taskId: string, taskName: string) => void
	deleteTask: (taskId: string) => void
	moveTask: (
		sourceColumnId: string,
		destinationColumnId: string,
		sourceIndex: number,
		destinationIndex: number
	) => void
}

export interface IToggleKanban {
	isKanbanToggled: boolean
	setIsKanbanToggled: (isKanbanToggled: boolean) => void
	isKanbanShown: boolean
	setIsKanbanShown: (isKanbanShown: boolean) => void
}

export interface IPosKanban {
	kanbanPosX: number
	kanbanPosY: number
	setKanbanPos: (X: number, Y: number) => void
	setKanbanPosDefault: () => void
}

export interface ITask {
	id: number
	description: string
	inProgress: boolean
	completed: boolean
	pomodoro: number
	pomodoroCounter: number
	alerted: boolean
	menuToggled: boolean
}

export interface ITaskState {
	tasks: ITask[]
	addTask: (description: string, count: number, isBreak: boolean) => void
	renameTask: (id: number, newName: string) => void
	removeTask: (id: number) => void
	removeAllTasks: () => void
	toggleInProgressState: (id: number, flag: boolean) => void
	setCompleted: (id: number, flag: boolean) => void
	setPomodoroCounter: (id: number) => void
	alertTask: (id: number, flag: boolean) => void
	setPomodoro: (id: number, newVal: number) => void
	toggleMenu: (id: number, flag: boolean) => void
}

export interface IToggleTasks {
	isTasksToggled: boolean
	setIsTasksToggled: (isTasksToggled: boolean) => void
	isTasksShown: boolean
	setIsTasksShown: (isTasksShown: boolean) => void
}

export interface IPosTask {
	taskPosX: number
	taskPosY: number
	setTaskPos: (X: number, Y: number) => void
	setTaskPosDefault: () => void
}

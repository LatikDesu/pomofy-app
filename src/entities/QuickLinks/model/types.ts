export interface IQuickLink {
	id: number
	title: string
	url: string
	icon: string
	groupId?: string
}

export interface IQuickLinkGroup {
	id: string
	name: string
	order: number
}

export interface IQuickLinksState {
	links: IQuickLink[]
	groups: IQuickLinkGroup[]
	addLink: (link: Omit<IQuickLink, 'id'>) => void
	removeLink: (id: number) => void
	updateLink: (id: number, updates: Partial<Omit<IQuickLink, 'id'>>) => void
	addGroup: (group: Omit<IQuickLinkGroup, 'id'>) => void
	removeGroup: (id: string) => void
	updateGroup: (id: string, updates: Partial<Omit<IQuickLinkGroup, 'id'>>) => void
}

export interface IQuickLinksVisibility {
	isQuickLinksToggled: boolean
	setIsQuickLinksToggled: (value: boolean) => void
	isQuickLinksShown: boolean
	setIsQuickLinksShown: (value: boolean) => void
}

export interface IPosQuickLinks {
	quickLinksPosX: number
	quickLinksPosY: number
	setQuickLinksPos: (x: number, y: number) => void
	setQuickLinksPosDefault: () => void
}

export interface IQuickLinksSettings {
	isGroupingEnabled: boolean
	toggleGrouping: () => void
	isIconOnly: boolean
	toggleIconOnly: () => void
}

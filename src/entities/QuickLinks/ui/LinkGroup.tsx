import { LinkItem } from './LinkItem'
import { type IQuickLink, type IQuickLinkGroup } from '@/entities/QuickLinks'

interface LinkGroupProps {
	group: IQuickLinkGroup
	links: IQuickLink[]
	renderEditSlot?: (link: IQuickLink) => React.ReactNode
}

export function LinkGroup({ group, links, renderEditSlot }: LinkGroupProps) {
	const groupLinks = links.filter(link => link.groupId === group.id)

	if (groupLinks.length === 0) return null

	return (
		<div className='mb-3'>
			<div className='text-text-default/70 px-2 text-xs font-semibold tracking-wider uppercase'>
				{group.name}
			</div>
			<div className='grid grid-cols-4 gap-2'>
				{groupLinks.map(link => (
					<LinkItem key={link.id} link={link} editSlot={renderEditSlot?.(link)} />
				))}
			</div>
		</div>
	)
}

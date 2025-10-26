import { AddLinkForm, EditLinkForm, SettingsPopover } from '@/features/QuickLinks'

import { CloseWidgetButton, WidgetWrapper } from '@/shared/ui'

import {
	LinkGroup,
	LinkItem,
	useQuickLinks,
	useQuickLinksSettings,
	useToggleQuickLinks
} from '@/entities/QuickLinks'

export function QuickLinksWidget() {
	const { links, groups } = useQuickLinks()
	const { isGroupingEnabled } = useQuickLinksSettings()
	const { setIsQuickLinksToggled } = useToggleQuickLinks()

	const ungroupedLinks = links.filter(link => !link.groupId)
	const sortedGroups = [...groups].sort((a, b) => a.order - b.order)

	const actions = (
		<>
			<AddLinkForm />
			<SettingsPopover />
			<CloseWidgetButton onClick={() => setIsQuickLinksToggled(false)} />
		</>
	)

	return (
		<WidgetWrapper actions={actions}>
			<div className='max-h-96 overflow-y-auto px-2 pb-2'>
				{links.length === 0 ? (
					<div className='py-4 text-center text-sm'>Добавьте первую ссылку</div>
				) : (
					<>
						{isGroupingEnabled ? (
							<>
								{sortedGroups.map(group => (
									<LinkGroup
										key={group.id}
										group={group}
										links={links}
										renderEditSlot={link => <EditLinkForm link={link} />}
									/>
								))}
								{ungroupedLinks.length > 0 && (
									<div className='grid grid-cols-4 gap-2'>
										{ungroupedLinks.map(link => (
											<LinkItem key={link.id} link={link} editSlot={<EditLinkForm link={link} />} />
										))}
									</div>
								)}
							</>
						) : (
							<div className='grid grid-cols-4 gap-2'>
								{links.map(link => (
									<LinkItem key={link.id} link={link} editSlot={<EditLinkForm link={link} />} />
								))}
							</div>
						)}
					</>
				)}
			</div>
		</WidgetWrapper>
	)
}

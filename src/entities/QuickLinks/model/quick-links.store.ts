import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { type IQuickLinksState } from './types'

export const useQuickLinks = create<IQuickLinksState>()(
	persist(
		(set, _) => ({
			links: [
				{
					id: 1,
					title: 'Deepl',
					url: 'https://www.deepl.com/translator',
					icon: 'deepl'
				},
				{
					id: 2,
					title: 'Z.AI Chat',
					url: 'https://chat.z.ai/',
					icon: 'openai'
				},
				{
					id: 3,
					title: 'GitHub',
					url: 'https://github.com',
					icon: 'github'
				},
				{
					id: 4,
					title: 'Affine',
					url: 'https://affine.pro/',
					icon: 'affine'
				}
			],
			groups: [],
			addLink: link =>
				set(state => ({
					links: [...state.links, { ...link, id: Date.now() + state.links.length }]
				})),
			removeLink: id =>
				set(state => ({
					links: state.links.filter(link => link.id !== id)
				})),
			updateLink: (id, updates) =>
				set(state => ({
					links: state.links.map(link => (link.id === id ? { ...link, ...updates } : link))
				})),
			addGroup: group =>
				set(state => ({
					groups: [...state.groups, { ...group, id: `group_${Date.now()}_${state.groups.length}` }]
				})),
			removeGroup: id =>
				set(state => ({
					groups: state.groups.filter(group => group.id !== id),
					links: state.links.map(link =>
						link.groupId === id ? { ...link, groupId: undefined } : link
					)
				})),
			updateGroup: (id, updates) =>
				set(state => ({
					groups: state.groups.map(group => (group.id === id ? { ...group, ...updates } : group))
				}))
		}),
		{
			name: 'quick_links_data'
		}
	)
)

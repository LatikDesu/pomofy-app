import * as SiIcons from 'react-icons/si'

export function getIconComponent(iconName: string) {
	if (!iconName) return SiIcons.SiReact

	const prefixMatch = iconName.match(/^([A-Z][a-z0-9]*)(.+)$/)

	if (prefixMatch) {
		const [, prefix, name] = prefixMatch
		const library = SiIcons[prefix as keyof typeof SiIcons]

		if (library) {
			const fullIconName = prefix + name
			const IconComponent = library[fullIconName as keyof typeof library]
			if (IconComponent) return IconComponent
		}
	}

	const siIconName = 'Si' + iconName.charAt(0).toUpperCase() + iconName.slice(1).toLowerCase()
	const SiIconComponent = SiIcons[siIconName as keyof typeof SiIcons]
	if (SiIconComponent) return SiIconComponent

	const capitalizedName = 'Si' + iconName.charAt(0).toUpperCase() + iconName.slice(1)
	const CapitalizedIcon = SiIcons[capitalizedName as keyof typeof SiIcons]
	if (CapitalizedIcon) return CapitalizedIcon

	return SiIcons.SiReact
}

interface DynamicIconProps {
	iconName: string
	className?: string
	size?: number
}

export function DynamicIcon({ iconName, className, size }: DynamicIconProps) {
	const IconComponent = getIconComponent(iconName)
	return <IconComponent className={className} size={size} />
}

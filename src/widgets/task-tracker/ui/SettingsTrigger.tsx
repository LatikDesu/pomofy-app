import { EllipsisVertical } from 'lucide-react'
import React from 'react'

interface SettingsTriggerProps {
	onClick: () => void
}

export const SettingsTrigger: React.FC<SettingsTriggerProps> = ({ onClick }) => {
	return <EllipsisVertical size={16} className='ml-2 cursor-pointer' onClick={onClick} />
}

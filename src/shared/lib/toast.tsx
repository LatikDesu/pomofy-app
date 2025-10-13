import { CircleX } from 'lucide-react'
import toast from 'react-hot-toast'

export const toggledToastNotification = (
	isToggled: boolean,
	setToggler: (val: boolean) => void,
	toastText: string,
	duration: number,
	icon: string
) => {
	const nextVal = !isToggled
	setToggler(nextVal)
	if (nextVal) {
		toast(toastText, {
			duration: duration,
			icon: `${icon}`,
			style: {
				borderRadius: '10px',
				background: '#333',
				color: '#fff'
			}
		})
	}
}

export const defaultToast = (toastText: string) => {
	toast(toastText, {
		style: {
			borderRadius: '10px',
			background: '#333',
			color: '#fff'
		}
	})
}

export const toastThemeNotification = (isDark: boolean, toggleMode: () => void) => {
	const nextVal = !isDark
	toggleMode()
	if (nextVal) {
		toast('Dark Mode', {
			icon: '🌙',
			style: {
				borderRadius: '10px',
				background: '#333',
				color: '#fff'
			}
		})
	} else {
		toast('Light Mode', {
			icon: '☀️',
			style: {
				borderRadius: '10px'
			}
		})
	}
}

export const successToast = (toastText: string, isDark: boolean, icon?: string) => {
	if (isDark) {
		toast.success(toastText, {
			icon: icon,
			style: {
				borderRadius: '10px',
				background: '#333',
				color: '#fff'
			}
		})
	} else {
		toast.success(toastText, {
			icon: icon,
			style: {
				borderRadius: '10px'
			}
		})
	}
}

export const failureToast = (toastText: string, isDark: boolean, icon?: string) => {
	if (isDark) {
		toast.error(toastText, {
			icon: icon,
			style: {
				borderRadius: '10px',
				background: '#333',
				color: '#fff'
			}
		})
	} else {
		toast.error(toastText, {
			icon: icon,
			style: {
				borderRadius: '10px'
			}
		})
	}
}

export const darkModeToast = (toastText: string, icon: string) => {
	toast(toastText, {
		icon: icon,
		style: {
			borderRadius: '10px',
			background: '#333',
			color: '#fff'
		}
	})
}

export const lightModeToast = (toastText: string, icon: string) => {
	toast(toastText, {
		icon: icon,
		style: {
			borderRadius: '10px'
		}
	})
}

export const ModeToast = ({ t, message, icon }: { t: any; message: string; icon: string }) => (
	<div
		className={`flex items-center justify-between gap-2 rounded-lg bg-[var(--color-secondary)] p-2 text-[var(--text-secondary)] dark:bg-[var(--color-default)] dark:text-[var(--text-default)]`}
	>
		<span>
			{message} {icon}
		</span>
		<CircleX className='cursor-pointer' size={16} onClick={() => toast.dismiss(t.id)} />
	</div>
)

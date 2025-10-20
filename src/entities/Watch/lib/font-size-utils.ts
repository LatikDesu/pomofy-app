/**
 * Font Size Utilities
 * ---
 * Helper functions for font size classes
 */

/**
 * Get font size classes for different sizes
 */
export function getFontSizeClasses(size?: 'small' | 'medium' | 'large' | 'extra-large') {
	const sizeMap = {
		small: {
			time: 'text-3xl',
			date: 'text-xs',
			weather: 'text-xs',
			weatherIcon: 'text-lg'
		},
		medium: {
			time: 'text-4xl',
			date: 'text-sm',
			weather: 'text-sm',
			weatherIcon: 'text-xl'
		},
		large: {
			time: 'text-6xl',
			date: 'text-md',
			weather: 'text-sm',
			weatherIcon: 'text-2xl'
		},
		'extra-large': {
			time: 'text-7xl',
			date: 'text-lg',
			weather: 'text-sm',
			weatherIcon: 'text-3xl'
		}
	}

	// Fallback to medium if size is undefined or invalid
	const validSize = size && sizeMap[size] ? size : 'medium'
	return sizeMap[validSize]
}

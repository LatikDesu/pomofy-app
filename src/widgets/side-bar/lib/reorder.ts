export const reorder = (list: number[], startIndex: number, endIndex: number): number[] => {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)
	return result
}

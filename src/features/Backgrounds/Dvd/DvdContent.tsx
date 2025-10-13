import { useEffect } from 'react'

import { useFullScreenToggleStore } from '@/shared/store'

export const DvdContent = () => {
	const { isFullscreen } = useFullScreenToggleStore()

	useEffect(() => {
		const canvasEl = document.getElementById('canvas') as HTMLCanvasElement | null
		if (!canvasEl) return

		const contextEl = canvasEl.getContext('2d')
		if (!contextEl) return

		const imageEl = document.getElementById('image') as SVGSVGElement | null
		if (!imageEl) return

		// Non-null assertions after checks
		const canvas: HTMLCanvasElement = canvasEl
		const ctx: CanvasRenderingContext2D = contextEl
		const image: SVGSVGElement = imageEl

		// properties
		const change_colors = true
		let logo_color = '#ff0000'
		const speed = 1.5
		const background = '#000000'
		const background_image: HTMLImageElement | null = null
		const scale = 2

		// available colors
		const allcolors = [
			'#00ffff',
			'#f0ffff',
			'#f5f5dc',
			'#000000',
			'#0000ff',
			'#a52a2a',
			'#00ffff',
			'#00008b',
			'#008b8b',
			'#a9a9a9',
			'#006400',
			'#bdb76b',
			'#8b008b',
			'#556b2f',
			'#ff8c00',
			'#9932cc',
			'#8b0000',
			'#e9967a',
			'#9400d3',
			'#ff00ff',
			'#ffd700',
			'#008000',
			'#4b0082',
			'#f0e68c',
			'#add8e6',
			'#e0ffff',
			'#90ee90',
			'#d3d3d3',
			'#ffb6c1',
			'#ffffe0',
			'#00ff00',
			'#ff00ff',
			'#800000',
			'#000080',
			'#808000',
			'#ffa500',
			'#ffc0cb',
			'#800080',
			'#ff0000',
			'#c0c0c0',
			'#ffffff',
			'#ffff00'
		]
		let colors: string[] = []
		calcPossibleColors()
		let colorindex = Math.floor(Math.random() * colors.length)
		logo_color = colors[colorindex]

		// logo position, velocity & size
		let x = 0
		let y = 0
		let vx = 1
		let vy = 1

		const viewBox = image.getAttribute('viewBox')?.split(' ')
		const w = scale * parseFloat(viewBox?.[2] ?? '0')
		const h = scale * parseFloat(viewBox?.[3] ?? '0')

		// canvas size
		let W = (canvas.width = canvas.offsetWidth)
		let H = (canvas.height = canvas.offsetHeight)

		const LBound = 0,
			RBound = W,
			TBound = 0,
			BBound = H

		// fps limiter
		const fps = 60
		let last = performance.now() / 1000
		let fpsThreshold = 0

		function run() {
			const reqAnimFrame = window.requestAnimationFrame
			reqAnimFrame(run)

			// Figure out how much time has passed since the last animation
			const now = performance.now() / 1000
			const dt = Math.min(now - last, 1)
			last = now

			// If there is an FPS limit, abort updating the animation if we have reached the desired FPS
			if (fps > 0) {
				fpsThreshold += dt
				if (fpsThreshold < 1.0 / fps) {
					return
				}
				fpsThreshold -= 1.0 / fps
			}

			update()
			draw()
		}

		function update() {
			for (let i = 0; i < speed; i++) {
				x += vx
				y += vy

				// right - left
				if (x + w >= RBound || x <= LBound) {
					vx = -vx
					nextColor()
					break
				}

				// bottom
				if (y + h >= BBound || y <= TBound) {
					vy = -vy
					nextColor()
					break
				}
			}
		}

		function draw() {
			// clear canvas
			ctx.clearRect(0, 0, W, H)
			ctx.fillStyle = background
			ctx.fillRect(0, 0, W, H)

			// draw background image
			if (background_image != null) {
				ctx.drawImage(background_image, 0, 0, W, H)
			}

			ctx.save()

			// draw dvd logo
			ctx.translate(x, y)
			ctx.scale(scale, scale)

			const ancestor = image
			const descendents = ancestor.getElementsByTagName('*')

			for (let i = 0; i < descendents.length; i++) {
				const el = descendents[i]

				if (el.nodeName === 'path') {
					const path = new Path2D(el.getAttribute('d') ?? '')
					ctx.fillStyle = el.getAttribute('fill') === '#fff' ? background : logo_color
					ctx.fill(path)
				} else if (el.nodeName === 'ellipse') {
					ctx.beginPath()
					ctx.ellipse(
						parseFloat(el.getAttribute('cx') ?? '0'),
						parseFloat(el.getAttribute('cy') ?? '0'),
						parseFloat(el.getAttribute('rx') ?? '0'),
						parseFloat(el.getAttribute('ry') ?? '0'),
						0,
						0,
						Math.PI * 2
					)
					ctx.closePath()
					ctx.fillStyle = el.getAttribute('fill') === '#fff' ? background : logo_color
					ctx.fill()
				}
			}

			ctx.restore()
		}

		function nextColor() {
			if (!change_colors) {
				return
			}

			colorindex++
			if (colorindex >= colors.length) {
				colorindex = 0
			}

			logo_color = colors[colorindex]
		}

		window.onresize = function () {
			W = canvas.width = canvas.offsetWidth
			H = canvas.height = canvas.offsetHeight
		}

		run()

		// UTILITY
		function calcPossibleColors() {
			if (background_image != null) {
				return
			}

			colors = []
			const backrgb = hexToRgb(background)
			if (!backrgb) return

			for (const color of allcolors) {
				const rgb = hexToRgb(color)
				if (rgb && deltaE(backrgb, rgb) > 30) {
					colors.push(color)
				}
			}

			shuffleArray(colors)
		}

		function shuffleArray(array: string[]) {
			for (let i = array.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1))
				;[array[i], array[j]] = [array[j], array[i]]
			}
		}

		function deltaE(rgbA: number[], rgbB: number[]) {
			let labA = rgb2lab(rgbA)
			let labB = rgb2lab(rgbB)
			let deltaL = labA[0] - labB[0]
			let deltaA = labA[1] - labB[1]
			let deltaB = labA[2] - labB[2]
			let c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2])
			let c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2])
			let deltaC = c1 - c2
			let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC
			deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH)
			let sc = 1.0 + 0.045 * c1
			let sh = 1.0 + 0.015 * c1
			let deltaLKlsl = deltaL / 1.0
			let deltaCkcsc = deltaC / sc
			let deltaHkhsh = deltaH / sh
			let i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh
			return i < 0 ? 0 : Math.sqrt(i)
		}

		function rgb2lab(rgb: number[]) {
			let r = rgb[0] / 255,
				g = rgb[1] / 255,
				b = rgb[2] / 255,
				x,
				y,
				z
			r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92
			g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92
			b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92
			x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047
			y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0
			z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883
			x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116
			y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116
			z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116
			return [116 * y - 16, 500 * (x - y), 200 * (y - z)]
		}

		function hexToRgb(hex: string) {
			const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
			return result
				? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
				: null
		}
	}, [document.documentElement, isFullscreen])

	return (
		<>
			<canvas id='canvas'></canvas>
			<svg xmlns='http://www.w3.org/2000/svg' id='image' viewBox='0 0 67.417 29.523'>
				<path d='M59.646 0H43.07l-8.926 10.291L30.501 0H5.911L5 3.825h9.017c2.915 0 6.302 1.34 5.647 4.371-.729 3.37-4.19 5.01-10.474 5.01L11.011 5.1H4.727L2.04 16.758h8.516c5.601 0 13.115-1.64 15.165-7.969.551-1.702.496-3.225.11-4.508l.026-.001 5.738 16.395L46.35 3.825h9.381c2.915 0 5.618 1.33 5.01 4.371-.547 2.732-3.552 5.01-9.837 5.01L52.725 5.1H46.44l-2.687 11.658h6.968c5.601 0 14.299-1.64 16.348-7.969C68.764 3.555 63.927 0 59.646 0z'></path>
				<ellipse cx='31.686' cy='25.319' rx='31.686' ry='4.204'></ellipse>
				<ellipse cx='48.558' cy='25.114' rx='3.671' ry='2.608' fill='#fff'></ellipse>
				<ellipse cx='48.558' cy='25.114' rx='2.397' ry='1.516'></ellipse>
				<path
					fill='#fff'
					d='M22.896 22.655h1.435v5.01h-1.435zM12.833 22.655h1.685l1.844 3.097 1.844-3.097h1.685l-2.983 5.01h-1.093zM30.501 22.657c2.045 0 3.703 1.156 3.703 2.525s-1.658 2.479-3.703 2.479h-1.958v-5.007l1.958.003z'
				></path>
				<path d='M30.501 26.563c1.245 0 2.254-.58 2.254-1.381 0-.8-1.009-1.427-2.254-1.427h-.546v2.816l.546-.008z'></path>
				<path
					fill='#fff'
					d='M41.727 22.655h-4.155v5.01h4.155v-1.093h-2.721l-.002-.986h2.722v-1.028h-2.722l.002-.81h2.721z'
				></path>
			</svg>
		</>
	)
}

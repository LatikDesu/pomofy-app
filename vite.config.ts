import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(() => {
	return {
		plugins: [react(), tailwindcss(), tsconfigPaths()],
		server: {
			host: '0.0.0.0',
			port: 5173
		},
		build: {
			rollupOptions: {
				output: {
					manualChunks: id => {
						// React ecosystem
						if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
							return 'vendor-react'
						}

						// React Player и его зависимости (HLS, DASH)
						if (
							id.includes('node_modules/react-player') ||
							id.includes('node_modules/hls.js') ||
							id.includes('node_modules/dashjs')
						) {
							return 'vendor-player'
						}

						// DnD библиотеки
						if (
							id.includes('node_modules/@dnd-kit') ||
							id.includes('node_modules/@hello-pangea/dnd')
						) {
							return 'vendor-dnd'
						}

						// UI библиотеки
						if (
							id.includes('node_modules/@radix-ui') ||
							id.includes('node_modules/framer-motion') ||
							id.includes('node_modules/lucide-react')
						) {
							return 'vendor-ui'
						}

						// Markdown
						if (
							id.includes('node_modules/react-markdown') ||
							id.includes('node_modules/remark-gfm')
						) {
							return 'vendor-markdown'
						}

						// Particles
						if (
							id.includes('node_modules/react-tsparticles') ||
							id.includes('node_modules/tsparticles')
						) {
							return 'vendor-particles'
						}

						// Остальные node_modules
						if (id.includes('node_modules')) {
							return 'vendor-other'
						}

						// Widgets - каждый в отдельный чанк для lazy loading
						if (id.includes('/src/widgets/youtube')) {
							return 'widget-youtube'
						}
						if (id.includes('/src/widgets/spotify')) {
							return 'widget-spotify'
						}
						if (id.includes('/src/widgets/yandex-music')) {
							return 'widget-yandex'
						}
						if (id.includes('/src/widgets/kanban')) {
							return 'widget-kanban'
						}
						if (id.includes('/src/widgets/task-tracker')) {
							return 'widget-task-tracker'
						}
					}
				}
			},
			chunkSizeWarningLimit: 1000
		}
	}
})

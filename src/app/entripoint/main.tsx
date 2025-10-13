import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@/app/styles/index.css'

import RootLayout from '../layout/root-layout.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RootLayout />
	</StrictMode>
)

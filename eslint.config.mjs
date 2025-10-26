import js from '@eslint/js'
import react from 'eslint-plugin-react'
import globals from 'globals'
import tseslint from 'typescript-eslint'

import { eslintBoundariesConfig } from './eslint.boundaries.ts'

const eslintConfig = [
	{
		ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'dist/**']
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['**/*.{ts,tsx}'],
		plugins: {
			react
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true
				}
			},
			globals: {
				...globals.browser
			}
		},
		rules: {
			...react.configs.recommended.rules,
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off'
		}
	},
	{ ...eslintBoundariesConfig, files: ['src/**/*.{ts,tsx}'] }
]

export default eslintConfig

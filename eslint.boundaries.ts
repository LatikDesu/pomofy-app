import { type Linter } from 'eslint'
import boundaries from 'eslint-plugin-boundaries'

type EslintBoundariesConfig = Linter.Config & {
	settings: Record<string, unknown>
}

export const eslintBoundariesConfig: EslintBoundariesConfig = {
	plugins: {
		boundaries
	},
	settings: {
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true
			}
		},
		'boundaries/elements': [
			{
				type: 'app',
				pattern: './src/app'
			},
			{
				type: 'pages',
				pattern: './src/pages/*',
				capture: ['page']
			},
			{
				type: 'widgets',
				pattern: './src/widgets/*',
				capture: ['widget']
			},
			{
				type: 'features',
				pattern: './src/features/*',
				capture: ['feature']
			},
			{
				type: 'entities',
				pattern: './src/entities/*',
				capture: ['entity']
			},
			{
				type: 'shared',
				pattern: './src/shared/*',
				capture: ['segment']
			}
		]
	},

	rules: {
		'boundaries/element-types': [
			'error',
			{
				default: 'allow',
				message: '${file.type} is not allowed to import (${dependency.type})',

				rules: [
					{
						from: 'shared',
						disallow: ['app', 'pages', 'widgets', 'features', 'entities'],
						message:
							'Модуль нижележащего слоя (${file.type}) не может импортировать модуль вышележащего слоя (${dependency.type})'
					},
					{
						from: 'entities',
						message:
							'Модуль нижележащего слоя (${file.type}) не может импортировать модуль вышележащего слоя (${dependency.type})',
						disallow: ['app', 'pages', 'widgets', 'features']
					},
					{
						from: 'entities',
						message: 'Сущности не могут импортировать другие сущности',

						disallow: [
							[
								'entities',
								{
									entity: '!${entity}'
								}
							]
						]
					},
					{
						from: 'features',
						message:
							'Модуль нижележащего слоя (${file.type}) не может импортировать модуль вышележащего слоя (${dependency.type})',
						disallow: ['app', 'pages', 'widgets']
					},
					{
						from: 'features',
						message: 'Фичи не могут импортировать другие фичи',

						disallow: [
							[
								'features',
								{
									feature: '!${feature}'
								}
							]
						]
					},
					{
						from: 'widgets',
						message:
							'Модуль нижележащего слоя (${file.type}) не может импортировать модуль вышележащего слоя (${dependency.type})',
						disallow: ['app', 'pages']
					},
					{
						from: 'widgets',
						message: 'Виджеты не могут импортировать другие виджеты',

						disallow: [
							[
								'widgets',
								{
									widget: '!${widget}'
								}
							]
						]
					},
					{
						from: 'pages',
						message:
							'Модуль нижележащего слоя (${file.type}) не может импортировать модуль вышележащего слоя (${dependency.type})',
						disallow: ['app']
					},
					{
						from: 'pages',
						message: 'Страницы не могут импортировать другие страницы',

						disallow: [
							[
								'pages',
								{
									page: '!${page}'
								}
							]
						]
					}
				]
			}
		],

		'boundaries/entry-point': [
			'error',
			{
				default: 'disallow',
				message:
					'Модуль (${file.type}) должен импортироваться через public API. Прямой импорт из ${dependency.source} запрещен',

				rules: [
					{
						target: [
							[
								'shared',
								{
									segment: 'lib'
								}
							]
						],

						allow: '*/index.ts'
					},
					{
						target: [
							[
								'shared',
								{
									segment: 'lib'
								}
							]
						],

						allow: '*.(ts|tsx)'
					},
					{
						target: [
							[
								'shared',
								{
									segment: 'constants'
								}
							]
						],

						allow: 'index.ts'
					},
					{
						target: [
							[
								'shared',
								{
									segment: '(ui|api|types|icons)'
								}
							]
						],

						allow: '**'
					},
					{
						target: ['app', 'pages', 'widgets', 'features', 'entities'],
						allow: 'index.(ts|tsx)'
					},
					{
						target: ['pages'],
						allow: '*.page.tsx'
					}
				]
			}
		]
	}
}

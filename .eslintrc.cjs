/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
	root: true,
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-typescript',
		'@vue/eslint-config-prettier/skip-formatting',
	],
	plugins: [
		'import',
	],
	parserOptions: {
		ecmaVersion: 'latest'
	},
	rules: {
		'indent': ['error', 'tab', { SwitchCase: 1 }],
		'no-case-declarations': 'off',
		'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
		'vue/no-unused-vars': ['error', { 'ignorePattern': '^_' }],
		'no-undef': 'off', // ESLint whines about unknown globals, but TSC already checks those so who needs ESLint's checking?
		'vue/multi-word-component-names': 'off',
		'import/order': ['error', {
			groups: [
				'builtin',
				'external',
				'parent',
				'sibling',
				'index',
			],
			pathGroups: [
				{
					pattern: '@/**',
					group: 'external',
					position: 'after'
				}
			],
			pathGroupsExcludedImportTypes: ['builtin'],
			alphabetize: {
				'order': 'asc',
			},
			'newlines-between': 'never',
		}],
		'sort-imports': ['error', {
			allowSeparatedGroups: true,
			ignoreDeclarationSort: true,
		}]
	},
}

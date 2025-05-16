import eslint from '@eslint/js';
import globals from 'globals';
import oxlint from 'eslint-plugin-oxlint';
import prettier from 'eslint-config-prettier/flat';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.recommended,
	...oxlint.configs['flat/recommended'],
	prettier,

	{
		name: 'app/files-to-ignore',
		ignores: ['node_modules', 'types', '**/*.hbs'],
	},

	{
		name: 'app/globals',
		languageOptions: {
			globals: globals.browser,
		},
	},

	{
		name: 'app/adjusted-rules',
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
		},
	},
);

import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    rules: {
      'prettier/prettier': [
        'error',
        {
          printWidth: 110,
          semi: true,
          singleQuote: true,
        },
      ],
    },
  },
  {
    ignores: ['dist/', 'webpack.config.js', 'src/styles/**/*.css'],
  },
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser, parser: typescriptParser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
];

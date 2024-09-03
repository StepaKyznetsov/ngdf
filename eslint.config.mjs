import pluginJs from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  { ignores: ['node_modules', '.angular', 'dist'] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];

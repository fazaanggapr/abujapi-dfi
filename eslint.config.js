import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig } from 'eslint-define-config'

export default defineConfig({
  overrides: [
    {
      files: ['**/*.{js,jsx}'],
      extends: [
        js.configs.recommended,
        'plugin:react/recommended',
        reactHooks.configs['recommended-latest'],
        reactRefresh.configs.vite,
      ],
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
      globals: globals.browser,
      rules: {
        'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      },
    },
  ],
})

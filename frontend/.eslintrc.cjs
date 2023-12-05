/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

const importOrderRule = ['error', {
  'newlines-between': 'always',
  groups: [
    ['type'],
    ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
  ],
}];

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2021
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  plugins: [
    'import', 'import-newlines'
  ],
  rules: {
    'vue/script-indent': ['error', 2, { 'baseIndent': 1 }],
    'vue/multi-word-component-names': 'off',
    'linebreak-style': 0,
    'new-cap': 'off',
    'object-curly-spacing': ['error', 'always'],
    'max-len': ['error', {
      code: 120,
    }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'no-multi-spaces': ['error'],
    'import-newlines/enforce': ['error',
      { items: 3 },
    ],
    'import/order': importOrderRule,
    'quotes': ['error', 'single', { 'avoidEscape': true }],
  },
  overrides: [
    {
      files: ['*.spec.ts'],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        'import/order': importOrderRule,
      },
    }
  ],
}

/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

const importOrderRule = ['error', {
  'newlines-between': 'always',
  groups: [
    ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
    ['type'],
  ],
}];

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: [
    'import', 'import-newlines'
  ],
  rules: {
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
  },
}

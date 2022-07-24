module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    requireConfigFile: false,
  },
  extends: ['airbnb', 'prettier', 'plugin:@typescript-eslint/recommended'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.js'],
      },
    },
    react: {
      // used to silence the React version warnings
      version: '999.999.999',
    },
  },
  rules: {
    'import/extensions': ['error', { ts: 'never', ignorePackages: true }],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-floating-promises': 'error',
  },
}

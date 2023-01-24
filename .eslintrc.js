module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['@typescript-eslint', 'import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: './',
  },
  env: {
    jest: true,
    browser: true,
    node: true,
  },
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'no-useless-escape': 'off',
    'max-len': ['error', 150],
    'global-require': 0,
  },
  globals: {
    fetch: false,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};

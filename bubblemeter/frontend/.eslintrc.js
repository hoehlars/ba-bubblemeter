module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  globals: {
    cy: 'readable',
    Cypress: 'readable',
  },
  rules: {
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx', '.tsx'] }],
    'react/jsx-props-no-spreading': ['off'],
    'react/state-in-constructor': ['off'],
    'react/jsx-no-bind': ['off'],
    'react/destructuring-assignment': ['off'],
    'react/prop-types': ['off'],
    'react/button-has-type': ['off'],
    'react/no-array-index-key': ['off'],
    'react/display-name': ['off'],
    'react/no-did-update-set-state': ['off'],
    'import/no-unresolved': ['off'],
    'import/prefer-default-export': ['off'],
    'import/no-extraneous-dependencies': ['off'],
    'jsx-a11y/click-events-have-key-events': ['off'],
    'jsx-a11y/no-static-element-interactions': ['off'],
    'jsx-a11y/label-has-associated-control': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/ban-types': ['off'],
    'class-methods-use-this': ['off'],
    'no-console': ['error', { 'allow': ['warn', 'error'] }],
    'no-underscore-dangle': ['error', { 'allow': ['_id' ] }],
    'import/extensions': ['off'],
    '@typescript-eslint/no-non-null-assertion': ['off']
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['*.test.tsx', '*.test.ts', '*setupTests.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': ['off'],
      },
    },
  ],
};
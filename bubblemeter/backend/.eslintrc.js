module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    'import/no-unresolved': ['off'],
    'import/prefer-default-export': ['off'],
    '@typescript-eslint/camelcase': ['off'],
    '@typescript-eslint/interface-name-prefix': ['off'],
    'no-underscore-dangle': ['off'],
    'no-param-reassign': ['off'],
    'no-plusplus': ['off'],
    'class-methods-use-this': ['off'],
    'no-param-reassign': ['off'],
  },
  overrides: [
    {
      files: '*.test.ts',
      rules: {
        '@typescript-eslint/no-explicit-any': ['off'],
      },
    },
  ],
};
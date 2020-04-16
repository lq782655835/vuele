module.exports = {
  root: true,
  env: {
    node: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      },
    },
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript',
  ],
  rules: {
    'no-param-reassign': 0,
    'class-methods-use-this': 0,
    'no-underscore-dangle': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': [
      'error',
      {
        ignore: ['@/'],
      },
    ],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'import/extensions': [0],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};

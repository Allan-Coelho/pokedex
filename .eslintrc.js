module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'boundaries'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    extends: ['plugin:boundaries/recommended'],
    'boundaries/ignore': ['**/tests/'],
    'boundaries/elements': [
      {
        type: 'controllers',
        pattern: 'src/controllers',
      },
      {
        type: 'services',
        pattern: 'src/services',
      },
      {
        type: 'middlewares',
        pattern: 'src/middlewares',
      },
      {
        type: 'repositories',
        pattern: 'src/repositories',
      },
      {
        type: 'routers',
        pattern: 'src/routers',
      },
      {
        type: 'config',
        pattern: 'src/config',
      },
    ],
  },
  rules: {
    'import/prefer-default-export': 'off',
    'no-throw-literal': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false,
        },
      },
    ],
    'no-console': 'warn',
    'boundaries/element-types': [
      2,
      {
        default: 'disallow',
        message: '${file.type} não podem importar ${dependency.type}',
        rules: [
          {
            from: ['controllers'],
            allow: ['services', 'middlewares'],
          },
          {
            from: ['middlewares'],
            allow: ['services', 'controllers', 'config'],
          },
          {
            from: ['services'],
            allow: ['repositories'],
          },
          {
            from: ['routers'],
            allow: ['controllers', 'middlewares'],
          },
          {
            from: ['repositories'],
            allow: ['config'],
          },
        ],
      },
    ],
  },
};

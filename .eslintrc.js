module.exports = {
  env: { browser: true, es6: true, jest: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaFeatures: { jsx: true }, ecmaVersion: 2020, project: ['tsconfig.json'], sourceType: 'module' },
  plugins: ['@typescript-eslint', 'react-hooks', 'react', 'prettier'],
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'max-len': ['warn', { code: 120, ignorePattern: '//', ignoreStrings: true }],
    'new-cap': ['warn', { properties: false }],
    'no-unused-vars': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-uses-react': 'off',
    'react/no-unescaped-entities': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: { react: { version: 'detect' } },
};

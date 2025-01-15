module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'prettier',
    '.eslintrc.rules.cjs',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  ignorePatterns: ['postcss.config.js', 'tailwind.config.js'],
  plugins: ['@typescript-eslint', 'react'],
  root: true,
  rules: {
    '@typescript-eslint/no-unsafe-member-access': [
      'error',
      {
        ignorePattern: '^import\\.meta\\.env\\.',
      },
    ],
    '@typescript-eslint/no-unsafe-assignment': [
      'error',
      {
        ignorePattern: '^import\\.meta\\.env\\.',
      },
    ],
  },
};

module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    // Codebase doesn't use PropTypes consistently; rely on usage sites.
    'react/prop-types': 'off',
    // Allow lowercase HTML img attribute used by modern browsers.
    'react/no-unknown-property': ['error', { ignore: ['fetchpriority'] }],
  },
}

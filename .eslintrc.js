module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'cypress/globals': true
  },
  extends: [
    'eslint:recommended'
  ],
  'plugins': [
    'cypress'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
    'process': 'readonly',
    '__dirname': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018,
  },
  'rules': {
    'no-unused-vars': ['off', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }],
    'no-debugger': 'warn',
    'no-var-requires': ['off'],
    'quotes': [2, 'single', { 'avoidEscape': true }],
    'require-atomic-updates': 'off',
    'indent': ['off'],
    'react/prop-types': 'off'
  },
};

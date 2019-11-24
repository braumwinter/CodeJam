module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    "operator-linebreak": 'off',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "linebreak-style": 0,
    "operator-linebreak": 0,
    "no-unused-vars": ["off", { "vars": "local", "args": "none", "ignoreRestSiblings": false }],
    "no-undef": 'off'
  },
};

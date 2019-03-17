module.exports = {
    extends: 'airbnb-base',
    parser: 'babel-eslint',
    rules: {
      strict: 0, // allow use of global `use strict`
      'no-console': 0,
      'no-bitwise': 0,
      'max-len': ['error', 150],
      'prefer-destructuring': ['error', {
        AssignmentExpression: {
          object: false,
        },
      }], // only check declarations
      'prefer-const': ['error', {
        destructuring: 'all',
      }],
      'no-restricted-syntax': [
        'error', 'ForInStatement', 'LabeledStatement', 'WithStatement',
      ],
      'prefer-object-spread/prefer-object-spread': 2,
      'no-param-reassign': 0,
      'no-await-in-loop': 0,
    },
    env: {
      es6: true,
      node: true,
      mocha: true,
    },
    settings: {
    },
    plugins: [
      'prefer-object-spread',
    ],
    parserOptions: {
      ecmaVersion: 6,
      ecmaFeatures: {
        experimentalObjectRestSpread: true,
      },
    },
  };
  
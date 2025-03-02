// filepath: /Users/jack/Matcom/distnet-frontend/.eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, semi: false }]
    // Add any additional rules or overrides here
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}

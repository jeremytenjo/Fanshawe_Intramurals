module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: ['html'],
  // add your custom rules here
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production'
      ? 2
      : 0,
    "no-extra-semi": 0,
    "no-unused-vars": 0,
    "no-undef": 0,
    "indent": 0,
    "semi": 0,
    "no-unused-expressions": 0,
    "no-labels": 0,
    "handle-callback-err": 0,
    "no-unreachable": 0,
    "no-global-assign": 0,
    "keyword-spacing": 0,
    "no-inner-declarations": 0,
    "eqeqeq": 0,
    "quotes": 0,
    "curly": 0,
    "camelcase": 0,
    "no-redeclare": 0,
    "one-var": 0,
    "space-before-function-paren": 0,
    "no-multiple-empty-lines": 0,
    "padded-blocks": 0,
    "spaced-comment": 0,
    "no-floating-decimal": 0,
    "no-mixed-spaces-and-tabs": [0],
    "no-tabs": 0,
    "skipBlankLines": 0,
    "ignoreComments": 0,
    "no-trailing-spaces": [
      2, {
        "skipBlankLines": true
      }
    ]
  },
  globals: {}
}

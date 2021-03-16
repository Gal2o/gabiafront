module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    "no-console": "off",
    "vue/no-use-v-if-with-v-for": "off",
    // "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
// module.exports = {
//   root: true,
//   env: {
//     node: true,
//   },
//   extends: 'vuetify',
//   rules: {
//     'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
//     'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
//   },
//   parserOptions: {
//     parser: 'babel-eslint',
//   },
// }

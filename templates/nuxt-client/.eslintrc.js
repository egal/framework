module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/attributes-order': 'off',
    'vue/order-in-components': 'off',
    'vue/camelcase': 'off',
    'vue/import/order': 'off',
    'ordered-imports': 'off',
  },
}

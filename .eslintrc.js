module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb', // use recommended configs
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-anonymous-exports-page-templates': 'warn',
    'limited-exports-page-templates': 'warn',
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-use-before-define': 'off',
    'react/prop-types': 'off',
    'react/jsx-indent-props': 'off',
    'react/destructuring-assignment': 'off',
    'react/no-unescaped-entities': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/function-component-definition': 'off',
  },
};

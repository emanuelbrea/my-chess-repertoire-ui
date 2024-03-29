module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    'require-jsdoc': 'off',
    'linebreak-style': 'off',
    'max-len': 'off',
    'react/prop-types': 'warn',
    'no-unused-vars': 'warn',
  },
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
};

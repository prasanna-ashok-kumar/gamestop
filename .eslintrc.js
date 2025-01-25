module.exports = {
  parser: 'babel-eslint',
  root: true,
  // extends: '@react-native',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    '@react-native',
  ],
  plugins: ['react', 'react-hooks'],
  rules: {
    // You can fine-tune specific rules if needed
    'react-hooks/rules-of-hooks': 'error', // Ensures hooks are used properly
    'react-hooks/exhaustive-deps': 'warn', // Ensures dependencies in useEffect are correct
  },
};

module.exports = {
  extends: [
    "react-app",
    'airbnb-base',
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "no-console": "warn",
    "import/extensions": "off"
  },
  env: {
    "browser": true,
    "es2021": true,
    "node": true,
  },
  parserOptions: {
    "ecmaVersion": 12,
    "sourceType": "module",
  },
   settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "airbnb-base",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect", // auto-detect React version
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off", // React 17+ no import needed
    "no-console": "off", // Allows console.log, console.error, etc
    "no-underscore-dangle": ["error", { allow: ["_id"] }], // Allows usage of `req.user._id
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
  },
  globals: {
    process: "readonly", // fix 'process' undefined
  },
};

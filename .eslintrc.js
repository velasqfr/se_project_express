module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  ignorePatterns: ["src/**", "vite.config.js"],
  rules: {
    "no-console": "off",
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
  },
  globals: {
    process: "readonly",
    __dirname: "readonly",
    module: "readonly",
    require: "readonly",
  },
};

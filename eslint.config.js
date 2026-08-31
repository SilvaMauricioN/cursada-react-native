// eslint.config.js
const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-config-prettier');
const { defineConfig } = require('eslint/config');

module.exports = defineConfig([
  expoConfig,
  prettierConfig,
  {
    ignores: [
      'node_modules/**',
      '**/node_modules/**',
      '**/.expo/**',
      '**/.expo-shared/**',
      '**/dist/**',
      '**/build/**',
      '**/ios/**',
      '**/android/**',
      '**/web-build/**',
      '**/coverage/**',
      '**/*.d.ts',
    ],
  },
]);
'use strict';

const path = require('path');
const fs = require('fs');

const babelConfig = require('./babel.config');

const currentPath = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(currentPath, relativePath);

module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  globals: { 'ts-jest': { babelConfig, tsconfig: resolvePath('tsconfig.json') } },
  preset: 'ts-jest/presets/js-with-babel',
  reporters: ['default', ['jest-junit', { outputDirectory: './coverage', outputName: 'junit.xml' }]],
  restoreMocks: true,
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', '@testing-library/jest-dom'],
  testEnvironment: 'jsdom',
  transform: { '^.+\\.tsx?$': 'ts-jest' },
};

import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],

  moduleNameMapper: {
    '\\.(css|scss|sass|less)$': 'identity-obj-proxy',
  },

  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  clearMocks: true,
};

export default config;

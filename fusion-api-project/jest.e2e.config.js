module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/integration/**/*.test.ts"],
  globalSetup: "<rootDir>/tests/setup/jest.e2e.setup.ts",
  globalTeardown: "<rootDir>/tests/setup/jest.e2e.teardown.ts",
  testTimeout: 20000
};
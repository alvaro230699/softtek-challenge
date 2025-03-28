/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  testTimeout: 150000,
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
};
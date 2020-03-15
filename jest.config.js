module.exports = {
  displayName: {
    name: "klox-dev-test",
    color: "blue"
  },
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/tests/setup"],
  verbose: true,
  bail: false,
  clearMocks: true,
  collectCoverage: true,
  roots: [
    "<rootDir>"
  ],
  cache: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.js",
    "<rootDir>/server.js"
  ],
  coverageThreshold: {
    "global": {
      "branches": 100,
      "functions": 100,
      "lines": 100,
      "statements": 100
    }
  }
};

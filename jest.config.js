module.exports = {
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.js'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      diagnostics: true,
    },
  },
  collectCoverage: true,
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'identity-obj-proxy',
    '^@interviewApp/(.*)': '<rootDir>/$1',
    '@interviewApp/(.*)': '<rootDir>/$1',
  },

  testMatch: ['<rootDir>/tests/**/*.test.(js|ts|tsx)'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/public/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

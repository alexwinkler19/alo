module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!.*(react-native|@react-native|expo|@expo|@alo|@react-navigation))'
  ],
  setupFiles: ['<rootDir>/jest.setup.js'],
};

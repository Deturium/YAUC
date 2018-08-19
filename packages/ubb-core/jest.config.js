module.exports = {

  "roots": [
    "<rootDir>/src"
  ],

  // "setupFiles": [
  //   "<rootDir>/test/test-setup.js"
  // ],

  "testRegex": "(/__tests__/.*|\\.(test|spec))\\.[jt]sx?$",

  "moduleFileExtensions": [
    "ts", "tsx", "js", "jsx", "json"
  ],

  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },

  "globals": {
    "ts-jest": {
      // "tsConfigFile": "tsconfig.test.json",
      // "useBabelrc": true,
      // "skipBabel": true,
    }
  },

}

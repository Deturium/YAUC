// from https://stackoverflow.com/a/42588527

require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    allowSyntheticDefaultImports: true,
    esModuleInterop: true
  },
});
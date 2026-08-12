import { createDefaultEsmPreset } from 'ts-jest';

// const tsJestTransformCfg = createDefaultPreset().transform;
const tsJestPreset = createDefaultEsmPreset({
  isolatedModules: true,
});

/** @type {import("jest").Config} **/
export default {
  ...tsJestPreset,
  testEnvironment: 'node',
  // transform: {
  //   ...tsJestTransformCfg,
  // },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
exports.config = {
  baseUrl: 'http://localhost:3000',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  capabilities: {
    browserName: 'chrome',
  },
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  specs: ['test/features/*.feature'],
  cucumberOpts: {
    require: 'test/features/support/*.js',
    format: 'progress',
  },
};

exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    '../test//**/*e2e-spec.js'
  ],

  capabilities: {
    'browserName': 'chrome'
//    'browserName': 'firefox'
  },

  baseUrl: 'http://localhost:3000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};

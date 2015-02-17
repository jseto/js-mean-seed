'use strict';

var project = require('../project.conf.js');

exports.config = {
  allScriptsTimeout: 11000,
  directConnect: true,

  specs: project.test.e2e.files,

  capabilities: {
    'browserName': 'chrome'
//    'browserName': 'firefox'
  },

  baseUrl: 'http://localhost:' + project.port + '/',

  framework: 'jasmine2',

  jasmineNodeOpts: {
    // If true, print colors to the terminal.
    showColors: true,
    // Default time to wait in ms before a test fails.
    defaultTimeoutInterval: 30000,
    // Function called to print jasmine results.
    print: function() {
    },
    // If set, only execute specs whose names match the pattern, which is
    // internally compiled to a RegExp.
//    grep: 'pattern',
    // Inverts 'grep' matches
    invertGrep: false
  },

  onPrepare: function() {
    var reporter = require('jasmine-reporters');
    // add jasmine spec reporter
    jasmine.getEnv().addReporter(new reporter.TerminalReporter({
            verbosity: 2,
            color: true
        }));
  }
};

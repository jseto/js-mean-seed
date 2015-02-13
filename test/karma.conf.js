'use strict';

var project = require('../project.conf.js');

module.exports = function(config){
  var preprocessors = {};
  preprocessors[ project.path.test + '**/*.html'] = 'ng-html2js';
  preprocessors[ project.path.lib + '**/*.js' ] = 'coverage';

  config.set({

    basePath : project.path.base,

    exclude : project.test.unit.exclude,

    files : project.test.unit.files,
 
    preprocessors: preprocessors,

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-beep-reporter',
            'karma-coverage',
            'karma-ng-html2js-preprocessor'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },
    coverageReporter: {
      // specify a common output directory
      dir: project.path.coverage,
      reporters: [
        { type: 'lcov', subdir: 'report-lcov' },
      ]
    }

  });
};

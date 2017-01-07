module.exports = function(config){
  config.set({

    basePath : './',

    files : [
        'node_modules/babel-polyfill/dist/polyfill.js',
        'bower_components/angular.js',
        'bower_components/angular-route.js',
        'bower_components/angular-mocks.js',
        'bower_components/jquery.js',
        'bower_components/bootstrap.js',
        'bower_components/jasmine-jquery.js',
        'js/app.js',
        'js/**/*.js',
        'tests/**/*.js',

        // fixtures
        {pattern: 'tests/mockJSON/*.json', watched: true, served: true, included: false}
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};

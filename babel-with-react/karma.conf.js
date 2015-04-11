module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/**/__tests__/*_test.js'
    ],
    exclude: [],
    preprocessors: {
      'src/**/__tests__/*_test.js': ['webpack'],
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS2'],
    singleRun: false,

    webpack: {
      module: {
        loaders: [
          { test: /\.js/, loader: 'babel-loader' }
        ]
      }
    },

    webpackPort: 1234
  });
};

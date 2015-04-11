module.exports = function(config) {
  config.set({
    files: [
      "src/**/*.js",
      "test/**/*.js"
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      "src/**/*.js": ["babel"],
      "test/**/*.js": ["babel"]
    },
    "babelPreprocessor": {
      options: {
        sourceMap: "inline"
      },
      filename: function(file) {
        return file.originalPath.replace(/\.js$/, ".es5.js");
      },
      sourceFileName: function(file) {
        return file.originalPath;
      }
    },
    browsers: ['PhantomJS2']
  });
};

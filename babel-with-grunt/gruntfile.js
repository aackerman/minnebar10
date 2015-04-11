var grunt = require('grunt');
require("load-grunt-tasks")(grunt);

grunt.initConfig({
  "babel": {
    options: {
      sourceMap: true
    },
    dist: {
      files: {
        "dist/app.js": "app.js"
      }
    }
  }
});

grunt.registerTask("default", ["babel"]);

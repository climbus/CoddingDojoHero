
module.exports = function(grunt) {
  grunt.initConfig({
    jasmine: {
      src: ["public/javascripts/toolbar.js", "public/javascripts/generic_box.js", "public/javascripts/editor.js", "public/javascripts/codding_box.js"],
      options: {
        specs: "tests/**/*.js",
        vendor: "public/javascripts/libs/**/*.js",
        keepRunner: true
      }
    },
    jasmine_nodejs: {
      pages: {
        specs: ["spec/**",],
      }
    },
    express: {
      dev: {
        options: {
          script: 'dev.js',
          port: 3000,
          background: false,
          debug: true
        }
      },
      test: {
        options: {
          script: 'test.js',
          port: 3000,
          background: true
        }
      },
    },

  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-jasmine-nodejs');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('test', ['express:test', 'jasmine', 'jasmine_nodejs']);
  grunt.registerTask('bdd', ['express:test', 'jasmine_nodejs']);
};
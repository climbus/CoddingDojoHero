
module.exports = function(grunt) {
  grunt.initConfig({
    jasmine_node: {
      options: {
        forceExit: true,
        match: '.',
        matchall: false,
        extensions: 'js',
        specNameMatcher: 'spec'
      },
      all: ['spec/']
    },
    jasmine: {
      src: ["public/javascripts/generic_box.js", "public/javascripts/editor.js", "public/javascripts/codding_box.js"],
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

  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-jasmine-nodejs');

  grunt.registerTask('test', ['jasmine', 'jasmine_nodejs']);
};
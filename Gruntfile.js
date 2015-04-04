
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
      src: "public/javascripts/**/*.js",
      options: {
        specs: "tests/**/*.js",
        vendor: "public/javascripts/libs/**/*.js"
      }
    }
  });

  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('test', ['jasmine', 'jasmine_node']);
};

module.exports = function(grunt) {
  grunt.initConfig({
    jasmine: {
      src: ["public/javascripts/toolbar.js",
            "public/javascripts/generic_box.js",
            "public/javascripts/editor.js",
            "public/javascripts/coding_box.js",
            "public/javascripts/console.js",
            "public/javascripts/console_box.js"
            ],
      options: {
        specs: "tests/**/*.js",
        vendor: "public/javascripts/libs/**/*.js",
        keepRunner: true
      }
    },
    jasmine_nodejs: {
      options: {
       reporters: {
          console: {
            colors: true,
            cleanStack: false,
            verbose: true
          },
        }
      },
      pages: {
        specs: ["spec/index_phantomjs_spec.js", "spec/index_firefox_spec.js"],
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
    env : {
      test : {
        concat   : {
          PATH     : {
            'value': 'c:\\browsers\\',
            'delimiter': ';'
          }
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-jasmine-nodejs');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-selenium-webdriver');

  grunt.registerTask('test', ['env:test', 'express:test', 'selenium_start', 'jasmine', 'jasmine_nodejs', 'selenium_stop']);
  grunt.registerTask('bdd', ['env:test', 'express:test', 'selenium_start', 'jasmine_nodejs', 'selenium_stop']);
};
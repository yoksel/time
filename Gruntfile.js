'use strict';
/**
 * Grunt module
 */
module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    /**
     * Project info
     */
    project: {
      css_src: [
        '_src/css'
      ],
      css_res: [
        'assets/css'
      ],
      js: [
        'src/js/*.js'
      ]
    },

    /**
     * Project banner
     * Inherits text from package.json
     */
    tag: {
      banner: '/*!\n' +
              ' * Name: <%= pkg.name %>\n' +
              ' * Project: <%= pkg.description %>\n' +
              ' * Author: <%= pkg.author %>\n' +
              ' * Version: <%= pkg.version %>\n' +
              ' */\n'
    },

    /**
     * https://npmjs.org/package/grunt-contrib-sass
     */
    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          '<%= project.css_src %>/style.unprefixed.css': '<%= project.css_src %>/style.scss'
        }
      },
      dist: {
        options: {
          style: 'expanded',
          banner: '<%= tag.banner %>'
        },
        files: {
          '<%= project.css_src %>/style.unprefixed.css': '<%= project.css_src %>/style.scss'
        }
      }
    },

    /**
     * https://npmjs.org/package/grunt-autoprefixer
     */
    autoprefixer: {
      dev: {
        options: {},
        src: '<%= project.css_src %>/style.unprefixed.css',
        dest: '<%= project.css_res %>/style.css'
      },
      dist: {
        options: {},
        src: '<%= project.css_src %>/style.unprefixed.css',
        dest: '<%= project.css_src %>/style.prefixed.css'
      },
    },

    /**
     * https://npmjs.org/package/grunt-csso
     */
    csso: {
      compress: {
        options: {
          report: 'min'
        },
        files: {
          '<%= project.css_res %>/style.css': ['<%= project.css_src %>/style.prefixed.css']
        }
      }
    },

    /**
     * Clean files and folders
     * https://github.com/gruntjs/grunt-contrib-clean
     * Remove generated files for clean deploy
     */
    clean: {
      dev: [
        '_src/css/style.prefixed.css',
        '_src/css/style.unprefixed.css'
      ],
      build: [
        'Gruntfile.js',
        'package.json',
        '_src'
      ]
    },

    /**
     * https://npmjs.org/package/grunt-contrib-watch
     * Now with livereload
     */
    watch: {
      css: {
        files: '<%= project.css_src %>{,*/}*.{scss,sass}',
        tasks: ['sass:dev', 'autoprefixer', 'clean:dev'],
        options: {
          livereload: 35740,
        },
      },
    },

    connect: {
      server: {
        options: {
          port: 9001
        }
      }
    },
    open : {
      dev : {
        path: 'http://localhost:9001/'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-csso');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-clean');

  /**
   * Default task
   * Run `grunt` on the command line
   */
  grunt.registerTask('default', [
    'connect',
    'open',
    'watch'
    ]);

  grunt.registerTask('build', [
    'sass:dist',
    'autoprefixer:dist',
    'csso',
    'clean:build'
    ]);


};

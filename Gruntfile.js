module.exports = function(grunt) {
  var config = grunt.file.readJSON('config.json');

  var couch = grunt.option('couch') || 'localhost';
  var couchpushopts = null;
  if (couch) {
    couchpushopts = {
      options: {
        user: config.couches[couch].user,
        pass: config.couches[couch].pass
      }
    };
    couchpushopts[couch] = {};
    var files = {};
    files[config.couches[couch].database] = 'tmp/libremap-api.json';
    couchpushopts[couch] = { files: files};
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // lint js files
    jshint: {
      options: {
        '-W025': true // Missing name in function declaration.
      },
      files: ['ddoc/**/*.js', 'vendor/**/*.js']
    },
    replace: {
      glue: {
        options: { patterns: [ {
          match: 'module', replacement: 'libremap-common'
        }]},
        files: [
          {
            src: ['couchdb-browserify-glue-module.js'],
            dest: 'tmp/libremap-common.glue'
          }
        ]
      },
    },
    browserify: {
      glue: {
        dest: 'tmp/libremap-common.js',
        src: ['tmp/libremap-common.glue'],
        options: {
        }
      }
    },
    concat: {
      glue: {
        src: ['tmp/libremap-common.js', 'couchdb-browserify-glue-footer.js'],
        dest: 'tmp/merge/views/lib/libremap-common.js'
      }
    },
    'couch-compile': {
      'libremap-api': {
        options: {
          merge: 'tmp/merge'
        },
        files: {
          'tmp/libremap-api.json': 'ddoc'
        }
      }
    },
    'couch-push': couchpushopts
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-couch');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('push', ['jshint', 'replace:glue', 'browserify', 'concat', 'couch']);
};

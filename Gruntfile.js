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
  }

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
      'glue-libremap-common': {
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
      'glue-couchmap-common': {
        options: { patterns: [ {
          match: 'module', replacement: 'couchmap-common'
        }]},
        files: [
          {
            src: ['couchdb-browserify-glue-module.js'],
            dest: 'tmp/couchmap-common.glue'
          }
        ]
      }
    },
    browserify: {
      'glue-libremap-common': {
        dest: 'tmp/libremap-common.js',
        src: ['tmp/libremap-common.glue'],
      },
      'glue-couchmap-common': {
        dest: 'tmp/couchmap-common.js',
        src: ['tmp/couchmap-common.glue'],
      }
    },
    concat: {
      'glue-libremap-common': {
        src: [
        'tmp/libremap-common.js',
        'couchdb-browserify-glue-footer.js'
        ],
        dest: 'tmp/merge/views/lib/libremap-common.js'
      },
      'glue-couchmap-common': {
        src: [
        'tmp/couchmap-common.js',
        'couchdb-browserify-glue-footer.js'
        ],
        dest: 'tmp/merge/views/lib/couchmap-common.js'
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
  grunt.registerTask('push', [
    'jshint',
    'replace',
    'browserify',
    'concat',
    'couch'
  ]);
};

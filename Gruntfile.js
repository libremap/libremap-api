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
      files: ['ddoc/**/*.js']
    },
    'couch-compile': {
      'libremap-api': {
        options: {
          merge: 'ddoc-vendor'
        },
        files: {
          'tmp/libremap-api.json': 'ddoc'
        }
      }
    },
    'couch-push': couchpushopts
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-couch');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('push', ['couch']);
};

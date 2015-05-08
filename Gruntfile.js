// Generated on 2015-03-16 using
// generator-lessapp 0.5.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/**/*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist',
    statics: 'statics',
    server: 'server',
    nodemonPort: '8181',
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    pkg: grunt.file.readJSON('package.json'),

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      options: {
        nospawn: true
      },
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      coffee: {
        files: ['<%= config.app %>/**/*.{coffee,litcoffee,coffee.md,js}'],
        tasks: ['coffee:dev']
      },
      coffeeTest: {
        files: ['test/spec/**/*.{coffee,litcoffee,coffee.md}'],
        tasks: ['coffee:test', 'test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      less: {
        files: ['<%= config.app %>/statics/styles/**/*.{less,css}'],
        tasks: ['less:dev', 'autoprefixer']
      },
      scripts: {
        files: ['<%= config.app %>/**/*.{js,ejs}'],
        tasks: ['newer:copy:scripts']
      },
      styles: {
        files: ['<%= config.app %>/statics/styles/**/*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/statics/**/*.html',
          '.tmp/statics/styles/**/*.css',
          '.tmp/statics/scripts/**/*.js',
          '<%= config.app %>/statics/images/**/*'
        ]
      }
    },

    nodemon: {
      dev: {
        script: '.tmp/<%= pkg.main %>',
        options: {
          env: {
            PORT: '<%= config.nodemonPort %>'
          },
          cwd: __dirname,
          nodeArgs: ['--debug'],
          watch: ['.tmp'],
          ignore: ['.tmp/statics/**'],
          delay: 300,
          callback: function(nodemon) {

            nodemon.on('log',function(event){
              console.log(event.colour);
            });

          }
        }
      }
    },

    /*shell: {
      options: {
        stdout: true,
        stderr: true
      },
      nodemon: {
        command: 'nodemon ./<%= config.tmp %>/<%= pkg.main %>',
      }
    },*/

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: '*'
      },
      proxies: [
        {
          context: '/',
          host:'localhost',
          port: '<%= config.nodemonPort %>',
          https: false
        }
      ],
      livereload: {
        options: {
          middleware: function(connect, options) {

            var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;

            return [
              connect.static('.tmp/statics'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect().use('/fonts', connect.static('<%= config.app %>/bower_components/bootstrap/dist/fonts')),
              connect.static(config.app),
              proxy
            ];
          }
        }
      },
      test: {
        options: {
          open: false,
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('.tmp/statics'),
              connect.static('test'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect().use('/fonts', connect.static('./bower_components/bootstrap/dist/fonts')),
              connect.static(config.app)
            ];
          }
        }
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
          livereload: false
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      dev: ['.tmp'],
      heroku: {
        files: [{
          dot: true,
          src: [
            '.src',
            '<%= config.app %>/*'
          ]
        }]
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/statics/scripts/**/*.js',
        '!<%= config.app %>/statics/scripts/vendor/*',
        'test/statics/spec/**/*.js'
      ]
    },

    // Mocha testing framework configuration options
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
        }
      }
    },

    // Compiles CoffeeScript to JavaScript
    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>',
          src: '**/*.{coffee,litcoffee,coffee.md}',
          dest: '.tmp',
          ext: '.js'
        }]
      },
      dev: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>',
          src: '**/*.{coffee,litcoffee,coffee.md}',
          dest: '.tmp',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '**/*.{coffee,litcoffee,coffee.md}',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },

    // Compiles LESS to CSS and generates necessary files if requested
    less: {
      options: {
        paths: ['./bower_components'],
      },
      dist: {
        options: {
          cleancss: true,
          report: 'min'
        },
        files: [{
          expand: true,
          cwd: '<%= config.app %>/statics/styles',
          src: '*.less',
          dest: '.tmp/statics/styles',
          ext: '.css'
        }]
      },
      dev: {
        options: {
          sourceMap: true,
          sourceMapBasepath: '<%= config.app %>/',
          sourceMapRootpath: '../'
        },
        files: [{
          expand: true,
          cwd: '<%= config.app %>/statics/styles',
          src: ['*.less'],
          dest: '.tmp/statics/styles',
          ext: '.css'
        }]
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/statics/styles/',
          src: '**/*.css',
          dest: '.tmp/statics/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        ignorePath: /^\/|\.\.\//,
        src: ['<%= config.app %>/**/.{html,ejs}'],
        exclude: ['bower_components/bootstrap/dist/js/bootstrap.js']
      },
      less: {
        src: ['<%= config.app %>/statics/styles/**/*.less'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        options: {
          encoding: 'utf8',
          algorithm: 'md5',
          length: 8
        },
        files: {
          src: [
            '<%= config.dist %>/statics/scripts/**/*.js',
            '<%= config.dist %>/statics/styles/**/*.css',
            '<%= config.dist %>/statics/images/**/*.*',
            '<%= config.dist %>/statics/styles/fonts/**/*.*',
            '<%= config.dist %>/statics/*.{ico,png}'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>/statics'
      },
      html: '<%= config.app %>/**/*.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dist %>/statics',
          '<%= config.dist %>/statics/images',
          '<%= config.dist %>/statics/scripts',
          '<%= config.dist %>/statics/styles'
        ]
      },
      html: ['<%= config.dist %>/**/*.{ejs,html}'],
      css: ['<%= config.dist %>/**/*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/statics/images',
          src: '**/*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/statics/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/statics/images',
          src: '**/*.svg',
          dest: '<%= config.dist %>/statics/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '**/*.{html,ejs}',
          dest: '<%= config.dist %>'
        }]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    /*cssmin: {
      minify: {
        expand: true,
        cwd: '.tmp/statics/styles',
        src: '*.css',
        dest: '<%= config.dist %>/statics/styles',
        ext: '.css'
      }
    },
    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/statics/scripts', //js目录下
          src: '*.js', //所有js文件
          dest: '<%= config.dist %>/statics/scripts' //输出到此目录下
        }]
      }
    },
    concat: {
      dist: {
        options: {
          banner: "",
          process: function(src, filepath) {
            return '// Source: ' +filepath+ '\n' + src;
          }
        },
        files: {
          "<%= config.tmp %>/<%= config.statics %>/scripts/run.js": ["<%= config.compiled %>/<%= config.statics %>/scripts/*.js"]
        }
      }
    },*/

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>/statics',
          dest: '<%= config.dist %>/statics',
          src: [
            '*.{ico,png,txt}',
            'images/**/*.webp',
            '**/*.html',
            'styles/fonts/**/*.*'
          ]
        }, {
          src: 'node_modules/nginx-server-configs/dist/.htaccess',
          dest: '<%= config.dist %>/.htaccess'
        }, {
          expand: true,
          dot: true,
          cwd: 'bower_components/bootstrap/dist',
          src: 'fonts/*',
          dest: '<%= config.dist %>/statics'
        }, {
          expand: true,
          dot: true,
          cwd: '.tmp',
          filter: function(filepath){
            return !/statics/.test(filepath)
          },
          dest: '<%= config.dist %>',
          src: '**/*.js'
        }, {
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          filter: function(filepath){
            return !/statics/.test(filepath)
          },
          dest: '<%= config.dist %>',
          src: '**/*.{js,ejs}'
        }]
      },
      scripts: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '.tmp/',
          src: '**/*.{js,ejs}'
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/statics/styles',
        dest: '.tmp/statics/styles/',
        src: '**/*.css'
      },
      heroku: {
        files:[{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '.src',
          src: '**/*'
        },{
          expand: true,
          dot: true,
          cwd: '<%= config.dist %>',
          dest: '<%= config.app %>',
          src: '**/*'
        }]
      }
    },

    /*command: {
      server: {
        cmd : ['foreman start']
      }
    },

    express: {
      server : {
        options: {
          script: './.tmp/index.js'
        }
      }
    },*/

    // Run some tasks in parallel to speed up build process
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: [
        'less:dev',
        'copy:styles',
      ],
      test: [
        'coffee',
        'copy:styles'
      ],
      dist: [
        'coffee:dist',
        'less:dist',
        'imagemin',
        'svgmin'
      ]
    }
  });


  grunt.registerTask('dev', 'start the server and preview your app, --allow-remote for remote access', function(target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }


    var nodemon = grunt.util.spawn({
      cmd: 'grunt',
      grunt:true,
      args: 'nodemon'
    });

    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([
      'clean:dev',
      'wiredep',
      'coffee:dev',
      'copy:scripts',
      'concurrent:dev',
      'connect:livereload',
      'configureProxies:server',
      'watch'
    ]);

  });

  grunt.registerTask('server', function(target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt dev` to start a server.');
    grunt.task.run([target ? ('dev:' + target) : 'dev']);
  });

  grunt.registerTask('test', function(target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:dev',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    grunt.task.run([
      'connect:test',
      'mocha'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'concurrent:dist',
    'copy:dist',
    'copy:scripts',
    'copy:styles',
    'useminPrepare',
    'autoprefixer',
    'concat',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('heroku:production', [
    'clean:dist',
    'wiredep',
    'concurrent:dist',
    'copy:dist',
    'copy:scripts',
    'copy:styles',
    'useminPrepare',
    'autoprefixer',
    'concat',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'htmlmin',
    'clean:heroku',
    'copy:heroku'
  ]);

  grunt.registerTask('heroku:production', [
    'clean:dist',
    'wiredep',
    'concurrent:dist',
    'copy:dist',
    'copy:scripts',
    'copy:styles',
    'useminPrepare',
    'autoprefixer',
    'concat',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'htmlmin',
    'clean:heroku',
    'copy:heroku'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
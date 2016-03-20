module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: [
                'build'
            ]
        },
        copy: {
            prod: {
                files: [
                    {expand: true, src: ['js/lib/**'], dest: 'build/'},
                    {expand: true, src: ['fonts/*'], dest: 'build/', filter: 'isFile'},
                    {expand: true, src: ['images/*'], dest: 'build/'},
                    {expand: true, src: ['images/backgrounds/*'], dest: 'build/'},
                    {expand: true, src: ['images/gallery/**'], dest: 'build/'},
                    {expand: true, src: ['images/partners/*.jpg'], dest: 'build/'},
                    {expand: true, src: ['images/partners/*.jpeg'], dest: 'build/'},
                    {expand: true, src: ['images/partners/*.JPG'], dest: 'build/'},
                    {expand: true, src: ['images/partners/*.JPEG'], dest: 'build/'},
                    {expand: true, src: ['images/partners/*.png'], dest: 'build/'},
                    {expand: true, src: ['images/partners/*.PNG'], dest: 'build/'},
                    {expand: true, src: ['php/*'], dest: 'build/'},
                    {expand: true, src: ['*.html'], dest: 'build/', filter: 'isFile'},
                    {expand: true, src: ['css/lib/default-skin/**'], dest: 'build/'},
                ],
            },
            csslibs: {
                files: [
                    {expand: true, src: ['css/lib/*.css'], dest: 'build/', filter: 'isFile'}
                ]
            }
        },
        jshint: {
            prod: [
                '/js/app/*.js',
                'Gruntfile.js' ]
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            prod: {
                files: {
                    'build/js/app/index.js': 'js/app/index.js',
                    'build/js/app/AnimatedButton.js': 'js/app/AnimatedButton.js',
                    'build/js/app/data.js': 'js/app/data.js',
                    'build/js/app/mainNav.js': 'js/app/mainNav.js',
                    'build/js/app/partners.js': 'js/app/partners.js',
                    'build/js/app/gallery.js': 'js/app/gallery.js',
                    'build/js/app/emonitorMappings.js': 'js/app/emonitorMappings.js',
                    'build/js/app/buildCharts.js': 'js/app/buildCharts.js',
                }
            }
        },
        less: {
            dev: {
                options: {
                    paths: ["css"]
                },
                files: {
                    "css/about.css": "css/about.less",
                    "css/about1200.css": "css/about1200.less",
                    "css/about650.css": "css/about650.less",
                    "css/about900.css": "css/about900.less",
                    "css/aboutMobile.css": "css/aboutMobile.less",
                    "css/data.css": "css/data.less",
                    "css/data775.css": "css/data775.less",
                    "css/dataMobile.css": "css/dataMobile.less",
                    "css/index.css": "css/index.less",
                    "css/index650.css": "css/index650.less",
                    "css/indexMobile.css": "css/indexMobile.less",
                    "css/indexMobile_landscape.css": "css/indexMobile_landscape.less",
                    "css/partners.css": "css/partners.less",
                    "css/partners650.css": "css/partners650.less",
                    "css/partnersMobile.css": "css/partnersMobile.less",
                    "css/gallery.css": "css/gallery.less",
                    "css/gallery650.css": "css/gallery650.less",
                    "css/galleryMobile.css": "css/galleryMobile.less",
                    "css/gallery-albums.css": "css/gallery-albums.less",
                    "css/gallery-albums600.css": "css/gallery-albums600.less",
                    "css/mainNav.css": "css/mainNav.less",
                    "css/mainNavMobile.css": "css/mainNavMobile.less",
                }
            },
            prod: {
                options: {
                    paths: ["css"],
                    // plugins: [
                    //   new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
                    //   new (require('less-plugin-clean-css'))(cleanCssOptions)
                    // ]
                },
                files: {
                    "build/css/about.css": "css/about.less",
                    "build/css/about1200.css": "css/about1200.less",
                    "build/css/about650.css": "css/about650.less",
                    "build/css/about900.css": "css/about900.less",
                    "build/css/aboutMobile.css": "css/aboutMobile.less",
                    "build/css/data.css": "css/data.less",
                    "build/css/data775.css": "css/data775.less",
                    "build/css/dataMobile.css": "css/dataMobile.less",
                    "build/css/index.css": "css/index.less",
                    "build/css/index650.css": "css/index650.less",
                    "build/css/indexMobile.css": "css/indexMobile.less",
                    "build/css/indexMobile_landscape.css": "css/indexMobile_landscape.less",
                    "build/css/partners.css": "css/partners.less",
                    "build/css/partners650.css": "css/partners650.less",
                    "build/css/partnersMobile.css": "css/partnersMobile.less",
                    "build/css/gallery.css": "css/gallery.less",
                    "build/css/gallery650.css": "css/gallery650.less",
                    "build/css/galleryMobile.css": "css/galleryMobile.less",
                    "build/css/gallery-albums.css": "css/gallery-albums.less",
                    "build/css/gallery-albums600.css": "css/gallery-albums600.less",
                    "build/css/mainNav.css": "css/mainNav.less",
                    "build/css/mainNavMobile.css": "css/mainNavMobile.less"
                }
            }
        },
        cssmin: {
            prod: {
                expand: true,
                cwd: 'build/css',
                src: ['*.css'],
                dest: 'build/css'
            }
        },
        responsive_images: {
          mytask: {
            options: {
                newFilesOnly: true,
                sizes: [{
                    name: "medium",
                    width: 1024
                }, {
                    name: "small",
                    width: 512
                }, {
                    name: "thumb_large",
                    width: 384
                }, {
                    name: "thumb_small",
                    width: 190
                }],
                rename: false
            },
            files: [{
                expand: true,
                src: ['**.{JPG,jpg,JPEG,jpeg,PNG,png}'],
                cwd: 'images/gallery/lab/',
                custom_dest: 'images/gallery/lab/{%= name %}/'
            },{
                expand: true,
                src: ['**.{JPG,jpg,JPEG,jpeg,PNG,png}'],
                cwd: 'images/gallery/exterior/',
                custom_dest: 'images/gallery/exterior/{%= name %}/'
            },{
                expand: true,
                src: ['**.{JPG,jpg,JPEG,jpeg,PNG,png}'],
                cwd: 'images/gallery/interior/',
                custom_dest: 'images/gallery/interior/{%= name %}/'
            },{
                expand: true,
                src: ['**.{JPG,jpg,JPEG,jpeg,PNG,png}'],
                cwd: 'images/gallery/events/',
                custom_dest: 'images/gallery/events/{%= name %}/'
            }]
          }
        },
        "file-creator": {
            "debugConfig": {
                "js/app/buildConfig.js": function(fs, fd, done) {
                    fs.writeSync(fd, 'define([], function() {return {debug: true}});');
                    done();
                },
                "php/buildConfig": function(fs, fd, done) {
                    fs.writeSync(fd, 'debug');
                    done();
                }
            },
            "releaseConfig": {
                "build/js/app/buildConfig.js": function(fs, fd, done) {
                    fs.writeSync(fd, 'define([], function() {return {debug: false}});');
                    done();
                },
                "build/php/buildConfig": function(fs, fd, done) {
                    fs.writeSync(fd, 'release');
                    done();
                }
            },
        },
        "run": {
            "options": {
                // execute node with additional arguments
            },
            "rename-images-exterior": {
                cmd: 'scripts/rename-images.sh',
                args: ['images/gallery/exterior']
            },
            "rename-images-interior": {
              cmd: 'scripts/rename-images.sh',
              args: ['images/gallery/interior']
            },
            "rename-images-lab": {
              cmd: 'scripts/rename-images.sh',
              args: ['images/gallery/lab']
            },
            "rename-images-events": {
              cmd: 'scripts/rename-images.sh',
              args: ['images/gallery/events']
            }
      	}
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-file-creator');
    grunt.loadNpmTasks('grunt-run');

    // Development task(s).
    grunt.registerTask('debug', [
        'jshint:prod',
        'less:dev',
        'file-creator:debugConfig'
    ]);
    // Production task(s).
    grunt.registerTask('release', [
        'clean:build',
        'run:rename-images-exterior',
        'run:rename-images-interior',
        'run:rename-images-lab',
        'run:rename-images-events',
        'responsive_images',
        'copy:prod',
        'jshint:prod',
        'uglify:prod',
        'less:prod',
        'cssmin:prod',
        'copy:csslibs',
        'file-creator:releaseConfig'
    ]);
};

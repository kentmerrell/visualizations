/**
 * Created by Kent on 10/4/2014.
 */
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: {
            install: {
                options: {
                    install: true,
                    copy: false,
                    targetDir: './bower_components',
                    cleanTargetDir: true
                }
            }
        },
        uglify: {
            dist: {
                src: 'public/App/appCreateReport.js',
                dest: 'appCreateReport.min.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify']);
}


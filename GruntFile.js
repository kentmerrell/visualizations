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
        html2js:{
            dist:{
                src:['public/**/*.html','!public/**/*doco.html','!public/**/*Doco.html','!test.*.html'],
                dest:'dist/templates.js'
            }
        },
        concat:{
            options:{
                separator:';'
            },
            dist:{
                src:['public/app/appCreateReport.js','public/**/*.js'],
                dest:'dist/createReport.js'
            }
        },
        uglify: {
            dist: {
                src: 'public/app/appCreateReport.js',
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


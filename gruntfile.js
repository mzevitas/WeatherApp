 module.exports = function(grunt) {
     grunt.initConfig({

         concat: { //name of task
             options: {
                 separator: '\n\n//---------------------------\n\n'
             },
             dist: {
                 src: [
                     'js/main.js'
                 ],
                 dest: 'js/script.js'
             }
         },
         uglify: {
             options: {
                 mangle: false,
                 sourceMap: true,
                 preserveComments: false
             },
             target: {
                 files: {
                     'dist/assets/js/script.min.js': ['js/script.js']
                 }
             }
         },
         cssmin: {
             options: {
                 shorthandCompacting: false,
                 roundingPrecision: -1
             },
             target: {
                 files: {
                     'dist/assets/css/style.min.css': ['css/style.css']
                 }
             }
         },
         copy: {
             main: {
                 files: [{
                         expand: true,
                         flatten: false,
                         cwd: 'images',
                         src: '**',
                         dest: 'dist/images',
                         filter: 'isFile'
                     }
                 ]
             }
         },
         processhtml: {
             options: {},
             dist: {
                 files: [{
                     expand: true,
                     cwd: '',
                     src: ['*.html'],
                     dest: 'dist/',
                     ext: '.html'
                 }, ]
             }
         },
         sass: {
             dist: {
                 options: { 
                     style: 'expanded'
                 },
                 files: [{
                     src: 'sass/styles.scss',
                     dest: 'css/styles.css'
                 }]
             }
         }, 
         connect: {
             server: {
                 options: {
                     hostname: 'localhost',
                     port: 8000,
                     base: '',
                     livereload: true
                 }
             }
         },

         watch: {
             options: {
                 spawn: false,
                 livereload: true
             },
             scripts: {
                 files: ['**/*.html',
                     'js/**/*.js',
                     'sass/**/*.scss'
                 ],
                 tasks: ['concat', 'sass']
             }
         }

     }); 
     grunt.loadNpmTasks('grunt-contrib-copy');
     grunt.loadNpmTasks('grunt-contrib-uglify');
     grunt.loadNpmTasks('grunt-processhtml');
     grunt.loadNpmTasks('grunt-contrib-concat');
     grunt.loadNpmTasks('grunt-sass');
     grunt.loadNpmTasks('grunt-contrib-cssmin');
     grunt.loadNpmTasks('grunt-contrib-watch');
     grunt.loadNpmTasks('grunt-contrib-connect');
     grunt.loadNpmTasks('grunt-cache-bust');
     grunt.loadNpmTasks('grunt-bower-concat');
     
     grunt.registerTask('default', ['concat', 'sass', 'connect', 'watch']);
     grunt.registerTask('dist', ['concat', 'sass', 'copy', 'uglify', 'cssmin', 'processhtml', 'cacheBust']);


 }; 
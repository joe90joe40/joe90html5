module.exports = function(grunt) {
    grunt.initConfig({

        copy: {
            main: {
                files: [{expand: true, cwd: 'development/',
                    src: ['**'], dest: 'production/'}]
            }
        },

        requirejs: {
            compile:{
                options:require('./require.json')
            }
        },

        csso:{
            main:{
                options:{
                    restructure:true
                },
                baseUrl:"production/",
                files:[
                    {src:'production/css/layout.css', dest:'production/css/layout.css'}
                ]
            }
        },

        sass: {
            options: {
                style: '{{expanded}}'
            },
            dist: {
                files: {
                    'development/css/layout.css': 'development/css/sass/layout.scss'
                },
                files: {
                    'production/css/layout.css': 'production/css/sass/layout.scss'
                }
            }
        },

        watch: {
            scripts: {
                files: ['development/**/layout.scss'],
                tasks: ['sass']
            }
        },

        'sasso': {
            dev : {},
            dist : {}
        }
    });


    grunt.registerMultiTask('sasso','blah', function(){
        var sassjson = JSON.parse(JSON.stringify(grunt.config().sass).replace( /{{expanded}}/g, 'expanded' ));
        grunt.config('sass',sassjson);
        grunt.task.run('sass');
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-csso');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['requirejs', 'sass', 'csso']);
};


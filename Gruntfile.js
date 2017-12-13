var configureGrunt = function (grunt) {

        // load all grunt tasks
        require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

        var cfg = {
            // JSLint all the things!
            jslint: {
                app: {
                    directives: {
                        // node environment
                        node: true,
                        // browser environment
                        browser: false,
                        // allow dangling underscores in var names
                        nomen: true,
                        // allow to do statements
                        todo: true,
                        // don't require use strict pragma
                        sloppy: true
                    },
                    files: {
                        src: [
                            'examples/**/*.js',
                            'lib/**/*.js',
                            'test/**/*.js',
                            '*.js'

                        ]
                    }
                }
            },
            mochacli: {
                options: {
                    ui: 'bdd',
                    require: ['should'],
                    reporter: 'spec'
                },

                all: ['test/*_spec.js']
            },
            shell: {
                'yarn-clean': {
                    command: 'yarn cache clean --cache-folder /usr/local/share/.yarn_cache --mutex file:/usr/local/share/.yarn-mutex'
                },
                'yarn-install': {
                    command: 'yarn --network-concurrency 1 --no-progress --no-emoji --cache-folder /usr/local/share/.yarn_cache --mutex file:/usr/local/share/.yarn-mutex install'
                },
            },
        };

        grunt.initConfig(cfg);
        grunt.registerTask('init', 'Install the client dependencies',
            ['shell:yarn-install']
        );


    };

module.exports = configureGrunt;

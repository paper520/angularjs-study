'use strict';

var sourceScript = require('./WebContent/lib/preload.js').jsFiles;
var sourceStyle = require('./WebContent/lib/preload.js').cssFiles;
var sourceScriptJs = [];
var sourceStyleCss = [];
var sourceScriptJshint = (function(sourceScript) {
    var resultData = [];
    var flag = 0;
    for (; flag < sourceScript.length; flag++) {

        resultData.push("./WebContent/" + sourceScript[flag]);
        if (!/^lib\/min/.test(sourceScript[flag])) {
            sourceScriptJs.push("./WebContent/" + sourceScript[flag]);
        }
    }
    return resultData;
})(sourceScript);
var sourceStyleCsshint = (function(sourceStyle) {
    var resultData = [];
    var flag = 0;
    for (; flag < sourceStyle.length; flag++) {

        resultData.push("./WebContent/" + sourceStyle[flag]);
        if (!/^style\/min/.test(sourceStyle[flag])) {
            sourceStyleCss.push("./WebContent/" + sourceStyle[flag]);
        }
    }
    return resultData;
})(sourceStyle);
var banner = '/*! <%= pkg.name %> V<%= pkg.version %> | (c) 2007, 2018 <%= pkg.author %> | <%= pkg.license %> <%= pkg.repository.url %> */\n';
module.exports = function(grunt) {

    /*配置插件*/
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: { //预处理
            target: {
                files: {
                    './WebContent/style/min/root.css': './WebContent/style/root.scss'
                }
            }
        },
        watch: {
            scripts: {
                files: [
                    './WebContent/style/*.scss'
                ],
                tasks: ['sass:target']
            }
        },
        concat: { //合并代码
            options: {
                separator: '\n', //文件连接分隔符，表示连接的文件用指定的separator分割。
                stripBanners: true, //如果为true，去除代码中的块注释，默认为false
                banner: banner
            },
            targetJs: {
                src: sourceScriptJshint,
                dest: './WebContent/lib.js'
            },
            targetCss: {
                src: sourceStyleCsshint,
                dest: './WebContent/style.css'
            }
        },
        jshint: { //语法检查
            options: { //语法检查配置
                '-W064': true,
                "strict": true,
                "eqnull": true,
                "undef": true,
                "globals": {
                    "$$": true,
                    "module": true,
                    "window": true,
                    "CryptoJS": true,
                    "mapp": true,
                    "libapp": true,
                    "Luna": true,
                    "FormData": true,
                    "setTimeout": true,
                    "document": true,
                    'angular': true,
                    "console": true
                },
                "force": true, // 强制执行，即使出现错误也会执行下面的任务
                "reporterOutput": 'jshint.debug.txt' //将jshint校验的结果输出到文件
            },
            afterconcat: sourceScriptJs
        },
        uglify: { //压缩代码
            options: {
                banner: banner
            },
            target: {
                options: {
                    mangle: true
                },
                files: [{
                    './WebContent/lib.min.js': ['./WebContent/lib.js']
                }]
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')()
                ]
            },
            target: {
                src: './WebContent/style.css',
                dest: './WebContent/style.postcss.css'
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslint'
            },
            target: sourceStyleCss

        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            target: {
                files: {
                    './WebContent/style.min.css': ['./WebContent/style.postcss.css']
                }
            }
        },
        'http-server': {
            target: {
                root: './WebContent/',
                port: 10000,
                openBrowser: true
            }
        }
    });

    /*加载插件*/
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    /*注册任务*/
    grunt.registerTask('server', ['http-server:target']);
    grunt.registerTask('release', ['concat:targetJs', 'jshint:afterconcat', 'uglify:target', 'sass:target', 'concat:targetCss', 'postcss:target', 'cssmin:target', 'csslint:target']);
    grunt.registerTask('sassTask', ['watch']);
};

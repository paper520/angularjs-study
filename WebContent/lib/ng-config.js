/**
 * --------------------------------------
 * 模块定义
 * --------------------------------------
 */

//工具模块定义
var libapp = angular.module('startapp.libapp', []);

//控制器专用模块定义
var ctrlapp = angular.module('startapp.ctrlapp', []);

//主模块定义（同时引入需要的模块）
var startapp = angular.module('startapp', ['startapp.libapp', 'startapp.ctrlapp', 'ui.router', 'ngDialog']);

/**
 * --------------------------------------
 * 模块启动
 * --------------------------------------
 */

//主模块
startapp.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', "$compileProvider", "$filterProvider", "$provide", function($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
    "use strict";

    console.debug("[" + new Date() + "] >>配置主模块");

    //定义需要使用的方法
    ctrlapp.register = {
        controller: $controllerProvider.register,
        directive: $compileProvider.directive,
        filter: $filterProvider.register,
        factory: $provide.factory,
        service: $provide.service
    };

    //异步加载控制器文件
    startapp.asyncjs = function(js) {
        return ['$q', function($q) {

            var delay = $q.defer(),
                load = function() {
                    window.$$.getScript(js, function() {
                        delay.resolve();
                    });
                };
            load();
            return delay.promise;
        }];
    };


    //定义路由
    $stateProvider.state("login", { //登录页面
        url: "/login",
        templateUrl: "html/login/mod.html",
        resolve: {
            delay: startapp.asyncjs('html/login/mod.js')
        },
        controller: "LoginController"
    }).state("main", { //主页面
        url: "/main",
        templateUrl: "html/main/mod.html",
        resolve: {
            delay: startapp.asyncjs('html/main/mod.js')
        },
        controller: "MainController"
    }).state("studyDirective", { //自定义指令
        url: "/studyDirective",
        templateUrl: "html/study-directive/mod.html",
        resolve: {
            delay: startapp.asyncjs('html/study-directive/mod.js')
        },
        controller: "StudyDirectiveController"
    }).state("pcForm", { //pc版本的form表单提交例子
        url: "/pcForm",
        templateUrl: "html/pc-form/mod.html",
        resolve: {
            delay: startapp.asyncjs('html/pc-form/mod.js')
        },
        controller: "PcFormController"
    }).state("demoFilter", { //过滤器用例
        url: "/demoFilter",
        templateUrl: "html/demo-filter/mod.html",
        resolve: {
            delay: startapp.asyncjs('html/demo-filter/mod.js')
        },
        controller: "DemoFilterController"
    }).state("uiDatepicker", { //年月日日期选择指令
        url: "/uiDatepicker",
        templateUrl: "html/ui-datepicker/mod.html",
        resolve: {
            delay: startapp.asyncjs('html/ui-datepicker/mod.js')
        },
        controller: "uiDatepickerController"
    });

    $urlRouterProvider.otherwise("/login");

}]).run(['ngDialog', '$rootScope', function(ngDialog, $rootScope) {
    "use strict";

    /**
     *
     * @param {string:提示级别} type
     * @param {string:提示内容} info
     *
     * 提示级别分为三类：
     * 'info':普通
     * 'warn':警告
     * 'error':错误
     */
    $rootScope.toast = function(type, info) {
        (function(type, info) {
            ngDialog.open({
                template: 'html/common/toast.html',
                className: "toast " + type + "-level",
                controller: ['$scope', function($scope) {
                    $scope.toast_info = info;
                    window.setTimeout(function() {
                        $scope.closeThisDialog();
                    }, 1000);
                }]
            });
        })(type, info);
    };

    console.debug("[" + new Date() + "] >>启动主模块");

}]);

//工具模块
libapp.config(function() {
    "use strict";

    console.debug("[" + new Date() + "] >>配置工具模块");

}).run(function() {
    "use strict";

    console.debug("[" + new Date() + "] >>启动工具模块");

});

//控制器专用模块
ctrlapp.config(function() {
    "use strict";

    console.debug("[" + new Date() + "] >>配置控制器专用模块");

}).run(function() {
    "use strict";

    console.debug("[" + new Date() + "] >>启动控制器专用模块");

});

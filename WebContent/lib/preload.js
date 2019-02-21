'use strict';
/**
 * 公共资源路径加载配置
 */
(function() {
    var cssFiles = [
        'style/min/butterfly.min.css', /*初始化基础样式*/
        'style/min/root.css', /*自定义样式*/
        'style/min/ngDialog.css' /*弹框样式*/
    ];
    var jsFiles = [
        /*基础文件*/
        'lib/min/luna.js', //工具库
        'lib/min/angular.js', //框架
        /*插件 */
        'lib/min/angular.ui-router.js', //路由
        'lib/min/ngDialog.js', //弹框

        /*配置文件 */
        'lib/ng-config.js', //启动配置文件

        /*过滤器*/
        'lib/module/filter/numberChinese.js',//中国数字转换

        /*服务文件 */


        /*指令文件 */
        'lib/module/directive/ui-star.js', //提示必输
        'lib/module/directive/ui-datepicker.js', //年月日日历指令
        'lib/module/directive/ui-study.js', //指令学习
        'lib/module/directive/ui-submit.js', //表单校验提示
        'lib/module/directive/ui-format.js', //视图和model直接的格式转换
        'lib/module/directive/ui-shifts.js' //页面切换指令
    ];

    if (typeof exports != 'undefined') {
        exports.jsFiles = jsFiles;
        exports.cssFiles = cssFiles;
    } else {
        for (var i = 0; i < cssFiles.length; i++) {
            loadCss(cssFiles[i]);
        }
        for (var i = 0; i < jsFiles.length; i++) {
            loadJs(jsFiles[i]);
        }
    }

    function loadJs(path) {
        var scriptTag = document.createElement('script');
        scriptTag.type = 'text/javascript';
        scriptTag.src = path;
        document.write(outerHTML(scriptTag));
    }

    function outerHTML(node) {
        return (
            node.outerHTML ||
            (function(n) {
                var div = document.createElement('div'),
                    h;
                div.appendChild(n);
                h = div.innerHTML;
                div = null;
                return h;
            })(node)
        );
    }

    function loadCss(path) {
        var cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.type = 'text/css';
        cssLink.href = path;
        document.getElementsByTagName('head')[0].appendChild(cssLink);
    }
})();

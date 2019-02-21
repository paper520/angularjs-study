/*
 *
 * @author:yelloxing
 *
 * 2018-03-05
 *
 *
 */
(function(window, angular, $$,undefined) {
    'use strict';
    libapp.directive("uiFormat", ['$rootScope', '$compile', function($rootScope, $compile) {
        return {
            restrict: 'A',
            scope: false,
            require: "?ngModel",
            link: function($scope, element, attrs, ctrl) {
                element = $$(element[0]);
                //显示样式
                function showFormat(input) {
                    input = input || " ";
                    if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
                        //todo
                    } else if (/^\d{4}-\d{1}-\d{2}$/.test(input)) {
                        input = input.replace(/(\d{4})-(\d{1})-(\d{2})/, '$1-0$2-$3');
                    } else if (/^\d{4}-\d{2}-\d{1}$/.test(input)) {
                        input = input.replace(/(\d{4})-(\d{2})-(\d{1})/, '$1-$2-$3');
                    } else if (/^\d{4}-\d{1}-\d{1}$/.test(input)) {
                        input = input.replace(/(\d{4})-(\d{1})-(\d{1})/, '$1-$2-$3');
                    } else if (/\d{8}/) {
                        input = input.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
                    }
                    return input;
                }

                //数据样式
                function dataFormat(input) {
                    input = input || " ";
                    if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
                        input = input.replace(/-/g, '');
                    } else if (/^\d{4}-\d{1}-\d{2}$/.test(input)) {
                        input = input.replace(/-(\d)-/, "0$1");
                    } else if (/^\d{4}-\d{2}-\d{1}$/.test(input)) {
                        input = input.replace(/-(\d)$/, "0$1").replace(/-/, '');
                    } else if (/^\d{4}-\d{1}-\d{1}$/.test(input)) {
                        input = input.replace(/-/g, '0');
                    }
                    return input;
                }
                //数据到试图的数据格式化
                ctrl.$formatters.unshift(function(input) {
                    return showFormat(input);
                });

                //试图到数据的数据格式化
                ctrl.$parsers.push(function(input) {
                    return dataFormat(input);
                });

                //点击开启编辑模式
                element.bind('click', function() {
                    if (!/-/.test(element.val())) return;
                    element.val(dataFormat(element.val()));
                });

                //离开关闭编辑模式
                element.bind('blur', function() {
                    element.val(showFormat(element.val()));
                });
            }
        };
    }]);
})(window, window.angular, window.Luna);

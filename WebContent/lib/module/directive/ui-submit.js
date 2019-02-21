/*
 *
 * @author:yelloxing
 *
 * 2018-03-03
 *
 *
 */
(function(window, angular, $$,undefined) {
    'use strict';
    libapp.directive("uiSubmit", ['$rootScope', '$compile', '$http', function($rootScope, $compile, $http) {
        return {
            restrict: 'A',
            scope: false,
            link: function($scope, element, attrs) {
                var formName = attrs.name;
                element.on("submit", function(event) {
                    if (!!$scope[formName].$invalid) {
                        //如果表单存在不合法，提示
                        var invalids = $scope[formName];
                        var inputList = $$(element[0]).find('[ng-model]');
                        var flag, invalid;
                        for (flag = 0; flag < inputList.length; flag++) {
                            var input = $$(inputList[flag]);
                            invalid = invalids[input.attr('name')];
                            var name = input.prevAll('label').text().replace('*', '');
                            if (!invalid.$invalid) {
                                continue;
                            } else {
                                var error = invalid.$error;
                                if (error.required) {
                                    $scope.toast('warn', '温馨提示:【' + name + '】为必输项');
                                } else if (error.minlength) {
                                    var minLength = input.attr("v-minlength") || input.attr("ng-minlength");
                                    $scope.toast('warn', '温馨提示:【' + name + '】最短长度：' + minLength);
                                } else if (error.maxlength) {
                                    var maxLength = input.attr("v-maxlength") || input.attr("ng-maxlength");
                                    $scope.toast('warn', '温馨提示:【' + name + '】最大长度：' + maxLength);
                                } else if (error.pattern) {
                                    var pattern = input.attr("v-pattern") || input.attr("ng-pattern");
                                    $scope.toast('warn', '温馨提示:【' + name + '】不满足正则表达式匹配规则：' + pattern);
                                } else if (error.datepicker) {
                                    $scope.toast('warn', '温馨提示:【' + name + '】日期输入格式错误');
                                } else {
                                    $scope.toast('warn', '温馨提示:【' + name + '】输入非法');
                                }
                                flag = inputList.length;
                            }

                        }
                    } else {
                        $scope.$eval(attrs.uiSubmit);
                        $scope.$apply();
                    }
                });
            }
        };
    }]);
})(window, window.angular, window.Luna);

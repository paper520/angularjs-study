/*
 *
 * @author:yelloxing
 * 2018-03-05
 *
 */
(function(window, angular, $$,undefined) {
    'use strict';
    libapp.directive("uiShifts", ['$compile', '$rootScope', function($compile, $rootScope) {
        return {
            restrict: 'E',
            scope: false,
            link: function(scope, element, attrs) {
                element = $$(element[0]);
                var shifts = element.find('ui-shift');
                var hadLoad = [];
                var currentIndex = 1;
                var flag = 0;
                var currentPage;
                var url;
                scope.goShift = function(index) {
                    if (index > shifts.length || index < 1) {
                        throw new Error("[target=" + index + "]超过页面数目！");
                    }
                    $$(shifts[currentIndex - 1]).css('display', 'none');
                    currentIndex = index;
                    $$(shifts[currentIndex - 1]).css('display', 'block');
                    if (!hadLoad[index - 1]) {
                        currentPage = $$(shifts[index - 1]);
                        url = "./" + currentPage.attr("src");
                        (function(flag, currentPage) {
                            $$.get(url, function(data) {
                                hadLoad[index - 1] = true;
                                currentPage.html(data);
                                $compile(currentPage)(scope);
                                if (flag == 0) {
                                    currentPage.css('display', 'block');
                                } else {
                                    currentPage.css('display', 'none');
                                }
                            });
                        })(flag, currentPage);
                    }
                };
                scope.goShift(1);
            }
        };
    }]);
})(window, window.angular, window.Luna);

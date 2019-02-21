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
    libapp.directive("uiStar", ['$rootScope', '$compile', '$http', function($rootScope, $compile, $http) {
        return {
            restrict: 'A',
            scope: false,
            require: "?ngModel",
            link: function($scope, element, attrs, ctrl) {
                var name = attrs.name;
                var form = $$(element[0]).parents('form');
                var label = form.find('label[for="' + name + '"]');
                var html = label.html();
                var ngModel = attrs.ngModel;
                var ngRequired = attrs.ngRequired;
                var required = attrs.required;
                if (!!required) {
                    label.html("<span class='ui-star-red'>*</span>" + html);
                } else if (ngRequired) {
                    $scope.$watch(function() {
                        return $scope.$eval(ngRequired);
                    }, function(newValue) {
                        if (!!newValue) {
                            label.html("<span class='ui-star-red'>*</span>" + html);
                        } else {
                            label.html("<span class='ui-star-red'></span>" + html);
                        }
                    });
                }
            }
        };
    }]);
})(window, window.angular, window.Luna);

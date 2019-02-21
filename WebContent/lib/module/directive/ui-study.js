/*
 *
 * @author:yelloxing
 *
 * 2018-03-04
 *
 *
 */
(function(window, angular, $$,undefined) {
    'use strict';
    libapp.directive("uiStudy", ['$rootScope', '$compile', '$http', function($rootScope, $compile, $http) {
        return {
            restrict: 'E',
            template: '<ul class="uiStudy"><li>{{type}}</li><li>{{information}}</li><li ng-click="_useParentMethod()">点击我</li></ul>',
            replace: "true",
            /*
             * scope: true（非空），创建一个继承自父作用域的子作用域，这就意味着，子指令拥有了自己的作用域，同时可以访问父指令的作用域数据。
             * scope: false（空值），不创建任何作用域，将父作用域当做当前作用域，这意味着，子指令对数据的任何修改都会影响父作用域。
             * scope: {…}（对象），创建孤立作用域，这就意味着，与父作用域没有任何联系，具体的看下面给出的例子。
             */
            scope: {
                information: '=showinfo', //双向绑定，使用父作用域的一个属性
                type: '@typeinfo', //单向绑定，传递一个字符串
                _onSend: "&onSend" //函数绑定，使用&符号可以在其中调用父类的方法
            },
            link: function($scope, element, attrs) {
                console.log("简单的指令传值问题");
            },
            compile: function(element, attrs) {
                console.log("如果有了这里，就不会执行上面的link了哦");
                return {
                    pre: function($scope, element, attrs) {
                        console.log("pre-link");
                    },
                    post: function($scope, element, attrs) {
                        console.log("post-link");
                        $scope._useParentMethod = function() {
                            $scope._onSend();
                        };
                    }
                };
            }
        };
    }]);
})(window, window.angular, window.Luna);

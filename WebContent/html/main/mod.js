ctrlapp.register.controller('MainController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.initMethod = function() {
        $http({
            method: "GET",
            url: "data/menu.json"
        }).success(function(data, status) {
            if (data.ResponseCode == '0000') {
                $scope.menuList = data.map;
            } else {
                console.debug("[" + new Date() + "] >>后台查询出错");
            }
        }).error(function(data, status) {
            console.debug("[" + new Date() + "] >>数据请求失败");
        });
    };
    $scope.goto = function(target) {
        try {
            $state.go(target);
        } catch (e) {
            $scope.toast('error', '跳转路由 #' + target + ' 错误');
        }
    };
}]);

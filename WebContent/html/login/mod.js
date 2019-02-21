ctrlapp.register.controller('LoginController', ['$scope','$state', function($scope,$state) {
    $scope.initMethod = function() {
        $scope.isBackSpace = false;
    };
    $scope.login = function() {
        $state.go('main');
    };
    $scope.toggleBackSpace = function() {
        $scope.isBackSpace = !$scope.isBackSpace;
    };
}]);

ctrlapp.register.controller('StudyDirectiveController', ['$scope', '$state', function($scope, $state) {
    $scope.initMethod = function() {
        $scope.info='[控制器里面的值]';
        $scope.dataFormat='20121230';
    };
    $scope.sendInfo=function(){
        window.alert('我被指令调用了');
    };
}]);

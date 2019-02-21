ctrlapp.register.controller('PcFormController', ['$scope', '$state', function($scope, $state) {
    $scope.initMethod = function() {

    };

    $scope.addSubmit=function(){
        $scope.goShift(2);
    };
}]);

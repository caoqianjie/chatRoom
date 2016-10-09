angular.module('chatMod').controller('RoomCtrl',function($scope,$routeParams,$http,$rootScope){

    $http({
        url: '/rooms/'+$routeParams.id,
        method: 'GET'
    }).success(function (result) {
        if(result.err == 0) {
            $scope.room = result.data;
        }else{
            $rootScope.errMsg = result.msg;
        }
    });

});
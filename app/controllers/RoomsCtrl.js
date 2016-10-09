angular.module('chatMod').controller('RoomsCtrl',function($scope,$http,$rootScope,$location) {
    $scope.rooms = $scope._rooms = [];
    $http({
        url: '/rooms',
        method: 'GET'
    }).success(function (result) {
        if (result.err == 0) {
            $scope.rooms = result.data;
        } else {
            $rootScope.errMsg = result.msg;
        }
    });
    $scope.createRoom = function () {
        var keyword = $scope.keyword;
        $http({
            url: '/rooms/add',
            method: 'POST',
            data: {name: keyword}
        }).success(function (result) {
           if(result.err == 0) {
                $scope.rooms.push(result.data);
           }else{
               $rootScope.errMsg = result.msg;
           }

        });
    };
    $scope.join = function (id) {
        $location.path('/rooms/'+id);
    }
});
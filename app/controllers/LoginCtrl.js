angular.module('chatMod').controller('LoginCtrl',function($scope,$http,$rootScope,$location){
    $scope.login = function () {
        $http({
            url:'/user/login',
            method:'POST',
            data:{email:$scope.email}
        }).success(function (result) {
            if(result.err == 0){
                $rootScope.user = result.data;
                $location.path('/rooms');
            }else{
                $rootScope.errMsg = result.msg;
            }
        })
    }
});
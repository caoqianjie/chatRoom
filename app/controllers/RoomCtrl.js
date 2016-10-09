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
    var socket = io.connect('ws://localhost:9090');
    socket.on('message',function (msg) {
        $scope.room.messages.push(msg);
    });
    $scope.send = function () {
        socket.send({user:$rootScope.user._id,content:$scope.content});
    }
});
angular.module('chatMod').directive('keyDown',function () {
   return {
       link: function (scope, element, attrs) {
           element.keydown = function (e) {
               console.log(e);
           }
       }
   } 
});
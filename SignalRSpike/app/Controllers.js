'use strict';

spikeApp.controller('spikeController', ['$rootScope', '$scope', '$timeout', '$q', 'Hub', function ($rootScope, $scope, $timeout, $q, Hub) {
    var allCount = 0;
    var timer;
    $scope.status = 'Idle';
    $scope.Count = 0;
    $scope.CountOut = 0;
    Hub.proxy().on('newConnection', function (id, message) {
        $scope.ConnectionId = id;
        $scope.AzureRole = message;
        $scope.$apply();
    });

    Hub.proxy().on('incomingMessage', function (id, message) {
        if (message == 'END') {
            $scope.Duration = new Date().getTime() - timer;
            $scope.$apply();
        }
        if (message != 'RUNNING') {
            $scope.LastMessageFrom = id;
            $scope.LastMessage = message;
            $scope.Count = allCount;
            $scope.$apply();
        }
        if (message == 'START') {
            timer = new Date().getTime();
        }
        allCount++;
    });

    $scope.helloMyself = function (msg) {
        var deferred = $q.defer();
        $scope.CountOut++;
        Hub.helloMyself(msg).done(function (result) {
            deferred.resolve(result);
        }).fail(function (err) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    $scope.helloEveryone = function (msg) {
        var deferred = $q.defer();
        $scope.CountOut++;
        Hub.helloEveryone(msg).done(function (result) {
            deferred.resolve(result);
        }).fail(function (err) {
            deferred.reject(err);
        });

        return deferred.promise;
    }

    $scope.helloMyselfContinuously = function () {
        $scope.sendContinuously = true;
        $scope.Count = 0;
        $scope.CountOut = 0;
        allCount = 0;

        var count = 0;
        var sendMsg = function () {
            $scope.helloEveryone('START');
            while (count < 10000) {
                $scope.helloEveryone('RUNNING');
                count++;
            }
            $scope.helloEveryone('END');
            console.log("Ended!");
        };
        $timeout(sendMsg, 1);
    };

    $scope.helloEveryoneContinuously = function () {
        while ($scope.sendContinuously) {
            hub.helloAll();
        }
    };
}]);
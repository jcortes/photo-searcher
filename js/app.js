angular.module('photoSearcher', ['ngMessages'])

.controller('MainCtrl', ['$scope', '$http', '$sce', '$q', '$timeout', function($scope, $http, $sce, $q, $timeout){
    
    var vm = $scope;
    
    function wait() {
        return $q(function(resolve, reject){
            $timeout(function() {
                resolve();
            }, 1000);
        });
    }

    function notify() {
        return wait().then(function() {
            vm.tagname = null;
        });
    }
    
    vm.searchPhotos = function(tagname){
        
        var url = 'https://api.instagram.com/v1/tags/' + tagname + '/media/recent';
        var request = {
            client_id: '79c25bc624914d2fb102c89a94932c55',
            callback: 'JSON_CALLBACK',
            count: 9
        };

        $http({
            method: 'JSONP',
            url: url,
            params: request
        })
        .success(function(data, status, headers, config){
            vm.photos = data.data;
            notify();
        })
        .error(function(data, status, headers, config){
            console.log('Error getting data with http status code: ' + status);
        });
    };
}]);
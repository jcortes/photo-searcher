angular.module('photoSearcher', ['ngMessages'])

.controller('MainCtrl', ['$scope', '$http', '$sce', '$q', '$timeout', function($scope, $http, $sce, $q, $timeout){
    
    function wait() {
        return $q(function(resolve, reject){
            $timeout(function() {
                resolve();
            }, 2000);
        });
    }

    function notify() {
        $scope.notifySaved = true;
        return wait().then(function() {
            $scope.notifySaved = false; 
        });
    }
    
    $scope.searchPhotos = function(tagname){
        
        var url = 'https://api.instagram.com/v1/tags/' + tagname + '/media/recent';
        var request = {
            client_id: '79c25bc624914d2fb102c89a94932c55',
            max_id: 1,
            min_id: 10,
            code: '6989b87f8e35495b9028b23c916bd95e'
        };

        $http.jsonp(url, {params: request})
        .success(function(data, status, headers, config){
            $scope.photos = data.data;
            notify();
        })
        .error(function(data, status, headers, config){
            console.log('Error getting data');
            console.log(data);
            console.log(status);
            console.log(headers);
            console.log(config);
        });
    };
}]);
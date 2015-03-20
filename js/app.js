angular.module('photoSearcher', ['ngMessages', 'ngAnimate'])

.controller('MainCtrl', ['$scope', '$http', '$sce', '$q', '$timeout', function($scope, $http, $sce, $q, $timeout){
    
    var vm = $scope;
    
    function wait(ms) {
        return $q(function(resolve, reject){
            $timeout(function() {
                resolve();
            }, ms);
        });
    }

    function notify() {
        return wait(5000).then(function() {
            vm.showMsg = false;
        });
    }
    
    vm.searchPhotos = function(tag){
        
        if(vm.photos) vm.photos = null;
        if(vm.frm.$invalid){
            vm.showMsg = false;
            return;
        }
        
        var searchMsg = 'Searching Instagram for photos tagged with \"' + tag + '\"';
        var foundMsg = 'We found count results for \"' + tag + '\"';
        var notFoundMsg = 'No images were found';
        var errorMsg = 'There was an error calling the InstagramAPI';
        var wordMsg = 'There was a problem with tag \"' + tag + '\"';
        
        vm.showMsg = true;
        vm.msg = searchMsg;
        vm.tagname = null;
        vm.frm.$submitted = false;
        
        tag = tag.replace(/ /g, '_');
        
        var url = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent';
        var request = {
            client_id: '79c25bc624914d2fb102c89a94932c55',
            callback: 'JSON_CALLBACK',
            count: 1000
        };

        wait(2000).then(function(){
            $http({
                method: 'JSONP',
                url: url,
                params: request
            })
            .success(function(data, status, headers, config){
                vm.photos = data.data;
                if(vm.photos){
                    vm.count = vm.photos.length;
                    if(vm.count > 0){
                        vm.msg = foundMsg.replace(/count/g, vm.count);
                    } else {
                        vm.msg = notFoundMsg;
                        notify();
                    }
                } else {
                    vm.msg = wordMsg;
                    notify();
                }
            })
            .error(function(data, status, headers, config){
                vm.msg = errorMsg;
                notify();
                console.log('Error getting data with http status code: ' + status);
            });
            
        });
            
    };
}]);
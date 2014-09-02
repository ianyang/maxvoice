MaxVoice.controller('DetailCtrl', ['$scope', '$location', '$http', '$routeParams',
    function($scope, $location, $http, $routeParams) {
        var postId = $routeParams.postId;

        $scope.post = {
            title: null,
            author: null,
            content: null,
            created: null
        };
        $scope.error = false;

        var getPost = function() {
            $http.get('/api/posts/' + postId)
                .success(function(data) {
                    if (data.Success) {
                        $scope.post = {
                            title: data.Data.title,
                            author: data.Data.author,
                            content: data.Data.content,
                            created: moment.utc(data.Data.created).fromNow()
                        };
                    } else {
                        $location.url('/');
                    }
                });
        };

        $scope.deletePost = function() {
            $http.delete('/api/posts/' + postId)
                .success(function(data) {
                    $location.url('/');
                });
        };

        getPost();
}]);

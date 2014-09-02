MaxVoice.controller('PostCtrl', ['$scope', '$location', '$http',
    function($scope, $location, $http) {
        $scope.posts = null;
        $scope.errorMessage = null;

        var getPosts = function() {
            $scope.errorMessage = null;

            $http.get('/api/posts')
                .success(function(data) {
                    if (data.Success) {
                        $scope.posts = data.Data;
                    } else {
                        $scope.errorMessage = 'Error fetching posts';
                    }
                });
        };

        getPosts();
}]);

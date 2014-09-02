MaxVoice.controller('CreateCtrl', ['$scope', '$location', '$http',
    function($scope, $location, $http) {
        $scope.newPost = {
            title: '',
            author: '',
            content: ''
        };

        $scope.submitForm = function() {
            $http.post("/api/posts", $scope.newPost)
                .success(function(data) {



                });
        };

}]);

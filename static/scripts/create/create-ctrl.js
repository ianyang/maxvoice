MaxVoice.controller('CreateCtrl', ['$scope', '$location', '$http',
    function($scope, $location, $http) {
        $scope.newPost = {
            title: '',
            author: '',
            content: ''
        };

        $scope.formError = null;

        var validateForm = function() {
            if ($scope.newPost.title && $scope.newPost.author && $scope.newPost.content) return true;
            return false;
        };

        $scope.submitForm = function() {
            $scope.formError = null;

            if (validateForm()) {
                $http.post("/api/posts", $scope.newPost)
                    .success(function(data) {
                        if (data.Success) {
                            $location.url("/" + data.Data);
                        }
                    });
            } else {
                $scope.formError = 'Please complete the blog post';
            }

        };

}]);

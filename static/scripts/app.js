var MaxVoice = angular.module('MaxVoice', ['ngRoute']);

MaxVoice.config(['$routeProvider', '$httpProvider', '$locationProvider',
    function($routeProvider, $httpProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'static/scripts/post/home.html',
                controller: 'PostCtrl'
            })
            .when('/create', {
                templateUrl: 'static/scripts/create/create.html',
                controller: 'CreateCtrl'
            })

            // Post details
            .when('/:postId', {
                templateUrl: 'static/scripts/detail/detail.html',
                controller: 'DetailCtrl'
            })

            // Redirect
            .otherwise({
                templateUrl: 'static/scripts/post/home.html'
            });

        /* HTML5 Mode - History Api
         ******************************/
        $locationProvider.html5Mode(true);

        // Enable CORS
        $httpProvider.defaults.useXDomain = true;

        // Transform $http.post body to same param format used by jquery $.post call
        $httpProvider.defaults.transformRequest = function(data){
            if (data === undefined) {
                return data;
            }
            return $.param(data);
        };

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    }
]);

MaxVoice.run(['$http',
    function($http) {
        console.log("Maximize Your Voice");
    }
]);

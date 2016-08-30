angular.module('studying-node',['ui.router','restangular','satellizer','ui.bootstrap', 'authentication','dt.alert', 'ngMap'])

    // Restangular confidurantion
    .config(function(RestangularProvider, $httpProvider, $locationProvider) {

        $httpProvider.interceptors.push('httpErrorResponseInterceptor');
        RestangularProvider.setBaseUrl('http://localhost:3000/');
        RestangularProvider.setFullResponse(true);

        //  RestangularProvider.setDefaultHeaders({'Access-Control-Allow-Origin' : '*'});
    })

    // run to initial state
    .run(function ($state) {
        $state.transitionTo('home');
    })

/*    .run(function ($rootScope, $state, AuthService) {
        $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {

            var authorizedResouces = [
                'index',
                'index.login',
                'index.signup',
                'index.resetPassword'
            ];

            if (!AuthService.isAuthenticated()) {
                if (authorizedResouces.indexOf(next.name) < 0) {
                    event.preventDefault();
                    $state.go('index.login');
                }
            }
        });
    })*/

    .factory('httpErrorResponseInterceptor', function($q, $location) {
        return {
            responseError : function error(response) {

                switch (response.status) {
                    case 401:
                        $location.path('/login');
                        break;
                    case 403:
                        $location.path('/not-authorized');
                        break;
                    case 404:
                        $location.path('/not-found');
                        break;
                }
                return $q.reject(response);
            }
        };
    })

;

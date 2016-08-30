angular.module('authentication',[])

    .config(function($stateProvider) {
        $stateProvider
            .state('home.login', {
                url: 'login',
                views: {
                    'content@':{
                        templateUrl: 'components/authentication/login.html',
                        controller: 'LoginCtrl'
                    }
                }
            })
            .state('home.signup', {
                url: 'sign-up',
                views: {
                    'content@':{
                        templateUrl: 'components/authentication/sign-up.html',
                        controller: 'SignupCtrl'
                    }
                }
            })
            .state('home.resetPassword', {
                url: 'reset-password',
                views: {
                    'content@':{
                        templateUrl: 'components/authentication/reset-password.html',
                        controller: 'ResetRPasswordCtrl'
                    }
                }
            })
            .state('home.logout', {
                url: 'logout',
                views: {
                    'content@':{
                        templateUrl: 'components/authentication/sign-up.html',
                        controller: 'LogoutCtrl'
                    }
                }

            })

    });
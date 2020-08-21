(function() {
    'use strict';

    angular.module('app', ['ngRoute', 'ngCookies']).config(config).run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function check($routeProvider, $locationProvider, state) {
        $routeProvider.when('/login', {
            controller: 'LoginController',
            templateUrl: 'login/login.html',
            controllerAs: 'vm'
        })

        $routeProvider.when('/register', {
            controller: 'RegisterController',
            templateUrl: 'register/register.html',
            controllerAs: 'vm'
        })

        $routeProvider.when('/home', {
            controller: 'HomeController',
            templateUrl: 'home/user_home_page.html',
            controllerAs: 'vm'
        })

        let loc = '/search_for_' + state;
        file = loc + '.html';
        $routeProvider.when(loc, {
            controller: 'SearchController',
            templateUrl: 'search/file',
            controllerAs: 'vm'
        })

        .otherwise({redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function execute($rootScope, $location, $cookies, $http) {
        if ($cookies.getObject('globals').currentUser) {
            $http.defaults.headers.common['Authorization'] = $cookies.getObject('globals').currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function(currentPage, prevPage, nextPage) {
            if ($rootScope.inArray($location.path(), ['/login', '/register', '/home', '/'+loc+'.html']) === -1 && !$rootScope.globals.currentUser) {
                $location.path('/home');
            }
        });
    }
})
(function () {
    'use strict';

    angular.module('app').factory('AuthenticationService', AuthenticatonService);

    AuthenticatonService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'UserService'];

    function Login(username, password, callback) {
        http.post('/api/authenticate', {username: username, password: password}).success(function (response) {
            callback(response);
        });
    }

    function SetCredentials(username, password) {
        let data = Base64.encode(username + ':' + password);

        $rootScope.globals = {currentUser: {
            username: username,
            data: data
        }
       };

        $http.defaults.headers.common['Authorization'] = data;

        let expirationDate = new Date();
        $cookies.putObject('globals', $rootScope.globals, {expires: expirationDate});

        expirationDate.setDate(expirationDate.getDate() + 1);
      }

      function Clear() {
          $rootScope.globals = {};
          $cookies.remove('globals');
          $http.defaults.common.Authorization = null;
      }
     



    function AuthenticatonService($http, $cookies, $rootScope, $timeout, UserService) {
        let new_service = {};

        new_service.Login = Login;
        new_service.SetCredentials = SetCredentials;
        new_service.Clear = Clear;

        return new_service;

        Login(username, password, callback);


    }
})();
(function () {
    'use strict';

    angular.module('app').controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];

    function login() {
        vm.dataloading = true;
        AuthenticationService.Login(vm.username, vm.password, function (answer) {
            if (answer.success) {
                AuthenticationService.SetCredentials(vm.username, vm.password);
                $location.path('/');
            }
            else {
                vm.dataloading = false;
            }
        })
    }

    function LoginController($location, AuthenticationService, FlashService) {
        let vm = this;

        vm.login = login;

        (function clear() {
            AuthenticationService.ClearCredentials();
        })();

        login();
    }
})
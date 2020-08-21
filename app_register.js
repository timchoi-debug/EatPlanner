(function () {
    'use strict';

    angular.module('app').factory('UserService', UserService);

    UserService.$inject = ['$timeout', '$filter', '$query'];
    function UserService($timeout, $filter, $query) {
        let new_user = {};

        function obtainAllUsers() {
            let obt = $query.defer();
            obt.resolve(getUsers());
            return obt.promise;
        }

        function GetByUsername(user) {
            let obt = $query.defer();
            let selected = $filter('filter')(getUsers(), {username: user});
            if (selected.length) {
                let user = selected[0];
            }
            else {
                user = null;
            }
            obt.resolve(user);
            return obt.promise;
        }

        function GetByID(id) {
            let new_user = $q.defer();
            let filtered = $filter('filter')(getUsers(), {username: username});
            if (filtered.length) {
                let user = filtered[0];
            }
            else {
                let user = null;
            }
            new_user.resolve(user);
            return new_user.promise;
        }

        function getAll() {
            if (localStorage.users == false) {
                localStorage.users = JSON.stringify([]);
            }
            return JSON.parse(localStorage.users);
        }

        function setUsers(users) {
            localStorage.users = JSON.stringify(users);
        }

        function Create(user) {
            let new_user = $q.defer();

            $timeout(function()  {
                GetByUsername(user.user).then(function(duplicates) {
                    if (duplicates !== null) {
                        new_user.resolve({success: false, message: "User already exists" });
                    } 
                    else {
                        let user = getUsers();

                        users.push(user);

                        new_user.resolve({success: true});
                    }
                })

            });
            return new_user.promise;
        }

        function Remove(id) {
            let new_user = $q.defer();

            let users = getUsers();

            for (let i = 0; i < users.length; ++i) {
                let one_user = users[i];
                if (one_user.id == id) {
                    users.splice(i,1);
                }
            }
            setUsers(users);
            new_user.resolve();
            return new_user.promise;
        }


        function UserService($timeout, $filter, $q) {
            let new_service = {};

            new_service.getAll = getAll;
            new_service.GetByUsername = GetByUsername;
            new_service.GetByID = GetByID;
            new_service.Create = Create;
            new_service.Remove = Remove;

            return new_service;
        }
    }
})();





function register_auth() {
    angular
         .module('app')
         .controller('RegisterController', RegisterController);

    function respond(response) {
        if (response.success == true) {
            location.path('/login');
        }
        else {
            vm.dataloading = false;
        }
    }

    function register() {
        vm.dataloading = true;
        UserService.Create(vm.user).then(respond(response));
    }
    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function RegisterController(UserService, $location, $rootScope, FlashService) {
        var vm = this;
        vm.register = register;

        register_auth();
    }
}
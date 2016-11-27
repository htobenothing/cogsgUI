(function () {
	'use strict'

	angular.module('myApp')
		.component('login', {
			templateUrl: "app/src/public/login.html",
			bindings: {

			}

		})

	.controller('LoginController', LoginController)

	LoginController.$inject = ['AuthenService', '$window', '$state', '$http','$log']

	function LoginController(AuthenService, $window, $state, $http,$log) {
		var $ctrl = this;

		$ctrl.login = function () {

			console.log($ctrl.loginForm)
			var credentail = {
				username: $ctrl.loginForm.userName,
				password: $ctrl.loginForm.userPassword
			}

			var promise = AuthenService.login(credentail)
			promise.then(function (resp) {
					console.log("Authenticating <<<<")
					$window.sessionStorage.token = resp.data.token;
					$http.defaults.headers.common.Authorization = "Bearer " + resp.data.token;
					console.log('Autenticate success, will go to home page')
					$state.go('profile')

				})
				.catch(function (err) {
					console.log("credentail is not validate")
					delete $window.sessionStorage.token;
					$http.defaults.headers.common.Authorization = '';

					$state.go('login')
					console.log('Autenticate failed, stay in login page')
					$ctrl.error = "User Name or Password is incorrect, please try again."
					$log.info($ctrl.error)
				});

		}
	}



})()
(function () {
	'use strict'

	angular.module('myApp')
		.component('profile', {
			templateUrl: 'app/src/account/profile.html',
			bindings: {

			}

		})
		.controller('ProfileController', ProfileController)

	ProfileController.$inject = ['$http', 'jwtHelper', '$window']

	function ProfileController($http, jwtHelper, $window) {
		console.log("in profile")
		var $ctrl = this;

		var token = $window.sessionStorage.token;
		if (token) {
			var tokenPayload = jwtHelper.decodeToken(token);
			console.log(tokenPayload)
			$ctrl.username = tokenPayload.username
		}

	}
})()
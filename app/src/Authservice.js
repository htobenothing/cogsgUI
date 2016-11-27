(function () {
	'use strict'

	// good to combine authenticate with authorization
	angular.module('myApp')
		.service('AuthenService', AuthenService)




	AuthenService.$inject = ['$http', 'ApiBasePath', '$window']

	function AuthenService($http, ApiBasePath, $window) {
		var service = this;
		console.log(ApiBasePath)

		service.login = function (credentails) {
			console.log(credentails)
			return $http({
				url: (ApiBasePath + "/api/token-auth/"),
				data: credentails,
				method: "POST"
			})

		}
		

	}






})()
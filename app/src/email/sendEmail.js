(function () {
	'use strict'

	// good to combine authenticate with authorization
	angular.module('myApp')
		.service('SendEmailService', SendEmailService)




	SendEmailService.$inject = ['$http', 'ApiBasePath','$log']

	function SendEmailService($http, ApiBasePath,$log) {
		var service = this;
		console.log(ApiBasePath)


		service.sendEmail = function (data) {
			
			$log.info("Sending email")
			var response = $http({
				url: (ApiBasePath + "/api/email/office/"),
				method: "POST",
				data: data
			})
			return response;
		}
	}
})()
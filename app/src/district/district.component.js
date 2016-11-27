(function () {
	'use strict'
	angular.module('myApp')
		.component('districtComponent', {

		})
		.service('districtService', DistrictService)


	DistrictService.$inject = ['$http', "ApiBasePath"]

	function DistrictService($http,ApiBasePath) {
		var service = this;


		service.getAllDistrict = function () {
			var resp = $http({
				url: (ApiBasePath + "/api/districts/"),
				method: "GET"
			})
			return resp;
		}

		service.getDistrictByZobe = function (zoneId) {
			var resp = $http({

			})
		}


	}

})()